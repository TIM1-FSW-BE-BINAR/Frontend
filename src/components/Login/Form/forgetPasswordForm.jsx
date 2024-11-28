import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { sendEmail, verifyEmail } from "../../../service/auth";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "@tanstack/react-router";
import ResetPasswordForm from "./resetPasswordForm";

const ForgetPasswordForm = ({ onBack }) => {
  const navigate = useNavigate();

  const [otpCode, setOtpCode] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);

  const { mutate: sendEmailMutation } = useMutation({
    mutationFn: (request) => {
      return sendEmail(request);
    },
    onSuccess: (result) => {
      if (result?.meta?.statusCode === 200) {
        toast.success("Email berhasil dikirim", {
          style: {
            padding: "16px",
            background: "#73CA5C",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#73CA5C",
          },
        });
        setIsEmailSubmitted(true);
      } else {
        toast.error(result?.error?.message, {
          style: {
            padding: "16px",
            background: "#FF4D4F",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#FF4D4F",
          },
        });
      }
    },
    onError: () => {
      toast.error("Terjadi kesalahan pada server", {
        style: {
          padding: "16px",
          background: "#FF4D4F",
          color: "#FFFFFF",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#FF4D4F",
        },
      });
    },
  });

  // Mutation untuk verifikasi OTP
  const { mutate: verifyEmailMutation } = useMutation({
    mutationFn: (request) => {
      return verifyEmail(request);
    },
    onSuccess: (result) => {
      if (result?.meta?.statusCode === 200) {
        toast.success("Kode OTP berhasil diverifikasi", {
          style: {
            padding: "16px",
            background: "#73CA5C",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#73CA5C",
          },
        });

        setShowResetForm(true);
      } else {
        toast.error(result?.error?.message, {
          style: {
            padding: "16px",
            background: "#FF4D4F",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#FF4D4F",
          },
        });
      }
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat memverifikasi kode OTP", {
        style: {
          padding: "16px",
          background: "#FF4D4F",
          color: "#FFFFFF",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#FF4D4F",
        },
      });
    },
  });

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    sendEmailMutation({ email: forgotEmail });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    verifyEmailMutation({ email: forgotEmail, otp: otpCode });
  };

  if (showResetForm) {
    return <ResetPasswordForm email={forgotEmail} otp={otpCode} onBack={() => setShowResetForm(false)} />;
  }

  return (
    <>
      <IoArrowBack
        onClick={onBack}
        style={{
          cursor: "pointer",
          fontSize: "1.5rem",
          marginBottom: "20px",
        }}
      />
      <h2 className="fw-bold text-start mb-4">Lupa Password</h2>

      <Form onSubmit={isEmailSubmitted ? handleOtpSubmit : handleEmailSubmit}>
        {/* Input Email */}
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Contoh: johndee@gmail.com"
            required
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            style={{
              borderRadius: "15px",
              padding: "1em",
            }}
            disabled={isEmailSubmitted} 
          />
          <Form.Text muted>
            Masukan alamat email untuk me-reset password
          </Form.Text>
        </Form.Group>

        {/* Input OTP */}
        {isEmailSubmitted && (
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Masukkan kode OTP"
              required
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              style={{
                borderRadius: "15px",
                padding: "1em",
              }}
            />
            <Form.Text muted>
              Masukkan kode OTP yang telah dikirimkan ke email Anda
            </Form.Text>
          </Form.Group>
        )}

        {/* Tombol Submit */}
        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3 mb-3"
          disabled={
            (!forgotEmail && !isEmailSubmitted) ||
            (isEmailSubmitted && !otpCode)
          }
          style={{
            backgroundColor: "#7126B5",
            border: "none",
            transition: "opacity 0.3s ease",
            opacity:
              (!forgotEmail && !isEmailSubmitted) ||
              (isEmailSubmitted && !otpCode)
                ? "0.5"
                : "1",
          }}
          onMouseEnter={(e) =>
            (!forgotEmail && !isEmailSubmitted) ||
            (isEmailSubmitted && !otpCode)
              ? null
              : (e.currentTarget.style.opacity = "0.5")
          }
          onMouseLeave={(e) =>
            (!forgotEmail && !isEmailSubmitted) ||
            (isEmailSubmitted && !otpCode)
              ? null
              : (e.currentTarget.style.opacity = "1")
          }
        >
          {isEmailSubmitted ? "Verifikasi OTP" : "Kirim Email"}
        </Button>
      </Form>
    </>
  );
};
export default ForgetPasswordForm;
