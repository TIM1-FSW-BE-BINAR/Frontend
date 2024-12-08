import { useState } from "react";import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 


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

const Seatpicker = () => {
// const Seatpicker = (onSave, selectedSeats) => {
  const [seatClass, setSeatClass] = useState("First Class");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(["1A"]);
  //const [selected, setSelected] = useState(selectedSeats);

  const currentLayout = seatLayout.find((layout) => layout.type === seatClass);

  const handleSeatClick = (seat) => {
    if (!seat || bookedSeats.includes(seat)) {
      toast.error(seat ? "Kursi ini sudah dipesan!" : "Kursi tidak valid!");
      return;
    }

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (selectedSeats.length === 0) {
      toast.warning("Silakan pilih setidaknya satu kursi!");
    } else {
      setBookedSeats([...bookedSeats, ...selectedSeats]);
      toast.success(`Kursi ${selectedSeats.join(", ")} berhasil dipesan.`);
      console.log("Kursi yang dipilih:", selectedSeats);
      setSelectedSeats([]);
    }
  };

  // const handleSeatClick = (seat) => {
  //   if (!seat || bookedSeats.includes(seat)) {
  //     toast.error(seat ? "Kursi ini sudah dipesan!" : "Kursi tidak valid!");
  //     return;
  //   }

  //   if (Array.isArray(selected) && selected.includes(seat)) {
  //     setSelected(selected.filter((s) => s !== seat));
  //   } else {
  //     setSelected([...selected, seat]);
  //   }
  // };

  // const handleConfirm = (e) => {
  //   e.preventDefault();
  //   if (selected.length === 0) {
  //     toast.warning("Silakan pilih setidaknya satu kursi!");
  //   } else {
  //     setBookedSeats([...bookedSeats, ...selected]);
  //     toast.success(`Kursi ${selected.join(", ")} berhasil dipesan.`);
  //     console.log("Kursi yang dipilih:", selected);
  //     onSave(selected);
  //   }
  // };

  return (
    <div className="App" style={{ textAlign: "center", margin: "20px" }}>
      <style>
        {`
          .class-selection button {
            margin: 0 10px;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            background-color: #73CA5C;
            color: white;
          }
          .class-selection button:hover {
            background-color: #45a049;
          }
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

      <h2 style={{ margin: "20px 0", color: "#333" }}>{seatClass}</h2>
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
                    style={{
                      width: "34px",
                      textAlign: "center",
                      color: "#8A8A8A",
                    }}
                  >
                    {seat}
                  </div>
                );
              }

              if (isInfoColumn) {
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
                    {seat}
                  </div>
                );
              }

              if (seat === "") {
                return <div key={seatIndex} style={{ width: "35px" }}></div>;
              }

              const isBooked = bookedSeats.includes(seat);
              // const isSelected = selected.includes(seat);
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

      <button
        style={{
          backgroundColor: "#73CA5C",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          marginTop: "20px",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#73CA5C")}
        onClick={handleConfirm}
      >
        Konfirmasi Kursi
      </button>
    </div>
  );
};

export default Seatpicker;
