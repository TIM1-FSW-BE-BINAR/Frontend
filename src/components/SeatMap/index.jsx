import { useEffect, useState } from "react";
import { getAllSeats } from "../../service/Seat";
import PropTypes from "prop-types"; 
import toast, { Toaster } from "react-hot-toast";

const SeatMap = ({ selectedSeats, setSelectedSeats, totalSeat }) => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const params = {
          flightId: 2,
          departureTime: "2024-12-15T08:00:00.000Z",
          seatStatus: "AVAILABLE",
        };

        const data = await getAllSeats(params);
        console.log("Fetched seats:", data);
        setSeats(data);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchSeats();
  }, []);
  useEffect(() => {
    console.log("Selected seats updated:", selectedSeats);
  }, [selectedSeats]);

  const handleSeatClick = (seat) => {
    if (seat.status === "UNAVAILABLE") return;
    if (selectedSeats.length >= totalSeat && !selectedSeats.includes(seat.id)) {
      toast.error(`Anda hanya bisa memilih ${totalSeat} kursi.`);
      return;
    }
    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="seat-map">
        <h2>Seat Map</h2>
        <div className="row">
          {seats.data &&
            seats.data.map((seat) => (
              <div
                key={seat.id}
                className={`seat ${seat.status === "UNAVAILABLE" ? "booked" : ""} ${
                  selectedSeats.includes(seat.id) ? "selected" : ""
                }`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.seatNumber}
              </div>
            ))}
        </div>

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
            background-color: #73CA5C;
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
            background-color: #7126B5;
          }
        `}
        </style>
      </div>
    </>
  );
};
SeatMap.propTypes = {
  selectedSeats: PropTypes.array,
  setSelectedSeats: PropTypes.func,
  totalSeat: PropTypes.number,
};
export default SeatMap;
