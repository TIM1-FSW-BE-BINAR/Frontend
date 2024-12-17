import { Card } from "react-bootstrap";



const SeatLoading = () => {
  const seatRows = new Array(12).fill(null);

  return (
    <Card.Body>
      {/* Chose Seat */}
      <div className="d-flex  mb-4">
        <div
          className="placeholder rounded"
          style={{ width: "180px", height: "30px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      {/* Seat Available */}
      <div className="d-flex justify-content-center align-items-center mb-5">
        <div
          className="placeholder rounded"
          style={{ width: "380px", height: "50px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      {/* Seat */}
      <div className="d-flex justify-content-center align-items-center" >
        <div className="mb-3">
          {seatRows.map((_, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                marginBottom: "10px",
              }}
            >
              {/* Seat kiri */}
              <div
                className="placeholder rounded me-1"
                style={{
                  width: "38px",
                  height: "36px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
              <div
                className="placeholder rounded me-1"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
              <div
                className="placeholder rounded me-2"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
              {/* Number */}
              <div
                className="placeholder rounded me-2"
                style={{
                  width: "20px",
                  height: "36px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
              {/* Seat kanan */}
              <div
                className="placeholder rounded me-1"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
              <div
                className="placeholder rounded me-1"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
              <div
                className="placeholder rounded me-2"
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "#e0e0e0",
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </Card.Body>
  );
};

export default SeatLoading;
