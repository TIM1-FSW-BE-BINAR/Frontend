import React from "react";
import { Container, Button, Row, Col, Image } from "react-bootstrap";
import "./NotFound.css";
import empty from "../../../assets/success_payment.svg";

const NotFound = () => {
  return (
    <Row className="text-center mt-5" style={{ background: "#FFFFFF" }}>
      <Col>
        <Image
          src={empty}
          alt="Empty Booking Illustration"
          className="mb-4 mt-5 not-found-img"
          style={{ width: "10rem" }}
        />
        <h5 className="fw-bold h5-not-found" style={{ color: "#7126B5" }}>
          Oops! Your history still empty!
        </h5>
        <p className="fw-normal mb-4 p-not-found">
          You're not booking anything yet
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
          Search flight
        </Button>
      </Col>
    </Row>
  );
};

export default NotFound;
