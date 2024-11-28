import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { sendEmail } from "../../../service/auth";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "@tanstack/react-router";

const ForgetPasswordForm = ({ onBack }) => {
  const [forgotEmail, setForgotEmail] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    onBack();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = { email: forgotEmail };
      const result = await sendEmail(request);

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
    } catch (error) {
      console.error("Error:", error);
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
    }
  };

  return (
    <>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <IoArrowBack
        onClick={handleBack}
        style={{
          cursor: "pointer",
          fontSize: "1.5rem",
          marginBottom: "20px",
        }}
      />
      <h2 className="fw-bold text-start mb-4">Lupa Password</h2>

      <Form onSubmit={handleSubmit}>
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
          />
          <Form.Text muted>
            Masukan alamat email untuk me-reset password
          </Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3 mb-3"
          disabled={!forgotEmail}
          style={{
            backgroundColor: "#7126B5",
            border: "none",
            transition: "opacity 0.3s ease",
            opacity: !forgotEmail ? "0.5" : "1",
          }}
          onMouseEnter={(e) =>
            !forgotEmail ? null : (e.currentTarget.style.opacity = "0.5")
          }
          onMouseLeave={(e) =>
            !forgotEmail ? null : (e.currentTarget.style.opacity = "1")
          }
        >
          Kirim
        </Button>
      </Form>
    </>
  );
};
export default ForgetPasswordForm;
