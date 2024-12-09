import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../service/auth";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";

const ResetPasswordForm = ({ email, otp, onBack }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<IoEyeOffOutline />);
  const [errors, setErrors] = useState({});

  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { mutate: resetPasswordMutation } = useMutation({
    mutationFn: (request) => resetPassword(request),
    onSuccess: (result) => {
      if (result?.meta?.statusCode === 200) {
        toast.success("Reset password berhasil!", {
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
        navigate({ to: "/" });
      } else {
        toast.error(result?.error?.message || "Gagal mengubah password");
      }
    },
    onError: () => {
      toast.error("Terjadi kesalahan saat mengubah password");
    },
  });

  const handleEyeToggle = () => {
    setType(type === "password" ? "text" : "password");
    setIcon(type === "password" ? <IoEyeOutline /> : <IoEyeOffOutline />);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password harus diisi" }));
      passwordRef.current?.focus();
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Password tidak sama",
      }));
      confirmPasswordRef.current?.focus();
      return;
    }

    resetPasswordMutation({
      email,
      otp,
      password,
    });
  };

  return (
    <div>
      <IoArrowBack
        onClick={onBack}
        style={{
          cursor: "pointer",
          fontSize: "1.5rem",
          marginBottom: "20px",
        }}
      />
      <h2 className="fw-bold text-start mb-4">Reset Password</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Password Baru</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              ref={passwordRef}
              type={type}
              placeholder="Masukkan password baru"
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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Konfirmasi Password</Form.Label>
          <div style={{ position: "relative" }}>
            <Form.Control
              ref={confirmPasswordRef}
              type={type}
              placeholder="Konfirmasi password baru"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
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
                top: errors.confirmPassword ? "35%" : "50%",
                right: errors.confirmPassword ? "40px" : "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              {icon}
            </span>
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="w-100 mt-3"
          style={{
            backgroundColor: "#7126B5",
            border: "none",
            transition: "opacity 0.3s ease",
          }}
        >
          Simpan Password Baru
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
