import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../../service/auth";
import { useNavigate } from "@tanstack/react-router";
import toast from "react-hot-toast";
import { useSpring, animated } from "@react-spring/web";

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
        toast.success("Password reset Successfully!", {
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
        window.location.reload();
      } else {
        toast.error(result?.error?.message || "Failed changing password!");
      }
    },
    onError: () => {
      toast.error("Error occured when changing password!");
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
      setErrors((prev) => ({ ...prev, password: "Password must filled" }));
      passwordRef.current?.focus();
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Password is not same",
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

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div style={formAnimation}>
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
            <Form.Label>New Password</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                ref={passwordRef}
                type={type}
                placeholder="Enter new password"
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
            <Form.Label>Confirm Password</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                ref={confirmPasswordRef}
                type={type}
                placeholder="Confirm new password"
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
            Save
          </Button>
        </Form>
      </div>
    </animated.div>
  );
};

export default ResetPasswordForm;
