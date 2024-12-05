import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, Row } from "react-bootstrap";
import searchIcon from "../../assets/homepage/icon/search-icon.png";
import { SlLocationPin } from "react-icons/sl";
import xIcon from "../../assets/homepage/icon/x-icon.png";

const HomepageModal = (props) => {
  const { inputValue, setInputValue, onSubmit, show, onHide, flights } = props;

  useEffect(() => {
    if (show) {
      console.log("input value kereset");
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
                placeholder="Masukan Kota atau Negara"
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
              <h6 className="fw-bold">Pencarian</h6>
            </Col>
          </Row>

          {/* Scrollable List Section */}
          <div
            style={{
              maxHeight: "300px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {flights?.map((flight, index) => (
              <Row
                className="py-3 border-bottom list-item-city-modal"
                key={index}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                }}
                onClick={() => {
                  handleCitySelect(flight?.departure.city);
                }}
              >
                <Col className="d-flex">
                  <SlLocationPin className="me-2" />
                  <h6>{flight?.departure.city}</h6>
                </Col>
              </Row>
            ))}
          </div>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default HomepageModal;
