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
  VscArrowRight,
  VscChevronLeft,
  VscChevronRight,
  VscFilter,
  VscSearch,
  VscChromeClose,
} from "react-icons/vsc";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { TextField, Button as MUIButton } from "@mui/material";
import "./RiwayatLayout.css";
import { useRiwayatContext } from "../../components/Riwayat/RiwayatContext";

function PageHeader() {
  const [showFilterDate, setShowFilterDate] = useState(false);
  const { setSearchQuery, setFilterDate } = useRiwayatContext();
  const [showSearch, setShowSearch] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);

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
    if (dateRange[0] && dateRange[1]) {
      setFilterDate(dateRange); // Simpan filter date ke konteks
    } else {
      setFilterDate(null); // Reset jika rentang tanggal tidak valid
    }
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
    <>
      {/* Header Notifikasi */}
      <Row className="align-items-center justify-content-center">
        <Col md={10} lg={10} className="text-start">
          <h1 className="fw-bold fs-4 title-header text-wrap text-start text-dark">
            History
          </h1>
        </Col>
      </Row>

      {/* Tombol Beranda dan Filter */}
      <Row className="align-items-center justify-content-center mt-4">
        <Col md={10} lg={10}>
          <ListGroup>
            <ListGroup.Item
              style={{
                background: "#A06ECE",
                display: "flex",
                height: "3.5rem",

                borderRadius: "15px",
              }}
              className="listGroup-custom d-flex justify-content-between align-items-center p-3 w-100"
            >
              {/* Tombol Beranda */}
              <Button
                variant="link"
                as={Link}
                to="/"
                className="text-decoration-none d-flex align-items-center"
                style={{ color: "white" }}
              >
                <VscArrowLeft className="me-2" size={20} /> Home
              </Button>

              {/* Tombol Filter dan Search */}
              <div className="d-flex align-items-center">
                <Button
                  variant="light"
                  className="d-flex align-items-center justify-content-center me-2 "
                  style={{ borderRadius: "10px", height: "2rem" }}
                  onClick={handleShowDate}
                >
                  <VscFilter className="me-2" size={20} /> Filter
                </Button>

                <Button variant="link" onClick={handleShowSearch}>
                  <VscSearch
                    className="search-icon"
                    style={{ color: "#151515" }}
                    size={20}
                  />
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>

      <Modal show={showSearch} onHide={handleCloseSearch} centered>
        <Modal.Header closeButton>
          <Form.Group controlId="filterSearch">
            <Form.Control
              className="search-column "
              type="text"
              placeholder="Input your search..."
              style={{ width: "27rem" }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                  e.preventDefault();
                }
              }}
            />
          </Form.Group>
        </Modal.Header>
        <Modal.Body style={{ height: "20rem", overflowY: "auto" }}>
          <h6>Recent History</h6>
          <ListGroup>
            {searchHistory.map((item, index) => (
              <ListGroup.Item
                key={index}
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
        </Modal.Body>
      </Modal>

      <Modal
        show={showFilterDate}
        onHide={handleCloseDate}
        centered
        dialogClassName="modal-calendar"
      >
        <Modal.Header closeButton className="border-0" />
        <Modal.Body>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Start Date"
              endText="End Date"
              value={dateRange}
              onChange={(newValue) => setDateRange(newValue)}
              renderInput={(startProps, endProps) => (
                <div style={{ display: "flex", gap: "1rem" }}>
                  <TextField {...startProps} fullWidth />
                  <TextField {...endProps} fullWidth />
                </div>
              )}
            />
          </LocalizationProvider>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end border-0">
          <div className="d-flex justify-content-between button-group">
            <Button
              className="button-reset-calendar align-self-center"
              variant="outline-secondary"
              onClick={() => {
                setDateRange([null, null]);
                setFilterDate(null);
                handleCloseDate();
              }}
            >
              Reset
            </Button>
            <Button
              className="text-white button-calendar align-self-center ms-2"
              style={{ backgroundColor: "#4B1979" }}
              variant="none"
              onClick={handleSaveDate}
            >
              Save
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function RiwayatLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <Container fluid="xxl">
        <PageHeader />
        {children}
      </Container>
    </>
  );
}
