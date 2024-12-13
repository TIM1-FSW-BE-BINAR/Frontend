import React from "react";
import NavigationBar from "../Navbar";
import { Container } from "react-bootstrap";
import { useSpring, animated } from "@react-spring/web";

const NotFound = () => {
  const formAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { tension: 200, friction: 20 },
  });
  return (
    <>
      <NavigationBar />
      <Container>
        <animated.div style={formAnimation}>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <img
              src="/img/404.png"
              alt="404 Illustration"
              style={{ maxWidth: "50%", height: "auto" }}
            />
            <h1 className="fw-bold">404 - Oops... page not found.</h1>
            <p style={{ color: "#7126B5" }}>
              Sorry, We don't know how you ended up here, but you should go away
              now.
            </p>
          </div>
        </animated.div>
      </Container>
    </>
  );
};

export default NotFound;
