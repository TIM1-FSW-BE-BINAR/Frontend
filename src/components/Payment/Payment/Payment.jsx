import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const PaymentOptions = () => {
  const [snapLoaded, setSnapLoaded] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const navigate = useNavigate();
  const transaction_payment = "66e4fa55-fdac-4ef9-91b5-733b97d1b862" ;
  //   const { transaction_payment } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (!transaction_payment) {
    //         navigate("/");
    //        }
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
      if (snapLoaded && window.snap) {
        window.snap.embed(transaction_payment, {
          embedId: "snap-container",
          onSuccess: function () {
            toast.success("Payment Success!");
            navigate("/payment-success");
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

    if (snapLoaded && !paymentInitiated) {
      handlePay();
      setPaymentInitiated(true);
    }
  }, [snapLoaded, paymentInitiated]);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold text-start mb-4">
                Isi Data Pembayaran
              </Card.Title>
              <div
                id="snap-container"
                className="rounded w-100"
                style={{ height: "70vh"}}
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
        </Col>
        <Col lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="text-secondary text-center">
                Ticket Details
              </Card.Title>
              {/* Tambahkan detail tiket di sini */}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Container>
    
  );
};

export default PaymentOptions;