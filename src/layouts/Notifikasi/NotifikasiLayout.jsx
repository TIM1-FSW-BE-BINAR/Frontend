import NavigationBar from "../../components/Navbar";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import {
  VscArrowLeft,
  VscFilter,
  VscSearch,
  VscChromeClose,
} from "react-icons/vsc";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "./NotifikasiLayout.css";
import { useNotificationContext } from "../../components/Notifikasi/NotificationContext";

function PageHeader() {
  const [showFilterDate, setShowFilterDate] = useState(false);
  const { setFilterDate } = useNotificationContext();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [confirmedDate, setConfirmedDate] = useState(new Date());

  const handleShowDate = () => setShowFilterDate(true);
  const handleCloseDate = () => setShowFilterDate(false);
  const handleShowSearch = () => setShowSearch(true);
  const handleCloseSearch = () => setShowSearch(false);

  const handleSaveDate = () => {
    setFilterDate(selectedDate); // Perbarui tanggal di context
    setConfirmedDate(selectedDate); // Perbarui tanggal yang dikonfirmasi
    setShowFilterDate(false); // Tutup modal
  };

  return (
    <Container fluid className="bg-light">
      {/* Header Notifikasi */}
      <Row className="align-items-center">
        <Col className="offset-md-1" style={{ marginTop: "25px" }}>
          <h1
            className="ms-4 fw-bold fs-4 text-start"
            style={{ color: "#000000" }}
          >
            Notifikasi
          </h1>
        </Col>
      </Row>

      {/* Tombol Beranda dan Filter */}
      <Row
        className="align-items-center justify-content-center position-relative"
        style={{
          marginTop: "3rem",
        }}
      >
        <Col md={9} className="d-flex align-items-center">
          <ListGroup className="w-100">
            <ListGroup.Item
              style={{
                background: "#A06ECE",
                display: "flex",
                alignSelf: "center",
                justifyContent: "space-between",
                borderRadius: "15px",
                width: "63rem",
              }}
              className="list-button"
            >
              {/* Tombol Beranda */}
              <Button
                variant="Link"
                as={Link}
                className="text-decoration-none d-flex align-items-center button-beranda"
                to="/"
                style={{ color: "white" }}
              >
                <VscArrowLeft className="me-2 arrow-left" size={20} /> Beranda
              </Button>

              {/* Tombol Filter dan Search */}
              <div className="d-flex align-items-center">
                <Button
                  variant="light"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    border: "1px solid #7126B5",
                    color: "#151515",
                    borderRadius: "15px",
                    padding: "5px 15px",
                    marginRight: "0.5rem",
                  }}
                  onClick={handleShowDate} // Tampilkan modal
                >
                  <VscFilter className="me-2" size={20} /> Filter
                </Button>

                <Button
                  variant="link"
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    background: "none",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                  }}
                  onClick={handleShowSearch}
                >
                  <VscSearch style={{ color: "#151515" }} size={20} />
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Modal
        style={{ top: "4rem", left: "19rem" }}
        show={showSearch}
        onHide={handleCloseSearch}
        centered
        className="modal-search"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Form.Group
              controlId="filterSearch"
              style={{ position: "relative", width: "27rem" }}
            >
              <Form.Control
                type="text"
                placeholder="Masukkan Nomor Penerbangan"
                style={{ paddingRight: "40px" }}
              />

              <VscSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px", // Posisi di sisi kanan input
                  transform: "translateY(-50%)", // Tengah vertikal
                  color: "#D0D0D0",
                  cursor: "pointer",
                }}
                size={20}
              />
            </Form.Group>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-search_body" style={{ height: "20rem" }}>
          <Form>
            <div className="mt-3">
              <h6>Pencarian Terkini</h6>
              <ListGroup>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  1234ABC
                  <Button variant="link" size="sm">
                    <VscChromeClose style={{ color: "#8A8A8A" }} />
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  7UY7192
                  <Button variant="link" size="sm">
                    <VscChromeClose style={{ color: "#8A8A8A" }} />
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        style={{ top: "4rem", left: "19rem" }}
        show={showSearch}
        onHide={handleCloseSearch}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Form.Group
              controlId="filterSearch"
              style={{ position: "relative", width: "27rem" }}
            >
              <Form.Control
                type="text"
                placeholder="Masukkan Nomor Penerbangan"
                style={{ paddingRight: "40px" }}
              />

              <VscSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px", // Posisi di sisi kanan input
                  transform: "translateY(-50%)", // Tengah vertikal
                  color: "#D0D0D0",
                  cursor: "pointer",
                }}
                size={20}
              />
            </Form.Group>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "20rem" }}>
          <Form>
            <div className="mt-3">
              <h6>Pencarian Terkini</h6>
              <ListGroup>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  1234ABC
                  <Button variant="link" size="sm">
                    <VscChromeClose style={{ color: "#8A8A8A" }} />
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                  7UY7192
                  <Button variant="link" size="sm">
                    <VscChromeClose style={{ color: "#8A8A8A" }} />
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        style={{ width: "25rem", top: "12rem", left: "50rem" }}
        show={showFilterDate}
        onHide={handleCloseDate}
        className="modal-calendar"
      >
        <Modal.Header closeButton />
        <Modal.Body>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            inline
            calendarClassName="custom-calendar"
            dayClassName={(date) =>
              date.getDay() === 0 ? "highlighted-day" : undefined
            }
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <div className="custom-header">
                <button className="prev-button" onClick={decreaseMonth}>
                  {"<"}
                </button>
                <span className="current-month">
                  {date.toLocaleString("default", { month: "long" })}{" "}
                  {date.getFullYear()}
                </span>
                <button className="next-button" onClick={increaseMonth}>
                  {">"}
                </button>
              </div>
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          {/* Tombol Reset */}
          <Button
            variant="outline-secondary"
            onClick={() => {
              setSelectedDate(null); // Reset tanggal yang dipilih
              setFilterDate(null); // Reset filter di context
              handleCloseDate(); // Tutup modal
            }}
          >
            Reset
          </Button>

          {/* Tombol Simpan */}
          <Button
            className="text-white button-calendar"
            style={{ backgroundColor: "#4B1979" }}
            variant="none"
            onClick={handleSaveDate}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default function NotifikasiLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <PageHeader />
      {children}
    </>
  );
}
