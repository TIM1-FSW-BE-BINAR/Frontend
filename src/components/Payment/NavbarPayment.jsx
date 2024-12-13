import { useNavigate, useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Breadcrumb,
  Navbar,
  Stack,
} from "react-bootstrap";

// import "../../app.css";

const NavbarPayment = ({ openPayment, openSuccess }) => {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useSelector((state) => state.auth);
  const getDeadline = () => {
    const now = new Date();
    now.setHours(now.getHours() + 24);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return now.toLocaleDateString("id-ID", options);
  };

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
          {/* Row untuk Breadcrumb */}
          <Stack gap={0}>
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

            {openPayment && !openSuccess && (
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <Card
                    className="text-white text-center mx-4"
                    style={{ background: "#FF0000", borderRadius: "14px" }}
                  >
                    <Card.Body>
                      Please complete your payment before {getDeadline()}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}

            {openSuccess && (
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <Card
                    className="text-white text-center mx-4"
                    style={{ background: "#73CA5C", borderRadius: "14px" }}
                  >
                    <Card.Body>Thank you for the transaction payment</Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Stack>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPayment;
