import React from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";

const SidebarAccountLoading = () => {
  return (
    <Container
      fluid
      className="p-0 mt-4 custom-sidebar"
      style={{
        position: "relative",
        left: "10rem",
        bottom: "4rem",
        width: "50vw",
      }}
    >
      <Row className="flex-nowrap">
        <Col
          xs={12}
          md={4}
          xl={3}
          className="p-3"
          style={{ width: "19rem", minHeight: "100vh" }}
        >
          <Nav className="flex-column">
            <Nav.Item
              className="py-2 custom-nav-item"
              style={{
                height: "3rem",
                backgroundColor: "#d8d7d9",
              }}
            >
              <Nav.Link
                className="d-flex align-items-center text-dark "
                style={{
                  height: "2rem",
                  width: "3rem",
                  backgroundColor: "#c7c7c7",
                }}
              >
                <div
                  style={{
                    height: "2rem",
                    width: "1rem",
                    backgroundColor: "#a7a4ab",
                  }}
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              className="py-2 custom-nav-item"
              style={{
                height: "3rem",
                backgroundColor: "#d8d7d9",
              }}
            >
              <Nav.Link
                className="d-flex align-items-center text-dark "
                style={{
                  height: "2rem",
                  width: "3rem",
                  backgroundColor: "#c7c7c7",
                }}
              >
                <div
                  style={{
                    height: "2rem",
                    width: "1rem",
                    backgroundColor: "#a7a4ab",
                  }}
                />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              className="py-2 custom-nav-item"
              style={{
                height: "3rem",
                backgroundColor: "#d8d7d9",
              }}
            >
              <Nav.Link
                className="d-flex align-items-center text-dark "
                style={{
                  height: "2rem",
                  width: "3rem",
                  backgroundColor: "#c7c7c7",
                }}
              >
                <div
                  style={{
                    height: "2rem",
                    width: "1rem",
                    backgroundColor: "#a7a4ab",
                  }}
                />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default SidebarAccountLoading;
