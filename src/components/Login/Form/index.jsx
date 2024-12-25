import React, { useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { Button, Form, Spinner } from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import ForgetPasswordForm from "./forgetPasswordForm";
import { login, googleLogin } from "../../../service/auth";
import { setToken } from "../../../redux/slices/auth";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useSpring, animated } from "@react-spring/web";

const loginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<IoEyeOffOutline />);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const disabled = !email || !password;

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (request) => {
      return login(request);
    },
    onSuccess: (result) => {
      if (result) {
        dispatch(setToken(result.data?.token));
        navigate({ to: "/" });
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
          primary: "#fff",
          secondary: "#FF0000",
        },
      });
    },
  });

  const { mutate: googleLoginUser } = useMutation({
    mutationFn: (accessToken) => googleLogin(accessToken),
    onSuccess: (result) => {
      dispatch(setToken(result?.data?.token));
      navigate({ to: "/" });
    },
    onError: (err) => {
      toast.error(err.message || "Google login failed");
    },
  });

  const handleApiError = (errorMessage) => {
    const message = errorMessage?.toLowerCase() || "";

    setErrors({ email: "", password: "" });

    if (message.includes("password") || message.includes("credential")) {
      setErrors((prev) => ({ ...prev, password: errorMessage }));
      passwordRef.current?.focus();
    } else {
      setErrors((prev) => ({ ...prev, email: errorMessage }));
      emailRef.current?.focus();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email harus diisi" }));
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password harus diisi" }));
      passwordRef.current?.focus();
      return;
    }

    loginUser({ email: email.trim(), password });
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleLoginUser(tokenResponse.access_token);
    },
    onError: (err) => {
      toast.error("Google login error");
    },
  });

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleEyeToggle = () => {
    if (type === "password") {
      setType("text");
      setIcon(<IoEyeOutline />);
    } else {
      setType("password");
      setIcon(<IoEyeOffOutline />);
    }
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
  });

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
          <animated.div style={formAnimation}>
            <h2 className="fw-bold text-start mb-4">Login</h2>
            <Form onSubmit={handleLogin} noValidate>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  ref={emailRef}
                  type="email"
                  placeholder="johndee@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                  style={{
                    borderRadius: "15px",
                    padding: "1em",
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div style={{ position: "relative" }}>
                  <Form.Control
                    ref={passwordRef}
                    type={type}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                    style={{
                      borderRadius: "15px",
                      padding: "1em",
                      paddingRight: "40px",
                    }}
                  />
                  <span
                    onClick={handleEyeToggle}
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
                    Forget Password?
                  </Button>
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 "
                disabled={disabled && isPending}
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
                  {isPending ? <Spinner animation="border" size="sm" /> : "Login"}                
              </Button>
            </Form>

            <h6 className="text-muted text-center mt-2"> or continue with </h6>

            <Button
              variant=""
              type="submit"
              className="w-100 mb-3 text-light d-flex align-items-center justify-content-center"
              onClick={handleGoogleLogin}
              style={{
                backgroundColor: "#000000",
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <FcGoogle style={{ marginRight: "8px", fontSize: "20px" }} />
               Google
            </Button>

            <div
              className="text-center"
              style={{
                marginTop: "20px",
              }}
            >
              <p>
                Don't have an account?{" "}
                <Button
                  as={Link}
                  to="/register"
                  className="text-decoration-none bg-transparent border-0 p-0"
                  style={{
                    fontWeight: "bold",
                    color: "#7126B5",
                  }}
                >
                  Register here
                </Button>
              </p>
            </div>
          </animated.div>
        </>
      ) : (
        // Form Lupa Password
        <ForgetPasswordForm onBack={() => setForgotPassword(false)} />
      )}
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
export default loginForm;
