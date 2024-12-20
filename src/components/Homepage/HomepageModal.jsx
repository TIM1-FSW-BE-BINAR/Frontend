import { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import searchIcon from "../../assets/homepage/icon/search-icon.png";
import { SlLocationPin } from "react-icons/sl";

const HomepageModal = (props) => {
  const {
    inputValue,
    setInputValue,
    onSubmit,
    show,
    onHide,
    flights,
    activeModal,
  } = props;

  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    if (show) {
      setInputValue("");

      const uniqueFlights = flights.reduce(
        (acc, flight) => {
          const key =
            activeModal === "from"
              ? `${flight.departure.city}-${flight.departure.code}`
              : `${flight.arrival.city}-${flight.arrival.code}`;
          if (!acc.map.has(key)) {
            acc.map.set(key, true);
            acc.list.push(flight);
          }
          return acc;
        },
        { map: new Map(), list: [] }
      ).list;

      setFilteredFlights(uniqueFlights);
    }
  }, [show, flights, activeModal, setInputValue]);

  useEffect(() => {
    if (inputValue.trim() === "") {
      const uniqueFlights = flights.reduce(
        (acc, flight) => {
          const key =
            activeModal === "from"
              ? `${flight.departure.city}-${flight.departure.code}`
              : `${flight.arrival.city}-${flight.arrival.code}`;
          if (!acc.map.has(key)) {
            acc.map.set(key, true);
            acc.list.push(flight);
          }
          return acc;
        },
        { map: new Map(), list: [] }
      ).list;

      setFilteredFlights(uniqueFlights);
    } else {
      const lowerCaseInput = inputValue.toLowerCase();
      const filtered = flights.filter((flight) => {
        const targetFields =
          activeModal === "from"
            ? `${flight.departure.city} ${flight.departure.code}`
            : `${flight.arrival.city} ${flight.arrival.code}`;
        return targetFields.toLowerCase().includes(lowerCaseInput);
      });

      const uniqueFiltered = filtered.reduce(
        (acc, flight) => {
          const key =
            activeModal === "from"
              ? `${flight.departure.city}-${flight.departure.code}`
              : `${flight.arrival.city}-${flight.arrival.code}`;
          if (!acc.map.has(key)) {
            acc.map.set(key, true);
            acc.list.push(flight);
          }
          return acc;
        },
        { map: new Map(), list: [] }
      ).list;

      setFilteredFlights(uniqueFiltered);
    }
  }, [inputValue, flights, activeModal]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleCitySelect = (city) => {
    if (city) {
      onSubmit(city);
    }
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-dialog-centered"
      style={{
        maxWidth: "100%",
        margin: "0 auto",
      }}
    >
      <Modal.Header
        closeButton
        className="d-flex align-items-center"
        style={{ border: "none" }}
      >
        <Modal.Title id="contained-modal-title-vcenter" className="w-100">
          <form
            className="d-flex"
            style={{
              maxWidth: "98%",
            }}
          >
            <div className="position-relative w-100">
              <Form.Control
                type="search"
                placeholder="Select a location"
                className="ps-5"
                aria-label="Search"
                style={{
                  paddingLeft: "40px",
                  width: "100%",
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
              />
              <img
                src={searchIcon}
                alt="Search Icon"
                className="position-absolute"
                style={{
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "20px",
                }}
              />
            </div>
          </form>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2">
        <Container className="p-0">
          <Row className="pt-1">
            <Col>
              <h6 className="fw-bold">Search</h6>
            </Col>
          </Row>

          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {filteredFlights.map((flight, index) =>
              activeModal === "from" ? (
                <Row
                  className="py-3 border-bottom list-item-city-modal"
                  key={index}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  onClick={() => {
                    const cityId = `${flight?.departure.city}-${flight.departure.code}`;
                    handleCitySelect(cityId);
                  }}
                >
                  <Col className="d-flex">
                    <SlLocationPin className="me-2" />
                    <h6>
                      {flight?.departure.city} - {flight?.departure.code}
                    </h6>
                  </Col>
                </Row>
              ) : (
                <Row
                  className="py-3 border-bottom list-item-city-modal"
                  key={index}
                  style={{
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  onClick={() => {
                    const cityId = `${flight?.arrival.city}-${flight.arrival.code}`;
                    handleCitySelect(cityId);
                  }}
                >
                  <Col className="d-flex">
                    <SlLocationPin className="me-2" />
                    <h6>
                      {flight?.arrival.city} - {flight?.arrival.code}
                    </h6>
                  </Col>
                </Row>
              )
            )}
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default HomepageModal;
