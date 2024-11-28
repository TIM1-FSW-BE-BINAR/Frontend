import React from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Image } from "react-bootstrap";
import Background from "/img/Frame 1.svg";
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5";
import ForgetPasswordForm from "./forgetPasswordForm";
import { login } from "../../../service/auth";
import { setToken } from "../../../redux/slices/auth";

const loginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<IoEyeOffOutline />);
  const [forgotPassword, setForgotPassword] = useState(false);
  const disabled = !email || !password;

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  const handleEyeToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(<IoEyeOutline />);
    } else {
      setType("password");
      setIcon(<IoEyeOffOutline />);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const request = {
      email,
      password,
    };
    const result = await login(request);
    console.log(result);
    if (result) {
      dispatch(setToken(result.data.token));
      navigate({ to: "/" });
      return;
    }
  };
  const handleForgotPassword = () => {
    setForgotPassword(true);
  };
  return (
    <div
      style={{
        maxWidth: "425px",
        width: "100%",
      }}
    >
      {!forgotPassword ? (
        // Form Login
        <>
          <h2 className="fw-bold text-start mb-4">Masuk</h2>

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Email/No Telepon</Form.Label>
              <Form.Control
                type="email"
                placeholder="Contoh: johndoe@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: "15px",
                  padding: "1em",
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <div
                style={{
                  position: "relative",
                }}
              >
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
              >
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleForgotPassword();
                  }}
                  className="text-decoration-none bg-transparent border-0"
                  style={{
                    fontSize: "0.9rem",
                    color: "#7126B5",
                  }}
                >
                  Lupa Password?
                </Button>
              </div>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              disabled={disabled}
              style={{
                backgroundColor: "#7126B5",
                border: "none",
                transition: "opacity 0.3s ease",
                opacity: disabled ? "0.5" : "1",
              }}
              onMouseEnter={(e) =>
                !disabled && (e.currentTarget.style.opacity = "0.5")
              }
              onMouseLeave={(e) =>
                !disabled && (e.currentTarget.style.opacity = "1")
              }
            >
              Masuk
            </Button>
          </Form>

          <div
            className="text-center"
            style={{
              marginTop: "20px",
            }}
          >
            <p>
              Belum punya akun?{" "}
              <Button
                as={Link}
                to="/register"
                className="text-decoration-none bg-transparent border-0 p-0"
                style={{
                  fontWeight: "bold",
                  color: "#7126B5",
                }}
              >
                Daftar di sini
              </Button>
            </p>
          </div>
        </>
      ) : (
        // Form Lupa Password
        <ForgetPasswordForm onBack={() => setForgotPassword(false)} />
      )}
    </div>
  );
};

export default loginForm;
