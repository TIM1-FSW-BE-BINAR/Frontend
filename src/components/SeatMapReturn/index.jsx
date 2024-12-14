import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { getAllSeats } from "../../service/Seat";
import { useQuery } from "@tanstack/react-query";
import { getFlightId } from "../../service/flight/flightService";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const seatLayout = [
  {
    rows: [
      ["A", "B", "C", "", "D", "E", "F"],
      ["1A", "1B", "1C", "1", "1D", "1E", "1F"],
      ["2A", "2B", "2C", "2", "2D", "2E", "2F"],
      ["3A", "3B", "3C", "3", "3D", "3E", "3F"],
      ["4A", "4B", "4C", "4", "4D", "4E", "4F"],
      ["5A", "5B", "5C", "5", "5D", "5E", "5F"],
      ["6A", "6B", "6C", "6", "6D", "6E", "6F"],
      ["7A", "7B", "7C", "7", "7D", "7E", "7F"],
      ["8A", "8B", "8C", "8", "8D", "8E", "8F"],
      ["9A", "9B", "9C", "9", "9D", "9E", "9F"],
      ["10A", "10B", "10C", "10", "10D", "10E", "10F"],
      ["11A", "11B", "11C", "11", "11D", "11E", "11F"],
      ["12A", "12B", "12C", "12", "12D", "12E", "12F"],
    ],
  },
];

const SeatMapReturn = ({
  selectedSeatsReturn,
  setSelectedSeatsReturn,
  totalSeat,
  isSaved,
}) => {
  const [returnSeats, setReturnSeats] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const returnFlightId = parseInt(searchParams.get("returnFlightId"), 10) || 0;

  const { data: returnFlight, isLoading } = useQuery({
    queryKey: ["flight", returnFlightId],
    queryFn: () => getFlightId(returnFlightId),
    enabled: !!returnFlightId,
  });

  useEffect(() => {
    const fetchReturnSeats = async () => {
      try {
        const params = { flightId: returnFlightId };
        const data = await getAllSeats(params);
        setReturnSeats(data?.data || []);
      } catch (error) {
        console.error(
          "Error fetching return seat data:",
          error.message,
          error.stack
        );
      }
    };
    if (returnFlightId) {
      fetchReturnSeats();
    }
  }, [returnFlightId]);

  const handleSeatClick = (seat) => {
    if (isSaved) {
      return;
    }

    if (seat.status === "LOCKED") {
      toast.error("This seat is already taken!");
      return;
    }

    if (
      selectedSeatsReturn.length >= totalSeat &&
      !selectedSeatsReturn.some((selectedSeat) => selectedSeat.id === seat.id)
    ) {
      toast.error(`You can only choose  ${totalSeat} seat.`);
      return;
    }

    if (
      selectedSeatsReturn.some((selectedSeat) => selectedSeat.id === seat.id)
    ) {
      setSelectedSeatsReturn(
        selectedSeatsReturn.filter(
          (selectedSeat) => selectedSeat.id !== seat.id
        )
      );
    } else {
      const nextPassenger = `P${selectedSeatsReturn.length + 1}`;
      setSelectedSeatsReturn([
        ...selectedSeatsReturn,
        { id: seat.id, seatNumber: seat.seatNumber, passenger: nextPassenger },
      ]);
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <PulseLoader color="#7126B5" size={15} />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <div
        id="box-timer"
        style={{
          background: "#4A90E2",
          border: "1px solid white",
          borderRadius: "10px",
          marginTop: "15px",
          zIndex: "1",
        }}
      >
        {returnFlight?.data?.class || "Unknown"} -{" "}
        {returnSeats.filter((s) => s.status === "AVAILABLE").length} Seats
        Available
      </div>
      <br />
      <div className="seat-map">
        {seatLayout[0].rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seatNumber, seatIndex) => {
              if (!seatNumber) {
                return <div key={seatIndex} style={{ width: "35px" }}></div>;
              }

              const seat = returnSeats.find(
                (seat) => seat.seatNumber === seatNumber
              );
              const isSelected = selectedSeatsReturn.some(
                (selectedSeat) => selectedSeat.id === seat?.id
              );

              const seatStyle = {
                default: { backgroundColor: "#4A90E2" },
                selected: { backgroundColor: "#7126B5" },
                booked: { backgroundColor: "#D0D0D0", cursor: "not-allowed" },
              };
              const getSeatStyle = (seat, isSelected) => {
                if (seat?.status === "LOCKED") return seatStyle.booked;
                if (isSelected) return seatStyle.selected;
                return seatStyle.default;
              };

              // If the seat is a letter (row header)
              if (["A", "B", "C", "D", "E", "F"].includes(seatNumber)) {
                return (
                  <div
                    key={seatIndex}
                    style={{
                      width: "34px",
                      textAlign: "center",
                      color: "#8A8A8A",
                    }}
                  >
                    {seatNumber}
                  </div>
                );
              }

              // If the seat is a number (seat number)
              if (
                [
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                ].includes(seatNumber)
              ) {
                return (
                  <div
                    key={seatIndex}
                    style={{
                      width: "18px",
                      height: "35px",
                      backgroundColor: "#F2F2F2",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      margin: "0 3px",
                      padding: "2px",
                      color: "#8A8A8A",
                    }}
                  >
                    {seatNumber}
                  </div>
                );
              }

              return (
                <div
                  key={seatIndex}
                  className={`seat ${seat?.status === "LOCKED" ? "booked" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => seat && handleSeatClick(seat)}
                  style={{
                    ...getSeatStyle(seat, isSelected),
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      {
                        selectedSeatsReturn.find((s) => s.id === seat?.id)
                          ?.passenger
                      }
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <style>
          {`
          .row {
            display: flex;
            gap: 5px;
            justify-content: center;
          }
          .seat {
            width: 35px;
            height: 35px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            cursor: pointer;
            transition: transform 0.2s, background-color 0.2s;
          }
          .seat-map {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          .seat:hover {
            transform: scale(1.1);
          }
          .seat.booked {
            background-color: #D0D0D0;
            color: white;
            cursor: not-allowed;
            position: relative;
          }
          .seat.booked:after {
            content: "X";
            position: absolute;
            color: white;
            font-size: 18px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .seat.selected {
            color: white;
          }
        `}
        </style>
      </div>
    </>
  );
};

SeatMapReturn.propTypes = {
  selectedSeatsReturn: PropTypes.array.isRequired,
  setSelectedSeatsReturn: PropTypes.func.isRequired,
  totalSeat: PropTypes.number.isRequired,
  isSaved: PropTypes.bool.isRequired,
};

export default SeatMapReturn;
