import React from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";

const NotFound = () => {
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
            Oops! Riwayat pesanan kosong!
          </h5>
          <p className="fw-normal mb-4">
            Anda belum melakukan pemesanan penerbangan
          </p>
          <Button
            variant="none"
            size="lg"
            style={{
              backgroundColor: "#7126B5",
              color: "white",
              borderRadius: "8px",
            }}
            href="/"
          >
            Cari Penerbangan
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
