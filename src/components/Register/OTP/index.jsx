import React, { useState, useEffect } from "react";
import { Container, Row, Spinner, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "@tanstack/react-router";
import OtpInput from "react-otp-input";
import { IoArrowBack } from "react-icons/io5";
import { resendOtp, verifyEmail } from "../../../service/auth";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const OTPForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(countdown);
  }, [timer]);

  const { mutate: verifyRegister, isPending } = useMutation({
    mutationFn: (request) => {
      return verifyEmail(request);
    },
    onSuccess: (result) => {
      if (result?.meta) {
        // dispatch(setToken(result?.data?.token));
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
        navigate({ to: "/login" });
      } else {
        toast.error(result?.error?.message, {
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

  const { mutate: resendingOtp } = useMutation({
    mutationFn: (request) => {
      return resendOtp(request);
    },
    onSuccess: (result) => {
      if (result?.meta) {
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

  const maskEmail = (email) => {
    if (!email) return "";
    const [username, domain] = email.split("@");
    const maskedUsername = username.charAt(0) + "*".repeat(username.length - 1);
    return `${maskedUsername}@${domain}`;
  };

  const handleResendOtp = (e) => {
    e.preventDefault();
    setTimer(60);
    const request = {
      email,
    };
    resendingOtp(request);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = {
      email: email,
      otp,
    };

    verifyRegister(request);
  };

  const handleBack = () => {
    navigate({ to: "/register" });
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <div className="d-flex justify-content-start w-100 mb-4">
        <IoArrowBack
          onClick={handleBack}
          style={{
            cursor: "pointer",
            fontSize: "1.5rem",
            marginRight: "20px",
          }}
        />
        <h2 className="fw-bold text-end">Confirm OTP</h2>
      </div>
      <p className="text-muted m-4">
        We have sent the authentication code to <b>{maskEmail(email)}</b>
      </p>
      <Form onSubmit={handleSubmit} className="w-100 justify-content-center">
        <Row className="justify-content-center m-4">
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
              borderColor: "#D0D0D0",
            }}
            renderInput={(props) => <input {...props} />}
          />
        </Row>
        <Row className="justify-content-center text-center mt-4">
          {timer > 0 ? (
            <p className="text-muted mt-4">
              OTP code will be resended in {timer} seconds
            </p>
          ) : (
            <p
              className="mt-4 animated-button"
              style={{ color: "red", fontWeight: "bold", cursor: "pointer" }}
              onClick={handleResendOtp}
            >
              Haven't received it? Resend Code
            </p>
          )}
        </Row>
        <Row className="justify-content-center mt-4">
          <Button
            variant="primary"
            type="submit"
            className="w-50 mb-4 mt-4 animated-button"
            style={{
              backgroundColor: "#7126B5",
              border: "none",
              transition: "opacity 0.3s ease",
              padding: "15px",
              borderRadius: "14px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            disabled={isPending}
          >
            {isPending ? <Spinner animation="border" size="sm" /> : "Verify"}            
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default OTPForm;
