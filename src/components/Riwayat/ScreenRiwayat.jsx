import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { IoLocationSharp } from "react-icons/io5";
import { VscArrowRight } from "react-icons/vsc";
import DetailPesanan from "./Detail/DetailPesananan";

const ScreenRiwayat = () => {
  return (
    <Container fluid className="bg-light py-3">
      <Row>
        {/* Bagian kiri: Riwayat Pemesanan */}
        <Col md={8} className="pe-3">
          <h5
            className="d-flex fw-bold mb-3"
            style={{ position: "relative", left: "19.5rem" }}
          >
            Maret 2023
          </h5>
          <Card
            className="mb-3"
            style={{
              borderRadius: "10px",
              border: "1px solid #7126B5BF",
              width: "35rem",
              left: "19rem",
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div
                  className="text-white px-3 py-1"
                  style={{
                    backgroundColor: "#73CA5C",
                    borderRadius: "10px",
                    fontSize: "12px",
                  }}
                >
                  Issued
                </div>
              </div>
              <IoLocationSharp
                style={{
                  position: "relative",
                  top: "1.4rem",
                  fontSize: "1.5rem",
                  color: "#8A8A8A",
                }}
              />
              <div className="d-flex justify-content-between align-items-center">
                <div style={{ marginLeft: "2rem" }}>
                  <h6 className="mb-1 fs-6 fw-bolder">Jakarta</h6>
                  <div>
                    <span className="fs-7 fw-normal">5 Maret 2023</span>
                    <br />
                    <span className="fs-7 fw-normal">19:10</span>
                  </div>
                </div>

                <VscArrowRight size={20} style={{ color: "#8A8A8A" }} />

                <IoLocationSharp
                  style={{
                    position: "relative",
                    bottom: "1.6rem",
                    left: "4.75rem",
                    fontSize: "1.5rem",
                    color: "#8A8A8A",
                  }}
                />
                <div>
                  <h6 className="mb-1 fs-6 fw-bolder">Melbourne</h6>
                  <div>
                    <span className="fs-7 fw-normal">5 Maret 2023</span>
                    <br />
                    <span className="fs-7 fw-normal">21:10</span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <span className="fs-6 fw-bolder">Booking Code:</span>
                  <br />
                  <span className="fw-normal">6723y2GHK</span>
                </div>
                <div>
                  <span className="fs-6 fw-bolder">Class:</span>
                  <br />
                  <span className="fw-normal">Economy</span>
                </div>
                <span
                  className="fs-5 fw-bolder align-self-center"
                  style={{ color: "#4B1979" }}
                >
                  IDR 8.850.000
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Bagian kanan: Detail Pesanan */}
        <Col md={4} className="ps-3">
          <DetailPesanan />
        </Col>
      </Row>
    </Container>
  );
};

export default ScreenRiwayat;
