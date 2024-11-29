import NavigationBar from "../components/Navbar";
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

function PageHeader() {
  const [showFilterDate, setShowFilterDate] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleShowDate = () => setShowFilterDate(true);
  const handleCloseDate = () => setShowFilterDate(false);
  const handleShowSearch = () => setShowSearch(true);
  const handleCloseSearch = () => setShowSearch(false);

  return (
    <Container fluid className="bg-light">
      {/* Header riwayat */}
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
            History
          </h1>
        </Col>
      </Row>

      {/* Tombol Beranda dan Filter */}
      <Row className="m-5 align-items-center">
        <Col md={9} className="offset-md-2 d-flex align-items-center">
          <ListGroup className="w-100">
            <ListGroup.Item
              style={{
                background: "#A06ECE",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "15px",
              }}
            >
              {/* Tombol Beranda */}
              <Button
                variant="Link"
                as={Link}
                className="text-decoration-none d-flex align-items-center"
                to="/"
                style={{ color: "white" }}
              >
                <VscArrowLeft className="me-2" size={20} /> Beranda
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
        style={{ width: "17rem", top: "12.8rem", left: "63rem" }}
        show={showFilterDate}
        onHide={handleCloseDate}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              controlId="filterDate"
              className="d-flex align-items-center justify-content-center"
            >
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                inline
                calendarClassName="custom-calendar" // Tambahkan className untuk calendar
                dayClassName={(date) =>
                  date.getDay() === 0 || date.getDay() === 6
                    ? "weekend-day" // Kustom untuk weekend
                    : undefined
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: "#4B1979" }} variant="primary">
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Custom Style */}
      <style jsx>{`
        .custom-calendar {
          border: none;
          background-color: #f9f9f9;
        }

        .react-datepicker__day--selected {
          background-color: #7126b5 !important;
          color: white !important;
        }

        .weekend-day {
          color: red;
        }

        .react-datepicker__header {
          border: none;
        }
      `}</style>
    </Container>
  );
}

export default function RiwayatLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <PageHeader />
      {children}
    </>
  );
}
