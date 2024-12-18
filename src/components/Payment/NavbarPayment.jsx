import { useNavigate, useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Breadcrumb,
  Navbar,
  Stack,
} from "react-bootstrap";


const NavbarPayment = ({ openPayment, openSuccess }) => {
  //const dispatch = useDispatch();
  const [isPayment, setIsPayment] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const getDeadline = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return now.toLocaleDateString("id-ID", options);
};


  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          background: "#FFFFFF",
          boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Container>
          <Stack gap={0}>
            <Row>
              <Breadcrumb>
                <Breadcrumb.Item
                  active
                  style={{
                    fontWeight: "bold",
                    color: "#7126B5",
                  }}
                >
                  <span style={{ textDecoration: "none", color: "#6c757d" }}>
                    Personal Information
                  </span>
                </Breadcrumb.Item>
                <span style={{ color: "#7126B5" }}>&gt;</span> {/* Separator */}
                <Breadcrumb.Item
                  active={isPayment}
                  style={{
                    fontWeight: isPayment ? "bold" : "normal",
                    color: isPayment ? "#7126B5" : "#6c757d",
                  }}
                >
                  <span style={{ textDecoration: "none" }}>Payment</span>
                </Breadcrumb.Item>
                <span style={{ color: "#7126B5" }}>&gt;</span> {/* Separator */}
                <Breadcrumb.Item
                  active={isComplete}
                  style={{
                    fontWeight: isComplete ? "bold" : "normal",
                    color: isComplete ? "#7126B5" : "#6c757d",
                  }}
                >
                  <span style={{ textDecoration: "none" }}>Complete</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Row>

            {openPayment && !openSuccess && (
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <Card
                    className="text-white text-center mx-4"
                    style={{ background: "#FF0000", borderRadius: "14px" }}
                  >
                    <Card.Body style={{ padding: "12px", margin: "0px" }}>
                      Please complete your payment before {getDeadline()}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}

            {openSuccess && (
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <Card
                    className="text-white text-center mx-4"
                    style={{ background: "#73CA5C", borderRadius: "14px" }}
                  >
                    <Card.Body style={{ padding: "12px", margin: "0px" }}>
                      Thank you for the transaction payment
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}
          </Stack>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarPayment;
