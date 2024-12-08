import React from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";

const NotFoundNotifikasi = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ marginTop: "10rem" }}
    >
      <Row className="text-center">
        <Col>
          <Image
            src="img/success_payment.svg"
            alt="Empty Booking Illustration"
            className="mb-4"
            style={{ width: "150px" }}
          />
          <h5 className="fw-bold" style={{ color: "#7126B5" }}>
            Oops! Notifikasi anda kosong!
          </h5>
          <p className="fw-normal mb-4">
            Saat ini belum ada notifikasi untuk anda
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundNotifikasi;
