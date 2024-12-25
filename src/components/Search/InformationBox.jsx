
import "font-awesome/css/font-awesome.min.css";
import { FaPlane } from "react-icons/fa"; 
import { FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";
import { getFlightId } from "../../service/flight/flightService";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from "react-bootstrap";

const InformationBox = ({
  infoDepartureCityName,
  infoReturnCityName,
  infoReturnDate,
  activeFlight,
  departureFlight,
  formatDate,
}) => {

  const { data: flight } = useQuery({
    queryKey: ["flight", departureFlight],
    queryFn: () => getFlightId(departureFlight),
    enabled: !!departureFlight,
  });
  return (
    <>
      <Card>
        <CardHeader style={{ backgroundColor: "#7126B5", marginBottom: "0px" }}>
          <div className="d-flex align-items-center justify-content-center">
            <span
              style={{
                fontSize: "18px",
                color: "#FFF",
                fontWeight: "bold",
              }}
            >
              <i
                className="fa fa-plane"
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
              Your Flight
            </span>
          </div>
        </CardHeader>

        <CardBody>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <FaPlane
                style={{
                  width: "14px",
                  height: "14px",
                  color: "#A06ECE",
                }}
              />
              <Col>
                <Row>
                  <h5
                    className="ms-2 mb-0"
                    style={{
                      fontSize: "13px",
                      fontWeight: "",
                      color: "#000000",
                    }}
                  >
                    {infoDepartureCityName}{" "}
                    <FaArrowRight
                      style={{
                        color: "#000000",
                        fontSize: "9px",
                      }}
                    />{" "}
                    {infoReturnCityName}
                  </h5>
                </Row>
                <Row>
                  <h6
                    className="ms-2 mb-0"
                    style={{
                      fontSize: "10px",
                      fontWeight: "normal",
                      color: "#000000",
                    }}
                  >
                   {!flight || !departureFlight
                      ? activeFlight?.departureTime &&
                        !isNaN(new Date(activeFlight.departureTime))
                        ? formatDate(activeFlight?.departureTime)
                        : "Not Available"
                      : flight?.data?.departureTime &&
                          !isNaN(new Date(flight.data.departureTime))
                        ? formatDate(flight?.data?.departureTime)
                        : "Not Available"}
                  </h6>
                </Row>
              </Col>
            </div>
          </div>

          {infoReturnDate && (
            <div
              className="d-flex justify-content-between align-items-center mt-2"
              style={{
                borderTop: "1px solid #D0D0D0",
                paddingTop: "10px",
              }}
            >
              <div className="d-flex align-items-center">
                <FaPlane
                  style={{
                    width: "14px",
                    height: "14px",
                    color: "#A06ECE",
                    transform: "rotate(180deg)",
                  }}
                />
                <Col>
                  <Row>
                    <h5
                      className="ms-2 mb-0"
                      style={{
                        fontSize: "13px",
                        color: "#000000",
                      }}
                    >
                      {infoReturnCityName}{" "}
                      <FaArrowRight
                        style={{
                          color: "#000000",
                          fontSize: "9px",
                        }}
                      />{" "}
                      {infoDepartureCityName}
                    </h5>
                  </Row>
                  <Row>
                    <h6
                      className="ms-2 mb-0"
                      style={{
                        fontSize: "10px",
                        fontWeight: "normal",
                        color: "#000000",
                      }}
                    >
                     {!flight || !departureFlight
                        ? infoReturnDate && !isNaN(new Date(infoReturnDate))
                          ? formatDate(infoReturnDate)
                          : "Not Available"
                        : activeFlight?.departureTime &&
                            !isNaN(new Date(activeFlight.departureTime))
                          ? formatDate(activeFlight?.departureTime)
                          : "Not Available"}
                    </h6>
                  </Row>
                </Col>
              </div>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

InformationBox.propTypes = {
  infoDepartureCityName: PropTypes.string,
  infoReturnCityName: PropTypes.string,
  infoDepartureDate: PropTypes.object,
  infoReturnDate: PropTypes.object,
  activeFlight: PropTypes.object,
  departureFlight: PropTypes.object,
  formatDate: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
};

export default InformationBox;
