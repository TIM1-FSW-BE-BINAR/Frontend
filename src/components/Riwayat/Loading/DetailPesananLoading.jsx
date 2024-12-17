import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const DetailPesananLoading = () => {
  return (
    <Card.Body>
      {/* Status Pesanan Placeholder */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "150px", height: "20px", backgroundColor: "#c7c7c7" }}
        ></div>
        <div
          className="placeholder rounded"
          style={{ width: "80px", height: "20px", backgroundColor: "#c7c7c7" }}
        ></div>
      </div>

      {/* Booking Code Placeholder */}
      <div className="d-flex align-items-center mb-3">
        <div
          className="placeholder rounded"
          style={{ width: "100px", height: "20px", backgroundColor: "#c7c7c7" }}
        ></div>
        <div
          className="placeholder rounded ms-3"
          style={{ width: "60px", height: "20px", backgroundColor: "#c7c7c7" }}
        ></div>
      </div>

      {/* Keberangkatan Placeholder */}
      <div className="mb-3 d-flex align-items-start justify-content-between">
        <div>
          <div
            className="placeholder rounded mb-2"
            style={{
              width: "60px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
          <div
            className="placeholder rounded mb-2"
            style={{
              width: "120px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
          <div
            className="placeholder rounded"
            style={{
              width: "200px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
        </div>
        <div
          className="placeholder rounded"
          style={{ width: "100px", height: "20px", backgroundColor: "#c7c7c7" }}
        ></div>
      </div>
      <hr />

      <div className="mb-3 d-flex align-items-center">
        {/* Logo Maskapai Placeholder */}
        <div
          className="placeholder rounded me-4"
          style={{ width: "40px", height: "40px", backgroundColor: "#c7c7c7" }}
        ></div>

        <div>
          {/* Detail Maskapai Placeholder */}
          <div
            className="placeholder rounded mb-2"
            style={{
              width: "200px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
          <div
            className="placeholder rounded mb-2"
            style={{
              width: "150px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
          {/* Informasi Penumpang Placeholder */}
          <div className="mt-4">
            <div
              className="placeholder rounded mb-2"
              style={{
                width: "250px",
                height: "20px",
                backgroundColor: "#c7c7c7",
              }}
            ></div>
            <div
              className="placeholder rounded"
              style={{
                width: "200px",
                height: "20px",
                backgroundColor: "#c7c7c7",
              }}
            ></div>
          </div>
        </div>
      </div>
      <hr />

      {/* Kedatangan Placeholder */}
      <div className="mb-3 d-flex align-items-start justify-content-between">
        <div>
          <div
            className="placeholder rounded mb-2"
            style={{
              width: "60px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
          <div
            className="placeholder rounded mb-2"
            style={{
              width: "120px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
          <div
            className="placeholder rounded"
            style={{
              width: "200px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
        </div>
        <div
          className="placeholder rounded"
          style={{ width: "100px", height: "20px", backgroundColor: "#c7c7c7" }}
        ></div>
      </div>
      <hr />

      {/* Rincian Harga Placeholder */}
      <div className="mb-3">
        <div
          className="placeholder rounded mb-3"
          style={{ width: "150px", height: "20px", backgroundColor: "#c7c7c7" }}
        ></div>
        <div>
          {[...Array(2)].map((_, index) => (
            <Row key={index} className="mb-2">
              <Col xs={8}>
                <div
                  className="placeholder rounded"
                  style={{
                    width: "100px",
                    height: "20px",
                    backgroundColor: "#c7c7c7",
                  }}
                ></div>
              </Col>
              <Col xs={4} className="text-end">
                <div
                  className="placeholder rounded"
                  style={{
                    width: "80px",
                    height: "20px",
                    backgroundColor: "#c7c7c7",
                  }}
                ></div>
              </Col>
            </Row>
          ))}
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <div
            className="placeholder rounded"
            style={{
              width: "50px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
          <div
            className="placeholder rounded"
            style={{
              width: "100px",
              height: "20px",
              backgroundColor: "#c7c7c7",
            }}
          ></div>
        </div>
      </div>
    </Card.Body>
  );
};

export default DetailPesananLoading;
