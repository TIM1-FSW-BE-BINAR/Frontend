import React, { useEffect, useState } from "react";
import "./SearchFlight.css";
import { Accordion, Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { FiHeart } from "react-icons/fi";
import { FiDollarSign } from "react-icons/fi";
import { LuArrowUpDown } from "react-icons/lu";
import selectedIcon from "../../assets/homepage/icon/selected-icon.png";
import airlineLogo from "../../assets/homepage/airline-logo.png";
import longArrowRight from "../../assets/homepage/icon/long-arrow-right-icon.png";
import baggageDelay from "../../assets/homepage/icon/baggage-delay-icon.png";
import loadingImage from "../../assets/homepage/loading.png";
import notFoundImage from "../../assets/homepage/not-found.png";
import ticketSoldOutImage from "../../assets/homepage/tickets-sold-out.png";
import {
  format,
  addWeeks,
  subWeeks,
  startOfWeek,
  addDays,
  isSameDay,
} from "date-fns";
import { id } from "date-fns/locale";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getFlights, getFlightId } from "../../service/flight/flightService";

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
}) => {
  const navigate = useNavigate();

  const [filterShowModal, setFilterShowModal] = useState(false);
  const [filter, setFilter] = useState("Pilih Filter");
  const [tempFilter, setTempFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [dateBtnActive, setDateBtnActive] = useState(null);

  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [ticketSoldOut, setTicketSoldOut] = useState(false);
  const departureDateObj = new Date(departureDate);
  const [currentWeek, setCurrentWeek] = useState(departureDateObj); // Tanggal acuan untuk 1 minggu
  const [weekDates, setWeekDates] = useState([]); // Menyimpan daftar tanggal dalam 1 minggu

  const calculateWeekDates = (baseDate) => {
    const startDate = startOfWeek(baseDate, { weekStartsOn: 1 }); // Mulai dari hari Senin
    return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
  };

  // update tanggal saat minggu berubah
  useEffect(() => {
    const week = calculateWeekDates(currentWeek);

    // Update hanya jika weekDates berubah
    setWeekDates((prevWeekDates) => {
      if (JSON.stringify(prevWeekDates) !== JSON.stringify(week)) {
        return week;
      }
      return prevWeekDates;
    });

    if (dateBtnActive === null) {
      const activeIndex = week.findIndex((date) =>
        isSameDay(date, departureDateObj)
      );
      setDateBtnActive(activeIndex);
    }
  }, [currentWeek, departureDateObj, dateBtnActive]);

  const handleNextWeek = () => {
    setCurrentWeek((prevDate) => addWeeks(prevDate, 1)); // Tambah 1 Minggu
  };

  const handlePreviousWeek = () => {
    setCurrentWeek((prevDate) => subWeeks(prevDate, 1)); // Kurangi 1 Minggu
  };

  // handle search saat date active nya diganti
  const [departureDateActive, setDepartureDateActive] = useState(departureDate);

  const handleDateBtnActive = (index, date) => {
    setDateBtnActive(index);
    setDepartureDateActive(date);
    setTicketSoldOut(false);
  };

  const handleFilterClose = () => {
    setFilterShowModal(false);
  };

  const handleSaveFilter = () => {
    setFilter(tempFilter);
    setFilterShowModal(false);
    setSaveFilter(true);
  };

  const handleSelectFilter = (FilterName, elementId, label) => {
    setSelectedFilter(FilterName); // Simpan nama Filter yang dipilih
    setSelectedElement(elementId); // Simpan elemen yang dipilih
    setTempFilter(label); // Simpan nilai sementara dari pilihan
  };

  // Logic search data flight (belum kelar)
  const [flightsData, setFlightsData] = useState([]);
  const seatClassValue = classInput?.split(" ")[0];

  const [filterChange, setFilterChange] = useState({});
  const [saveFilter, setSaveFilter] = useState(true);

  const handleFilterChange = (newFilter) => {
    setFilterChange(newFilter); // Update filter tambahan
  };

  const { data, isSuccess, isError, isPending } = useQuery({
    queryKey: ["search-flights", filterChange, departureDateActive],
    queryFn: () =>
      getFlights({
        departureAirport: departureAirportId,
        arrivalAirport: returnAirportId,
        seatClass: seatClassValue,
        departureTime: departureDateActive,
        ...filterChange,
      }),
    enabled: !!departureAirportId && !!returnAirportId && !!saveFilter, // Fetch jika ID sudah ada
  });

  useEffect(() => {
    if (isSuccess) {
      setFlightsData(data);
      setLoading(false);
      if (data.length === 0) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
      console.log("fetch search berhasil ", data);
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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getUTCHours()).padStart(2, "0"); // Menggunakan getUTCHours untuk waktu UTC
    const minutes = String(date.getUTCMinutes()).padStart(2, "0"); // Menggunakan getUTCMinutes untuk waktu UTC
    return `${hours}:${minutes}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate(); // Menggunakan getUTCDate untuk tanggal UTC
    const month = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    }); // Menggunakan timeZone: "UTC" untuk mendapatkan bulan dalam UTC
    const year = date.getUTCFullYear(); // Menggunakan getUTCFullYear untuk tahun UTC
    return `${day} ${month} ${year}`;
  };

  const handleBookingPage = async (flight) => {
    const flightDataById = await getFlightId(flight?.id);
    if (flightDataById.error?.message) {
      // tiket nya habis
      setTicketSoldOut(true);
    } else {
      // tiket tersedia, kirim flight nya ke booking
      const queryParams = new URLSearchParams({
        flightId: flight.id,
        totalPassengers: passengers,
        adultInput,
        childInput,
        babyInput,
      }).toString();

      navigate({
        to: `/booking?${queryParams}`,
      });
    }
  };

  return (
    <>
      <Container className="">
        <Row className="mt-5 mb-2">
          <h2>Pilih Penerbangan</h2>
        </Row>
        <Row>
          <Col xs={12} sm={8} md={8} className="mb-2 mb-sm-0">
            <Button
              className="p-3 w-100 text-start back-btn"
              style={{ background: "#A06ECE" }}
              onClick={() => navigate({ to: "/" })}
            >
              <FaArrowLeft className="me-2" />
              {fromInput} {">"} {toInput} - {passengers} Penumpang -{" "}
              {classInput}
            </Button>
          </Col>
          <Col>
            <Button
              className="p-3 w-100 ubah-btn animated-button"
              style={{
                background: "#73CA5C",
              }}
              onClick={() => navigate({ to: "/" })}
            >
              Ubah Pencarian
            </Button>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-between pt-3">
          <Col>
            <Button onClick={handlePreviousWeek} className="animated-button">
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
                <h6>{format(date, "EEEE", { locale: id })}</h6>
                <span>{format(date, "dd/MM/yyyy")}</span>
              </Button>
            ))}
          </Col>
          <Col>
            <Button onClick={handleNextWeek} className="animated-button">
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
                setSaveFilter(false);
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
                  Maaf, pencarian Anda tidak ditemukan
                </span>
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate({ to: "/" })}
                >
                  Coba cari perjalanan lainnya!
                </span>
              </div>
            ) : ticketSoldOut ? (
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src={ticketSoldOutImage} className="img-fluid w-25" />
                <span className="fw-bold">Maaf, Tiket terjual habis!</span>
                <span
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate({ to: "/" })}
                >
                  Coba cari perjalanan lainnya!
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
                              {flight?.airline.name} - {flight?.class}
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
                            {/* Flight Details */}
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
                              }}
                              onClick={(event) => {
                                event.stopPropagation(); // Prevent Accordion from toggling
                                handleBookingPage(flight);
                              }}
                            >
                              Pilih
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
                            Detail Penerbangan
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
                              Keberangkatan
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
                                {flight?.airline.name} - {flight?.class}
                              </span>
                              <span>{flight?.flightNumber}</span>
                            </div>

                            <div
                              className="d-flex flex-column"
                              style={{
                                fontSize: "14px",
                              }}
                            >
                              <h6 className="fw-bold">Informasi</h6>
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
                              Kedatangan
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
                    "Harga - Termurah"
                  );
                  handleFilterChange({ isCheapest: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Harga -</span>Termurah
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
                    "Durasi - Terpendek"
                  );
                  handleFilterChange({ shortest: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Durasi -</span>Terpendek
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
                    "Keberangkatan - Paling Awal"
                  );
                  handleFilterChange({ earliestDeparture: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Keberangkatan -</span>Paling Awal
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
                    "Keberangkatan - Paling Akhir"
                  );
                  handleFilterChange({ latestDeparture: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Keberangkatan -</span>Paling Akhir
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
                    "Kedatangan - Paling Awal"
                  );
                  handleFilterChange({ earliestArrival: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Kedatangan -</span>Paling Awal
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
                    "Kedatangan - Paling Akhir"
                  );
                  handleFilterChange({ latestArrival: true });
                }}
              >
                <Col xs={9} sm={10} className="p-2">
                  <h6>
                    <span className="fw-bold">Kedatangan -</span>Paling Akhir
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
              Tutup
            </Button>
            <Button variant="primary" onClick={handleSaveFilter}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default SearchFlight;
