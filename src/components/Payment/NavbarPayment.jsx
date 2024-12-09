import { useNavigate, useLocation } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Container, Row, Col, Card, Spinner, Breadcrumb, Navbar } from "react-bootstrap";

import "../../app.css";

const NavbarPayment = () => {
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
                        cursor: isDataDiriCompleted ? "pointer" : "not-allowed",
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
          <Row className="w-100">
            <Card className="bg-primary ">asd</Card>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPayment;
