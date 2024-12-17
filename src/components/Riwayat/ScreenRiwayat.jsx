import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAllBookings } from "../../service/booking";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import { isWithinInterval, parseISO } from "date-fns";
import { useRiwayatContext } from "./RiwayatContext";
import DetailPesanan from "./Detail/DetailPesanan";
import "./ScreenRiwayat.css";
import arrowRight from "/src/assets/arrow-right.png";

import { getIdPayment } from "../../service/payment";
import ScreenRiwayatLoading from "./Loading/ScreenRiwayatLoading";

const ScreenRiwayat = (paymentId) => {
  const { token } = useSelector((state) => state.auth);
  const { filterDate, searchQuery } = useRiwayatContext();
  const [groupedBookings, setGroupedBookings] = useState([]);
  const [durations, setDurations] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [showDetailPrompt, setShowDetailPrompt] = useState(true);

  // Track screen width
  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 426px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 426px)");

    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAllbookings"],
    queryFn: getAllBookings,
    enabled: !!token,
  });

  const { dataPay, isSuccessPay, isLoadingPay } = useQuery({
    queryKey: ["getIdPayment", paymentId],
    queryFn: getIdPayment,
    enabled: !!token && !!paymentId,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      let filteredData = data;

      // Filter data by filterDate range if provided
      if (filterDate && filterDate[0] && filterDate[1]) {
        filteredData = filteredData.filter((booking) => {
          const bookingDate = parseISO(booking.bookingDate); // Pastikan tanggal diparsing
          return isWithinInterval(bookingDate, {
            start: filterDate[0],
            end: filterDate[1],
          });
        });
      }

      // Filter data by searchQuery if provided
      if (searchQuery) {
        const lowerSearchQuery = searchQuery.toLowerCase();
        filteredData = filteredData.filter((booking) => {
          const bookingCode = booking.code.toLowerCase();
          const departure =
            booking.flight?.departure?.name?.toLowerCase() || "";
          const arrival = booking.flight?.arrival?.name?.toLowerCase() || "";
          const classes = booking.flight?.class.toLowerCase() || "";
          return (
            bookingCode.includes(lowerSearchQuery) ||
            departure.includes(lowerSearchQuery) ||
            arrival.includes(lowerSearchQuery) ||
            classes.includes(lowerSearchQuery)
          );
        });
      }

      // Sort data by latest bookingDate
      const sortedData = filteredData.sort(
        (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
      );

      // Group data by month and year
      const grouped = sortedData.reduce((acc, booking) => {
        const bookingDate = new Date(booking.bookingDate);
        const formattedDate = format(bookingDate, "MMMM yyyy");

        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(booking);

        return acc;
      }, {});

      setGroupedBookings(Object.entries(grouped));
      setShowDetailPrompt(false); // Hide the prompt if bookings exist
    } else {
      setShowDetailPrompt(false); // Hide the prompt if no bookings exist
    }
  }, [data, filterDate, searchQuery]);

  useEffect(() => {
    if (data) {
      const calculatedDurations = data.reduce((acc, booking) => {
        if (booking.flight?.departureTime && booking.flight?.arrivalTime) {
          const departureTime = new Date(booking.flight.departureTime);
          const arrivalTime = new Date(booking.flight.arrivalTime);

          const diffInMinutes = Math.floor(
            (arrivalTime - departureTime) / 60000
          ); // Selisih dalam menit
          const hours = Math.floor(diffInMinutes / 60); // Jam
          const minutes = diffInMinutes % 60; // Menit

          acc[booking.id] = `${hours}h ${minutes}m`;
        } else {
          acc[booking.id] = "N/A";
        }
        return acc;
      }, {});

      setDurations(calculatedDurations);
    }
  }, [data]);

  const handleCardClickMobile = (id) => {
    setSelectedId(id);
    setIsDetailVisible((prev) => !prev);
    setShowDetailPrompt(false);
  };

  const handleCardClickDesktop = (id) => {
    if (selectedId === id) {
      // Jika ID yang dipilih sama dengan yang sedang aktif, tutup detail
      setSelectedId(null);
      setIsDetailVisible(false);
    } else {
      // Jika ID berbeda, buka detail dengan ID baru
      setSelectedId(id);
      setIsDetailVisible(true);
    }

    setShowDetailPrompt(false);
  };

  const handleBack = () => {
    if (isMobile) {
      setIsDetailVisible(false);
      setSelectedId(null);
    }
  };

  return (
    <Container fluid className="py-3 " style={{ background: "#FFFFFF" }}>
      <div
        className={`d-flex ${isMobile ? "flex-column" : "flex-row"}`}
        style={{ gap: "1rem" }}
      >
        {/* Riwayat Screen */}
        <div
          className={isDetailVisible && isMobile ? "d-none" : ""}
          style={{
            flex: isMobile ? "unset" : 1,
            maxWidth: isMobile ? "unset" : "60%",
          }}
        >
          {isLoading ? (
            <ScreenRiwayatLoading />
          ) : isSuccess && groupedBookings.length > 0 ? (
            groupedBookings.map(([monthYear, bookings]) => (
              <div key={monthYear}>
                <h5
                  className="fw-bold mt-5 text-start position-relative custom-date"
                  style={{ left: "6rem" }}
                >
                  {monthYear}
                </h5>
                {bookings.map((booking) => {
                  const isSelected = booking.id === selectedId;
                  let bgColor = "#73CA5C";
                  if (booking.status === "CANCELED") bgColor = "#FF0000";
                  if (booking.status === "EXPIRED") bgColor = "#8A8A8A";

                  return (
                    <Card
                      key={booking.id}
                      className="mb-3 border rounded shadow-sm custom-card"
                      onClick={
                        isMobile
                          ? () => handleCardClickMobile(booking.id)
                          : () => handleCardClickDesktop(booking.id)
                      }
                      style={{
                        cursor: "pointer",
                        width: "40rem",
                        left: "6rem",
                        border: isSelected
                          ? "2px solid aqua"
                          : "1px solid #ddd",
                      }}
                    >
                      <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div
                            className="text-white px-3 py-1 mb-3 rounded-pill custom-status"
                            style={{ backgroundColor: bgColor }}
                          >
                            {booking.status}
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <IoLocationSharp className="fs-3 text-muted location-icon me-2" />
                          <div className="w-25 text-start custom-departure">
                            <h6 className="mb-1 fs-6 fw-bolder custom-airport-location">
                              {booking.flight.departure?.name ||
                                "Airline not available"}
                            </h6>
                            <div>
                              <span className="fs-7 fw-normal custom-date-deparr-date">
                                {format(
                                  new Date(booking.flight.departureTime),
                                  "dd MMMM yyyy"
                                )}
                              </span>
                              <br />
                              <span className="fs-7 fw-normal custom-date-deparr-time">
                                {format(
                                  new Date(booking.flight.departureTime),
                                  "HH:mm"
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="d-flex flex-column align-items-center">
                            <span className="mb-2 custom-duration">
                              {durations[booking.id]}
                            </span>
                            <img
                              src={arrowRight}
                              alt="duration"
                              className="w-50 arrow-right"
                            />
                          </div>

                          <IoLocationSharp className="fs-3 text-muted location-icon me-2" />
                          <div className="w-25 text-start custom-arrival">
                            <h6 className="mb-1 fs-6 fw-bolder custom-airport-location">
                              {booking.flight.arrival?.name ||
                                "Airline not available"}
                            </h6>
                            <div>
                              <span className="fs-7 fw-normal custom-date-deparr-date">
                                {format(
                                  new Date(booking.flight.arrivalTime),
                                  "dd MMMM yyyy"
                                )}
                              </span>
                              <br />
                              <span className="fs-7 fw-normal custom-date-deparr-time">
                                {format(
                                  new Date(booking.flight.arrivalTime),
                                  "HH:mm"
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr />
                        {/* Menampilkan detail booking */}
                        <div className="d-flex justify-content-between">
                          <div>
                            <span className="fs-6 fw-bolder custom-footer">
                              Booking Code:
                            </span>
                            <br />
                            <span className="fw-normal custom-footer">
                              {booking.code}
                            </span>
                          </div>
                          <div>
                            <span className="fs-6 fw-bolder ms-2 custom-footer">
                              Class:
                            </span>
                            <br />
                            <span className="fw-normal ms-2 custom-footer">
                              {booking.flight?.class || "Class not available"}
                            </span>
                          </div>
                          <span
                            className="fs-5 fw-bolder ms-4 align-self-center custom-price"
                            style={{ color: "#4B1979" }}
                          >
                            {booking?.totalPrice
                              ? `IDR ${booking.totalPrice.toLocaleString("id-ID")}`
                              : "Price not available"}
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>
            ))
          ) : (
            <div
              className="search-not-found d-flex justify-content-center align-items-center mt-5 flex-column"
              style={{
                maxWidth: "100%",
                padding: "0 1rem",
                position: "relative",
                left: "20rem",
              }}
            >
              <img
                src="src/assets/homepage/not-found.png"
                alt="tidak-ditemukan"
                style={{ width: "100%", maxWidth: "25rem" }}
                className="img-search-not-found"
              />
              <span className="mt-3 text-center">
                Maaf, pencarian Anda tidak ditemukan
              </span>
            </div>
          )}
        </div>

        {/* DetailPesanan Screen */}
        {isDetailVisible && (
          <Row
            style={{
              flex: isMobile ? "unset" : 1,
              maxWidth: isMobile ? "unset" : "40%",
            }}
          >
            <DetailPesanan id={selectedId} onBack={handleBack} />
          </Row>
        )}

        {showDetailPrompt && (
          <Row
            className="detail-prompt mt-5"
            style={{ position: "relative", left: "7rem" }}
          >
            <p>Click to see detail</p>
          </Row>
        )}
      </div>
    </Container>
  );
};

export default ScreenRiwayat;
