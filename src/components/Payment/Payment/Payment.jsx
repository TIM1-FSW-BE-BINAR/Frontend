import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import toast, { Toaster } from "react-hot-toast";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import DetailPesanan from "./DetailPesanan";

const PaymentOptions = () => {
  const [snapLoaded, setSnapLoaded] = useState(false);
  const [snapToken, setSnapToken] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setSnapToken(queryParams.get("snapToken") || "");
    setAmount(queryParams.get("amount") || "");

    const storedBookingId = localStorage.getItem("bookingId");
    if (storedBookingId) {
      setBookingId(storedBookingId);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-sWHHfn6Rjgzxjvrc");
    script.async = true;

    script.onload = () => {
      toast.success("Payment successfully created");
      setSnapLoaded(true);
    };

    script.onerror = () => {
      toast.error("Payment failed to create");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const handlePay = () => {
      if (snapLoaded && window.snap && snapToken) {
        window.snap.embed(snapToken, {
          embedId: "snap-container",
          onSuccess: function () {
            toast.success("Payment Success!", {
              duration: 4000,
            });
            const timer = setTimeout(() => {
              navigate({ to: "/complete" });
            }, 3000);
            return () => clearTimeout(timer);
          },
          onPending: function () {
            toast("Waiting for your payment", { icon: "⏳" });
          },
          onError: function () {
            toast.error("Payment failed!");
          },
          onClose: function () {
            toast.error("You closed the popup without finishing the payment");
          },
        });
      } else {
        toast.error("Payment script not loaded yet, please try again later.");
      }
    };

    if (snapLoaded && !paymentInitiated && snapToken) {
      handlePay();
      setPaymentInitiated(true);
    }
  }, [snapLoaded, snapToken, paymentInitiated]);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={7}>
          <Card
            className="shadow-sm mb-4"
            style={{
              maxWidth: "100%",
              height: "auto",
              maxHeight: "90%",
              overflow: "hidden",
            }}
          >
            <Card.Body style={{ overflow: "auto" }}>
              {" "}
              <Card.Title className="fw-bold text-start mb-4">
                Complete Payment
              </Card.Title>
              <div
                id="snap-container"
                className="rounded w-100"
                style={{
                  minHeight: "50px",
                  maxHeight: "100%",
                }}
              >
                {!snapLoaded && (
                  <div className="text-center mt-4">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading payment options...</p>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
          <Button
            type="submit"
            className="btn btn-block w-100 mt-2 mx-0 animated-button"
            style={{ backgroundColor: "#7126b5", border: "none" }}
            as="a"
            href="https://simulator.sandbox.midtrans.com/v2/qris/index"
            target="_blank"
            rel="noopener noreferrer"
          >
            Midtrans Sandbox Simulator
          </Button>
        </Col>
        <Col lg={5}>
          <Card className="shadow-sm ">
            <Card.Body>
              <Card.Title className="text-secondary text-center">
                Ticket Details
              </Card.Title>
              {/* detail tiket */}
              <DetailPesanan bookingId={bookingId} amount={amount} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
};

export default PaymentOptions;
