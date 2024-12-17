import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ScreenRiwayatLoading = () => {
  return (
    <Container fluid className="mt-3 py-3 " style={{ background: "#FFFFFF" }}>
      <div style={{ backgroundColor: "#d8d7d9" }}></div>
      <Card
        className="mb-3 border rounded shadow-sm custom-card"
        style={{
          width: "40rem",
          left: "6rem",
        }}
      >
        <Card.Body>
          <div
            style={{
              className: "mb-2",
              width: "3rem",
              height: "1rem",
              backgroundColor: "#c7c7c7",
            }}
          />
          <div
            className="mt-2"
            style={{
              width: "20rem",
              height: "0.5rem",
              backgroundColor: "#d8d7d9",
            }}
          />
          <div
            className="mt-2"
            style={{
              width: "20rem",
              height: "0.5rem",
              backgroundColor: "#d8d7d9",
            }}
          />
          <div
            className="mt-2 mb-2"
            style={{
              width: "20rem",
              height: "0.5rem",
              backgroundColor: "#d8d7d9",
            }}
          />
          <hr />
          <div
            className="mt-2"
            style={{
              width: "20rem",
              height: "0.5rem",
              backgroundColor: "#d8d7d9",
            }}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScreenRiwayatLoading;
