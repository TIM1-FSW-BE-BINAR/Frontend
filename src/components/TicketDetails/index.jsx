import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { getFlightId } from "../../service/flight/flightService";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";

const TicketDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const flightId = parseInt(searchParams.get("flightId"), 10) || 0;
  const { data: flight } = useQuery({
    queryKey: ["flight", flightId],
    queryFn: () => getFlightId(flightId),
    enabled: !!flightId,
  });

  const parseDateAndTime = (isoString) => {
    if (!isoString) return { date: "", time: "" };

    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString("id-ID", {
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

  return (
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Detail Penerbangan</h4>
      </div>

      <div className="mb-3 d-flex align-items-start justify-content-between">
        <div>
          <p className="m-0 fw-bold">{departureTime}</p>
          <p className="m-0 fw-bold">{departureDate}</p>
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
          Keberangkatan
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
            <h6 className="fw-bolder mb-0">Informasi</h6>
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
          Kedatangan
        </span>
      </div>

      <hr />

      <div>
        <b>Rincian Harga</b>
        <div className="d-flex justify-content-between">
          <span>
            <h6>2 Adults{flight?.nick_name}</h6>
          </span>
          <span
            style={{
              fontSize: "16px",
            }}
          >
            IDR 9.550.000
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <span>
            <h6>1 Baby{flight?.nick_name}</h6>
          </span>
          <span
            style={{
              fontSize: "16px",
            }}
          >
            IDR 0
          </span>
        </div>
        <div className="d-flex justify-content-between">
          <span>
            <h6>Tax{flight?.nick_name}</h6>
          </span>
          <span
            style={{
              fontSize: "16px",
            }}
          >
            IDR 3.000.000
          </span>
        </div>
      </div>

      <hr></hr>

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
          IDR 9.850.000
        </span>
      </div>

      <Button
        href={`/payment`}
        variant="danger"
        id="box-timer"
        style={{ zIndex: "1", marginTop: "1rem" }}
      >
        Lanjut Bayar
      </Button>
    </Card.Body>
  );
};

TicketDetails.propTypes = {
  student: PropTypes.object,
};

export default TicketDetails;
