import React from "react";
import { Button, Col, Row } from "react-bootstrap";

import plusIcon from "../../assets/homepage/icon/plus-icon.png";
import minusIcon from "../../assets/homepage/icon/minus-icon.png";

const PassengerRow = ({
  icon,
  label,
  ageInfo,
  inputValue,
  onIncrement,
  onDecrement,
}) => {
  return (
    <Row className="d-flex justify-content-between align-items-center">
      <Col xs={5} sm={6} className="d-flex">
        <img
          src={icon}
          alt=""
          className="img-fluid mt-1"
          style={{
            maxWidth: "20px",
            maxHeight: "20px",
          }}
        />
        <div className="ms-2">
          <p className="fw-bold mb-0">{label}</p>
          <p>{ageInfo}</p>
        </div>
      </Col>
      <Col className="p-0 d-flex justify-content-end align-items-center">
        <Button
          className="animated-button"
          style={{
            border: "none",
            backgroundColor: "transparent",
            padding: "0",
          }}
          onClick={onDecrement}
        >
          <img
            src={minusIcon}
            className="img-fluid"
            alt="decrement"
            style={{
              maxWidth: "40px",
              maxHeight: "40px",
              cursor: "pointer",
            }}
          />
        </Button>
        <input
          type="text"
          style={{
            width: "50px",
            fontSize: "16px",
            textAlign: "center",
            padding: "5px",
            marginLeft: "10px",
            marginRight: "10px",
          }}
          value={inputValue}
          readOnly
        />
        <Button
          className="animated-button"
          style={{
            border: "none",
            backgroundColor: "transparent",
            padding: "0",
          }}
          onClick={onIncrement}
        >
          <img
            src={plusIcon}
            className="img-fluid"
            alt="increment"
            style={{
              maxWidth: "40px",
              maxHeight: "40px",
              cursor: "pointer",
            }}
          />
        </Button>
      </Col>
    </Row>
  );
};

export default PassengerRow;
