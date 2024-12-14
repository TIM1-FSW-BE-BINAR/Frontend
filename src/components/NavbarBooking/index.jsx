import {  useNavigate } from "@tanstack/react-router";
import {
  Navbar,
  Container,
  Row,
  Stack,
} from "react-bootstrap";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import "./NavbarBooking.css";
import PropTypes from "prop-types";

const NavbarBooking = ({isSaved}) => {
  const [isPayment, setIsPayment] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const initialTime = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsTimerActive(false);
      return;
    }
    let interval;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft, token]);

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  const resetTimer = () => {
    navigate({ to: "/" });
  };

  const handleOverlayClose = () => {
    navigate({ to: "/login" });
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
                  style={{
                    fontWeight: "bold",
                    color: "black",
                  }}
                >
                  <span style={{ textDecoration: "none" }}>
                    Personal Information
                  </span>
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active={isPayment}
                  style={{
                    fontWeight: isPayment ? "bold" : "normal",
                    color: isPayment ? "black" : "#6c757d",
                  }}
                >
                  <span style={{ textDecoration: "none" }}>Payment</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active={isComplete}
                  style={{
                    fontWeight: isComplete ? "bold" : "normal",
                    color: isComplete ? "black" : "#6c757d",
                  }}
                >
                  <span style={{ textDecoration: "none" }}>Complete</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Row>

            <Row>
              <div>
                {!token ? (
                  <div
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div id="black-overlay" className="vh-100"></div>
                    <div id="box-timer">
                      {"You must log in first!"}
                      <button onClick={handleOverlayClose} id="close-button">
                        X
                      </button>
                    </div>
                  </div>
                ) : isSaved ? (
                  <Row>
                    <div id="box-timer" style={{ backgroundColor: "#73CA5C" }}>
                      <div style={{ justifyContent: "center" }}>
                        {"Your data has been successfully saved!"}
                      </div>
                    </div>
                  </Row>
                ) : (
                  <div>
                    {timeLeft > 0 ? (
                      <div id="box-timer">
                        Complete within {formatTime(timeLeft)}
                      </div>
                    ) : (
                      <>
                        <div id="black-overlay"></div>
                        <Row>
                          <div id="box-timer">
                            <div style={{ justifyContent: "center" }}>
                              {
                                "Sorry, the booking time has expired. Please try again."
                              }
                            </div>
                            <button onClick={resetTimer} id="close-button">
                              X
                            </button>
                          </div>
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
  isSaved: PropTypes.bool,
  // isPayment: PropTypes.bool,
  // isComplete: PropTypes.bool,
};

export default NavbarBooking;
