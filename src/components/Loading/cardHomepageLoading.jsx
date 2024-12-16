import React from 'react'
import { Card, Col } from 'react-bootstrap';

const cardHomepageLoading = () => {
     const flightData = Array.from({ length: 10 }); 

  return (
    <>
      {flightData.map((_, index) => (
        <Col key={index} className="d-flex">
          <Card className="custom-card">
            <Card.Img
              variant="top"
              style={{
                width: "100%",
                height: "150px",
                backgroundColor: "#e0e0e0",
              }}
              className="img-fluid"
            />
            <Card.Body className="custom-card-body">
              <Card.Title
                className="card-title"
                style={{
                  width: "120px",
                  height: "10px",
                  backgroundColor: "#e0e0e0",
                }}
              ></Card.Title>
              <p
                className="text-primary mb-1"
                style={{
                  width: "100px",
                  height: "10px",
                  backgroundColor: "#e0e0e0",
                }}
              ></p>
              <Card.Text>
                <p
                  className="mb-1"
                  style={{
                    width: "90px",
                    height: "10px",
                    backgroundColor: "#e0e0e0",
                  }}
                ></p>
                <p
                  className=""
                  style={{
                    width: "110px",
                    height: "10px",
                    backgroundColor: "#e0e0e0",
                  }}
                ></p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </>
  );
}

export default cardHomepageLoading