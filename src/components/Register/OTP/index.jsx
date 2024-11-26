import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "@tanstack/react-router";
import OtpInput from "react-otp-input";
import { IoArrowBack } from "react-icons/io5";

const OTPForm = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const handleBack = () => {
    navigate({ to: "/register" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`OTP Anda: ${otp.join("")}`);
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <div className="d-flex justify-content-start w-100 mb-4">
        <IoArrowBack
          onClick={handleBack}
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
            marginRight: "20px",
          }}
        />
        <h2 className="fw-bold text-end">Masukkan OTP</h2>
      </div>
      <p className="text-muted mt-4">
        Ketik 6 digit kode yang dikirimkan ke <b>j*****@gmail.com</b>
      </p>
      <Form onSubmit={handleSubmit} className="w-100">
        <Row className="justify-content-center mb-3">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={{ justifyContent: "center", marginLeft: "2px" }}
            inputStyle={{
              width: "50px",
              height: "50px",
              fontSize: "24px",
              fontWeight: "bold",
              marginLeft: "1em",
              borderRadius: "14px",
            }}
            renderInput={(props) => <input {...props} />}
          />{" "}
        </Row>
        <Button
          variant="primary"
          type="submit"
          className="w-100 mb-3"
          style={{
            backgroundColor: "#7126B5",
            border: "none",
            transition: "opacity 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Simpan
        </Button>
      </Form>
      <p className="text-muted mt-2">Kirim Ulang OTP dalam 60 detik</p>
    </Container>
  );
};

export default OTPForm;

{
  /* <Row className="justify-content-center mb-3">
          {otp.map((value, index) => (
            <Col key={index} xs="auto">
              <Form.Control
                type="text"
                maxLength="1"
                value={value}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
                className="text-center"
                style={{
                  width: "50px",
                  height: "50px",
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
            </Col>
          ))}
        </Row> */
}
