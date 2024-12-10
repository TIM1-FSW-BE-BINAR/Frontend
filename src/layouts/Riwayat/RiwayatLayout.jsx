import React, { useState, useEffect } from "react";
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
import { LocalizationProvider, DateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./RiwayatLayout.css";
import { useRiwayatContext } from "../../components/Riwayat/RiwayatContext";

function PageHeader() {
  const [showFilterDate, setShowFilterDate] = useState(false);
  const { setFilterDate, setSearchQuery } = useRiwayatContext();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState([null, null]);
  const [confirmedDate, setConfirmedDate] = useState(new Date());
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleShowDate = () => setShowFilterDate(true);
  const handleCloseDate = () => setShowFilterDate(false);
  const handleShowSearch = () => setShowSearch(true);
  const handleCloseSearch = () => setShowSearch(false);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const handleSaveDate = () => {
    setFilterDate(selectedDate);
    setConfirmedDate(selectedDate);
    setShowFilterDate(false);
  };

  const handleSearch = () => {
    if (!searchInput.trim()) {
      setSearchQuery("");
      setSearchInput("");
      return;
    }

    setSearchQuery(searchInput);

    const updatedHistory = [
      searchInput,
      ...searchHistory.filter((item) => item !== searchInput),
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleHistorySearch = (item) => {
    setSearchQuery(item);
  };

  const handleDeleteHistory = (item) => {
    const updatedHistory = searchHistory.filter((history) => history !== item);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

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
            className="d-flex m-0 fw-bold fs-4 text-start"
            style={{ position: "relative", color: "#000000", right: "7rem" }}
          >
            History
          </h1>
        </Col>
      </Row>

      {/* Tombol Beranda dan Filter */}
      <Row className="m-5 justify-content-center">
        <Col
          md={9}
          className="d-flex align-items-center justify-content-center"
        >
          <ListGroup>
            <ListGroup.Item
              style={{
                background: "#A06ECE",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderRadius: "15px",
                width: "70rem",
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
                  onClick={handleShowDate}
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

      {/* Modal Pencarian */}
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
                placeholder="Masukkan Booking Code"
                style={{ paddingRight: "40px" }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)} // Update state input
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(); // Jalankan pencarian saat Enter ditekan
                    e.preventDefault();
                  }
                }}
              />

              <VscSearch
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  color: "#D0D0D0",
                  cursor: "pointer",
                }}
                size={20}
                onClick={handleSearch}
              />
            </Form.Group>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "20rem", overflowY: "auto" }}>
          <Form>
            <div className="mt-3">
              <h6>Pencarian Terkini</h6>
              <ListGroup>
                {searchHistory.map((item, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                    onClick={() => handleHistorySearch(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item}
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleDeleteHistory(item)}
                    >
                      <VscChromeClose style={{ color: "#8A8A8A" }} />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Filter Tanggal */}
      <Modal
        style={{ width: "25rem", top: "12rem", left: "54rem" }}
        show={showFilterDate}
        onHide={handleCloseDate}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(startProps, endProps) => (
                <div className="d-flex flex-column">
                  <Form.Group className="mb-3">
                    <Form.Control
                      {...startProps.inputProps}
                      ref={startProps.inputRef}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      {...endProps.inputProps}
                      ref={endProps.inputRef}
                    />
                  </Form.Group>
                </div>
              )}
            />
          </LocalizationProvider>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ backgroundColor: "#4B1979" }}
            variant="none"
            className="text-white"
            onClick={handleSaveDate}
          >
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
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
