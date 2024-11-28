import React, { useState } from "react";
import "./SearchFlight.css";
import {
  Accordion,
  Button,
  Col,
  Container,
  Dropdown,
  Modal,
  Row,
} from "react-bootstrap";
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
import HomePageScreen from "../Homepage/ScreenHomepage"

const SearchFlight = () => {
  const [filterShowModal, setFilterShowModal] = useState(false);
  const [filter, setFilter] = useState("Harga - Termurah");
  const [tempFilter, setTempFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [dateBtnActive, setDateBtnActive] = useState("");
  const [homePage, setHomePage] = useState(false);

  const handleDateBtnActive = (day) => {
    if (day == "senin") {
      setDateBtnActive("senin");
    } else if (day == "selasa") {
      setDateBtnActive("selasa");
    } else if (day == "rabu") {
      setDateBtnActive("rabu");
    } else if (day == "kamis") {
      setDateBtnActive("kamis");
    } else if (day == "jumat") {
      setDateBtnActive("jumat");
    } else if (day == "sabtu") {
      setDateBtnActive("sabtu");
    } else if (day == "minggu") {
      setDateBtnActive("minggu");
    }
  }

  const handleFilterClose = () => {
    setFilterShowModal(false);
  };

  const handleSaveFilter = () => {
    setFilter(tempFilter);
    setFilterShowModal(false);
  };

  const handleSelectFilter = (FilterName, elementId, label) => {
    setSelectedFilter(FilterName); // Simpan nama Filter yang dipilih
    setSelectedElement(elementId); // Simpan elemen yang dipilih
    setTempFilter(label); // Simpan nilai sementara dari pilihan
  };

  return !homePage ? (
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
              onClick={() => setHomePage(true)}
            >
              <FaArrowLeft className="me-2" />
              JKT > MLB - 2 Penumpang - Economy
            </Button>
          </Col>
          <Col>
            <Button
              className="p-3 w-100 ubah-btn"
              style={{
                background: "#73CA5C",
              }}
            >
              Ubah Pencarian
            </Button>
          </Col>
        </Row>
        <Row className="d-flex align-items-center justify-content-between pt-3">
          <Col>
            <Button>
              <FaArrowLeft />
            </Button>
          </Col>
          <Col
            xs={8}
            sm={9}
            lg={10}
            className="d-flex flex-wrap justify-content-center gap-3 w-full"
          >
            <Button
              className={`${dateBtnActive === "selasa" ? "date-active" : ""} d-flex flex-column justify-content-center align-items-center w-full px-3 py-1 date-btn`}
              onClick={() => handleDateBtnActive("selasa")}
            >
              <h6 className="">Selasa</h6>
              <span className="">01/03/2023</span>
            </Button>
            <Button
              className={`${dateBtnActive === "rabu" ? "date-active" : ""} d-flex flex-column justify-content-center align-items-center w-full px-3 py-1 date-btn`}
              onClick={() => handleDateBtnActive("rabu")}
            >
              <h6 className="">Rabu</h6>
              <span className="">02/03/2023</span>
            </Button>
            <Button
              className={`${dateBtnActive === "kamis" ? "date-active" : ""} d-flex flex-column justify-content-center align-items-center w-full px-3 py-1 date-btn`}
              onClick={() => handleDateBtnActive("kamis")}
            >
              <h6 className="">Kamis</h6>
              <span className="">03/03/2023</span>
            </Button>
            <Button
              className={`${dateBtnActive === "jumat" ? "date-active" : ""} d-flex flex-column justify-content-center align-items-center w-full px-3 py-1 date-btn`}
              onClick={() => handleDateBtnActive("jumat")}
            >
              <h6 className="">Jumat</h6>
              <span className="">04/03/2023</span>
            </Button>
            <Button
              className={`${dateBtnActive === "sabtu" ? "date-active" : ""} d-flex flex-column justify-content-center align-items-center w-full px-3 py-1 date-btn`}
              onClick={() => handleDateBtnActive("sabtu")}
            >
              <h6 className="">Sabtu</h6>
              <span className="">05/03/2023</span>
            </Button>
            <Button
              className={`${dateBtnActive === "minggu" ? "date-active" : ""} d-flex flex-column justify-content-center align-items-center w-full px-3 py-1 date-btn`}
              onClick={() => handleDateBtnActive("minggu")}
            >
              <h6 className="">Minggu</h6>
              <span className="">06/03/2023</span>
            </Button>
            <Button
              className={`${dateBtnActive === "senin" ? "date-active" : ""} d-flex flex-column justify-content-center align-items-center w-full px-3 py-1 date-btn`}
              onClick={() => handleDateBtnActive("senin")}
            >
              <h6 className="">Senin</h6>
              <span className="">07/03/2023</span>
            </Button>
          </Col>
          <Col>
            <Button>
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
              onClick={() => setFilterShowModal(true)}
            >
              <LuArrowUpDown className="up-down-icon"
              />
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
            <Accordion flush>
              <Accordion.Item eventKey="0" className="flight-box shadow-sm">
                <Accordion.Header className="p-0 position-relative">
                  <Container>
                    {/* Header */}
                    <Row className="align-items-center">
                      <Col className="d-flex align-items-center">
                        <img
                          src={airlineLogo}
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
                          Jet Air - Economy
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
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              07:00
                            </span>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "#6B7280",
                              }}
                            >
                              JKT
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
                              4h 0m
                            </span>
                            <img
                              src={longArrowRight}
                              alt="Arrow"
                              className="img-fluid long-arrow-icon"
                              style={{
                                maxWidth: "100%",
                                width: "100%",
                                maxWidth: "433px",
                              }}
                            />
                            <span
                              style={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              Direct
                            </span>
                          </Col>

                          {/* Arrival */}
                          <Col
                            sm={2}
                            className="text-center d-flex flex-column align-items-center"
                          >
                            <span
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              11:00
                            </span>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "#6B7280",
                              }}
                            >
                              MLB
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
                          IDR 4.950.000
                        </h5>
                        <Button
                          className="btn btn-block w-full"
                          style={{
                            backgroundColor: "#7126B5",
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
                          07:00
                        </h6>
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          3 Maret 2023
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          Soekarno Hatta - Terminal 1A Domestik
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
                          src={airlineLogo}
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
                          <span className="fw-bold">Jet Air - Economy</span>
                          <span>JT - 203</span>
                        </div>

                        <div
                          className="d-flex flex-column"
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          <h6 className="fw-bold">Informasi</h6>
                          <span>Baggage 20 kg</span>
                          <span>Cabin baggage 7 kg</span>
                          <span>In Flight Entertainment</span>
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
                        <span className="fw-bold">11:00</span>
                        <span>3 Maret 2023</span>
                        <span className="fw-bold">
                          Melbourne International Airport
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
              <Accordion.Item eventKey="1" className="flight-box shadow-sm">
                <Accordion.Header className="p-0 position-relative">
                  <Container>
                    {/* Header */}
                    <Row className="align-items-center">
                      <Col className="d-flex align-items-center">
                        <img
                          src={airlineLogo}
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
                          Jet Air - Economy
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
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              07:00
                            </span>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "#6B7280",
                              }}
                            >
                              JKT
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
                              4h 0m
                            </span>
                            <img
                              src={longArrowRight}
                              alt="Arrow"
                              className="img-fluid long-arrow-icon"
                              style={{
                                maxWidth: "100%",
                                width: "100%",
                                maxWidth: "433px",
                              }}
                            />
                            <span
                              style={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              Direct
                            </span>
                          </Col>

                          {/* Arrival */}
                          <Col
                            sm={2}
                            className="text-center d-flex flex-column align-items-center"
                          >
                            <span
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              11:00
                            </span>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "#6B7280",
                              }}
                            >
                              MLB
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
                          IDR 4.950.000
                        </h5>
                        <Button
                          className="btn btn-block w-full"
                          style={{
                            backgroundColor: "#7126B5",
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
                          07:00
                        </h6>
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          3 Maret 2023
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          Soekarno Hatta - Terminal 1A Domestik
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
                          src={airlineLogo}
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
                          <span className="fw-bold">Jet Air - Economy</span>
                          <span>JT - 203</span>
                        </div>

                        <div
                          className="d-flex flex-column"
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          <h6 className="fw-bold">Informasi</h6>
                          <span>Baggage 20 kg</span>
                          <span>Cabin baggage 7 kg</span>
                          <span>In Flight Entertainment</span>
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
                        <span className="fw-bold">11:00</span>
                        <span>3 Maret 2023</span>
                        <span className="fw-bold">
                          Melbourne International Airport
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
              <Accordion.Item eventKey="2" className="flight-box shadow-sm">
                <Accordion.Header className="p-0 position-relative">
                  <Container>
                    {/* Header */}
                    <Row className="align-items-center">
                      <Col className="d-flex align-items-center">
                        <img
                          src={airlineLogo}
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
                          Jet Air - Economy
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
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              07:00
                            </span>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "#6B7280",
                              }}
                            >
                              JKT
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
                              4h 0m
                            </span>
                            <img
                              src={longArrowRight}
                              alt="Arrow"
                              className="img-fluid long-arrow-icon"
                              style={{
                                maxWidth: "100%",
                                width: "100%",
                                maxWidth: "433px",
                              }}
                            />
                            <span
                              style={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              Direct
                            </span>
                          </Col>

                          {/* Arrival */}
                          <Col
                            sm={2}
                            className="text-center d-flex flex-column align-items-center"
                          >
                            <span
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              11:00
                            </span>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "#6B7280",
                              }}
                            >
                              MLB
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
                          IDR 4.950.000
                        </h5>
                        <Button
                          className="btn btn-block w-full"
                          style={{
                            backgroundColor: "#7126B5",
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
                          07:00
                        </h6>
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          3 Maret 2023
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          Soekarno Hatta - Terminal 1A Domestik
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
                          src={airlineLogo}
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
                          <span className="fw-bold">Jet Air - Economy</span>
                          <span>JT - 203</span>
                        </div>

                        <div
                          className="d-flex flex-column"
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          <h6 className="fw-bold">Informasi</h6>
                          <span>Baggage 20 kg</span>
                          <span>Cabin baggage 7 kg</span>
                          <span>In Flight Entertainment</span>
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
                        <span className="fw-bold">11:00</span>
                        <span>3 Maret 2023</span>
                        <span className="fw-bold">
                          Melbourne International Airport
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
              <Accordion.Item eventKey="3" className="flight-box shadow-sm">
                <Accordion.Header className="p-0 position-relative">
                  <Container>
                    {/* Header */}
                    <Row className="align-items-center">
                      <Col className="d-flex align-items-center">
                        <img
                          src={airlineLogo}
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
                          Jet Air - Economy
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
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              07:00
                            </span>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "#6B7280",
                              }}
                            >
                              JKT
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
                              4h 0m
                            </span>
                            <img
                              src={longArrowRight}
                              alt="Arrow"
                              className="img-fluid long-arrow-icon"
                              style={{
                                maxWidth: "100%",
                                width: "100%",
                                maxWidth: "433px",
                              }}
                            />
                            <span
                              style={{ fontSize: "12px", color: "#6B7280" }}
                            >
                              Direct
                            </span>
                          </Col>

                          {/* Arrival */}
                          <Col
                            sm={2}
                            className="text-center d-flex flex-column align-items-center"
                          >
                            <span
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              11:00
                            </span>
                            <p
                              style={{
                                margin: "0",
                                fontSize: "12px",
                                color: "#6B7280",
                              }}
                            >
                              MLB
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
                          IDR 4.950.000
                        </h5>
                        <Button
                          className="btn btn-block w-full"
                          style={{
                            backgroundColor: "#7126B5",
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
                          07:00
                        </h6>
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          3 Maret 2023
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          Soekarno Hatta - Terminal 1A Domestik
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
                          src={airlineLogo}
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
                          <span className="fw-bold">Jet Air - Economy</span>
                          <span>JT - 203</span>
                        </div>

                        <div
                          className="d-flex flex-column"
                          style={{
                            fontSize: "14px",
                          }}
                        >
                          <h6 className="fw-bold">Informasi</h6>
                          <span>Baggage 20 kg</span>
                          <span>Cabin baggage 7 kg</span>
                          <span>In Flight Entertainment</span>
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
                        <span className="fw-bold">11:00</span>
                        <span>3 Maret 2023</span>
                        <span className="fw-bold">
                          Melbourne International Airport
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
            </Accordion>
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
                onClick={() =>
                  handleSelectFilter("termurah", "termurah", "Harga - Termurah")
                }
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
                onClick={() =>
                  handleSelectFilter(
                    "terpendek",
                    "terpendek",
                    "Durasi - Terpendek"
                  )
                }
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
                onClick={() =>
                  handleSelectFilter(
                    "keberangkatan-awal",
                    "keberangkatan-awal",
                    "Keberangkatan - Paling Awal"
                  )
                }
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
                onClick={() =>
                  handleSelectFilter(
                    "keberangkatan-akhir",
                    "keberangkatan-akhir",
                    "Keberangkatan - Paling Akhir"
                  )
                }
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
                onClick={() =>
                  handleSelectFilter(
                    "kedatangan-awal",
                    "kedatangan-awal",
                    "Kedatangan - Paling Awal"
                  )
                }
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
                onClick={() =>
                  handleSelectFilter(
                    "kedatangan-akhir",
                    "kedatangan-akhir",
                    "Kedatangan - Paling Akhir"
                  )
                }
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
  ) : (
    <HomePageScreen />
  );
};

export default SearchFlight;
