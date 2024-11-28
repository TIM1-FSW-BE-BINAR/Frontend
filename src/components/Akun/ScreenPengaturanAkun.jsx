import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Container, Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5";
import { setToken } from "../../redux/slices/auth";

const ScreenPengaturanAkun = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<IoEyeOffOutline />);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    setValidated(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Reset error and perform save action
    setError("");
    alert("Password updated successfully!");
  };
  return (
    <Container
      className="d-flex flex-column py-2"
      style={{ marginLeft: "-5rem" }}
    >
      <Card style={{ width: "35rem" }}>
        <Card.Header className="text-white" style={{ background: "#A06ECE" }}>
          <h5 className="mb-0">Ganti Password</h5>
        </Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSave}>
            <Form.Group
              controlId="formNewPassword"
              className="mb-3"
              style={{ position: "relative" }}
            >
              <Form.Label>New Password</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={type}
                  placeholder="********"
                  required
                  style={{
                    borderRadius: "15px",
                    paddingRight: "2.5rem", // Memberi ruang untuk ikon
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
                    color: "#6c757d", // Warna default
                    zIndex: 10, // Pastikan di atas input
                  }}
                >
                  {icon}
                </span>
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <div style={{ position: "relative" }}>
                <Form.Control
                  type={type}
                  placeholder="********"
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
              size="lg"
              className="d-flex justify-content-center mx-auto w-25"
              style={{ background: "#4B1979" }}
              variant="none text-white"
            >
              Simpan
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card style={{ width: "35rem", marginTop: "3rem" }}>
        <Card.Header className="text-white" style={{ background: "#A06ECE" }}>
          <h5 className="mb-0">Hapus Akun</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-gray-600 mb-4">
            This action cannot be undone. Please continue with caution
          </p>
          <Button
            size="lg"
            className=" d-flex justify-content-center mx-auto w-25"
            variant="danger"
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScreenPengaturanAkun;
