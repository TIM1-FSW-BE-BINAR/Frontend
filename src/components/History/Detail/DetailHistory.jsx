import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query"; // Tambahkan useMutation
import { Card, Button, Row, Col, Image } from "react-bootstrap";
import { getIdBooking } from "../../../service/booking";
import { tickets } from "../../../service/ticket";
import { useSelector } from "react-redux";
import { VscChromeClose } from "react-icons/vsc";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import toast, { Toaster } from "react-hot-toast";
import "./DetailHistory.css";
import { getIdPayment, cancelPayment } from "../../../service/payment";
import DetailPesananLoading from "../Loading/DetailHistoryLoading";

const DetailHistory = ({ id, paymentId, onBack }) => {
  const { token } = useSelector((state) => state.auth);
  const [booking, setBookingDetail] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState(null);

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["getIdBooking", id],
    queryFn: () => getIdBooking(id),
    enabled: !!id && !!token,
  });

  const { dataPay, isSuccessPay, isLoadingPay } = useQuery({
    queryKey: ["getIdPayment", paymentId],
    queryFn: () => getIdPayment(paymentId),
    enabled: !!token && !!paymentId,
  });

  const mutation = useMutation({
    mutationFn: (request) => tickets(id, request),
    onSuccess: (result) => {
      console.log("result:", result);
      if (result?.data?.[0]?.qrCodeImage) {
        setQrCodeImage(result.qrCodeImage);
        toast.success("Ticket printed successfully!", {
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
        console.log("Print ticket result:", result);
        setTimeout(() => {
          window.location.reload();
        }, 750);
      } else {
        toast.error("Flight ticket data not found or payment not yet paid", {
          style: {
            padding: "16px",
            background: "#FF0000",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#FF0000",
          },
        });
        console.error("QR code validation failed:", result);
      }
    },
    onError: (err) => {
      toast.error("Failed to print ticket. Please try again.", {
        style: {
          padding: "16px",
          background: "#FF0000",
          color: "#FFFFFF",
        },
        iconTheme: {
          primary: "#FFFFFF",
          secondary: "#FF0000",
        },
      });

      if (err.response && err.response.data) {
        console.error("Print ticket error:", {
          message: err.response.data.message || "Unknown error message",
          statusCode: err.response.status || "Unknown status code",
          data: err.response.data || {},
        });
      } else {
        console.error("Print ticket error:", err.message || "Unknown error");
      }
    },
  });

  const cancelPaymentMutation = useMutation({
    mutationFn: (orderId) => cancelPayment(orderId),
    onSuccess: (result) => {
      toast.success("Payment successfully canceled!");
      console.log("Cancel payment result:", result);

      onBack();
    },
    onError: (err) => {
      toast.error("Failed to cancel payment. Please try again.");
      console.error("Cancel payment error:", err);
    },
  });

  const handleCancelPayment = () => {
    if (!paymentId) {
      toast.error("Payment ID not found.");
      return;
    }
    cancelPaymentMutation.mutate(paymentId);
  };

  const groupedPassengers = booking?.bookingDetail?.reduce((acc, detail) => {
    const type = detail.passenger?.type || "UNKNOWN";
    if (!acc[type]) {
      acc[type] = { count: 0, totalPrice: 0 };
    }
    acc[type].count += 1;
    acc[type].totalPrice += detail.price || 0;
    return acc;
  }, {});

  useEffect(() => {
    if (isSuccess) {
      console.log("Booking details fetched successfully:", data);
      setBookingDetail(data);
    }

    if (isError) {
      console.error("Error fetching booking details:", error);
    }
  }, [isSuccess, data, isError, error]);

  const handlePrintTicket = () => {
    if (!booking?.id) {
      toast.error("Booking ID is missing. Cannot print ticket.");
      return;
    }

    mutation.mutate({ bookingId: booking.id });
  };

  const handleDownloadQRCode = () => {
    const qrImageURL = booking?.bookingDetail[0]?.qrCodeImage;
    if (!qrImageURL) return;

    const link = document.createElement("a");
    link.href = qrImageURL;
    link.download = "QR_Code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("QR Code downloaded successfully!", {
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
  };

  if (isLoading) return <DetailPesananLoading />;
  if (isError) return <p>Error fetching details: {error.message}</p>;

  return (
    <>
      <Card
        className="shadow-sm rounded border-1 mt-5 custom-card customized-style"
        style={{
          width: "25rem",
          height: "65rem",
          left: "0",
          background: "#FFFFFF",
        }}
      >
        <Button
          variant="none"
          className="back-button text-start"
          style={{ display: "none", backgroundColor: "transparent" }}
          onClick={onBack}
        >
          <VscChromeClose size={25} style={{ color: "black" }} />
        </Button>
        <Card.Body>
          {/* Status Pesanan */}
          <div className="d-flex justify-content-between align-items-center mb-3 custom-status">
            <h6 className="fw-bold custom-h6">Booking Detail</h6>
            <span
              className="px-3 py-1 text-white "
              style={{
                backgroundColor: "#73CA5C",
                borderRadius: "10px",
                fontSize: "12px",
              }}
            >
              {booking?.status}
            </span>
          </div>

          {/* Booking Code */}
          <div className="d-flex align-items-center mb-3">
            <span className="fw-bold me-2">Booking Code:</span>
            <span style={{ color: "#7126B5", fontWeight: "bold" }}>
              {booking?.code || "N/A"}
            </span>
          </div>

          {/* Keberangkatan */}
          <div className="mb-3 d-flex align-items-start justify-content-between">
            <div>
              <p className="m-0 fw-bold">
                {booking?.flight?.departureTime
                  ? format(new Date(booking.flight.departureTime), "HH:mm", {
                      locale: enUS,
                    })
                  : "N/A"}
              </p>
              <p className="m-0">
                {booking?.flight?.departureTime
                  ? format(
                      new Date(booking.flight.departureTime),
                      "dd MMMM yyyy",
                      {
                        locale: enUS,
                      }
                    )
                  : "N/A"}
              </p>
              <p className="m-0">
                {booking?.flight?.departure?.name || "Departure Airport N/A"}
              </p>
            </div>
            <span className="fw-bold" style={{ color: "#A06ECE" }}>
              Departure
            </span>
          </div>
          <hr />

          <div className="mb-3 d-flex align-items-center">
            {/* Logo Maskapai */}
            <img
              className="me-4"
              src="img/airlane_logo1.svg"
              alt="Airlane Logo"
              style={{ width: "40px", height: "40px" }}
            />

            <div>
              {/* Detail Maskapai */}
              <h6 className="fw-bolder m-0 custom-flight">
                {booking?.flight?.airline?.name || "Airline not available"} -{" "}
                {booking?.flight?.class || "N/A"}
              </h6>
              <p className="m-0 fw-bold">
                {booking?.flight?.flightNumber || "Flight Number N/A"}
              </p>
              {/* Informasi Penumpang */}
              <div className="mt-4">
                <h6 className="fw-bolder mb-0 custom-flight-info">
                  Information:
                </h6>
                {booking?.bookingDetail?.map((detail, index) => (
                  <div key={detail.id}>
                    <p
                      className="m-0"
                      style={{ color: "#4B1979", fontWeight: "500" }}
                    >
                      {`Penumpang ${index + 1}: ${detail.passenger?.name} ${detail.passenger?.familyName} `}
                    </p>
                    <p className="m-0">{`ID: ${detail.passenger?.identityNumber || "N/A"}`}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <hr />

          {/* Kedatangan */}
          <div className="mb-3 d-flex align-items-start justify-content-between">
            <div>
              <p className="m-0 fw-bold">
                {booking?.flight?.arrivalTime
                  ? format(new Date(booking.flight.arrivalTime), "HH:mm", {
                      locale: enUS,
                    })
                  : "N/A"}
              </p>
              <p className="m-0">
                {booking?.flight?.arrivalTime
                  ? format(
                      new Date(booking.flight.arrivalTime),
                      "dd MMMM yyyy",
                      {
                        locale: enUS,
                      }
                    )
                  : "N/A"}
              </p>
              <p className="m-0">
                {booking?.flight?.arrival?.name || "Arrival Airport N/A"}
              </p>
            </div>

            <span className="fw-bold" style={{ color: "#A06ECE" }}>
              Arrival
            </span>
          </div>
          <hr />

          {/* Rincian Harga */}
          <div className="mb-3">
            <h6 className="fw-bold custom-payment">Payment Detail:</h6>
            <div>
              {groupedPassengers &&
                Object.entries(groupedPassengers).map(([type, data]) => (
                  <Row key={type}>
                    <Col xs={8}>
                      <p className="m-0">{`${data.count} ${type}`}</p>
                    </Col>
                    <Col xs={4} className="text-end">
                      <p className="m-0">{`IDR ${data.totalPrice.toLocaleString("id-ID")}`}</p>
                    </Col>
                  </Row>
                ))}
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <p>Total</p>
              <p>
                {booking?.totalPrice
                  ? `IDR ${booking.totalPrice.toLocaleString("id-ID")}`
                  : "Price not available"}
              </p>
            </div>
          </div>

          {/* Tombol Cetak Tiket */}
          {!booking?.bookingDetail[0]?.qrCodeImage && (
            <>
              <Button
                style={{
                  backgroundColor: "#4B1979",
                  border: "none",
                  borderRadius: "10px",
                  width: "100%",
                }}
                className="mb-2 print-button"
                onClick={handlePrintTicket}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Printing..." : "Print Ticket"}
              </Button>

              {/* <Button
                style={{
                  backgroundColor: "#FF0000",
                  border: "none",
                  borderRadius: "10px",
                  width: "100%",
                }}
                className="cancel-button"
                onClick={handleCancelPayment}
                disabled={cancelPaymentMutation.isLoading}
              >
                {cancelPaymentMutation.isLoading
                  ? "Canceling..."
                  : "Cancel Payment"}
              </Button> */}
            </>
          )}

          {booking?.bookingDetail[0]?.qrCodeImage && (
            <div className="mt-3 text-center">
              <Button
                variant="none"
                className="mb-3 text-white rounded-pill "
                style={{
                  backgroundColor: "#4B1979",
                  height: "3rem",
                }}
                onClick={handleDownloadQRCode}
              >
                Download QR Ticket
              </Button>
              <h6>Scan QR Ticket:</h6>
              <Image
                src={booking?.bookingDetail[0]?.qrCodeImage}
                alt="QR Code"
                className="img-fluid"
                style={{ maxWidth: "200px" }}
              />
            </div>
          )}
        </Card.Body>
      </Card>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default DetailHistory;
