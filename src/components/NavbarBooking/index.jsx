import { useNavigate } from "@tanstack/react-router";
import { Navbar, Container, Row, Col, Card, Stack } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import "./NavbarBooking.css";
import PropTypes from "prop-types";

const NavbarBooking = ({ isSaved, isPayment, isComplete }) => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
const [isTimerActive, setIsTimerActive] = useState(true);

useEffect(() => {
      let interval;

      if (isTimerActive && timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => {
            const newTime = prev > 0 ? prev - 1 : 0;
            localStorage.getItem("timeLeft", newTime);
            localStorage.setItem("timeLeft", newTime); 
            console.log("Updated timeLeft:", newTime);
            return newTime;
          });
        }, 1000);
      } else if (timeLeft === 0) {
        setIsTimerActive(false);
      }

      return () => clearInterval(interval);
    }, [isTimerActive, timeLeft]);

    
    const formatTime = (seconds) => {
      const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(
        2,
        "0"
      );
      const secs = String(seconds % 60).padStart(2, "0");
      return `${hours}:${minutes}:${secs}`;
    };

  const handleOverlayClose = () => {
    navigate({ to: "/login" });
  };

  const handleExpierdTimer = () => {
    navigate({ to: "/" });
  };

  const getDeadline = () => {
    const now = new Date();
    now.setHours(now.getMinutes() + 15);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return now.toLocaleDateString("id-ID", options);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          background: "#FFFFFF",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container>
          <Stack gap={0}>
            <Row>
              <Breadcrumb>
                <Breadcrumb.Item
                  active
                  style={{
                    fontWeight: "bold",
                    color: isComplete ? "#7126B5" : "#7126B5",
                  }}
                >
                  <span style={{ textDecoration: "none" }}>
                    Personal Information
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active={isPayment || isComplete}
                  style={{
                    fontWeight: (isPayment || isComplete) ? "bold" : "normal",
                    color: (isPayment || isComplete) ? "#7126B5" : "#6c757d",
                  }}
                >
                  <span style={{ textDecoration: "none" }}>Payment</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active={isComplete}
                  style={{
                    fontWeight: isComplete ? "bold" : "normal",
                    color: isComplete ? "#7126B5" : "#6c757d",
                  }}
                >
                  <span style={{ textDecoration: "none" }}>Complete</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Row>

            <Row>
              <div>
                {!user && !token ? (
                  <>
                    <div id="black-overlay"></div>
                    <Row>
                      <Col xs={12} md={12} lg={12}>
                        <Card
                          className="text-white text-center mx-4"
                          style={{
                            background: "#FF0000",
                            borderRadius: "14px",
                            zIndex: "3",
                          }}
                        >
                          <Card.Body style={{ padding: "12px", margin: "0px" }}>
                            {"You must log in first!"}
                            <button
                              onClick={handleOverlayClose}
                              id="close-button"
                            >
                              X
                            </button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </>
                ) : isComplete ? (
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Card
                        className="text-white text-center mx-4"
                        style={{ background: "#73CA5C", borderRadius: "14px" }}
                      >
                        <Card.Body style={{ padding: "12px", margin: "0px" }}>
                          Thank you for the transaction payment
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                ) : isPayment ? (
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Card
                        className="text-white text-center mx-4"
                        style={{ background: "#FF0000", borderRadius: "14px" }}
                      >
                        <Card.Body style={{ padding: "12px", margin: "0px" }}>
                          Please complete your payment before {getDeadline()}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                ) : isSaved ? (
                  <Row>
                    <Col xs={12} md={12} lg={12}>
                      <Card
                        className="text-white text-center mx-4"
                        style={{ background: "#73CA5C", borderRadius: "14px" }}
                      >
                        <Card.Body style={{ padding: "12px", margin: "0px" }}>
                          {"Your data has been successfully saved!"}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                ) : (
                  <div>
                    {timeLeft > 0 ? (
                      <Row>
                        <Col xs={12} md={12} lg={12}>
                          <Card
                            className="text-white text-center mx-4"
                            style={{
                              background: "#FF0000",
                              borderRadius: "14px",
                            }}
                          >
                            <Card.Body
                              style={{ padding: "12px", margin: "0px" }}
                            >
                              Complete within {formatTime(timeLeft)}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    ) : (
                      <>
                        <div id="black-overlay"></div>
                        <Row>
                          <Col xs={12} md={12} lg={12}>
                            <Card
                              className="text-white text-center mx-4"
                              style={{
                                background: "#FF0000",
                                borderRadius: "14px",
                                zIndex: "3",
                              }}
                            >
                              <Card.Body
                                style={{ padding: "12px", margin: "0px" }}
                              >
                                {
                                  "Sorry, the booking time has expired. Please try again."
                                }
                                <button
                                  onClick={handleExpierdTimer}
                                  id="close-button"
                                >
                                  X
                                </button>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Row>
          </Stack>
        </Container>
      </Navbar>
    </>
  );
};

NavbarBooking.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  isPayment: PropTypes.bool.isRequired,
  isComplete: PropTypes.bool.isRequired,
};

export default NavbarBooking;
