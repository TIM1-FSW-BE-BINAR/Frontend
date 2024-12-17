
import { Card } from "react-bootstrap";

const TicketDetailsLoading = () => {
  return (
    <Card.Body>
      {/* Ticket Details */}
      <div className="d-flex justify-content-center align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "180px", height: "30px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      {/* Flight Details */}
      <div className="d-flex align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "150px", height: "30px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      {/* Departure Time */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "80px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
        <div
          className="placeholder rounded"
          style={{ width: "80px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      {/* Date */}
      <div className="d-flex align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "130px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      {/* airport - terminal */}
      <div className="d-flex align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "380px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      <hr />

      {/* Image & information*/}
      <div className="mb-3 d-flex align-items-center">
        {/* Logo Maskapai Placeholder */}
        <div
          className="placeholder rounded me-4"
          style={{ width: "40px", height: "40px", backgroundColor: "#e0e0e0" }}
        ></div>

        <div>
          {/* Detail Maskapai Placeholder */}
          <div
            className="placeholder rounded mb-2"
            style={{
              width: "200px",
              height: "20px",
              backgroundColor: "#e0e0e0",
            }}
          ></div>
          <div
            className="placeholder rounded mb-2"
            style={{
              width: "150px",
              height: "20px",
              backgroundColor: "#e0e0e0",
            }}
          ></div>
          {/* Informasi Penumpang Placeholder */}
          <div className="mt-4">
            <div
              className="placeholder rounded mb-2"
              style={{
                width: "250px",
                height: "20px",
                backgroundColor: "#e0e0e0",
              }}
            ></div>
            <div
              className="placeholder rounded"
              style={{
                width: "200px",
                height: "20px",
                backgroundColor: "#e0e0e0",
              }}
            ></div>
          </div>
        </div>
      </div>

      <hr />

      {/* Arrival */}
      {/* Departure Time */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "80px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
        <div
          className="placeholder rounded"
          style={{ width: "80px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      {/* Date */}
      <div className="d-flex align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "130px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      {/* airport - terminal */}
      <div className="d-flex align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "380px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      <hr />

      {/* Price */}
      <div
        className="placeholder rounded mb-3"
        style={{ width: "100px", height: "20px", backgroundColor: "#e0e0e0" }}
      ></div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "80px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
        <div
          className="placeholder rounded"
          style={{ width: "80px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "50px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
        <div
          className="placeholder rounded"
          style={{ width: "80px", height: "18px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

      <hr />

      {/* Total */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "120px", height: "28px", backgroundColor: "#e0e0e0" }}
        ></div>
        <div
          className="placeholder rounded"
          style={{ width: "150px", height: "28px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>

<hr />

      {/* button */}
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="placeholder rounded"
          style={{ width: "350px", height: "50px", backgroundColor: "#e0e0e0" }}
        ></div>
      </div>
    </Card.Body>
  );
};

export default TicketDetailsLoading;
