import { useRef } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormLabel,
  Modal,
  Row,
} from "react-bootstrap";
import "./ScreenHomepage.css";
import kotak1 from "../../assets/homepage/kotak1.png";
import kotak2 from "../../assets/homepage/kotak2.png";
import bannerImg from "../../assets/homepage/bannerImg.png";
import flightIcon from "../../assets/homepage/icon/flight-takeoff-icon.png";
import returnIcon from "../../assets/homepage/icon/return-icon.png";
import dateIcon from "../../assets/homepage/icon/date-icon.png";
import seatIcon from "../../assets/homepage/icon/seat-icon.png";
import adultIcon from "../../assets/homepage/icon/adult-icon.png";
import childIcon from "../../assets/homepage/icon/child-icon.png";
import babyIcon from "../../assets/homepage/icon/baby-icon.png";
import selectedIcon from "../../assets/homepage/icon/selected-icon.png";
import notFoundImage from "../../assets/homepage/not-found.png";
import CardHomepageLoading from "../Loading/cardHomepageLoading";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import HomepageModal from "./HomepageModal";
import PassengerRow from "./PasenggerRow";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { LocalizationProvider } from "@mui/x-date-pickers-pro/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { PaginationControl } from "react-bootstrap-pagination-control";
import toast, { Toaster } from "react-hot-toast";

import { useQuery } from "@tanstack/react-query";
import { getFlights } from "../../service/flight/flightService";
import { useNavigate } from "@tanstack/react-router";
import { getAirports } from "../../service/airport/airportService";

const ScreenHomepage = () => {
  return <Homepage />;
};

const Homepage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [modalInputValue, setModalInputValue] = useState("");
  const [PassengerModalShow, setPassengerModalShow] = useState(false);
  const [classModalShow, setClassModalShow] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedElement, setSelectedElement] = useState(null);
  const [tempClassInput, setTempClassInput] = useState("");
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const departureDateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [fromInput, setFromInput] = useState("Jakarta-CGK");
  const [toInput, setToInput] = useState("Surabaya-SUB");
  const [departureDate, setDepartureDate] = useState(
    departureDateFormat(new Date().toISOString())
  );
  const [returnDate, setReturnDate] = useState("");
  const [adultInput, setAdultInput] = useState(1);
  const [childInput, setChildInput] = useState(0);
  const [babyInput, setBabyInput] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState(1);
  const [classInput, setClassInput] = useState("Economy");

  const [today, setToday] = useState("");
  useEffect(() => {
    const now = new Date();
    const utcDate = now.toISOString();
    setToday(utcDate);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("lastFrom")) {
      setFromInput(localStorage.getItem("lastFrom"));
      setToInput(localStorage.getItem("lastTo"));
      setDepartureDate(localStorage.getItem("lastDeparture"));
      setReturnDate(localStorage.getItem("lastReturn"));
      setAdultInput(parseInt(localStorage.getItem("lastAdult")));
      setChildInput(parseInt(localStorage.getItem("lastChild")));
      setBabyInput(parseInt(localStorage.getItem("lastBaby")));
      setClassInput(localStorage.getItem("lastClass"));
    }
  }, []);

  // Pagination
  const [page, setPage] = useState(1);

  const handleButtonCardClick = (index) => {
    setActiveButton(index);
  };

  const handleSelectClass = (className, elementId, label) => {
    setSelectedClass(className);
    setSelectedElement(elementId);
    setTempClassInput(label);
  };

  const handleModalSubmit = (value) => {
    if (activeModal === "from") {
      setFromInput(value);
    } else if (activeModal === "to") {
      setToInput(value);
    }
    setModalShow(false);
  };

  const handleSwitch = () => {
    setFromInput(toInput);
    setToInput(fromInput);
  };

  const handlePassengerClose = () => {
    setPassengerModalShow(false);
  };

  const handleClassClose = () => {
    setClassModalShow(false);
    setTempClassInput("");
  };

  const incrementInputPassengers = (typePassenger) => {
    if (typePassenger == "adult") {
      setAdultInput(adultInput + 1);
    } else if (typePassenger == "child") {
      setChildInput(childInput + 1);
    } else {
      setBabyInput(babyInput + 1);
    }
  };

  const decrementInputPassengers = (typePassenger) => {
    if (typePassenger == "adult" && adultInput > 0) {
      setAdultInput(adultInput - 1);
    } else if (typePassenger == "child" && childInput > 0) {
      setChildInput(childInput - 1);
    } else if (typePassenger == "baby" && babyInput > 0) {
      setBabyInput(babyInput - 1);
    }
  };

  const handleSavePassengers = () => {
    setTotalPassengers(adultInput + childInput + babyInput);
    setPassengerModalShow(false);
  };

  const handleSaveClass = () => {
    setClassInput(tempClassInput);
    setClassModalShow(false);
  };

  const navigate = useNavigate();

  const handleSearchPage = (e) => {
    e.preventDefault();
    if (
      fromInput == "" ||
      toInput == "" ||
      departureDate == "" ||
      totalPassengers == "" ||
      classInput == ""
    ) {
      toast.error("Please fill out all fields in the form!");
    } else {
      if (departureDate < departureDateFormat(today)) {
        toast.error("Cannot select date before today!");
      } else {
        if (adultInput == 0 && childInput == 0 && babyInput > 0) {
          toast.error(
            "You cannot select a flight for infants without an accompanying adult."
          );
        } else {
          const queryParams = new URLSearchParams({
            fromInput,
            toInput,
            departureDate,
            returnDate: checkedSwitch ? returnDate : "",
            totalPassengers,
            adultInput,
            childInput,
            babyInput,
            classInput,
          }).toString();
          localStorage.setItem("lastFrom", fromInput);
          localStorage.setItem("lastTo", toInput);
          localStorage.setItem("lastDeparture", departureDate);
          localStorage.setItem("lastReturn", checkedSwitch ? returnDate : "");
          localStorage.setItem("lastAdult", adultInput);
          localStorage.setItem("lastChild", childInput);
          localStorage.setItem("lastBaby", babyInput);
          localStorage.setItem("lastClass", classInput);
          navigate({
            to: `/search?${queryParams}`,
          });
        }
      }
    }
  };

  const [flightsData, setFlightsData] = useState([]);
  const [state, setState] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const [flightsDataAll, setFlightsDataAll] = useState([]);
  const flightsDataAllRef = useRef(null); 
  const pageItems = 10;

  // Fungsi untuk memeriksa apakah state berubah
  const stateChanged = () => {
    return (
      flightsDataAllRef.current !== null &&
      flightsDataAllRef.current.state !== state
    );
  };

  const {
    data: flightData,
    isSuccess: isSuccessFlight,
    isPending: isPendingFlight,
    isError: isErrorFlight,
  } = useQuery({
    queryKey: ["flights", page, state],
    queryFn: () =>
      getFlights({
        ...(state !== "All" && { state: state }),
        startDeparture: today,
        page,
        limit: 10,
      }),
    enabled: !!page && !!today,
  });

  useEffect(() => {
    if (isSuccessFlight) {
      setFlightsData(flightData.data);
      const totalPage = flightData.meta.pagination.totalPage;
      const totalData = parseInt(totalPage, 10) * parseInt(pageItems, 10);

      if (flightsDataAllRef.current === null || stateChanged()) {
        flightsDataAllRef.current = totalData;
        setFlightsDataAll(totalData);
      }

      setLoading(false);
      if (flightData.data.length == 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else if (isErrorFlight) {
      toast.error("Something went wrong");
    } else if (isPendingFlight) {
      setLoading(true);
    }
  }, [
    flightData,
    isSuccessFlight,
    isErrorFlight,
    isPendingFlight,
    stateChanged,
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year}`;
  };

  const classInputFormat = (flightClass) => {
    if (flightClass === "FIRST") {
      flightClass = "First Class";
    } else if (flightClass === "PREMIUM_ECONOMY") {
      flightClass = "Premium Economy";
    }
    return flightClass;
  };

  const handleFlightSelect = (flightSelect) => {
    const fromInputSelect = `${flightSelect.departure.city}-${flightSelect.departure.code}`;
    const toInputSelect = `${flightSelect.arrival.city}-${flightSelect.arrival.code}`;
    const departureDateSelect = departureDateFormat(flightSelect.departureTime);
    const classInputSelect = classInputFormat(flightSelect.class);
    setFromInput(fromInputSelect);
    setToInput(toInputSelect);
    setDepartureDate(departureDateSelect);
    setReturnDate("");
    setClassInput(classInputSelect);
    toast("Form updated!", {
      icon: "✈️",
    });
  };

  const [airportsAll, setAirportsAll] = useState("");
  const {
    data: airportsData,
    isSuccess: isSuccessAirports,
    isError: isErrorAirports,
  } = useQuery({
    queryKey: ["airports"],
    queryFn: () => getAirports(),
  });

  useEffect(() => {
    if (isSuccessAirports) {
      setAirportsAll(airportsData);
    } else if (isErrorAirports) {
      toast.error("Something went wrong");
    }
  }, [airportsData, isErrorAirports, isSuccessAirports]);

  function formatToIDR(price) {
    return price
      .toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })
      .replace(",00", "");
  }

  return (
    <>
      <section id="hero">
        <Container fluid className="p-0 mt-4 ">
          <Row className="position-relative justify-content-between">
            <Col xs={2} sm={3} md={2} className="mt-5 d-none d-sm-block">
              <img className="w-100" src={kotak1} alt="" />
            </Col>

            <Col className="w-full position-absolute top-0 start-50 translate-middle-x z-index-2 banner-img">
              <Container
                fluid
                className="p-0 rounded"
                style={{ backgroundColor: "#FFE9CA" }}
              >
                <Row>
                  <Col
                    xs={12}
                    md={4}
                    className="p-5 align-items-center d-none d-md-block"
                  >
                    <h1 className="banner-text">
                      <i>Today{"`"}s Discount</i>
                    </h1>
                    <h1
                      className="banner-text"
                      style={{
                        color: "#7126b5",
                      }}
                    >
                      85%!
                    </h1>
                  </Col>
                  <Col xs={12} md={8}>
                    {/* Small screen */}
                    <div className="d-block d-md-none d-flex position-relative">
                      <div className="position-absolute p-2">
                        <h2>
                          <i>Today{"`"}s Discount</i>{" "}
                          <span className="text-primary">85%!</span>
                        </h2>
                      </div>
                      <img
                        className="img-fluid w-100"
                        src={bannerImg}
                        alt=""
                        style={{ backgroundColor: "#FFF" }}
                      />
                    </div>
                    {/* Large screen */}
                    <img
                      className="img-fluid w-100 h-100 d-none d-md-block"
                      src={bannerImg}
                      alt=""
                      style={{ backgroundColor: "#FFF" }}
                    />
                  </Col>
                </Row>
              </Container>
            </Col>

            <Col xs={12} sm={3} md={2} className="mt-5 d-none d-sm-block">
              <img className="w-100" src={kotak2} alt="" />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="form" className="form-section">
        <Container fluid className="px-0 form-container">
          <Container className="form-container-content p-4">
            <Row>
              <Col>
                <h3>
                  Choose a Special Flight Schedule with{" "}
                  <span className="" style={{ color: "#7126b5" }}>
                    AirFly!
                  </span>
                </h3>
              </Col>
            </Row>
            <Row>
              <Form onSubmit={handleSearchPage}>
                {/* Baris pertama */}
                <Row className="">
                  <Col sm={12} md={5}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        column
                        sm={2}
                        md={4}
                        lg={3}
                        xl={2}
                        className="d-flex me-md-4 me-sm-2 me-lg-2"
                      >
                        <img
                          src={flightIcon}
                          className="form-icon me-2 mt-1"
                          alt=""
                        />
                        <span className="mt-2">From</span>
                      </Form.Label>
                      <Col className="mt-2">
                        <Form.Control
                          type="text"
                          placeholder="Jakarta"
                          className="form-input"
                          value={fromInput}
                          onClick={() => {
                            setActiveModal("from");
                            setModalShow(true);
                          }}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                  <Col sm={12} md={1} className="d-flex justify-content-center">
                    <Button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        padding: "0",
                      }}
                    >
                      <img
                        src={returnIcon}
                        className="mt-2 return-icon animated-button"
                        alt=""
                        onClick={handleSwitch}
                      />
                    </Button>
                  </Col>
                  <Col sm={12} md={6}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label column sm={2} className="d-flex me-2">
                        <img
                          src={flightIcon}
                          className="form-icon me-2 mt-1"
                          alt=""
                        />
                        <span className="mt-2">To</span>
                      </Form.Label>
                      <Col className="mt-2">
                        <Form.Control
                          type="text"
                          placeholder="Dubai"
                          className="form-input"
                          value={toInput}
                          onClick={() => {
                            setActiveModal("to");
                            setModalShow(true);
                          }}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Baris kedua */}
                <Row className="">
                  <Col sm={11} md={11} lg={5}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        column
                        sm={2}
                        lg={12}
                        xl={2}
                        className="d-flex me-2"
                      >
                        <img
                          src={dateIcon}
                          className="form-icon me-2 mt-4"
                          alt=""
                        />
                        <span className="mt-4">Date</span>
                      </Form.Label>
                      {checkedSwitch ? (
                        <>
                          <Col className="mt-3">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DateRangePicker
                                localeText={{
                                  start: "Departure",
                                  end: "Return",
                                }}
                                value={[
                                  departureDate ? dayjs(departureDate) : null,
                                  returnDate ? dayjs(returnDate) : null,
                                ]}
                                onChange={(e) => {
                                  setDepartureDate(
                                    dayjs(e[0]).format("YYYY-MM-DD")
                                  );
                                  setReturnDate(
                                    dayjs(e[1]).format("YYYY-MM-DD")
                                  );
                                }}
                              />
                            </LocalizationProvider>
                          </Col>
                        </>
                      ) : (
                        <>
                          <Col className="mt-2">
                            <FormLabel>Departure</FormLabel>
                            <Form.Control
                              type="date"
                              className="form-input"
                              value={departureDate}
                              onChange={(e) => setDepartureDate(e.target.value)}
                            />
                          </Col>
                        </>
                      )}
                    </Form.Group>
                  </Col>
                  <Col
                    sm={1}
                    md={1}
                    lg={1}
                    className="d-flex justify-content-center"
                  >
                    <Form.Check
                      type="switch"
                      className="custom-switch"
                      onChange={(e) => setCheckedSwitch(e.target.checked)}
                    />
                  </Col>
                  <Col sm={12} md={12} lg={6}>
                    <Form.Group as={Row} className="mb-3">
                      <Form.Label
                        column
                        sm={2}
                        lg={12}
                        xl={2}
                        className="d-flex me-2"
                      >
                        <img
                          src={seatIcon}
                          className="form-icon me-2 mt-4"
                          alt=""
                        />
                        <span className="mt-4">To</span>
                      </Form.Label>
                      <Col className="mt-2">
                        <FormLabel>Passengers</FormLabel>
                        <Form.Control
                          type="text"
                          placeholder="Add Passengers"
                          className="form-input"
                          value={
                            totalPassengers
                              ? `${adultInput > 0 ? `${adultInput} Adult` : ""}${
                                  childInput > 0
                                    ? `${adultInput > 0 ? ", " : ""}${childInput} Child`
                                    : ""
                                }${
                                  babyInput > 0
                                    ? `${adultInput > 0 || childInput > 0 ? ", " : ""}${babyInput} Baby`
                                    : ""
                                }`
                              : ""
                          }
                          onClick={() => setPassengerModalShow(true)}
                          readOnly
                        />
                      </Col>
                      <Col className="mt-2">
                        <FormLabel>Seat Class</FormLabel>
                        <Form.Control
                          type="text"
                          placeholder="Select Class"
                          className="form-input"
                          onClick={() => setClassModalShow(true)}
                          value={classInput}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>

                <Button
                  type="submit"
                  className="btn btn-block w-100 mt-2 mx-0 animated-button"
                  style={{ backgroundColor: "#7126b5", border: "none" }}
                >
                  Search for Flights
                </Button>
              </Form>
            </Row>
          </Container>
        </Container>

        {/* Memanggil from to modal */}
        {isSuccessAirports && airportsAll && (
          <HomepageModal
            show={modalShow}
            activeModal={activeModal}
            flights={airportsAll}
            onHide={() => setModalShow(false)}
            inputValue={modalInputValue}
            setInputValue={setModalInputValue}
            onSubmit={handleModalSubmit}
          />
        )}

        {/* Passengers Modal */}
        <Modal
          show={PassengerModalShow}
          onHide={handlePassengerClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            className="d-flex align-items-center"
            style={{ border: "none" }}
          ></Modal.Header>

          <Modal.Body className="pt-2">
            <Container>
              <PassengerRow
                icon={adultIcon}
                label="Adult"
                ageInfo="(12 Years and Above)"
                inputValue={adultInput}
                onIncrement={() => incrementInputPassengers("adult")}
                onDecrement={() => decrementInputPassengers("adult")}
              />
              <PassengerRow
                icon={childIcon}
                label="Child"
                ageInfo="(2 - 11 Years Old)"
                inputValue={childInput}
                onIncrement={() => incrementInputPassengers("child")}
                onDecrement={() => decrementInputPassengers("child")}
              />
              <PassengerRow
                icon={babyIcon}
                label="Baby"
                ageInfo="(Under 2 Years Old)"
                inputValue={babyInput}
                onIncrement={() => incrementInputPassengers("baby")}
                onDecrement={() => decrementInputPassengers("baby")}
              />
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={handleSavePassengers}
              className="animated-button"
              style={{ backgroundColor: "#7126b5", border: "none" }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Class Modal */}
        <Modal
          show={classModalShow}
          onHide={handleClassClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header
            closeButton
            className="d-flex align-items-center"
            style={{ border: "none" }}
          ></Modal.Header>

          <Modal.Body className="pt-2">
            <Container className="class-modal-content">
              <Row
                className={`${selectedElement === "economyBtn" ? "selected" : ""} d-flex justify-content-between border p-1`}
                onClick={() =>
                  handleSelectClass("economy", "economyBtn", "Economy")
                }
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>Economy</h6>
                </Col>

                {selectedClass === "economy" && (
                  <Col>
                    <img
                      src={selectedIcon}
                      className="img-fluid selected-icon"
                      alt=""
                    />
                  </Col>
                )}
              </Row>
              <Row
                className={`${selectedElement === "premiumEconomyBtn" ? "selected" : ""} d-flex justify-content-between border p-1`}
                onClick={() =>
                  handleSelectClass(
                    "premiumEconomy",
                    "premiumEconomyBtn",
                    "Premium Economy"
                  )
                }
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>Premium Economy</h6>
                </Col>

                {selectedClass === "premiumEconomy" && (
                  <Col>
                    <img
                      src={selectedIcon}
                      className="img-fluid selected-icon"
                      alt=""
                    />
                  </Col>
                )}
              </Row>
              <Row
                className={`${selectedElement === "businessBtn" ? "selected" : ""} d-flex justify-content-between border p-1`}
                onClick={() =>
                  handleSelectClass("business", "businessBtn", "Business")
                }
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>Business</h6>
                </Col>

                {selectedClass === "business" && (
                  <Col>
                    <img
                      src={selectedIcon}
                      className="img-fluid selected-icon"
                      alt=""
                    />
                  </Col>
                )}
              </Row>
              <Row
                className={`${selectedElement === "firstClassBtn" ? "selected" : ""} d-flex justify-content-between border p-1`}
                onClick={() =>
                  handleSelectClass(
                    "firstClass",
                    "firstClassBtn",
                    "First Class"
                  )
                }
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>First Class</h6>
                </Col>

                {selectedClass === "firstClass" && (
                  <Col>
                    <img
                      src={selectedIcon}
                      className="img-fluid selected-icon"
                      alt=""
                    />
                  </Col>
                )}
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClassClose}
              className="animated-button"
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveClass}
              className="animated-button"
              style={{ backgroundColor: "#7126b5", border: "none" }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </section>

      <section id="favorit">
        <Container className="mt-3">
          <Row className="mb-2">
            <h2>Favorite Destinations</h2>
          </Row>
          <Row className="g-2 mb-2 flex-wrap">
            {["All", "Asia", "America", "Australia", "Europe", "Africa"].map(
              (label, index) => (
                <Col
                  key={index}
                  xs={4}
                  sm={3}
                  md={2}
                  lg={1}
                  className={`d-flex align-items-center justify-content-center m-2 rounded responsive-button ${
                    activeButton === index ? "active" : ""
                  }`}
                  onClick={() => {
                    handleButtonCardClick(index);
                    setNotFound(false);
                    setState(label);
                    setPage(1);
                  }}
                >
                  <FaSearch className="icon" />
                  <span className="button-label">{label}</span>
                </Col>
              )
            )}
          </Row>
          <Row
            className={`g-2 mb-5 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 ${
              notFound ? "justify-content-center" : ""
            }`}
          >
            {loading ? (
              <CardHomepageLoading />
            ) : notFound ? (
              <Col className="d-flex flex-column justify-content-center align-items-center w-50 mt-3">
                <img src={notFoundImage} className="img-fluid w-75 mt-5" />
                <span className="text-center fw-bold fs-6 fs-sm-5 fs-md-4">
                  Sorry, your search was not found.
                </span>
              </Col>
            ) : (
              flightsData?.map((flight, index) => (
                <Col key={index} className="d-flex">
                  <Card
                    className="custom-card"
                    onClick={() => handleFlightSelect(flight)}
                  >
                    <Card.Img
                      variant="top"
                      src={flight?.arrival.imageUrl}
                      className="img-fluid"
                    />
                    <Card.Body className="custom-card-body">
                      <Card.Title
                        className="card-title"
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {flight?.departure.city} <FaArrowRight />{" "}
                        {flight?.arrival.city}
                      </Card.Title>
                      <p
                        className="mb-1"
                        style={{
                          fontSize: "14px",
                          color: "#7126b5",
                        }}
                      >
                        {flight?.airline.name}
                      </p>
                      <Card.Text>
                        <p
                          className="mb-1"
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          {formatDate(flight?.departureTime)}
                        </p>
                        <p
                          className=""
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          Starts from{" "}
                          <span
                            className="text-danger"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            {formatToIDR(flight?.price)}
                          </span>
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )}
          </Row>
          <Row className="d-flex w-full justify-content-right align-items-right">
            <PaginationControl
              page={page}
              between={4}
              total={flightsDataAll}
              limit={10}
              changePage={(page) => {
                setPage(page);
              }}
              ellipsis={1}
              style={{
                color: "#7126b5",
              }}
            />
          </Row>
        </Container>
      </section>

      <div>
        <Toaster
          position="top-right"
          containerStyle={{
            position: "fixed",
            zIndex: "9999",
          }}
          reverseOrder={false}
        />
      </div>
    </>
  );
};

export default ScreenHomepage;
