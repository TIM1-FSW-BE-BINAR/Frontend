import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAllBookings } from "../../service/booking";
import format from "date-fns/format";
import isSameDay from "date-fns/isSameDay";
import { isWithinInterval, parseISO } from "date-fns";
import { useHistoryContext } from "./HistoryContext";
import DetailPesanan from "./Detail/DetailHistory";
import { getAllPaymentPagination } from "../../service/payment";
import "./ScreenHistory.css";
import arrowRight from "../../assets/arrow-right.png";
import notFound from "../../assets/homepage/not-found.png";

import ScreenHistoryLoading from "./Loading/ScreenHistoryLoading";

const ScreenHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const { filterDate, searchQuery } = useHistoryContext();
  const [groupedBookings, setGroupedBookings] = useState(() => {
    const savedData = localStorage.getItem("groupedBookings");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [durations, setDurations] = useState({});
  const [selectedId, setSelectedId] = useState(
    localStorage.getItem("selectedId") || null
  );
  const [isDetailVisible, setIsDetailVisible] = useState(
    localStorage.getItem("isDetailVisible") === "true"
  );
  const [showDetailPrompt, setShowDetailPrompt] = useState(true);
  const [matchedPayments, setMatchedPayments] = useState([]);
  const [filteredData, setFilteredData] = useState(() => {
    const savedFilteredData = localStorage.getItem("filteredData");
    return savedFilteredData ? JSON.parse(savedFilteredData) : [];
  });

  const [activeFilter, setActiveFilter] = useState(() => {
    const savedFilter = localStorage.getItem("activeFilter");
    return savedFilter ? savedFilter : "all";
  });

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 450px)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 450px)");

    const handleResize = () => setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedId", selectedId);
    localStorage.setItem("isDetailVisible", isDetailVisible);
    localStorage.setItem("activeFilter", activeFilter);
    localStorage.setItem("groupedBookings", JSON.stringify(groupedBookings));
    localStorage.setItem("filteredData", JSON.stringify(filteredData));
  }, [
    selectedId,
    isDetailVisible,
    activeFilter,
    groupedBookings,
    filteredData,
  ]);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAllbookings"],
    queryFn: getAllBookings,
    enabled: !!token,
  });

  const { data: paymentData } = useQuery({
    queryKey: ["payment"],
    queryFn: getAllPaymentPagination,
    enabled: !!token,
  });

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      let filteredData = data;

      filteredData = filteredData.filter((booking) => booking.payment);

      if (filterDate && filterDate[0] && filterDate[1]) {
        filteredData = filteredData.filter((booking) => {
          const bookingDate = parseISO(booking.bookingDate);
          return isWithinInterval(bookingDate, {
            start: filterDate[0],
            end: filterDate[1],
          });
        });
      }

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

      if (activeFilter && activeFilter !== "all") {
        filteredData = filteredData.filter((booking) => {
          switch (activeFilter) {
            case "active":
              return booking.status === "ACTIVE";
            case "cancel":
              return booking.status === "CANCELED";
            case "expire":
              return booking.status === "EXPIRED";
            default:
              return true;
          }
        });
      }

      const sortedData = filteredData.sort(
        (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
      );

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
      setShowDetailPrompt(false);

      // Simpan filteredData ke localStorage
      localStorage.setItem("filteredData", JSON.stringify(filteredData));
    } else {
      setGroupedBookings([]);
      setShowDetailPrompt(false);
    }
  }, [data, filterDate, searchQuery, activeFilter]);

  useEffect(() => {
    if (data) {
      const calculatedDurations = data.reduce((acc, booking) => {
        if (booking.flight?.departureTime && booking.flight?.arrivalTime) {
          const departureTime = new Date(booking.flight.departureTime);
          const arrivalTime = new Date(booking.flight.arrivalTime);

          const diffInMinutes = Math.floor(
            (arrivalTime - departureTime) / 60000
          );
          const hours = Math.floor(diffInMinutes / 60);
          const minutes = diffInMinutes % 60;

          acc[booking.id] = `${hours}h ${minutes}m`;
        } else {
          acc[booking.id] = "N/A";
        }
        return acc;
      }, {});

      setDurations(calculatedDurations);
    }
  }, [data]);

  useEffect(() => {
    if (data && paymentData) {
      for (let i = 0; i < data.length; i++) {
        const booking = data[i];

        for (let j = 0; j < paymentData.length; j++) {
          const payment = paymentData[j];

          if (booking.id === payment.bookingId) {
            let bgColor = "#73CA5C";
            let status = "ACTIVE";

            if (payment.status === "cancel") {
              bgColor = "#FF0000";
              status = "CANCELED";
            } else if (payment.status === "expire") {
              bgColor = "#8A8A8A";
              status = "EXPIRED";
            } else if (
              payment.status === "pending" ||
              payment.status === "settlement" ||
              !["cancel", "expire"].includes(payment.status)
            ) {
              bgColor = "#73CA5C";
              status = "ACTIVE";
            }

            booking.status = status;
            booking.bgColor = bgColor;

            matchedPayments.push({ booking, payment });

            break;
          }
        }
      }

      setMatchedPayments(matchedPayments);
    }
  }, [data, paymentData]);

  const handleCardClickMobile = (id) => {
    setSelectedId(id);
    setIsDetailVisible((prev) => !prev);
    setShowDetailPrompt(false);
  };

  const handleCardClickDesktop = (id) => {
    if (selectedId === id) {
      setSelectedId(null);
      setIsDetailVisible(false);
    } else {
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

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setIsDetailVisible(false);
    setSelectedId(null);
    localStorage.setItem("activeFilter", filter);
  };

  return (
    <Container fluid className="py-3 " style={{ background: "#FFFFFF" }}>
      <div
        className="d-flex justify-content-start mt-4 mb-1 button-compt"
        style={{ marginLeft: "6rem" }}
      >
        <Button
          className="button-filter"
          style={{
            backgroundColor: activeFilter === "all" ? "#7126B5" : "transparent",
            color: activeFilter === "all" ? "white" : "#7126B5",
            borderColor: "#7126B5",
          }}
          onClick={() => handleFilterClick("all")}
        >
          All
        </Button>
        <Button
          style={{
            backgroundColor:
              activeFilter === "active" ? "#7126B5" : "transparent",
            color: activeFilter === "active" ? "white" : "#7126B5",
            borderColor: "#7126B5",
          }}
          className="ms-1 button-filter"
          onClick={() => handleFilterClick("active")}
        >
          Active
        </Button>
        <Button
          style={{
            backgroundColor:
              activeFilter === "cancel" ? "#7126B5" : "transparent",
            color: activeFilter === "cancel" ? "white" : "#7126B5",
            borderColor: "#7126B5",
          }}
          className="ms-1 button-filter"
          onClick={() => handleFilterClick("cancel")}
        >
          Canceled
        </Button>
        <Button
          style={{
            backgroundColor:
              activeFilter === "expire" ? "#7126B5" : "transparent",
            color: activeFilter === "expire" ? "white" : "#7126B5",
            borderColor: "#7126B5",
          }}
          className="ms-1 button-filter"
          onClick={() => handleFilterClick("expire")}
        >
          Expired
        </Button>
      </div>

      <div
        className={`d-flex ${isMobile ? "flex-column" : "flex-row"}`}
        style={{ gap: "1rem" }}
      >
        <div
          className={isDetailVisible && isMobile ? "d-none" : ""}
          style={{
            flex: isMobile ? "unset" : 1,
            maxWidth: isMobile ? "unset" : "60%",
          }}
        >
          {isLoading ? (
            <ScreenHistoryLoading />
          ) : isSuccess &&
            Array.isArray(groupedBookings) &&
            groupedBookings.length > 0 ? (
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
                  const bgColor = booking.bgColor || "#73CA5C";
                  const status = booking.status || "ACTIVE";

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
                          ? "2px solid #A06ECE"
                          : "1px solid #ddd",
                        outline: isSelected ? "3px solid #A06ECE" : "none",
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
                              {booking.flight?.class
                                ? booking.flight.class.replace(/_/g, " ")
                                : "Class not available"}
                            </span>
                          </div>
                          <span
                            className="fs-5 fw-bolder ms-4 align-self-center custom-price"
                            style={{ color: "#4B1979" }}
                          >
                            {booking?.payment?.amount
                              ? `IDR ${booking?.payment?.amount.toLocaleString("id-ID")}`
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
                src={notFound}
                alt="tidak-ditemukan"
                style={{ width: "100%", maxWidth: "25rem" }}
                className="img-search-not-found"
              />
              <span className="mt-3 text-center">
                Sorry, your search input is not found, please try search again!
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

export default ScreenHistory;
