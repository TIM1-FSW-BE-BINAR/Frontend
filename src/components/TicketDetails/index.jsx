import { Card, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const TicketDetails = ({ flight, airline }) => {
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
    });

    return { date: formattedDate, time: formattedTime };
  };
  const { dDate, dTime } = parseDateAndTime(flight?.departureTime);
  const { aDate, aTime } = parseDateAndTime(flight?.arrivalTime);
  return (
    <>
      <div className="mt-3">
        <Card style={{ border: "none" }} className="card ">
          <Card.Body>
            <div>
              <Card.Title style={{ fontSize: "18px", marginBottom: "1px" }}>
                <b>Detail Penerbangan</b>
              </Card.Title>
              <div className="d-flex justify-content-between">
                <span>
                  <b>07:00{dTime}</b>
                </span>
                <span
                  style={{
                    color: "#A06ECE",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  Keberangkatan
                </span>
              </div>
              <h6> 3 Maret 2023 {dDate}</h6>
              <h6>
                Soekarno Hatta - Terminal 1A Domestik
                {flight?.departureAirport && flight?.terminal
                  ? ` - ${flight.terminal}`
                  : ""}
              </h6>
            </div>

            <hr></hr>

            <div>
              <Row>
                <div style={{ marginLeft: "26%" }}>
                  <b>Jet Air-Economy{airline?.name}</b>
                  <br></br>
                  <b>
                    JT-203
                    {flight?.flightNumber}
                    <br></br>
                  </b>
                  <br></br>
                </div>
              </Row>
              <Row>
                <Col className=" col-md-1" style={{ size: "10%" }}>
                  <img src="../../public/img/logokkecil.png"></img>
                  {/* {airline?.imageUrl} */}
                </Col>
                <Col className="col-lg-10" >
                  <b>Informasi: </b> <br></br>
                  {flight?.information}
                  Baggage 20 kg
                  <br></br>
                  {"Cabin Baggage 20 kg"}
                  <br></br>
                  {"in flight entertaiment"}
                </Col>
              </Row>
            </div>

            <hr></hr>

            <div>
              <div className="d-flex justify-content-between">
                <span>
                  <b>07:00{aTime}</b>
                </span>
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
              <h6> 3 Maret 2023 {aDate}</h6>
              <h6>Melbourne International Airport</h6>
            </div>

            <hr></hr>

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
                  <b>Total{flight?.nick_name}</b>
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
              style={{ zIndex: "1" }}
            >
              Lanjut Bayar
            </Button>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

TicketDetails.propTypes = {
  student: PropTypes.object,
};

export default TicketDetails;
