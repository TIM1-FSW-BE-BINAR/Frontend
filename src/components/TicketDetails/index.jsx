import {Card, Button, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const TicketDetails = ({ student }) => {
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
                  <b>07:00{student?.nick_name}</b>
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
              <h6> 3 Maret 2023 {student?.nick_name}</h6>
              <h6>Soekarno Hatta - Terminal 1A Domestik</h6>
            </div>

            <hr></hr>

            <div>
              <Row>
                <div style={{ marginLeft: "26%" }}>
                  <b>{"Jet Air-Economy"}</b>
                  <br></br>
                  <b>
                    {"JT-203"}
                    <br></br>
                  </b>
                  <br></br>
                </div>
              </Row>
              <Row>
                <Col className=" col-md-1" style={{ size: "10%" }}>
                  <img src="../../public/img/logokkecil.png"></img>
                </Col>
                <Col className="col-lg-10">
                  <b>Informasi: </b> <br></br>
                  {"Baggage 20 kg"}
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
                  <b>07:00{student?.nick_name}</b>
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
              <h6> 3 Maret 2023 {student?.nick_name}</h6>
              <h6>Melbourne International Airport</h6>
            </div>

            <hr></hr>

            <div>
              <b>Rincian Harga</b>
              <div className="d-flex justify-content-between">
                <span>
                  <h6>2 Adults{student?.nick_name}</h6>
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
                  <h6>1 Baby{student?.nick_name}</h6>
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
                  <h6>Tax{student?.nick_name}</h6>
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
                  <b>Total{student?.nick_name}</b>
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
              href={`/students/${student?.id}`}
              variant="danger"
              id="box-timer"
              style={{zIndex: "1"}}
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
