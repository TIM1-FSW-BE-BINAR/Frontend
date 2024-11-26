import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

import { Link, useNavigate } from "@tanstack/react-router";

const NavigationBarOtp = () => {
  return (
    <>
      {["xxl"].map((expand) => (
        <Navbar
          style={{
            background: "#FFFFFF",
            boxShadow: "1px -20px 30px 0px grey",
          }}
          key={expand}
          expand={expand}
          className="mb-0 "
        >
          <Container>
            <Navbar.Brand
              as={Link}
              to="/"
              style={{ cursor: "pointer" }}
              className="fw-bold"
            >
              TiketKU
            </Navbar.Brand>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default NavigationBarOtp;
