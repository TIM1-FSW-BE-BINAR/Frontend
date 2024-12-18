import React from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import "./NotFoundNotification.css";
import notFound from "../../../assets/success_payment.svg";

const NotFoundNotifikasi = () => {
  return (
    <Row className="text-center mt-5" style={{ background: "#FFFFFF" }}>
      <Col>
        <Image
          style={{ width: "10rem" }}
          src={notFound}
          alt="Empty Booking Illustration"
          className="mb-4 mt-5 not-found-img"
        />
        <h5 className="fw-bold h5-not-found" style={{ color: "#7126B5" }}>
          Oops! Your notification is empty!
        </h5>
        <p className="fw-normal mb-4 p-not-found">
          There's no notification for you yet
        </p>
      </Col>
    </Row>
  );
};

export default NotFoundNotifikasi;
