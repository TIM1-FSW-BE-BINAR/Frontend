import React, { useState } from "react";

const seatLayout = [
  {
    type: "First Class",
    rows: [
      ["A", "", "B"],
      ["1A", "1", "1B"],
      ["2A", "2", "2B"],
      ["3A", "3", "3B"],
    ],
  },
  {
    type: "Business Class",
    rows: [
      ["A", "B", "", "C", "D"],
      ["4A", "4B", "4", "4C", "4D"],
      ["5A", "5B", "5", "5C", "5D"],
      ["6A", "6B", "6", "6C", "6D"],
      ["7A", "7B", "7", "7C", "7D"],
      ["8A", "8B", "8", "8C", "8D"],
    ],
  },
  {
    type: "Economy Class",
    rows: [
      ["A", "B", "C", "", "D", "E", "F"],
      ["9A", "9B", "9C", "9", "9D", "9E", "9F"],
      ["10A", "10B", "10C", "10", "10D", "10E", "10F"],
      ["11A", "11B", "11C", "11", "11D", "11E", "11F"],
      ["12A", "12B", "12C", "12", "12D", "12E", "12F"],
      ["13A", "13B", "13C", "13", "13D", "13E", "13F"],
      ["14A", "14B", "14C", "14", "14D", "14E", "14F"],
      ["15A", "15B", "15C", "15", "15D", "15E", "15F"],
      ["16A", "16B", "16C", "16", "16D", "16E", "16F"],
      ["17A", "17B", "17C", "17", "17D", "17E", "17F"],
    ],
  },
];

const App = () => {
  const [seatClass, setSeatClass] = useState("First Class"); 
  const [selectedSeats, setSelectedSeats] = useState([]); 
  const [bookedSeats, setBookedSeats] = useState(["1A"]); 

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
      <style>
        {`
          .App {
            font-family: "Arial", sans-serif;
            text-align: center;
            margin: 20px;
          }

          h2 {
            margin: 20px 0;
            color: #333;
          }

          .class-selection button {
            margin: 0 10px;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            background-color: #73CA5C;
            color: white;
            cursor: pointer;
          }

          .class-selection button:hover {
            background-color: #45a049;
          }

          .seat-map {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .row {
            display: flex;
            gap: 5px;
            justify-content: center;
          }

          .seat {
            width: 40px;
            height: 40px;
            background-color: #73CA5C;
            border: 1px solid #888;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            cursor: pointer;
            font-size: 12px;
            font-weight: bold;
            transition: transform 0.2s, background-color 0.2s;
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
            background-color: #7126B5; /* Kursi yang Dipilih */
            color: white;
          }

          .seat:hover {
            transform: scale(1.1);
          }

          .btn-confirm {
            background-color: #73CA5C;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
          }

          .btn-confirm:hover {
            background-color: #45a049;
          }

          .info-text {
            font-weight: bold;
            font-size: 14px;
            color: #333;
          }

          .info-box {
            font-size: 14px;
            font-weight: bold;
            color: #555;
            border: 1px solid #ddd;
            margin: 0 5px;
          }

        `}
      </style>
      <div className="class-selection">
        <button type="button" onClick={() => setSeatClass("First Class")}>
          First Class
        </button>
        <button type="button" onClick={() => setSeatClass("Business Class")}>
          Business Class
        </button>
        <button type="button" onClick={() => setSeatClass("Economy Class")}>
          Economy Class
        </button>
      </div>

      <h2>{seatClass}</h2>
      <div className="seat-map">
        {currentLayout.rows.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((seat, seatIndex) => {
              const isHeaderRow = rowIndex === 0; 
              const isInfoColumn =
                (currentLayout.type === "First Class" && seatIndex === 1) ||
                (currentLayout.type === "Business Class" && seatIndex === 2) ||
                (currentLayout.type === "Economy Class" && seatIndex === 3);

              if (isHeaderRow) {
                return (
                  <div
                    key={seatIndex}
                    className="info-text"
                    style={{ width: "40px", textAlign: "center" }}
                  >
                    {seat}
                  </div>
                );
              }

              if (isInfoColumn) {
                return (
                  <div
                    key={seatIndex}
                    className="info-box"
                    style={{
                      width: "20px",
                      height: "40px",
                      backgroundColor: "#F2F2F2",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "4px",
                      margin: "0 5px",
                    }}
                  >
                    {seat}
                  </div>
                );
              }

              if (seat === "") {
                return <div key={seatIndex} style={{ width: "40px" }}></div>;
              }

              const isBooked = bookedSeats.includes(seat);
              const isSelected = selectedSeats.includes(seat);

              return (
                <div
                  key={seatIndex}
                  className={`seat ${isBooked ? "booked" : ""} ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() => handleSeatClick(seat)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>

      <button className="btn-confirm" onClick={handleConfirm}>
        Konfirmasi Pemesanan
      </button>
    </div>
  );
};

export default App;
