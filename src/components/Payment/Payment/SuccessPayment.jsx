import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "@tanstack/react-router";
import successPaymentImage from "../../../assets/success_payment.svg";
import { useSpring, animated } from "@react-spring/web";

const SuccessPayment = () => {
  const navigate = useNavigate();

  const handlePublishTicket = () => {
    navigate({ to: "/history" });
  };

  const handleFindOtherFlights = () => {
    navigate({ to: "/" });
  };

  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div style={formAnimation}>
      <Container className="d-flex flex-column align-items-center vh-100">
        <Card
          className="text-center p-4 border-0 mt-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <Card.Img
            variant="top"
            src={successPaymentImage}
            alt="Success Illustration"
            className="mb-3"
          />
          <Card.Body>
            <Card.Title
              className="fw-bold fs-4"
              style={{
                color: "#7126B5",
              }}
            >
              Congratulations!
            </Card.Title>
            <Card.Text className="mb-4">Your Transaction is Success!</Card.Text>
          </Card.Body>
        </Card>
        <div className="d-grid gap-3 w-100 mt-3" style={{ maxWidth: "400px" }}>
          <Button
            style={{
              backgroundColor: "#7126B5",
              transition: "opacity 0.3s ease",
              border: "none",
              marginInline: "1rem",
              paddingBlock: "1rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            size="lg"
            onClick={handlePublishTicket}
          >
            Show Booking History
          </Button>
          <Button
            size="lg"
            style={{
              backgroundColor: "#D0B7E6",
              transition: "opacity 0.3s ease",
              border: "none",
              marginInline: "1rem",
              paddingBlock: "1rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            onClick={handleFindOtherFlights}
          >
            Find other bookings
          </Button>
        </div>
      </Container>
    </animated.div>
  );
};

export default SuccessPayment;
