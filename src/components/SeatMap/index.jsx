import { useEffect, useState } from "react";
import { getAllSeats } from "../../service/Seat";
import PropTypes from "prop-types"; 

const SeatMap = ({ selectedSeats, setSelectedSeats, passengerCount }) => {
  const [seats, setSeats] = useState([]);
  const kursiterpilih = selectedSeats;

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const params = {
          flightId: 1,
          departureTime: "2024-12-14T08:00:00.000Z",
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

  const handleSeatClick = (seat) => {
    if (seat.status === "UNAVAILABLE") return;
    if (
      kursiterpilih.length >= passengerCount &&
      !kursiterpilih.includes(seat.id)
    ) {
      alert(`Anda hanya bisa memilih ${passengerCount} kursi.`);
      return;
    }
    if (kursiterpilih.includes(seat.id)) {
      setSelectedSeats(kursiterpilih.filter((id) => id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  return (
    <div className="seat-map">
      <h2>Seat Map</h2>
      <div className="row">
        {seats.data &&
          seats.data.map((seat) => (
            <div
              key={seat.id}
              className={`seat ${seat.status === "UNAVAILABLE" ? "booked" : ""} ${
                kursiterpilih.includes(seat.id) ? "selected" : ""
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
  );
};
SeatMap.propTypes = {
  selectedSeats: PropTypes.array,
  setSelectedSeats: PropTypes.func, 
  passengerCount: PropTypes.number,
};
export default SeatMap;
