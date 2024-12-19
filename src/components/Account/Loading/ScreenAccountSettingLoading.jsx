import React from "react";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import "./ScreenAccountSettingLoading.css";

const ScreenAccountSettingLoading = () => {
  return (
    <Container
      fluid="xxl"
      className="d-flex flex-column py-2 ms-5 custom-ubah-profil"
      style={{ position: "relative", left: "12rem", background: "#FFFFFF" }}
    >
      <div
        className="custom-div-head mb-2"
        style={{
          marginTop: "-1rem",
          marginLeft: "-5rem",
          position: "relative",
          width: "10rem",
          height: "1.5rem",
          backgroundColor: "#8e8d8f",
        }}
      />

      <Card
        className="custom-card"
        style={{
          width: "37rem",
          marginLeft: "-5rem",
        }}
      >
        <Card.Header className="text-white" style={{ background: "#a7a4ab" }}>
          <div
            className="custom-div1"
            style={{
              width: "5rem",
              height: "1rem",
              backgroundColor: "#d8d7d9",
            }}
          />
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formFirstName" className="mb-3">
              <div
                className="custom-div1"
                style={{
                  width: "5rem",
                  height: "1rem",
                  backgroundColor: "#d8d7d9",
                }}
              />
              <div
                className="custom-div2 mt-2"
                style={{
                  width: "20rem",
                  height: "2rem",
                  backgroundColor: "#c7c7c7",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mb-3">
              <div
                className="custom-div1"
                style={{
                  width: "5rem",
                  height: "1rem",
                  backgroundColor: "#d8d7d9",
                }}
              />
              <div
                className="custom-div2 mt-2"
                style={{
                  width: "20rem",
                  height: "2rem",
                  backgroundColor: "#c7c7c7",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <div
                className="custom-div1"
                style={{
                  width: "5rem",
                  height: "1rem",
                  backgroundColor: "#d8d7d9",
                }}
              />
              <div
                className="custom-div2 mt-2"
                style={{
                  width: "20rem",
                  height: "2rem",
                  backgroundColor: "#c7c7c7",
                }}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <div
                className="custom-div1"
                style={{
                  width: "5rem",
                  height: "1rem",
                  backgroundColor: "#d8d7d9",
                }}
              />
              <div
                className="custom-div2 mt-2"
                style={{
                  width: "20rem",
                  height: "2rem",
                  backgroundColor: "#c7c7c7",
                }}
              />
            </Form.Group>

            <div
              className="d-flex justify-content-center mx-auto w-25 text-white custom-div-3"
              style={{
                height: "2rem",
                backgroundColor: "#c7c7c7",
              }}
            />
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScreenAccountSettingLoading;
