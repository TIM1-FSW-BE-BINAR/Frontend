import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const DetailPesanan = () => {
  return (
    <Card
      style={{
        width: "25rem",
        borderRadius: "10px",
        border: "1px solid #D0D0D0",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        right: "6.5rem",
      }}
    >
      <Card.Body>
        {/* Status Pesanan */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold ">Detail Pesanan</h6>
          <span
            className="px-3 py-1 text-white"
            style={{
              backgroundColor: "#73CA5C",
              borderRadius: "10px",
              fontSize: "12px",
            }}
          >
            Issued
          </span>
        </div>

        {/* Booking Code */}
        <div className="d-flex align-items-center mb-3">
          <span className="fw-bold me-2">Booking Code:</span>
          <span style={{ color: "#4B1979", fontWeight: "bold" }}>
            6723y2GHK
          </span>
        </div>

        {/* Keberangkatan */}
        <div className="mb-3 d-flex align-items-start">
          <div>
            <p className="m-0 fw-bold">19:10</p>
            <p className="m-0">5 Maret 2023</p>
            <p className="m-0">Soekarno Hatta - Terminal IA Domestik</p>
          </div>
          <span className="fw-bold" style={{ color: "#A06ECE" }}>
            Keberangkatan
          </span>
        </div>
        <hr />

        <div className="mb-3 d-flex align-items-center">
          {/* Logo Maskapai */}
          <img
            className="me-4"
            src="img/airlane_logo1.svg"
            alt="Airlane Logo"
            style={{ width: "40px", height: "40px" }}
          />

          <div>
            {/* Detail Maskapai */}
            <h6 className="fw-bolder m-0">Jet Air - Economy</h6>
            <p className="m-0 fw-bold">JT - 203</p>
            {/* Informasi Penumpang */}
            <div className="mt-4">
              <h6 className="fw-bolder">Informasi: </h6>
              <p
                className="m-0"
                style={{ color: "#4B1979", fontWeight: "500" }}
              >
                Penumpang 1: Mr. Harry Potter
              </p>
              <p className="m-0">ID: 1234567</p>
              <p
                className="m-0"
                style={{ color: "#4B1979", fontWeight: "500" }}
              >
                Penumpang 2: Miss Hermione
              </p>
              <p className="m-0">ID: 789658</p>
            </div>
          </div>
        </div>
        <hr />

        <div className="mb-3 d-flex align-items-start justify-content-between">
          <div>
            <p className="m-0">21:10</p>
            <p className="m-0">5 Maret 2023</p>
            <p className="m-0">Melbourne International Airport</p>
          </div>

          <span className="fw-bold" style={{ color: "#A06ECE" }}>
            Kedatangan
          </span>
        </div>
        <hr />

        {/* Rincian Harga */}
        <div className="mb-3">
          <h6 className="fw-bold">Rincian Harga:</h6>
          <Row>
            <Col xs={8}>
              <p className="m-0">2 Adults</p>
              <p className="m-0">1 Baby</p>
              <p className="m-0">Tax</p>
            </Col>
            <Col xs={4} className="text-end">
              <p className="m-0">IDR 9.550.000</p>
              <p className="m-0">IDR 0</p>
              <p className="m-0">IDR 300.000</p>
            </Col>
          </Row>
          <hr />
          <div className="d-flex justify-content-between fw-bold">
            <p>Total</p>
            <p>IDR 8.850.000</p>
          </div>
        </div>

        {/* Tombol Cetak Tiket */}
        <Button
          style={{
            backgroundColor: "#4B1979",
            border: "none",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          Cetak Tiket
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DetailPesanan;
