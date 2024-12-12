import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import DetailPesanan from "./DetailPesanan";
import { useMutation } from "@tanstack/react-query";
import { createSnap } from "../../../service/payment/snap";

const PaymentOptions = (bookingId) => {
  const [snapLoaded, setSnapLoaded] = useState(false);
  const [snapToken, setSnapToken] = useState("");
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const navigate = useNavigate();

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
      if (snapLoaded && window.snap && snapToken) {
        window.snap.embed(snapToken, {
          embedId: "snap-container",
          onSuccess: function () {
            toast.success("Payment Success!");
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

  const { mutate: snapCreate } = useMutation({
    mutationFn: (request) => {
      return createSnap(request);
    },
    onSuccess: (result) => {
      if (result?.data) {
        const snaptoken = result?.data?.snapToken?.snapToken;
        setSnapToken(snaptoken);
        console.log("P berhasil", snaptoken);
      } else {
        handleApiError(result.message);
      }
    },
    onError: (err) => {
      handleApiError(err.message);
      toast.error(err?.message, {
        style: {
          padding: "16px",
          background: "#FF0000",
          color: "#FFFFFF",
        },
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
      });
    },
  });

  useEffect(() => {
    const request = {
      bookingId: 27, //janlupa di set booking id!!!!
    };
    snapCreate(request);
  }, [snapCreate]);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col lg={7}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <Card.Title className="fw-bold text-start mb-4">
                Complete Payment
              </Card.Title>
              <div
                id="snap-container"
                className="rounded w-100"
                style={{ height: "100%", maxHeight: "70vh" }}
                xs={12}
                md={12}
                lg={12}
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
          <Card className="shadow-sm ">
            <Card.Body>
              <Card.Title className="text-secondary text-center">
                Ticket Details
              </Card.Title>
              {/* Tambahkan detail tiket di sini */}
              <DetailPesanan bookingId={bookingId} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Container>
  );
};

export default PaymentOptions;
