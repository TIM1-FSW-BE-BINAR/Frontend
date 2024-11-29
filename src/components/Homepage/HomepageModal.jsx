import React, { useEffect } from "react";
import {  Col, Container, Form, Modal, Row } from "react-bootstrap";
import searchIcon from "../../assets/homepage/icon/search-icon.png";
import xIcon from "../../assets/homepage/icon/x-icon.png";

const HomepageModal = (props) => {
  const { inputValue, setInputValue, onSubmit, show, onHide } = props;

    useEffect(() => {
      if (show) {
        setInputValue(""); // Reset nilai input saat modal dibuka
      }
    }, [show, setInputValue]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah submit default
      if (onSubmit && typeof onSubmit === "function") {
        onSubmit(inputValue); // Kirim data input ke fungsi onSubmit
      }
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
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
          <form className="d-flex w-100">
            <div className="position-relative w-100">
              <Form.Control
                type="search"
                placeholder="Masukan Kota atau Negara"
                className="ps-5"
                aria-label="Search"
                style={{
                  paddingLeft: "40px", // Ruang untuk ikon
                  width: "100%", // Pastikan lebar penuh
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
                  left: "10px", // Posisi ikon dari tepi kiri input
                  top: "50%", // Menjaga ikon tetap di tengah secara vertikal
                  transform: "translateY(-50%)", // Vertikal tepat di tengah
                  width: "20px", // Ukuran ikon
                }}
              />
            </div>
          </form>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-2">
        <Container className="p-0">
          <Row className="pt-1">
            <Col xs={8} sm={10} className="">
              <h6 className="fw-bold">Pencarian terkini</h6>
            </Col>
            <Col className="">
              <h6 className="text-danger text-center">Hapus</h6>
            </Col>
          </Row>
          <Row className="pt-1 mt-3 border-bottom">
            <Col xs={8} sm={10}>
              <h6>Jakarta</h6>
            </Col>
            <Col className="d-flex justify-content-center">
              <img src={xIcon} className="img-fluid modal-x-icon" alt="" />
            </Col>
          </Row>
          <Row className="pt-1 mt-3 border-bottom">
            <Col xs={8} sm={10}>
              <h6>Bandung</h6>
            </Col>
            <Col className="d-flex justify-content-center">
              <img src={xIcon} className="img-fluid modal-x-icon" alt="" />
            </Col>
          </Row>
          <Row className="mt-3 border-bottom">
            <Col xs={8} sm={10}>
              <h6>Surabaya</h6>
            </Col>
            <Col className="d-flex justify-content-center">
              <img src={xIcon} className="img-fluid modal-x-icon" alt="" />
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default HomepageModal;
