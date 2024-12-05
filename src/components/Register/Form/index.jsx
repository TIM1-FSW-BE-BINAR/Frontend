import React, { useRef, useState } from "react";
import "../../../styles/variables.scss";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../../service/auth";

import { setToken } from "../../../redux/slices/auth";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

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

  const [confirmType, setConfirmType] = useState("password");
  const [confirmIcon, setConfirmIcon] = useState(<IoEyeOffOutline />);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { mutate: registerUser } = useMutation({
    mutationFn: (request) => {
      return register(request);
    },
    onSuccess: (result) => {
      if (result?.meta) {
        dispatch(setToken(result?.data?.token));
        toast.success(result?.meta?.message, {
          style: {
            padding: "16px",
            background: "#73CA5C",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
        });
        navigate({ to: "/otp", state: { email: email.trim() } });
      } else {
        handleApiError(result.message);
      }
    },
    onError: (err) => {
      handleApiError(err.message);
      toast.error(err?.message, {
        style: {
          padding: "16px",
          background: "#FF0000",
          color: "#FFFFFF",
        },
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    },
  });

  const handleApiError = (errorMessage) => {
    const message = errorMessage?.toLowerCase() || "";
    console.log(message);

    setErrors({ email: "", password: "" });
    if (message.includes("email")) {
      setErrors((prev) => ({ ...prev, email: errorMessage }));
      emailRef.current?.focus();
    }
    if (message.includes("password") || message.includes("credential")) {
      setErrors((prev) => ({ ...prev, password: errorMessage }));
      passwordRef.current?.focus();
    }
    if (message.includes("phone")) {
      setErrors((prev) => ({ ...prev, phone: errorMessage }));
      phoneRef.current?.focus();
    }

    // if (message.includes("password") || message.includes("credential")) {
    //   setErrors((prev) => ({ ...prev, password: errorMessage }));
    //   lastNameRef.current?.focus();
    // }

    // if (message.includes("password") || message.includes("")) {
    //   setErrors((prev) => ({ ...prev, password: errorMessage }));
    //   passwordRef.current?.focus();
    // } else {
    //   setErrors((prev) => ({ ...prev, email: errorMessage }));
    // }
  };


  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    if (!firstName) {
      setErrors((prev) => ({ ...prev, firstName: "Nama depan harus diisi" }));
      firstNameRef.current?.focus();
      return;
    }
    if (!lastName) {
      setErrors((prev) => ({ ...prev, lastName: "Nama belakang harus diisi" }));
      lastNameRef.current?.focus();
      return;
    }
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email harus diisi" }));
      emailRef.current?.focus();
      return;
    }
    if (!phone) {
      setErrors((prev) => ({ ...prev, phone: "Nomor Hp harus diisi" }));
      phoneRef.current?.focus();
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password harus diisi" }));
      passwordRef.current?.focus();
      return;
    }
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Password tidak sama!",
      }));
      confirmPasswordRef.current?.focus();
      return;
    }

    const request = {
      firstName,
      lastName,
      phone,
      email: email.trim(),
      password,
    };
    registerUser(request);
  };

  const handleEyeToggle = (field) => {
    if (field === "password") {
      if (type === "password") {
        setType("text");
        setIcon(<IoEyeOutline />);
      } else {
        setType("password");
        setIcon(<IoEyeOffOutline />);
      }
    } else if (field === "confirmPassword") {
      if (confirmType === "password") {
        setConfirmType("text");
        setConfirmIcon(<IoEyeOutline />);
      } else {
        setConfirmType("password");
        setConfirmIcon(<IoEyeOffOutline />);
      }
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
      <h2 className="fw-bold text-start mb-4">Daftar</h2>
      <Form noValidate onSubmit={handleRegister}>
        {/* Nama */}
        <Form.Group className="mb-3" controlId="validationCustom01">
          <Form.Label>Nama Depan</Form.Label>
          <Form.Control
            ref={firstNameRef}
            type="text"
            placeholder="Nama Depan"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            isInvalid={!!errors.firstName}
            style={{
              borderRadius: "15px",
              padding: "1em",
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="validationCustom02">
          <Form.Label>Nama Belakang</Form.Label>
          <Form.Control
            ref={lastNameRef}
            isInvalid={!!errors.lastName}
            type="text"
            placeholder="Nama Belakang"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{
              borderRadius: "15px",
              padding: "1em",
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Email */}
        <Form.Group className="mb-3" controlId="validationCustom03">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            isInvalid={!!errors.email}
            placeholder="Contoh: johndoe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: "15px",
              padding: "1em",
              paddingRight: "2.5em",
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Nomor Telepon */}
        <Form.Group className="mb-3" controlId="validationCustom04">
          <Form.Label>Nomor Telepon</Form.Label>
          <PhoneInput
            ref={phoneRef}
            isInvalid={!!errors.phone}
            defaultCountry="ID"
            placeholder="Masukkan nomor telepon"
            value={phone}
            onChange={setPhone}
            style={{
              borderRadius: "15px",
              padding: "1em",
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Buat Password */}
        <Form.Group className="mb-3" controlId="validationCustom05">
          <Form.Label>Buat Password</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              type={type}
              ref={passwordRef}
              placeholder="Masukkan password"
              required
              style={{
                borderRadius: "15px",
                paddingRight: "40px",
                padding: "1em",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <span
              onClick={() => handleEyeToggle("password")}
              style={{
                position: "absolute",
                top: errors.password ? "35%" : "50%",
                right: errors.password ? "40px" : "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              {icon}
            </span>
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        {/* Konfirmasi Password */}
        <Form.Group className="mb-3">
          <Form.Label>Konfirmasi Password</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              ref={confirmPasswordRef}
              type={confirmType}
              placeholder="Konfirmasi password"
              style={{
                borderRadius: "15px",
                paddingRight: "40px",
                padding: "1em",
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
            />
            <span
              onClick={() => handleEyeToggle("confirmPassword")}
              style={{
                position: "absolute",
                top: errors.confirmPassword ? "35%" : "50%",
                right: errors.confirmPassword ? "40px" : "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              {confirmIcon}
            </span>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </div>
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
      <div>
        <Toaster
          position="bottom-center"
          containerStyle={{
            position: "fixed",
            bottom: "20px",
            left: "75%",
            transform: "translateX(-50%)",
            zIndex: "9999",
          }}
          reverseOrder={false}
        />
      </div>
    </div>
  );
};
export default RegisterForm;
