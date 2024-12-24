import { useEffect, useState } from "react";
import "../components/Search/SearchFlight.css";
import { Accordion, Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
import selectedIcon from "../assets/homepage/icon/selected-icon.png";
import longArrowRight from "../assets/homepage/icon/long-arrow-right-icon.png";
import baggageDelay from "../assets/homepage/icon/baggage-delay-icon.png";
import loadingImage from "../assets/homepage/loading.png";
import notFoundImage from "../assets/homepage/not-found.png";
import ticketSoldOutImage from "../assets/homepage/tickets-sold-out.png";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  addDays,
  isSameDay,
  endOfWeek,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getFlights, getFlightId } from "../service/flight/flightService";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

const SearchFlight = ({
  fromInput,
  toInput,
  departureDate,
  returnDate,
  passengers,
  adultInput,
  childInput,
  babyInput,
  classInput,
  departureAirportId,
  returnAirportId,
  date,
  setReturnScreen,
  setFlightSelect,
  flightSelect,
}) => {
  const navigate = useNavigate();

  const [returnPage, setReturnPage] = useState(false);

  useEffect(() => {
    if (flightSelect !== null) {
      setReturnPage(true);
    }
  }, [flightSelect]);

  const departureDateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const [today, setToday] = useState("");
  useEffect(() => {
    const now = new Date();
    const utcDate = now.toISOString();
    setToday(utcDate);
  }, []);

  useEffect(() => {
    if (today && departureDate < departureDateFormat(today)) {
      toast.error("Cannot select date before today!");
      navigate({ to: "/" });
    }
  }, [today, departureDate, navigate]);

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [ticketSoldOut, setTicketSoldOut] = useState(false);

  const [dateBtnActive, setDateBtnActive] = useState(null);
  const dateObj = new Date(date);
  const [currentWeek, setCurrentWeek] = useState(dateObj);
  const [weekDates, setWeekDates] = useState([]); 
  const [dateActive, setDateActive] = useState(date); 

  const calculateWeekDates = (baseDate) => {
    const startDate = startOfWeek(baseDate, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  // update tanggal saat minggu berubah
  useEffect(() => {
    const week = calculateWeekDates(currentWeek);

    setWeekDates((prevWeekDates) => {
      if (JSON.stringify(prevWeekDates) !== JSON.stringify(week)) {
        return week;
      }
      return prevWeekDates;
    });

    if (dateBtnActive === null) {
      const activeIndex = week.findIndex((date) => isSameDay(date, dateObj));
      setDateBtnActive(activeIndex);
    }
  }, [currentWeek, dateObj, dateBtnActive]);

 const handleNextWeek = () => {
   const maxDate = addWeeks(new Date(dateActive), 1);
   const lastDayOfCurrentWeek = endOfWeek(currentWeek, { weekStartsOn: 1 });

   if (lastDayOfCurrentWeek < maxDate) {
     setCurrentWeek((prevDate) => addWeeks(prevDate, 1));
   } else {
     toast.error("Cannot go further than one week ahead!");
   }
 };

 const handlePreviousWeek = () => {
   const minDate = subWeeks(new Date(dateActive), 1);
   const firstDayOfCurrentWeek = startOfWeek(currentWeek, { weekStartsOn: 1 });

   if (firstDayOfCurrentWeek > minDate) {
     setCurrentWeek((prevDate) => subWeeks(prevDate, 1));
   } else {
     toast.error("Cannot go further than one week back!");
   }
 };

  const handleDateBtnActive = (index, date) => {
    if (returnPage) {
      if (date < departureDate) {
        toast.error("Cannot select return date before departure date!");
      } else {
        setDateBtnActive(index);
        setDateActive(date);
        setTicketSoldOut(false);
      }
    } else {
      if (date < departureDateFormat(today)) {
        toast.error("Cannot select date before today!");
      } else {
        setDateBtnActive(index);
        setDateActive(date);
        setTicketSoldOut(false);
      }
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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

  const [filterShowModal, setFilterShowModal] = useState(false);
  const [filter, setFilter] = useState("Filter");
  const [tempFilter, setTempFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedElement, setSelectedElement] = useState("");

  const [filterChange, setFilterChange] = useState({});
  const [filterTempChange, setFilterTempChange] = useState({});
  const [flightsData, setFlightsData] = useState([]);

  const handleFilterClose = () => {
    setFilterShowModal(false);
  };

  const handleSaveFilter = () => {
    setFilter(tempFilter);

    setFilterShowModal(false);
    setFilterChange(filterTempChange);
  };

  const handleSelectFilter = (FilterName, elementId, label) => {
    setSelectedFilter(FilterName);
    setSelectedElement(elementId);
    setTempFilter(label);
  };

  const handleFilterTempChange = (newFilter) => {
    setFilterTempChange(newFilter);
  };

  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: ["search-flights", filterChange, dateActive],
    queryFn: () =>
      getFlights({
        departureAirport: departureAirportId,
        arrivalAirport: returnAirportId,
        seatClass: classInput,
        departureTime: dateActive,
        ...filterChange,
      }),
    enabled: !!departureAirportId && !!returnAirportId,
  });

  useEffect(() => {
    if (isSuccess) {
      setFlightsData(data.data);
      setLoading(false);

      if (data.data.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    } else if (isError) {
      console.log("fetch search nya error");
    } else if (isPending) {
      setLoading(true);
    }
  }, [
    data,
    isError,
    isSuccess,
    departureAirportId,
    returnAirportId,
    isPending,
  ]);

  const { user, token } = useSelector((state) => state.auth);

  const handleBookingPage = async (flight) => {
    const flightDataById = await getFlightId(flight?.id);
    if (flightDataById.error?.message) {
      // tiket nya habis
      setTicketSoldOut(true);
    } else {
      if (returnPage) {
        const queryParams = new URLSearchParams({
          flightId: flightSelect,
          returnFlightId: flight.id,
          totalPassengers: passengers,
          adultInput,
          childInput,
          babyInput,
        }).toString();

        if (user && token) {
          navigate({
            to: `/booking?${queryParams}`,
          });
        } else {
          toast.error("You need to login first!");
          setTimeout(() => {
            navigate({
              to: "/login",
            });
          }, 1000);
        }
      } else {
        if (returnDate !== "") {
          setFlightSelect(flight.id);
          setReturnScreen(true);
        } else {
          const queryParams = new URLSearchParams({
            flightId: flight.id,
            totalPassengers: passengers,
            adultInput,
            childInput,
            babyInput,
          }).toString();

          if (user && token) {
            navigate({
              to: `/booking?${queryParams}`,
            });
          } else {
            toast.error("You need to login first!");
            setTimeout(() => {
              navigate({
                to: "/login",
              });
            }, 1000);
          }
        }
      }
    }
  };

  const initialTime = 15 * 60;
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("timeLeft");
    return savedTime ? parseInt(savedTime, 10) : initialTime;
  });
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    let interval;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev > 0 ? prev - 1 : 0;
          localStorage.setItem("timeLeft", newTime);
          return newTime;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleResetTimer = () => {
    setTimeLeft(initialTime);
    localStorage.setItem("timeLeft", initialTime);
    setIsTimerActive(true);
  };

  return (
    <>
      <Container className="">
        <Row className="mt-5 mb-2">
          <h2>Select a Flight {returnPage ? "Return" : ""}</h2>
        </Row>
        <Row>
          <Col xs={12} sm={8} md={8} className="mb-2 mb-sm-0">
            <Button
              className="p-3 w-100 text-start back-btn"
              style={{ background: "#A06ECE", border: "none" }}
              onClick={() => navigate({ to: "/" })}
            >
              <FaArrowLeft className="me-2" />
              {fromInput} {">"} {toInput} - {passengers} Passenger -{" "}
              {classInput}
            </Button>
          </Col>
          <Col>
            <Button
              className="p-3 w-100 ubah-btn animated-button"
              style={{
                background: "#73CA5C",
                border: "none",
              }}
              onClick={() => navigate({ to: "/" })}
            >
              Change Search
            </Button>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-between pt-3">
          <Col>
            <Button
              onClick={handlePreviousWeek}
              className="animated-button"
              style={{ backgroundColor: "#7126b5", border: "none" }}
            >
              <FaArrowLeft />
            </Button>
          </Col>
          <Col
            xs={8}
            sm={9}
            lg={10}
            className="d-flex flex-wrap justify-content-center gap-3 w-full"
          >
            {weekDates.map((date, index) => (
              <Button
                key={index}
                className={`${
                  dateBtnActive === index ? "date-active" : ""
                } d-flex flex-column justify-content-center align-items-center w-full px-3 py-1 date-btn`}
                onClick={() => {
                  const dateSelect = format(date, "yyyy-MM-dd");
                  handleDateBtnActive(index, dateSelect);
                }}
              >
                <h6>{format(date, "EEEE", { locale: enUS })}</h6>
                <span>{format(date, "dd/MM/yyyy")}</span>
              </Button>
            ))}
          </Col>
          <Col>
            <Button
              onClick={handleNextWeek}
              className="animated-button"
              style={{ backgroundColor: "#7126b5", border: "none" }}
            >
              <FaArrowRight />
            </Button>
          </Col>
        </Row>
        <hr />
      </Container>

      <Container className="mt-4">
        <Row>
          <Col className="d-flex justify-content-end align-items-end">
            <Button
              className="d-flex align-items-center bg-white rounded-pill px-3 filter-btn"
              onClick={() => {
                setFilterShowModal(true);
              }}
            >
              <LuArrowUpDown className="up-down-icon" />
              {filter}
            </Button>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col
            xs={12}
            lg={3}
            xl={2}
            className="border p-3 rounded shadow mb-5"
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              height: "230px",
            }}
          >
            <h4
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              Filter
            </h4>
            <div
              className="d-flex justify-content-between align-items-center pt-2 mb-3"
              style={{
                borderBottom: "1px solid #D0D0D0",
                paddingBottom: "8px",
              }}
            >
              <div className="d-flex align-items-center">
                <FiBox
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "#8A8A8A",
                  }}
                />
                <h5
                  className="ms-2 mb-0"
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    color: "#000000",
                  }}
                >
                  Transit
                </h5>
              </div>
              <FaArrowRight
                style={{
                  color: "#8A8A8A",
                  fontSize: "16px",
                }}
              />
            </div>

            <div
              className="d-flex justify-content-between align-items-center pt-2 mb-3"
              style={{
                borderBottom: "1px solid #D0D0D0",
                paddingBottom: "8px",
              }}
            >
              <div className="d-flex align-items-center">
                <FiHeart
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "#8A8A8A",
                  }}
                />
                <h5
                  className="ms-2 mb-0"
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    color: "#000000",
                  }}
                >
                  Fasilitas
                </h5>
              </div>
              <FaArrowRight
                style={{
                  color: "#8A8A8A",
                  fontSize: "16px",
                }}
              />
            </div>

            <div
              className="d-flex justify-content-between align-items-center pt-2 mb-3"
              style={{
                paddingBottom: "8px",
              }}
            >
              <div className="d-flex align-items-center">
                <FiDollarSign
                  style={{
                    width: "24px",
                    height: "24px",
                    color: "#8A8A8A",
                  }}
                />
                <h5
                  className="ms-2 mb-0"
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    color: "#000000",
                  }}
                >
                  Harga
                </h5>
              </div>
              <FaArrowRight
                style={{
                  color: "#8A8A8A",
                  fontSize: "16px",
                }}
              />
            </div>
          </Col>
          <Col>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center">
                <img src={loadingImage} className="img-fluid w-25" />
              </div>
            ) : notFound ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={notFoundImage} className="img-fluid w-25" />
                <span className="fw-bold">
                  Sorry, your search was not found.
                </span>
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate({ to: "/" })}
                >
                  Try searching for another trip!
                </span>
              </div>
            ) : ticketSoldOut ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={ticketSoldOutImage} className="img-fluid w-25" />
                <span className="fw-bold">Sorry, tickets are sold out!</span>
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate({ to: "/" })}
                >
                  Try searching for another trip!
                </span>
              </div>
            ) : (
              <Accordion flush>
                {flightsData.map((flight, index) => (
                  <Accordion.Item
                    eventKey={index}
                    className="flight-box shadow-sm"
                    key={index}
                  >
                    <Accordion.Header className="p-0 position-relative">
                      <Container>
                        {/* Header */}
                        <Row className="align-items-center">
                          <Col className="d-flex align-items-center">
                            <img
                              src={flight?.airline.imageUrl}
                              alt="Logo"
                              style={{
                                width: "24px",
                                height: "24px",
                              }}
                            />
                            <h6
                              className="ms-3 mb-0 fw-bold"
                              style={{ fontSize: "14px" }}
                            >
                              {flight?.airline.name} -{" "}
                              {flight?.class.replace("_", " ")}
                            </h6>
                          </Col>
                        </Row>

                        {/* Detail Section */}
                        <Row className="mt-3 flex-column flex-sm-row gap-xs-3">
                          <Col
                            sm={8}
                            lg={9}
                            className="d-flex align-items-center mb-3 mb-sm-0"
                          >
                            <Container
                              fluid
                              className="d-flex justify-content-center align-items-center"
                            >
                              {/* Departure */}
                              <Col
                                sm={2}
                                className="text-center d-flex flex-column align-items-center"
                              >
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {formatTime(flight?.departureTime)}
                                </span>
                                <p
                                  style={{
                                    margin: "0",
                                    fontSize: "12px",
                                    color: "#6B7280",
                                  }}
                                >
                                  {flight?.departure.code}
                                </p>
                              </Col>

                              {/* Duration and Arrow */}
                              <Col
                                sm={8}
                                className="text-center d-flex flex-column align-items-center"
                              >
                                <span
                                  style={{ fontSize: "12px", color: "#6B7280" }}
                                >
                                  {flight?.duration}
                                </span>
                                <img
                                  src={longArrowRight}
                                  alt="Arrow"
                                  className="img-fluid long-arrow-icon"
                                  style={{
                                    width: "100%",
                                    maxWidth: "433px",
                                  }}
                                />
                                <span
                                  style={{ fontSize: "12px", color: "#6B7280" }}
                                >
                                  {flight?.information}
                                </span>
                              </Col>

                              {/* Arrival */}
                              <Col
                                sm={2}
                                className="text-center d-flex flex-column align-items-center"
                              >
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {formatTime(flight?.arrivalTime)}
                                </span>
                                <p
                                  style={{
                                    margin: "0",
                                    fontSize: "12px",
                                    color: "#6B7280",
                                  }}
                                >
                                  {flight?.arrival.code}
                                </p>
                              </Col>
                            </Container>

                            {/* Baggage Icon */}
                            <div>
                              <img
                                src={baggageDelay}
                                alt="Baggage Icon"
                                className="img-fluid"
                                style={{
                                  width: "24px",
                                  height: "24px",
                                }}
                              />
                            </div>
                          </Col>

                          {/* Price and Button */}
                          <Col className="d-flex flex-column justify-content-center">
                            <h5
                              className="fw-bold text-center"
                              style={{
                                color: "#7126B5",
                                fontSize: "18px",
                              }}
                            >
                              IDR {flight?.price}
                            </h5>
                            <Button
                              className="btn btn-block w-full"
                              style={{
                                backgroundColor: "#7126B5",
                                border: "none",
                              }}
                              onClick={(event) => {
                                event.stopPropagation(); // Prevent Accordion from toggling
                                handleBookingPage(flight);
                                handleResetTimer();
                              }}
                            >
                              Select
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </Accordion.Header>

                    <Accordion.Body>
                      <Container>
                        <Row>
                          <h6
                            style={{
                              color: "#4B1979",
                              fontSize: "14px",
                              fontWeight: "bold",
                            }}
                          >
                            Flight Details
                          </h6>
                        </Row>
                        <Row>
                          <Col
                            xs={7}
                            sm={8}
                            md={9}
                            xl={10}
                            className="d-flex flex-column"
                          >
                            <h6
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                              }}
                            >
                              {formatTime(flight?.departureTime)}
                            </h6>
                            <span
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {formatDate(flight?.departureTime)}
                            </span>
                            <span
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              {flight?.departure.name} - {flight?.arrival.name}
                            </span>
                          </Col>
                          <Col>
                            <span
                              style={{
                                color: "#A06ECE",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              Departure
                            </span>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col
                            xs={1}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <img
                              src={flight?.airline.imageUrl}
                              alt="Logo"
                              style={{
                                width: "24px",
                                height: "24px",
                              }}
                            />
                          </Col>
                          <Col>
                            <div
                              className="fw-bold d-flex flex-column mb-3"
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              <span className="fw-bold">
                                {flight?.airline.name} -{" "}
                                {flight?.class.replace("_", " ")}
                              </span>
                              <span>{flight?.flightNumber}</span>
                            </div>

                            <div
                              className="d-flex flex-column"
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              <h6 className="fw-bold">Information</h6>
                              <span>{flight?.information}</span>
                            </div>
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col
                            xs={7}
                            sm={8}
                            md={9}
                            xl={10}
                            className="d-flex flex-column"
                            style={{
                              fontSize: "14px",
                            }}
                          >
                            <span className="fw-bold">
                              {formatTime(flight?.arrivalTime)}
                            </span>
                            <span>{formatDate(flight?.arrivalTime)}</span>
                            <span className="fw-bold">
                              {flight?.arrival.name}
                            </span>
                          </Col>
                          <Col>
                            <span
                              style={{
                                color: "#A06ECE",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              Arrival
                            </span>
                          </Col>
                        </Row>
                      </Container>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            )}
          </Col>
        </Row>

        {/* Filter modal */}
        <Modal
          show={filterShowModal}
          onHide={handleFilterClose}
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
            <Container className="class-modal-content">
              <Row
                className={`${selectedElement === "termurah" ? "selected" : ""} d-flex justify-content-between border p-2`}
                onClick={() => {
                  handleSelectFilter(
                    "termurah",
                    "termurah",
                    "Price - Cheapest"
                  );
                  handleFilterTempChange({ isCheapest: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Price - </span>Cheapest
                  </h6>
                </Col>

                {selectedFilter === "termurah" && (
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
                className={`${selectedElement === "terpendek" ? "selected" : ""} d-flex justify-content-between border p-2`}
                onClick={() => {
                  handleSelectFilter(
                    "terpendek",
                    "terpendek",
                    "Duration - Shortest"
                  );
                  handleFilterTempChange({ shortest: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Duration - </span>Shortest
                  </h6>
                </Col>

                {selectedFilter === "terpendek" && (
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
                className={`${selectedElement === "keberangkatan-awal" ? "selected" : ""} d-flex justify-content-between border p-2`}
                onClick={() => {
                  handleSelectFilter(
                    "keberangkatan-awal",
                    "keberangkatan-awal",
                    "Departure - Earliest"
                  );
                  handleFilterTempChange({ earliestDeparture: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Departure - </span>Earliest
                  </h6>
                </Col>

                {selectedFilter === "keberangkatan-awal" && (
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
                className={`${selectedElement === "keberangkatan-akhir" ? "selected" : ""} d-flex justify-content-between border p-2`}
                onClick={() => {
                  handleSelectFilter(
                    "keberangkatan-akhir",
                    "keberangkatan-akhir",
                    "Departure - Latest"
                  );
                  handleFilterTempChange({ latestDeparture: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Departure - </span>Latest
                  </h6>
                </Col>

                {selectedFilter === "keberangkatan-akhir" && (
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
                className={`${selectedElement === "kedatangan-awal" ? "selected" : ""} d-flex justify-content-between border p-2`}
                onClick={() => {
                  handleSelectFilter(
                    "kedatangan-awal",
                    "kedatangan-awal",
                    "Arrival - Earliest"
                  );
                  handleFilterTempChange({ earliestArrival: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Arrival - </span>Earliest
                  </h6>
                </Col>

                {selectedFilter === "kedatangan-awal" && (
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
                className={`${selectedElement === "kedatangan-akhir" ? "selected" : ""} d-flex justify-content-between border p-2`}
                onClick={() => {
                  handleSelectFilter(
                    "kedatangan-akhir",
                    "kedatangan-akhir",
                    "Arrival - Latest"
                  );
                  handleFilterTempChange({ latestArrival: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Arrival - </span>Latest
                  </h6>
                </Col>

                {selectedFilter === "kedatangan-akhir" && (
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
            <Button variant="secondary" onClick={handleFilterClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSaveFilter}
              style={{ backgroundColor: "#7126b5", border: "none" }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Toaster
        position="top-right"
        containerStyle={{
          position: "fixed",
          zIndex: "9999",
        }}
        reverseOrder={false}
      />
    </>
  );
};

export default SearchFlight;
