import NavigationBar from "../components/Navbar";
import SidebarAkun from "../components/SidebarAkun";
import { VscArrowLeft } from "react-icons/vsc";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "@tanstack/react-router";

function PageHeader() {
  return (
    <Container fluid className="bg-light py-3">
      <Row className="align-items-center">
        <Col
          xs={6}
          md={4}
          className="offset-md-2"
          style={{ marginTop: "25px" }}
        >
          <h1
            className="m-0 fw-bold fs-4 text-start"
            style={{ color: "#000000" }}
          >
            Akun
          </h1>
        </Col>
      </Row>
      <Row className="m-5 align-items-center">
        <ListGroup>
          <ListGroupItem
            className="offset-md-2"
            style={{
              background: "#A06ECE",
              width: "1000px",
              padding: "5px",
              display: "flex",
              alignItems: "center",

              marginBottom: "-25px",
              borderRadius: "15px",
            }}
          >
            <Button
              variant="Link"
              as={Link}
              className="text-decoration-none d-flex align-items-center"
              to="/"
              style={{ marginRight: "10px", color: "white" }} // Memberi jarak antara tombol dan tepi
            >
              <VscArrowLeft className="me-2" size={20} /> Beranda
            </Button>
          </ListGroupItem>
        </ListGroup>
      </Row>
    </Container>
  );
}

export default function AkunLayout({
  openUbahProfil,
  setOpenUbahProfil,
  openPengaturanAkun,
  setOpenPengaturanAkun,
  children,
}) {
  return (
    <>
      <NavigationBar />
      <PageHeader />
      <SidebarAkun
        openUbahProfil={openUbahProfil}
        setOpenUbahProfil={setOpenUbahProfil}
        openPengaturanAkun={openPengaturanAkun}
        setOpenPengaturanAkun={setOpenPengaturanAkun}
      >
        {children}
      </SidebarAkun>
    </>
  );
}
