import React from "react";
import "../styles/variables.scss";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Background from "/img/Frame 1.svg";
import LoginForm from "../components/Login/Form/index";
import { useSpring, animated } from "@react-spring/web";
import { Image } from "react-bootstrap";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const waveStyles = useSpring({
    from: { transform: "translate(0px, 0px) scale(1) rotate(0deg)" },
    to: async (next) => {
      while (true) {
        await next({
          transform: "translate(-15px, -10px) scale(1.03) rotate(-3deg)",
        });
        await next({
          transform: "translate(10px, -5px) scale(1.05) rotate(2deg)",
        });
        await next({
          transform: "translate(-10px, 5px) scale(1.03) rotate(-1deg)",
        });
        await next({
          transform: "translate(5px, 0px) scale(1.02) rotate(1deg)",
        });
      }
    },
    config: { duration: 5000 },
    loop: true,
  });

  useEffect(() => {
    if (token) {
      navigate({ to: "/" });
    }
  }, [token, navigate]);

  return (
    <>
      <section
        className="vh-100 vw-100 d-flex flex-column flex-md-row overflow-hidden"
        style={{
          backgroundColor: "#f5f5f5",
        }}
      >
        <div
          className="d-none d-md-flex flex-column justify-content-center align-items-center"
          style={{
            flex: 1,
            backgroundImage: `url(${Background})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100%",
          }}
        >
          <animated.div style={waveStyles}>
            <Image
              src="/img/logo_airfly_white.png"
              alt="Airfly Icon"
              style={{
                opacity: 0.9, 
                filter: "blur(0.5px)", 
              }}
            />
          </animated.div>
        </div>

        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{
            flex: 1,
            backgroundColor: "white",
            padding: "20px",
            height: "100%",
          }}
        >
          <LoginForm />
        </div>
      </section>
    </>
  );
}

export default Login;
