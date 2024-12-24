import React, { useEffect, useState, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, Button, Row, Col, Image, Accordion } from "react-bootstrap";
import { getIdBooking } from "../../../service/booking";
import { tickets } from "../../../service/ticket";
import { useSelector } from "react-redux";
import { VscChromeClose } from "react-icons/vsc";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import toast, { Toaster } from "react-hot-toast";
import "./DetailHistory.css";
import {
  getIdPayment,
  cancelPayment,
  getAllPaymentPagination,
} from "../../../service/payment";
import DetailPesananLoading from "../Loading/DetailHistoryLoading";
import { useNavigate } from "@tanstack/react-router";
import { createSnap } from "../../../service/payment/snap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

const DetailHistory = ({ id, onBack }) => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [booking, setBookingDetail] = useState(null);
  const [qrCodeImage, setQrCodeImage] = useState(null);
  const [matchedPayment, setMatchedPayment] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["getIdBooking", id],
    queryFn: () => getIdBooking(id),
    enabled: !!id && !!token,
  });

  const { data: paymentData } = useQuery({
    queryKey: ["payment"],
    queryFn: getAllPaymentPagination,
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: (request) => tickets(id, request),
    onSuccess: (result) => {
      if (result?.data?.[0]?.qrCodeImage) {
        setQrCodeImage(result.qrCodeImage);
        toast.success(
          "Ticket printed successfully! Please wait a second for auto refresh",
          {
            style: {
              padding: "16px",
              background: "#73CA5C",
              color: "#FFFFFF",
            },
            iconTheme: {
              primary: "#FFFFFF",
              secondary: "#73CA5C",
            },
          }
        );

        setTimeout(() => {
          window.location.reload();
        }, 1500);
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

  const cancelMutation = useMutation({
    mutationFn: (orderId) => cancelPayment(orderId),
    onSuccess: () => {
      toast.success(
        "Payment canceled successfully! Please wait a second for auto refresh",
        {
          style: {
            padding: "16px",
            background: "#73CA5C",
            color: "#FFFFFF",
          },
          iconTheme: {
            primary: "#FFFFFF",
            secondary: "#73CA5C",
          },
        }
      );

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
    onError: (err) => {
      toast.error("Failed to cancel payment. Please try again.", {
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

      console.error("Cancel payment error:", err.message || "Unknown error");
    },
  });

  const handlePaymentNavigation = () => {
    if (matchedPayment?.status === "pending" || !matchedPayment) {
      const snapToken = matchedPayment?.snapToken;
      const amount = matchedPayment?.amount;

      if (snapToken && amount) {
        navigate({
          to: `/payment?snapToken=${snapToken}&amount=${amount}`,
        });
      } else {
        toast.error("Payment data is incomplete or missing.");
      }
    }
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
      setBookingDetail(data);
    }

    if (isError) {
      console.error("Error fetching booking details:", error);
    }
  }, [isSuccess, data, isError, error]);

  useEffect(() => {
    if (paymentData && paymentData.length > 0) {
      for (let matchedPayment of paymentData) {
        if (matchedPayment?.bookingId === data?.id) {
          setMatchedPayment(matchedPayment);
          break;
        }
      }
    }
  }, [paymentData, data]);

  const handleCancelPayment = () => {
    if (matchedPayment?.orderId) {
      setOverlayVisible(true);

      toast(
        (t) => (
          <div className="text-center cancel-toast">
            <p>Are you sure you want to cancel the payment?</p>
            <div>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setOverlayVisible(false);
                  cancelMutation.mutate(matchedPayment?.orderId);
                }}
                className="btn btn-danger me-2"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  setOverlayVisible(false);
                }}
                className="btn btn-secondary"
              >
                No
              </button>
            </div>
          </div>
        ),
        {
          duration: Infinity,
          position: "top-center",
        }
      );
    } else {
      toast.error("Payment ID is missing. Cannot cancel payment.");
    }
  };

  const handleOverlayClick = () => {
    setOverlayVisible(false);
    toast.dismiss();
  };

  const handlePrintTicket = () => {
    if (!booking?.id) {
      toast.error("Booking ID is missing. Cannot print ticket.");
      return;
    }

    mutation.mutate({ bookingId: booking.id });
  };

  const handleDownloadTicket = async () => {
    const cardElement = document.querySelector(".card-detail-history");

    if (!cardElement) {
      toast.error("Card element not found. Cannot generate PDF.");
      return;
    }

    try {
      cardElement.scrollTop = 0;

      await new Promise((resolve) => setTimeout(resolve, 100));

      const buttons = document.querySelectorAll(".custom-btn2, .custom-btn3");
      buttons.forEach((button) => (button.style.display = "none"));

      const canvas = await html2canvas(cardElement, {
        scrollX: 0,
        scrollY: 0,
        scale: 2,
      });

      buttons.forEach((button) => (button.style.display = ""));

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 100;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const positionX = (pageWidth - imgWidth) / 2;
      let positionY = (pageHeight - imgHeight) / 2;

      if (imgHeight <= pageHeight) {
        pdf.addImage(
          imgData,
          "PNG",

          positionX,
          positionY,
          imgWidth,
          imgHeight
        );
      } else {
        let remainingHeight = canvas.height;
        let pageOffset = 0;

        while (remainingHeight > 0) {
          const clipHeight = Math.min(
            pageHeight * (canvas.width / imgWidth),
            remainingHeight
          );
          const croppedCanvas = document.createElement("canvas");
          croppedCanvas.width = canvas.width;
          croppedCanvas.height = clipHeight;

          const croppedContext = croppedCanvas.getContext("2d");
          croppedContext.drawImage(
            canvas,
            0,
            pageOffset,
            canvas.width,
            clipHeight,
            0,
            0,
            croppedCanvas.width,
            croppedCanvas.height
          );

          const croppedImgData = croppedCanvas.toDataURL("image/png");
          pdf.addImage(
            croppedImgData,
            "PNG",
            positionX,
            10,
            imgWidth,
            (clipHeight * imgWidth) / canvas.width
          );

          remainingHeight -= clipHeight;
          pageOffset += clipHeight;

          if (remainingHeight > 0) {
            pdf.addPage();
          }
        }
      }

      pdf.save("TicketDetail.pdf");

      toast.success("Ticket downloaded as PDF successfully!", {
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
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to download ticket as PDF. Please try again.", {
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
    }
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
  if (isError || !booking)
    return <p>Error fetching details: {error?.message || "Unknown error"}</p>;

  return (
    <>
      <Card
        className="shadow-sm rounded border-1 mt-5 card-detail-history customized-style"
        style={{
          width: "27rem",
          height: "65rem",
          position: "sticky",
          top: "20px",
          background: "#FFFFFF",
          overflowY: "auto",
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
        <Card.Body
          style={{
            maxHeight: "100%",
            overflowY: "auto",
          }}
        >
          <div style={{ height: "80rem" }}>
            {" "}
            {/* Status Pesanan */}
            <div className="d-flex justify-content-between align-items-center mb-3 custom-status">
              <h6 className="fw-bold custom-h6">Booking Detail</h6>
              <span
                className="px-3 py-1 text-white"
                style={{
                  backgroundColor:
                    matchedPayment?.status === "pending"
                      ? "#8A8A8A"
                      : matchedPayment?.status === "settlement"
                        ? "#73CA5C"
                        : matchedPayment?.status === "expire"
                          ? "#8A8A8A"
                          : matchedPayment?.status === "cancel"
                            ? "#FF0000"
                            : "#FF0000",
                  borderRadius: "10px",
                  fontSize: "12px",
                }}
              >
                {matchedPayment?.status === "pending"
                  ? "UNPAID"
                  : matchedPayment?.status === "settlement"
                    ? "PAID"
                    : matchedPayment?.status === "expire"
                      ? "EXPIRED"
                      : matchedPayment?.status === "cancel"
                        ? "CANCELED"
                        : "UNPAID"}
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
                src={
                  booking?.flight?.airline?.imageUrl ||
                  "imageUrl Airline not available"
                }
                alt={
                  booking?.flight?.airline?.imageId ||
                  "imageId Airline not available"
                }
                style={{ width: "40px", height: "40px" }}
              />

              <div>
                {/* Detail Maskapai */}
                <h6 className="fw-bolder m-0 custom-flight">
                  {booking?.flight?.airline?.name || "Airline not available"} -{" "}
                  {booking.flight?.class
                    ? booking.flight.class.replace(/_/g, " ")
                    : "Class not available"}
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
                      <Col xs={8}>
                        <p className="m-0">Tax</p>
                      </Col>
                      <Col xs={4} className="text-end">
                        <p className="m-0">
                          {`IDR ${(booking?.totalPrice + booking?.totalPrice * 0.03 - booking?.totalPrice).toLocaleString("id-ID")}`}
                        </p>
                      </Col>
                    </Row>
                  ))}
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <p>Total</p>
                <p>
                  {matchedPayment?.amount
                    ? `IDR ${matchedPayment.amount.toLocaleString("id-ID")}`
                    : "Price not available"}
                </p>
              </div>
            </div>
            {/* Tombol Lanjut Bayar atau Print Ticket */}
            <div className="mt-3 d-flex justify-content-center align-items-center flex-column">
              <Button
                variant="none"
                className="mt-2 text-white rounded-pill custom-btn1"
                style={{
                  width: "15rem",
                  height: "3rem",
                  backgroundColor:
                    matchedPayment?.status === "cancel" ||
                    matchedPayment?.status === "expire" ||
                    booking?.bookingDetail[0]?.qrCodeImage
                      ? "transparent"
                      : matchedPayment?.status === "pending" || !matchedPayment
                        ? "#73CA5C"
                        : "#4B1979",

                  display:
                    matchedPayment?.status === "cancel" ||
                    matchedPayment?.status === "expire" ||
                    booking?.bookingDetail[0]?.qrCodeImage
                      ? "none"
                      : "block",
                }}
                onClick={() => {
                  if (matchedPayment?.status === "pending" || !matchedPayment) {
                    handlePaymentNavigation();
                  } else if (
                    matchedPayment?.status !== "cancel" &&
                    matchedPayment?.status !== "expire" &&
                    !booking?.bookingDetail[0]?.qrCodeImage
                  ) {
                    handlePrintTicket();
                  }
                }}
                disabled={
                  matchedPayment?.status === "cancel" ||
                  matchedPayment?.status === "expire" ||
                  booking?.bookingDetail[0]?.qrCodeImage ||
                  mutation?.isLoading
                }
              >
                {matchedPayment?.status === "pending" || !matchedPayment
                  ? "Continue Payment"
                  : !booking?.bookingDetail[0]?.qrCodeImage
                    ? mutation.isLoading
                      ? "Printing..."
                      : "Print Ticket"
                    : ""}
              </Button>
            </div>
            {isOverlayVisible && (
              <div className="overlay" onClick={handleOverlayClick}></div>
            )}
            {/* Tombol Cancel Payment */}
            {matchedPayment?.status === "pending" && (
              <div className="mt-2 text-center">
                <Button
                  variant="none"
                  className="mb-3 text-white rounded-pill custom-btn2"
                  style={{
                    width: "15rem",
                    height: "3rem",
                    backgroundColor: "#FF0000",
                  }}
                  onClick={handleCancelPayment}
                >
                  Cancel Payment
                </Button>
              </div>
            )}
            {/* tombol download */}
            {booking?.bookingDetail[0]?.qrCodeImage && (
              <div className="mt-3 text-center">
                <Button
                  variant="none"
                  className="mb-3 me-2 rounded-pill custom-btn2"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#4B1979",
                    borderColor: "#4B1979",
                    height: "3rem",
                    width: "10rem",
                  }}
                  onClick={handleDownloadQRCode}
                >
                  Download QR
                </Button>
                <Button
                  variant="none"
                  className="mb-3 text-white rounded-pill custom-btn3"
                  style={{
                    backgroundColor: "#4B1979",
                    height: "3rem",
                    width: "10rem",
                  }}
                  onClick={handleDownloadTicket}
                >
                  Print Ticket
                </Button>

                <h6 className="custom-h6-qr">Scan QR Ticket:</h6>
                <Image
                  src={booking?.bookingDetail[0]?.qrCodeImage}
                  alt="QR Code"
                  className="img-fluid qr-ticket"
                  style={{ maxWidth: "200px" }}
                />
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default DetailHistory;
