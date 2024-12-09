// components/Detail/DetailPesanan.jsx

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getIdBooking } from "../../../service/booking";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const DetailPesanan = ({ id }) => {
  const { token } = useSelector((state) => state.auth);
  const [booking, setBookingDetail] = useState(null);

  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["getIdBooking", id],
    queryFn: () => getIdBooking(id),
    enabled: !!id && !!token,
  });

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

  if (isLoading) return <p>Loading details...</p>;
  if (isError) return <p>Error fetching details: {error.message}</p>;

  return (
    <Card.Body>
      {/* Status Pesanan */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold">Detail Pesanan</h6>
        <span
          className="px-3 py-1 text-white"
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
              ? format(new Date(booking.flight.departureTime), "dd MMMM yyyy", {
                  locale: enUS,
                })
              : "N/A"}
          </p>
          <p className="m-0">
            {booking?.flight?.departure?.name || "Departure Airport N/A"}
          </p>
        </div>
        <span className="fw-bold" style={{ color: "#A06ECE" }}>
          Keberangkatan
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
          <h6 className="fw-bolder m-0">
            {booking?.flight?.airline?.name || "Airline not available"} -{" "}
            {booking?.flight?.class || "N/A"}
          </h6>
          <p className="m-0 fw-bold">
            {booking?.flight?.flightNumber || "Flight Number N/A"}
          </p>
          {/* Informasi Penumpang */}
          <div className="mt-4">
            <h6 className="fw-bolder mb-0">Informasi:</h6>
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
              ? format(new Date(booking.flight.arrivalTime), "dd MMMM yyyy", {
                  locale: enUS,
                })
              : "N/A"}
          </p>
          <p className="m-0">
            {booking?.flight?.arrival?.name || "Arrival Airport N/A"}
          </p>
        </div>

        <span className="fw-bold" style={{ color: "#A06ECE" }}>
          Kedatangan
        </span>
      </div>
      <hr />

      {/* Rincian Harga */}
      <div className="mb-3">
        <h6 className="fw-bold">Rincian Harga:</h6>
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
          <p>IDR {booking?.totalPrice || "N/A"}</p>
        </div>
      </div>
    </Card.Body>
  );
};

export default DetailPesanan;
