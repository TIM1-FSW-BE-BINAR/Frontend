import React from "react";
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
import plusIcon from "../../assets/homepage/icon/plus-icon.png";
import minusIcon from "../../assets/homepage/icon/minus-icon.png";
import selectedIcon from "../../assets/homepage/icon/selected-icon.png";
import cardImg from "../../assets/homepage/card-img.png";
import { FaSearch } from "react-icons/fa";
import HomepageModal from "./HomepageModal";
import { useEffect, useState } from "react";
import SearchFlight from "../Search/SearchFlight";
const ScreenHomepage = () => {
  return <Homepage />;
};
const Homepage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [activeModal, setActiveModal] = useState("");
  const [modalInputValue, setModalInputValue] = useState("");
  const [PassengerModalShow, setPassengerModalShow] = useState(false);
  const [classModalShow, setClassModalShow] = useState(false);
  const [adultInput, setAdultInput] = useState(0);
  const [childInput, setChildInput] = useState(0);
  const [babyInput, setBabyInput] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState("");
  const [selectedClass, setSelectedClass] = useState(""); // Menyimpan nilai class
  const [selectedElement, setSelectedElement] = useState(null); // Menyimpan elemen yang dipilih
  const [tempClassInput, setTempClassInput] = useState("");
  const [classInput, setClassInput] = useState("Pilih Class");
  const [checkedSwitch, setCheckedSwitch] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [searchPage, setSearchPage] = useState(false);

  const handleButtonCardClick = (index) => {
    setActiveButton(index); // Set the active button index
  };

  const handleSelectClass = (className, elementId, label) => {
    setSelectedClass(className); // Simpan nama class yang dipilih
    setSelectedElement(elementId); // Simpan elemen yang dipilih
    setTempClassInput(label); // Simpan nilai sementara dari pilihan
  };

  const handleModalSubmit = (value) => {
    console.log(value); // Mengambil nilai input dari modal
    if (activeModal === "from") {
      setFromInput(value); // Set nilai input "From"
    } else if (activeModal === "to") {
      setToInput(value); // Set nilai input "To"
    }
    setModalShow(false); // Tutup modal setelah submit
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

  const handleSearchPage = () => {
    setSearchPage(true);
  };

  return !searchPage ? (
    <>
      <section id="hero">
        <Container fluid className="p-0 mt-4 ">
          <Row className="position-relative justify-content-between">
            <Col xs={2} sm={3} md={2} className="mt-5 d-none d-sm-block">
              <img className="w-100" src={kotak1} alt="" />
            </Col>

            {/* Kolom tengah */}
            <Col
              xs={12}
              sm={8}
              md={8}
              lg={6}
              xl={6}
              className="w-100 position-absolute top-0 start-50 translate-middle-x z-index-2"
            >
              <Container
                className="p-0 rounded"
                style={{ backgroundColor: "#FFE9CA" }}
              >
                <Row>
                  <Col
                    xs={12}
                    md={4}
                    className="p-5 align-items-center d-none d-md-block"
                  >
                    <h1>
                      <i>Diskon Hari ini</i>
                    </h1>
                    <h1 className="text-primary">85%!</h1>
                  </Col>
                  <Col xs={12} md={8}>
                    {/* Small screen */}
                    <div className="d-block d-md-none d-flex position-relative">
                      <div className="position-absolute p-2">
                        <h2>
                          <i>Diskon Hari ini</i>{" "}
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
                  Pilih Jadwal Penerbangan spesial di{" "}
                  <span className="text-primary">Tiketku!</span>
                </h3>
              </Col>
            </Row>
            <Row>
              <Form>
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
                          className="custom-placeholder form-input"
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
                    <img
                      src={returnIcon}
                      className="mt-2 return-icon"
                      alt=""
                      style={{ cursor: "pointer" }}
                      onClick={handleSwitch}
                    />
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
                          className="custom-placeholder form-input"
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
                      <Col className="mt-2">
                        <FormLabel>Departure</FormLabel>
                        <Form.Control
                          type="date"
                          placeholder="1 Maret 2023"
                          className="custom-placeholder form-input"
                        />
                      </Col>
                      <Col className="mt-2">
                        <FormLabel>Return</FormLabel>
                        <Form.Control
                          type="date"
                          placeholder="Pilih Tanggal"
                          className="custom-placeholder form-input"
                          disabled={checkedSwitch ? false : true}
                        />
                      </Col>
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
                          placeholder=""
                          className="custom-placeholder form-input"
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
                              : "Tambah Penumpang"
                          }
                          onClick={() => setPassengerModalShow(true)}
                          readOnly
                        />
                      </Col>
                      <Col className="mt-2">
                        <FormLabel>Seat Class</FormLabel>
                        <Form.Control
                          type="text"
                          placeholder=""
                          className="custom-placeholder form-input"
                          onClick={() => setClassModalShow(true)}
                          value={classInput}
                          readOnly
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Container>

          {/* button */}
          <Button
            className="btn btn-block btn-primary w-100 mt-2 mx-0"
            onClick={handleSearchPage}
          >
            Cari Penerbangan
          </Button>
        </Container>

        {/* Memanggil from to modal */}
        <HomepageModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          inputValue={modalInputValue}
          setInputValue={setModalInputValue}
          onSubmit={handleModalSubmit}
        />

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
              <Row className="d-flex justify-content-between align-items-center">
                <Col xs={5} sm={6} className="d-flex">
                  <img
                    src={adultIcon}
                    alt=""
                    className="img-fluid mt-1"
                    style={{
                      maxWidth: "20px",
                      maxHeight: "20px",
                    }}
                  />
                  <div className="ms-2">
                    <p className="fw-bold mb-0">Dewasa</p>
                    <p>(12 Tahun Keatas)</p>
                  </div>
                </Col>
                {/* Kolom untuk Minus Icon, Input, dan Plus Icon di kanan */}
                <Col className="p-0 d-flex justify-content-end align-items-center">
                  {/* Tombol Minus */}
                  <img
                    src={minusIcon}
                    className="img-fluid"
                    alt=""
                    style={{
                      maxWidth: "40px",
                      maxHeight: "40px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      decrementInputPassengers("adult");
                    }}
                  />

                  {/* Input Field */}
                  <input
                    type="text"
                    style={{
                      width: "50px",
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "5px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    value={adultInput}
                    readOnly
                  />

                  {/* Tombol Plus */}
                  <img
                    src={plusIcon}
                    className="img-fluid"
                    alt=""
                    style={{
                      maxWidth: "40px",
                      maxHeight: "40px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      incrementInputPassengers("adult");
                    }}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center">
                <Col xs={5} sm={6} className="d-flex">
                  <img
                    src={childIcon}
                    alt=""
                    className="img-fluid mt-1"
                    style={{
                      maxWidth: "20px",
                      maxHeight: "20px",
                    }}
                  />
                  <div className="ms-2">
                    <p className="fw-bold mb-0">Anak</p>
                    <p>(2 - 11 Tahun)</p>
                  </div>
                </Col>
                {/* Kolom untuk Minus Icon, Input, dan Plus Icon di kanan */}
                <Col className="p-0 d-flex justify-content-end align-items-center">
                  {/* Tombol Minus */}
                  <img
                    src={minusIcon}
                    className="img-fluid"
                    alt=""
                    style={{
                      maxWidth: "40px",
                      maxHeight: "40px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      decrementInputPassengers("child");
                    }}
                  />

                  {/* Input Field */}
                  <input
                    type="text"
                    style={{
                      width: "50px",
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "5px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    value={childInput}
                    readOnly
                  />

                  {/* Tombol Plus */}
                  <img
                    src={plusIcon}
                    className="img-fluid"
                    alt=""
                    style={{
                      maxWidth: "40px",
                      maxHeight: "40px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      incrementInputPassengers("child");
                    }}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-between align-items-center">
                <Col xs={5} sm={6} className="d-flex">
                  <img
                    src={babyIcon}
                    alt=""
                    className="img-fluid mt-1"
                    style={{
                      maxWidth: "20px",
                      maxHeight: "20px",
                    }}
                  />
                  <div className="ms-2">
                    <p className="fw-bold mb-0">Bayi</p>
                    <p>(Dibawah 2 Tahun)</p>
                  </div>
                </Col>
                {/* Kolom untuk Minus Icon, Input, dan Plus Icon di kanan */}
                <Col className="p-0 d-flex justify-content-end align-items-center">
                  {/* Tombol Minus */}
                  <img
                    src={minusIcon}
                    className="img-fluid"
                    alt=""
                    style={{
                      maxWidth: "40px",
                      maxHeight: "40px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      decrementInputPassengers("baby");
                    }}
                  />

                  {/* Input Field */}
                  <input
                    type="text"
                    style={{
                      width: "50px",
                      fontSize: "16px",
                      textAlign: "center",
                      padding: "5px",
                      marginLeft: "10px",
                      marginRight: "10px",
                    }}
                    value={babyInput}
                    readOnly
                  />

                  {/* Tombol Plus */}
                  <img
                    src={plusIcon}
                    className="img-fluid"
                    alt=""
                    style={{
                      maxWidth: "40px",
                      maxHeight: "40px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      incrementInputPassengers("baby");
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleSavePassengers}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Class Modal */}
        <Modal
          show={classModalShow}
          onHide={handleClassClose}
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
                className={`${selectedElement === "economyBtn" ? "selected" : ""} d-flex justify-content-between border p-1`}
                onClick={() =>
                  handleSelectClass("economy", "economyBtn", "Economy")
                }
              >
                <Col xs={9} sm={10}>
                  <h6>Economy</h6>
                  <p>IDR 4.950.000</p>
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
                <Col xs={9} sm={10}>
                  <h6>Premium Economy</h6>
                  <p>IDR 8.950.000</p>
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
                <Col xs={9} sm={10}>
                  <h6>Business</h6>
                  <p>IDR 14.950.000</p>
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
                <Col xs={9} sm={10}>
                  <h6>First Class</h6>
                  <p>IDR 24.950.000</p>
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
            <Button variant="secondary" onClick={handleClassClose}>
              Tutup
            </Button>
            <Button variant="primary" onClick={handleSaveClass}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </section>

      <section id="favorit">
        <Container className="mt-3">
          <Row className="mb-2">
            <h2>Destinasi Favorit</h2>
          </Row>
          <Row className="g-2 mb-2 flex-wrap">
            {/* Tombol dengan responsivitas */}
            {["Semua", "Asia", "Amerika", "Australia", "Eropa", "Afrika"].map(
              (label, index) => (
                <Col
                  key={index}
                  xs={4}
                  sm={3}
                  md={2}
                  lg={1}
                  className={`d-flex align-items-center justify-content-center p-2 m-2 rounded responsive-button ${
                    activeButton === index ? "active" : ""
                  }`}
                  onClick={() => handleButtonCardClick(index)}
                >
                  <FaSearch className="icon" />
                  <span className="button-label">{label}</span>
                </Col>
              )
            )}
          </Row>
          <Row className="g-3">
            {[...Array(7)].map((_, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={2} className="d-flex">
                <Card className="custom-card">
                  <div className="badge-container">
                    <span
                      className={`badge ${index % 2 === 0 ? "badge-limited" : "badge-discount"}`}
                    >
                      {index % 2 === 0 ? "Limited!" : "50% OFF"}
                    </span>
                  </div>
                  <Card.Img variant="top" src={cardImg} />
                  <Card.Body>
                    <Card.Title className="card-title">
                      {index % 2 === 0
                        ? "Jakarta -> Bangkok"
                        : "Jakarta -> Sydney"}
                    </Card.Title>
                    <p className="text-primary fs-6 mb-1">AirAsia</p>
                    <Card.Text>
                      <p className="fs-6 mb-1">
                        {index % 2 === 0
                          ? "20 - 30 Maret 2023"
                          : "5 - 25 Maret 2023"}
                      </p>
                      <p className="fs-6">
                        Mulai dari{" "}
                        <span className="text-danger">
                          {index % 2 === 0 ? "IDR 950.000" : "IDR 3.650.000"}
                        </span>
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  ) : (
    <SearchFlight />
  );
};

export default ScreenHomepage;
