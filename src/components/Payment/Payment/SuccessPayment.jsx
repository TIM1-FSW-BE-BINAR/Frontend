import React from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useNavigate } from "@tanstack/react-router";
import successPaymentImage from "/img/success_payment.svg";

const SuccessPayment = () => {
  const navigate = useNavigate();

  const handlePublishTicket = () => {
    navigate({ to: "/history" });
  };

  const handleFindOtherFlights = () => {
    navigate({ to: "/" });
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Card
        className="text-center p-4 border-0"
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
            Selamat!
          </Card.Title>
          <Card.Text className="mb-4">
            Transaksi Pembayaran Tiket sukses!
          </Card.Text>
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
          Terbitkan Tiket
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
          Cari Penerbangan Lain
        </Button>
      </div>
    </Container>
  );
};

export default SuccessPayment;
