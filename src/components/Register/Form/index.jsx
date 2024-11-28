import React from "react";
import "../../../styles/variables.scss";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { register } from "../../../service/auth";
import toast, { Toaster } from "react-hot-toast";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<IoEyeOffOutline />);
  const [validated, setValidated] = useState(false);

  const handleEyeToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(<IoEyeOutline />);
    } else {
      setType("password");
      setIcon(<IoEyeOffOutline />);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password tidak sama!")
      return;
    }

    const request = {
      firstName,
      lastName,
      phone,
      email,
      password,
    };

    const result = await register(request);

    if (result.meta.statusCode === 201) {
      toast.success("Registrasi berhasil!");
      navigate({ to: "/otp" });
    } else {
      toast.error(result.meta.message);
    }
  };
  return (
    <div
      style={{
        maxWidth: "425px",
        width: "100%",
      }}
    >
      {" "}
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <h2 className="fw-bold text-start mb-4">Daftar</h2>
      <Form noValidate validated={validated} onSubmit={handleRegister}>
        {/* Nama */}
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Nama Depan</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type="text"
              placeholder="Nama Depan"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{
                borderRadius: "15px",
                padding: "1em",
              }}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustom02">
          <Form.Label>Nama Belakang</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type="text"
              placeholder="Nama Belakang"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{
                borderRadius: "15px",
                padding: "1em",
              }}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type="email"
              placeholder="Contoh: johndoe@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                borderRadius: "15px",
                padding: "1em",
                paddingRight: "2.5em",
              }}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Nomor Telepon */}
        <Form.Group className="mb-3" controlId="validationCustom04">
          <Form.Label>Nomor Telepon</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type="number"
              placeholder="+62 "
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                borderRadius: "15px",
                padding: "1em",
              }}
            />
          </div>
          <Form.Control.Feedback type="invalid">
            Please provide a valid phone number.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Buat Password */}
        <Form.Group className="mb-3" controlId="validationCustom05">
          <Form.Label>Buat Password</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type={type}
              placeholder="Masukkan password"
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
                right: validated ? "40px" : "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {icon}
            </span>
          </div>
          <Form.Control.Feedback type="invalid">
            Please choose a password.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Konfirmasi Password */}
        <Form.Group className="mb-3">
          <Form.Label>Konfirmasi Password</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type={type}
              placeholder="Konfirmasi password"
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
                right: validated ? "40px" : "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {icon}
            </span>
          </div>
          <Form.Control.Feedback type="invalid">
            Please confirm your password.
          </Form.Control.Feedback>
        </Form.Group>

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
          Daftar
        </Button>
      </Form>
      <div
        className="text-center"
        style={{
          marginTop: "20px",
        }}
      >
        <p>
          Sudah punya akun?{" "}
          <Button
            as={Link}
            to="/login"
            className="text-decoration-none bg-transparent border-0 p-0"
            style={{
              fontWeight: "bold",
              color: "#7126B5",
            }}
          >
            Masuk di sini
          </Button>
        </p>
      </div>
    </div>
  );
};
export default RegisterForm;
