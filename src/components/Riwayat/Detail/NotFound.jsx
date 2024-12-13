import React from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import "./NotFound.css";

const NotFound = () => {
  return (
    <Row className="text-center mt-5" style={{ background: "#FFFFFF" }}>
      <Col>
        <Image
          src="img/success_payment.svg"
          alt="Empty Booking Illustration"
          className="mb-4 not-found-img"
        />
        <h5 className="fw-bold h5-not-found" style={{ color: "#7126B5" }}>
          Oops! Riwayat pesanan kosong!
        </h5>
        <p className="fw-normal mb-4 p-not-found">
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
  );
};

export default NotFound;
