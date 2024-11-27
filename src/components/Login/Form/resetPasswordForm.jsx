import React from "react";
import "../../../styles/variables.scss";
import {  useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {  Button, Form, Image } from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<IoEyeOffOutline />);
  const handleEyeToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(<IoEyeOutline />);
    } else {
      setType("password");
      setIcon(<IoEyeOffOutline />);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("Password tidak sama. Silakan coba lagi.");
    } else {
      setError("");
    }
  };
  return (
    <div
      style={{
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <h2 className="fw-bold text-start mb-4">Reset Password</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Masukkan Password Baru</Form.Label>
          <div
            style={{
              position: "relative",
            }}
          >
            <Form.Control
              type={type}
              placeholder="Masukkan Password baru"
              required
              style={{
                borderRadius: "15px",
                paddingRight: "40px",
                padding: "1em",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <span
              onClick={handleEyeToggle}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {icon}
            </span>
          </div>
          <div
            className="text-end mt-1"
            style={{
              marginTop: "5px",
            }}
          ></div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ulangi Password Baru</Form.Label>
          <div
            style={{
              position: "relative",
            }}
          >
            <Form.Control
              type={type}
              placeholder="Ulangi Password Baru"
              required
              style={{
                borderRadius: "15px",
                paddingRight: "40px",
                padding: "1em",
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="off"
            />
            <span
              onClick={handleEyeToggle}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {icon}
            </span>
          </div>
          <div
            className="text-end mt-1"
            style={{
              marginTop: "5px",
            }}
          ></div>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3 mb-3"
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
    </div>
  );
};

export default ResetPasswordForm;
