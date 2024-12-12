import React from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import "./NotFoundNotification.css";

const NotFoundNotifikasi = () => {
  return (
    <Row className="text-center mt-5" style={{ background: "#FFFFFF" }}>
      <Col>
        <Image
          src="img/success_payment.svg"
          alt="Empty Booking Illustration"
          className="mb-4 not-found-img"
        />
        <h5 className="fw-bold h5-not-found" style={{ color: "#7126B5" }}>
          Oops! Notifikasi anda kosong!
        </h5>
        <p className="fw-normal mb-4 p-not-found">
          Saat ini belum ada notifikasi untuk anda
        </p>
      </Col>
    </Row>
  );
};

export default NotFoundNotifikasi;
