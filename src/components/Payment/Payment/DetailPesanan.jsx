import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Button, Row, Col } from "react-bootstrap";
import { getIdBooking } from "../../../service/booking";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import PaymentDetailsLoading from "../../Loading/paymentDetailsLoading";

const DetailPesanan = ({ bookingId, amount }) => {
  const { token } = useSelector((state) => state.auth);
  const [booking, setBookingDetail] = useState(null);
  const { data, isLoading, isSuccess, isError, error } = useQuery({
    queryKey: ["getIdBooking", bookingId],
    queryFn: () => getIdBooking(bookingId),
    enabled: !!bookingId && !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Booking details fetched successfully:", data);
      setBookingDetail(data);
    }

    if (isError) {
      console.error("Error fetching booking details:", error);
    }
  }, [isSuccess, data, isError, error]);

  const groupedPassengers = (details) =>
    details?.reduce((acc, detail) => {
      const type = detail.passenger?.type || "UNKNOWN";
      if (!acc[type]) {
        acc[type] = { count: 0, totalPrice: 0 };
      }
      acc[type].count += 1;
      acc[type].totalPrice += detail.price || 0;
      return acc;
    }, {});

  const renderFlightCard = (flight, details, title) => {
    if (!flight) {
      console.log("flight gaada boss");
      return null;
    }
    return (
      <Card.Body>
        <h5 className="fw-bold">{title}</h5>
        {/* Keberangkatan */}
        <div className="mb-3 d-flex align-items-start justify-content-between">
          <div>
            <p className="m-0 fw-bold">
              {flight?.departureTime
                ? format(new Date(flight.departureTime), "HH:mm", {
                    locale: enUS,
                  })
                : "N/A"}
            </p>
            <p className="m-0">
              {flight?.departureTime
                ? format(new Date(flight.departureTime), "dd MMMM yyyy", {
                    locale: enUS,
                  })
                : "N/A"}
            </p>
            <p className="m-0">
              {flight?.departure?.name || "Departure Airport N/A"}
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
            src={flight?.airline?.imageUrl || "imageUrl Airline not available"}
            alt={flight?.airline?.imageId || "imageId Airline not available"}
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            {/* Detail Maskapai */}
            <h6 className="fw-bolder m-0">
              {flight?.airline?.name || "Airline not available"} -{" "}
              {flight?.class || "N/A"}
            </h6>
            <p className="m-0 fw-bold">
              {flight?.flightNumber || "Flight Number N/A"}
            </p>
            {/* Informasi */}
            <div className="mt-4">
              <h6 className="fw-bolder mb-0">Information:</h6>
              <div>
                <p className="m-0">
                  {" "}
                  {flight?.information || "Information N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="mb-3">
          <h6 className="fw-bold">Passenger Information:</h6>
          {details?.map((detail, index) => (
            <div key={detail.id}>
              <p
                className="m-0"
                style={{ color: "#4B1979", fontWeight: "500" }}
              >
                {`Passenger ${index + 1}: ${detail.passenger?.name} ${detail.passenger?.familyName}`}
              </p>
              <p className="m-0">{`ID: ${detail.passenger?.identityNumber || "N/A"}`}</p>
            </div>
          ))}
          <hr />
          {/* Kedatangan */}
          <div className="mb-3 d-flex align-items-start justify-content-between">
            <div>
              <p className="m-0 fw-bold">
                {flight?.arrivalTime
                  ? format(new Date(booking.flight.arrivalTime), "HH:mm", {
                      locale: enUS,
                    })
                  : "N/A"}
              </p>
              <p className="m-0">
                {flight?.arrivalTime
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
                {flight?.arrival?.name || "Arrival Airport N/A"}
              </p>
            </div>

            <span className="fw-bold" style={{ color: "#A06ECE" }}>
              Arrival
            </span>
          </div>
        </div>
      </Card.Body>
    );
  };

  if (isLoading) return <PaymentDetailsLoading />;
  if (isError) return <p>Error fetching details: {error.message}</p>;
  if (!booking) return <PaymentDetailsLoading />;

  const departureCard = renderFlightCard(
    booking.flight,
    booking.bookingDetail,
    "Departure Ticket"
  );

  const returnCard =
    booking.returnFlightId &&
    renderFlightCard(
      booking.returnFlight,
      booking.bookingDetail,
      "Return Ticket"
    );

  // const departureTotal = groupedPassengers(booking.bookingDetail);
  // const returnTotal = groupedPassengers(booking.returnBookingDetail);

  // const totalPrice =
  //   (departureTotal &&
  //     Object.values(departureTotal).reduce(
  //       (sum, data) => sum + data.totalPrice,
  //       0
  //     )) +
  //   (returnTotal &&
  //     Object.values(returnTotal).reduce(
  //       (sum, data) => sum + data.totalPrice,
  //       0
  //     ));

  return (
    <>
      {/* Booking Code */}
      <div className="d-flex align-items-center mb-3 h4">
        <span className="fw-bold me-2">Booking Code:</span>
        <span style={{ color: "#7126B5", fontWeight: "bold" }}>
          {booking?.code || "N/A"}
        </span>
      </div>
      {departureCard && <Card className="mb-4">{departureCard}</Card>}
      {returnCard && <Card className="mb-4">{returnCard}</Card>}
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between fw-bold">
            <div>
              <h5 className="fw-bold">Total Price:</h5>
              <small
                style={{ fontSize: "12px", color: "gray" }}
              >
                Tax included
              </small>
            </div>
            <h4 className="fw-bold" style={{ color: "#7126B5" }}>
              IDR {amount || "N/A"}
            </h4>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default DetailPesanan;
