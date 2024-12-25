import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ScreenNotificationLoading = () => {
  return (
    <Container fluid className=" py-3" style={{ background: "#FFFFFF" }}>
      <Row className="align-items-center">
        <Col md={8} className="offset-md-2">
          <Card
            className="mb-2 card-notif"
            style={{
              borderRadius: "10px",
              position: "relative",
              alignSelf: "center",
              cursor: "pointer",
            }}
          >
            <Card.Body className="ps-5">
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span
                  style={{
                    width: "5rem",
                    height: "0.5rem",
                    backgroundColor: "#d8d7d9",
                  }}
                />
                <span
                  style={{
                    width: "10rem",
                    height: "0.5rem",
                    backgroundColor: "#d8d7d9",
                  }}
                />
              </Card.Title>
              <Card.Text>
                <div
                  className="mt-4"
                  style={{
                    width: "20rem",
                    height: "0.5rem",
                    backgroundColor: "#d8d7d9",
                  }}
                />
                <div
                  className="mt-2"
                  style={{
                    width: "20rem",
                    height: "0.5rem",
                    backgroundColor: "#d8d7d9",
                  }}
                />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ScreenNotificationLoading;
