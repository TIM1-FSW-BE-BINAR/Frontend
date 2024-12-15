import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { getFlightId } from "../../service/flight/flightService";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import { PulseLoader } from "react-spinners";

const TicketDetails = () => {
  const [isPayment, setIsPayment] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const adultInput = parseInt(searchParams.get("adultInput") || "0", 10);
  const childInput = parseInt(searchParams.get("childInput") || "0", 10);
  const babyInput = parseInt(searchParams.get("babyInput") || "0", 10);
  const totalSeat = adultInput + childInput;
  const flightId = parseInt(searchParams.get("flightId"), 10) || 0;
  const returnFlightId = parseInt(searchParams.get("returnFlightId"), 10) || 0;
  const [isRoundtrip, setIsRoundtrip] = useState(false);

  const { data: flight, isLoading } = useQuery({
    queryKey: ["flight", flightId],
    queryFn: () => getFlightId(flightId),
    enabled: !!flightId,
  });

  const { data: returnFlight } = useQuery({
    queryKey: ["returnFlight", returnFlightId],
    queryFn: () => getFlightId(returnFlightId),
    enabled: !!returnFlightId,
  });

  useEffect(() => {
    if (returnFlightId) {
      setIsRoundtrip(true);
    }
  }, [returnFlightId]);

  const parseDateAndTime = (isoString) => {
    if (!isoString) return { date: "", time: "" };

    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    return { date: formattedDate, time: formattedTime };
  };

  const { date: departureDate, time: departureTime } = parseDateAndTime(
    flight?.data?.departureTime
  );
  const { date: arrivalDate, time: arrivalTime } = parseDateAndTime(
    flight?.data?.arrivalTime
  );

  const { date: returnDepartureDate, time: returnDepartureTime } =
    parseDateAndTime(returnFlight?.data?.departureTime);
  const { date: returnArrivalDate, time: returnArrivalTime } = parseDateAndTime(
    returnFlight?.data?.arrivalTime
  );

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <PulseLoader color="#7126B5" size={15} />
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      const bookingId = localStorage.getItem("bookingId");

      if (!bookingId) {
        throw new Error("Booking ID not found. Please create a booking first.");
      }
      setIsPayment(true);
      navigate({ to: `/payment?bookingId=${bookingId}` });
    } catch (error) {
      console.error("An error occurred:", error.message);
      if (error.message.includes("Token expierd")) {
        navigate({ to: "/login" });
      }
    }
  };

  return (
    <Card.Body>
      <Card.Title className="text-secondary text-center">
        Ticket Details
      </Card.Title>
      <style>
        {`.bold-line {
            border: 3px solid black;
            }
          `}
      </style>
      <div className="d-flex justify-content-between align-items-center mb-1 mt-2">
        <h5 className="fw-bold">
          {isRoundtrip ? "Departure Flight Details" : "Flight Details"}
        </h5>
        <b></b>
      </div>

      <div className="mb-3 d-flex align-items-start justify-content-between">
        <div>
          <p className="m-0 fw-bold">{departureTime}</p>
          <p className="m-0 fw-">{departureDate}</p>
          <p className="m-0">
            {`${flight?.data?.departure?.name} - Terminal ${flight?.data?.terminal}`}
          </p>
        </div>
        <span
          className="fw-bold"
          style={{
            color: "#A06ECE",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Departure
        </span>
      </div>

      <hr />

      <div className="mb-3 d-flex align-items-center">
        <img
          className="me-4"
          src={flight?.data?.airline?.imageUrl}
          style={{ width: "40px", height: "40px" }}
        ></img>
        <div>
          <h6 className="m-0 fw-bold">{flight?.data?.airline?.name}</h6>
          <p className="m-0 fw-bold">{flight?.data?.flightNumber}</p>
          <div className="mt-4">
            <h6 className="fw-bolder mb-0">Information</h6>
            {flight?.data?.information}
          </div>
        </div>
      </div>

      <hr />

      <div className="mb-3 d-flex align-items-start justify-content-between">
        <div>
          <p className="m-0 fw-bold">{arrivalTime}</p>
          <p className="m-0 ">{arrivalDate}</p>
          <p className="m-0 ">{flight?.data?.arrival?.name}</p>
        </div>
        <span
          style={{
            color: "#A06ECE",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Arrival
        </span>
      </div>

      <hr />

      <div>
        <b>Price Detail</b>

        {/* Harga untuk Adult */}
        {adultInput > 0 && (
          <div className="d-flex justify-content-between">
            <span>
              <h6>{adultInput} Adults</h6>
            </span>
            <span
              style={{
                fontSize: "16px",
              }}
            >
              IDR {flight?.data?.price * adultInput || 0}
            </span>
          </div>
        )}

        {/* Harga untuk Child */}
        {childInput > 0 && (
          <div className="d-flex justify-content-between">
            <span>
              <h6>{childInput} Child</h6>
            </span>
            <span
              style={{
                fontSize: "16px",
              }}
            >
              IDR {flight?.data?.price * childInput || 0}
            </span>
          </div>
        )}

        {/* Harga untuk Baby */}
        {babyInput > 0 && (
          <div className="d-flex justify-content-between">
            <span>
              <h6>{babyInput} Baby</h6>
            </span>
            <span
              style={{
                fontSize: "16px",
              }}
            >
              IDR 0
            </span>
          </div>
        )}

        {/* Tax */}
        <div className="d-flex justify-content-between">
          <span>
            <h6>Tax</h6>
          </span>
          <span
            style={{
              fontSize: "16px",
            }}
          >
            IDR {10000 * totalSeat}
          </span>
        </div>
      </div>

      {isRoundtrip ? (
        <>
          <hr className="bold-line" />
          <hr className="bold-line" />
          <div className="d-flex justify-content-between align-items-center mb-1 mt-3">
            <h5 className="fw-bold">Return Flight Details</h5>
          </div>
          <div className="mb-3 d-flex align-items-start justify-content-between">
            <div>
              <p className="m-0 fw-bold">{returnDepartureTime}</p>
              <p className="m-0 fw-">{returnDepartureDate}</p>
              <p className="m-0">
                {`${returnFlight?.data?.departure?.name} - Terminal ${returnFlight?.data?.terminal}`}
              </p>
            </div>
            <span
              className="fw-bold"
              style={{
                color: "#A06ECE",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Departure
            </span>
          </div>
          <hr />
          <div className="mb-3 d-flex align-items-center">
            <img
              className="me-4"
              src={returnFlight?.data?.airline?.imageUrl}
              style={{ width: "40px", height: "40px" }}
            ></img>
            <div>
              <h6 className="m-0 fw-bold">
                {returnFlight?.data?.airline?.name}
              </h6>
              <p className="m-0 fw-bold">{returnFlight?.data?.flightNumber}</p>
              <div className="mt-4">
                <h6 className="fw-bolder mb-0">Information</h6>
                {returnFlight?.data?.information}
              </div>
            </div>
          </div>
          <hr />
          <div className="mb-3 d-flex align-items-start justify-content-between">
            <div>
              <p className="m-0 fw-bold">{returnArrivalTime}</p>
              <p className="m-0 ">{returnArrivalDate}</p>
              <p className="m-0 ">{returnFlight?.data?.arrival?.name}</p>
            </div>
            <span
              style={{
                color: "#A06ECE",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Arrival
            </span>
          </div>
          <hr />
          <div>
            <b>Price Detail</b>

            {/* Harga untuk Adult */}
            {adultInput > 0 && (
              <div className="d-flex justify-content-between">
                <span>
                  <h6>{adultInput} Adults</h6>
                </span>
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  IDR {returnFlight?.data?.price * adultInput || 0}
                </span>
              </div>
            )}

            {/* Harga untuk Child */}
            {childInput > 0 && (
              <div className="d-flex justify-content-between">
                <span>
                  <h6>{childInput} Child</h6>
                </span>
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  IDR {returnFlight?.data?.price * childInput || 0}
                </span>
              </div>
            )}

            {/* Harga untuk Baby */}
            {babyInput > 0 && (
              <div className="d-flex justify-content-between">
                <span>
                  <h6>{babyInput} Baby</h6>
                </span>
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  IDR 0
                </span>
              </div>
            )}

            {/* Tax */}
            <div className="d-flex justify-content-between">
              <span>
                <h6>Tax</h6>
              </span>
              <span
                style={{
                  fontSize: "16px",
                }}
              >
                IDR {10000 * totalSeat}
              </span>
            </div>
          </div>
          <hr className="bold-line" />
          <hr className="bold-line" />
        </>
      ) : (
        <hr />
      )}

      <div className="d-flex justify-content-between">
        <span>
          <h4>
            <b>Total</b>
          </h4>
        </span>
        <span
          style={{
            color: "#7126B5",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          IDR{" "}
          {(flight?.data?.price || 0) * adultInput +
            (flight?.data?.price || 0) * childInput +
            10000 * totalSeat +
            (returnFlight?.data?.price || 0) * adultInput +
            (returnFlight?.data?.price || 0) * childInput +
            10000 * totalSeat}
        </span>
      </div>

      <Button
        variant="danger"
        id="box-timer"
        style={{ zIndex: "1", marginTop: "1rem" }}
        onClick={handlePayment}
      >
        Payment
      </Button>
    </Card.Body>
  );
};


export default TicketDetails;
