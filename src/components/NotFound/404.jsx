import React from "react";
import NavigationBar from "../Navbar";
import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
    <>
      <NavigationBar />
      <Container>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <img
            src="/img/404.png"
            alt="404 Illustration"
            style={{ maxWidth: "50%", height: "auto" }}
          />
          <h1 className="fw-bold">404 - Oops... page not found.</h1>
          <p>
            Sorry, We don't know how you ended up here, but you should go away
            now.
          </p>
        </div>
      </Container>
    </>
  );
};

export default NotFound;
