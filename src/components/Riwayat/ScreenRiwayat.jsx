import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { VscArrowRight } from "react-icons/vsc";
import DetailPesanan from "./Detail/DetailPesananan";
import { useRiwayatContext } from "./RiwayatContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllBookings } from "../../service/booking";
import format from "date-fns/format";
import { id } from "date-fns/locale";

const ScreenRiwayat = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const { filterDate, searchQuery } = useRiwayatContext();
  const [booking, setBooking] = useState([]);
  const [groupedBookings, setGroupedBookings] = useState([]);
  const [durations, setDurations] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAllbookings"],
    queryFn: getAllBookings,
    enabled: !!token,
  });

  // Update this in ScreenRiwayat.jsx
  useEffect(() => {
    if (data && data.length > 0) {
      // Apply filter by selected date range
      let filteredData = data;

      // Filter by selected date range (if any)
      if (filterDate && filterDate[0] && filterDate[1]) {
        const startDate = new Date(filterDate[0]);
        const endDate = new Date(filterDate[1]);

        filteredData = filteredData.filter((booking) => {
          const bookingDate = new Date(booking.bookingDate);
          return bookingDate >= startDate && bookingDate <= endDate;
        });
      }

      // Sort filtered data based on bookingDate
      const sortedData = filteredData.sort(
        (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
      );

      // Grouping based on month and year
      const grouped = sortedData.reduce((acc, booking) => {
        const bookingDate = new Date(booking.bookingDate);
        const formattedDate = format(bookingDate, "MMMM yyyy"); // Format "Month Year"

        if (!acc[formattedDate]) {
          acc[formattedDate] = [];
        }
        acc[formattedDate].push(booking);

        return acc;
      }, {});

      setGroupedBookings(Object.entries(grouped));
    }
  }, [data, filterDate]); // Re-run whenever `data` or `filterDate` changes

  // Modify this inside the useEffect in ScreenRiwayat.jsx
  useEffect(() => {
    if (data && data.length > 0) {
      // Apply search query (if any)
      let filteredData = data;

      // Apply search query (if any)
      if (searchQuery.trim()) {
        filteredData = filteredData.filter((booking) =>
          booking.code.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply date filter if there's a date range
      if (filterDate && filterDate[0] && filterDate[1]) {
        const startDate = new Date(filterDate[0]);
        const endDate = new Date(filterDate[1]);

        startDate.setDate(1);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(0);

        filteredData = filteredData.filter((booking) => {
          const bookingDate = new Date(booking.bookingDate);
          return bookingDate >= startDate && bookingDate <= endDate;
        });
      }

      const sortedData = filteredData.sort(
        (a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)
      );

      // Group by month and year
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
    }
  }, [data, filterDate, searchQuery]);

  useEffect(() => {
    setSelectedId(null);
  }, [searchQuery]);

  const handleCardClick = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <Container fluid className="bg-light py-3">
      <Row>
        {/* Bagian kiri: Riwayat Pemesanan */}
        <Col
          md={8}
          className="pe-3"
          style={{ position: "relative", right: "6.5rem", bottom: "3rem" }}
        >
          {/* Cek jika data berhasil di-fetch */}
          {isLoading ? (
            <p>Loading...</p>
          ) : isSuccess && groupedBookings.length > 0 ? (
            groupedBookings.map(([monthYear, bookings]) => {
              return (
                <div key={monthYear}>
                  <h5
                    className="d-flex fw-bold mt-5"
                    style={{
                      position: "relative",
                      left: "19.5rem",
                    }}
                  >
                    {monthYear}
                  </h5>
                  {bookings.map((booking) => {
                    let bgColor = "#73CA5C";
                    if (booking.status === "CANCELED") bgColor = "#FF0000";
                    if (booking.status === "EXPIRED") bgColor = "#8A8A8A";

                    return (
                      <Card
                        key={booking.id}
                        className="mb-3 border rounded"
                        style={{
                          width: "44rem",
                          left: "18.5rem",
                          cursor: "pointer",
                        }}
                        onClick={() => handleCardClick(booking.id)}
                      >
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div
                              className="text-white px-3 py-1"
                              style={{
                                backgroundColor: bgColor,
                                borderRadius: "10px",
                                fontSize: "12px",
                              }}
                            >
                              {booking.status}
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <div style={{ width: "15rem", marginLeft: "2rem" }}>
                              <IoLocationSharp
                                style={{
                                  position: "relative",
                                  top: "1.5rem",
                                  right: "2rem",
                                  fontSize: "1.5rem",
                                  color: "#8A8A8A",
                                }}
                              />
                              <h6 className="mb-1 fs-6 fw-bolder">
                                {booking.flight.departure?.name ||
                                  "Airline not available"}
                              </h6>

                              <div>
                                <span className="fs-7 fw-normal">
                                  {format(
                                    new Date(booking.flight.departureTime),
                                    "dd MMMM yyyy"
                                  )}
                                </span>
                                <br />
                                <span className="fs-7 fw-normal">
                                  {format(
                                    new Date(booking.flight.departureTime),
                                    "HH:mm"
                                  )}
                                </span>
                              </div>
                            </div>

                            <div
                              className="d-flex flex-column align-items-center"
                              style={{ marginRight: "2rem" }}
                            >
                              <span className="mb-2">
                                {durations[booking.id]}
                              </span>
                              <img
                                src="img/arrowRight1.svg"
                                style={{ width: "12rem" }}
                              />
                            </div>

                            <div style={{ width: "15rem", marginLeft: "2rem" }}>
                              <IoLocationSharp
                                style={{
                                  position: "relative",
                                  top: "1.5rem",
                                  right: "2rem",
                                  fontSize: "1.5rem",
                                  color: "#8A8A8A",
                                }}
                              />
                              <h6 className="mb-1 fs-6 fw-bolder">
                                {booking.flight.arrival?.name ||
                                  "Airline not available"}
                              </h6>
                              <div>
                                <span className="fs-7 fw-normal">
                                  {format(
                                    new Date(booking.flight.arrivalTime),
                                    "dd MMMM yyyy"
                                  )}
                                </span>
                                <br />
                                <span className="fs-7 fw-normal">
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
                              <span className="fs-6 fw-bolder">
                                Booking Code:
                              </span>
                              <br />
                              <span className="fw-normal">{booking.code}</span>
                            </div>
                            <div>
                              <span className="fs-6 fw-bolder">Class:</span>
                              <br />
                              <span className="fw-normal">
                                {booking.flight?.class || "Class not available"}
                              </span>
                            </div>
                            <span
                              className="fs-5 fw-bolder align-self-center"
                              style={{ color: "#4B1979" }}
                            >
                              {`IDR ${booking.totalPrice}`}
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                    );
                  })}
                </div>
              );
            })
          ) : (
            <div
              className="d-flex justify-content-center align-items-center mt-5 flex-column"
              style={{ position: "relative", left: "10rem" }}
            >
              <img
                src="src/assets/homepage/not-found.png"
                alt="tidak-ditemukan"
                style={{ width: "25rem" }}
              />
              <span className="mt-3">Maaf, pencarian Anda tidak ditemukan</span>
            </div>
          )}
        </Col>

        {/* Bagian kanan: Detail Pesanan */}
        <Col md={4} className="ps-3">
          {selectedId ? (
            <DetailPesanan id={selectedId} /> // Pass 'selectedId' sebagai prop 'id'
          ) : (
            <p>Click a booking to see details</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ScreenRiwayat;
