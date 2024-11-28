import {  useNavigate, useLocation } from "@tanstack/react-router";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useEffect } from "react";
import {  useSelector } from "react-redux";
//import { setToken, setUser } from "../../redux/slices/auth";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "../../app.css";

const NavbarPemesanan = () => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);

  // State untuk melacak penyelesaian
  const [isDataDiriCompleted, setIsDataDiriCompleted] = useState(false);
  const [isBayarCompleted, setIsBayarCompleted] = useState(false);

  // Logika untuk menentukan apakah path aktif
  const isActive = (path) => location.pathname === path;

  // Fungsi untuk memvalidasi akses dan navigasi
  const handleNavigation = (path) => {
    if (
      path === "/Pemesanan" ||
      (path === "/bayar" && isDataDiriCompleted) ||
      (path === "/selesai" && isBayarCompleted)
    ) {
      navigate({ to: path });
    }
  };

  // Simulasikan penyelesaian tahap (di halaman lain, ini bisa diatur melalui props atau Redux)
  const completeDataDiri = () => setIsDataDiriCompleted(true);
  const completeBayar = () => setIsBayarCompleted(true);

  //   Timer logic
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
  }, [isTimerActive, timeLeft]);
  // [token];

  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  // const resetTimer = () => {
  //   setTimeLeft(initialTime);
  //   setIsTimerActive(true);
  //   setIsOverlayVisible(false);
  // };
  const resetTimer = () => {
    navigate({to : "/"})
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
          <Col>
            <Row>
              <Breadcrumb>
                <Breadcrumb.Item
                  active={isActive("/Pemesanan")}
                  onClick={() => handleNavigation("/Pemesanan")}
                  style={
                    isActive("/Pemesanan")
                      ? {
                          fontWeight: "bold",
                          color: "black",
                          textDecoration: "none",
                          cursor: "default",
                        }
                      : {
                          color: "black",
                          textDecoration: "none",
                          cursor: "pointer",
                        }
                  }
                >
                  Isi Data Diri
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active={isActive("/Bayar")}
                  onClick={() => handleNavigation("/Bayar")}
                  style={
                    isActive("/Bayar")
                      ? {
                          fontWeight: "bold",
                          color: "black",
                          textDecoration: "none",
                          cursor: "default",
                        }
                      : {
                          color: isDataDiriCompleted ? "black" : "gray",
                          textDecoration: "none",
                          cursor: isDataDiriCompleted
                            ? "pointer"
                            : "not-allowed",
                        }
                  }
                >
                  Bayar
                </Breadcrumb.Item>
                <Breadcrumb.Item
                  active={isActive("/selesai")}
                  onClick={() => handleNavigation("/selesai")}
                  style={
                    isActive("/selesai")
                      ? {
                          fontWeight: "bold",
                          color: "black",
                          textDecoration: "none",
                          cursor: "default",
                        }
                      : {
                          color: isBayarCompleted ? "black" : "gray",
                          textDecoration: "none",
                          cursor: isBayarCompleted ? "pointer" : "not-allowed",
                        }
                  }
                >
                  Selesai
                </Breadcrumb.Item>
              </Breadcrumb>
            </Row>
            <Row>
              <div>
                {!token ? (
                  <div
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <div
                      id="black-overlay"
                      style={{
                        justifyContent: "center",
                      }}
                      className="vh-100"
                    ></div>
                    <div
                      id="box-timer"
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {"Anda harus login terlebih dahulu!"}
                      <button onClick={handleOverlayClose} id="close-button">
                        X
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {timeLeft > 0 ? (
                      <div id="box-timer">
                        Selesaikan dalam {formatTime(timeLeft)}
                      </div>
                    ) : (
                      <>
                        <div id="black-overlay"></div>
                        <Row>
                          <div id="box-timer">
                            <div style={{ justifyContent: "center" }}>
                              {
                                "Maaf, waktu pemesanan habis, silahkan ulangi lagi."
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
          </Col>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPemesanan;
