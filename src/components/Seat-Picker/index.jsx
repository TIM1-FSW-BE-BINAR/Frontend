import "../../app.css";
import { useState } from "react";

const seatLayout = [
  {
    type: "First Class",
    rows: [
      ["1A", "", "", "", "", "", "1B"],
      ["2A", "", "", "", "", "", "2B"],
    ],
  },
  {
    type: "Business Class",
    rows: [
      ["3A", "3B", "", "P1", "P2", "3C", "3D"],
      ["4A", "4B", "", "", "", "4C", "4D"],
    ],
  },
  {
    type: "Economy Class",
    rows: [
      ["5A", "5B", "5C", "", "5D", "5E", "5F"],
      ["6A", "6B", "6C", "", "6D", "6E", "6F"],
    ],
  },
];

const seatClass = "Business Class"; // Ubah ini ke kelas yang diinginkan

const App = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(["P1", "P2"]);

  const currentLayout = seatLayout.find((layout) => layout.type === seatClass);

  const handleSeatClick = (seat) => {
    if (!seat || bookedSeats.includes(seat)) {
      alert(seat ? "Kursi ini sudah dipesan!" : "Kursi tidak valid!");
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert("Silakan pilih setidaknya satu kursi!");
    } else {
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      alert(`Kursi ${selectedSeats.join(", ")} berhasil dipesan.`);
      setSelectedSeats([]);
    }
  };

  return (
    <div className="App">
      <h1>Pemilihan Kursi</h1>
      <h2>{seatClass}</h2>
      <div className="seat-map">
        {/* Identitas Kolom */}
        <div className="row column-labels">
          {Array(currentLayout.rows[0].length)
            .fill(null)
            .map((_, colIndex) => (
              <div key={colIndex} className="column-label">
                {colIndex === 0 ? "" : String.fromCharCode(64 + colIndex)}
              </div>
            ))}
        </div>

        {currentLayout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat, seatIndex) => (
              <div
                key={seatIndex}
                className={`seat ${
                  bookedSeats.includes(seat) ? "booked" : ""
                } ${selectedSeats.includes(seat) ? "selected" : ""}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat ? seat.slice(0, -1) : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleConfirm} className="btn-confirm">
        Konfirmasi Pilihan
      </button>
    </div>
  );
};

export default App;
