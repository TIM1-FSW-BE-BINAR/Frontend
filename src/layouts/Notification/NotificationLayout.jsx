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
import "./NotificationLayout.css";
import { useNotificationContext } from "../../components/Notification/NotificationContext";

function PageHeader() {
  const [showFilterDate, setShowFilterDate] = useState(false);
  const { setFilterDate, setSearchQuery } = useNotificationContext();
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
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
    <>
      <Row className="align-items-center justify-content-center">
        <Col md={10} lg={10} className="text-start">
          <h1 className="mt-4 fw-bold fs-4 title-header text-wrap text-start text-dark">
            Notification
          </h1>
        </Col>
      </Row>

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
              className="d-flex justify-content-between align-items-center p-3"
            >
              <Button
                variant="link"
                as={Link}
                to="/"
                className="text-decoration-none d-flex align-items-center"
                style={{ color: "white" }}
              >
                <VscArrowLeft className="me-2" size={20} /> Home
              </Button>

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
        <Modal.Body className="p-0">
          <div className="d-flex flex-column justify-content-between align-items-center">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              calendarClassName="custom-calendar"
              dayClassName={(date) =>
                date.getDay() === 0 ? "text-danger" : undefined
              }
              renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
                <div className="d-flex justify-content-between align-items-center w-100 px-3">
                  <Button
                    variant="link"
                    onClick={decreaseMonth}
                    className="text-dark"
                  >
                    <VscChevronLeft size={20} />
                  </Button>
                  <span className="fw-bold">{format(date, "MMMM yyyy")}</span>
                  <Button
                    variant="link"
                    onClick={increaseMonth}
                    className="text-dark"
                  >
                    <VscChevronRight size={20} />
                  </Button>
                </div>
              )}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-end border-0">
          <div className="d-flex justify-content-between button-group">
            <Button
              className="button-reset-calendar align-self-center"
              variant="outline-secondary"
              onClick={() => {
                setSelectedDate(null);
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

export default function NotificationLayout({ children }) {
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
