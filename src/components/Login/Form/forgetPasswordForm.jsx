import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
const ForgetPasswordForm = ({ onBack }) => {
  const [forgotEmail, setForgotEmail] = useState("");

  const handleBack = () => {
    onBack();
  };
  const handleSubmit = (event) => {
    event.preventDefault(); 
    // Form submission logic
    loginUser({ email, password });
    console.log("Form submitted!");
  };
  return (
    <>
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
