import React from "react";
import "../components/Login/variables.scss";
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
          transform: "translate(-5px, -15px) scale(1.03) rotate(-4deg)",
        });
        await next({
          transform: "translate(0px, -30px) scale(1.05) rotate(-2deg)",
        });
        await next({
          transform: "translate(2px, -25px) scale(1.03) rotate(0deg)",
        });
        await next({
          transform: "translate(5px, -20px) scale(1.02) rotate(5deg)",
        });
        await next({
          transform: "translate(10px, -15px) scale(1.04) rotate(5deg)",
        });
        await next({
          transform: "translate(15px, -15px) scale(1.04) rotate(10deg)",
        });
        await next({
          transform: "translate(20px, -10px) scale(1.03) rotate(15deg)",
        });
        await next({
          transform: "translate(15px, 0px) scale(1) rotate(10deg)",
        });
        await next({
          transform: "translate(13px, 0px) scale(1) rotate(5deg)",
        });
        await next({
          transform: "translate(10px, 0px) scale(1) rotate(0deg)",
        });
        await next({
          transform: "translate(0px, 0px) scale(1) rotate(0deg)",
        });
      }
    },
    config: { duration: 4000 },
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
              src="/img/plane.svg"
              alt="Airfly Icon"
              style={{
                opacity: 0.9,
                filter: "blur(0.5px)",
              }}
            />
          </animated.div>
          <Image
            src="/img/airfly.png"
            alt="Airfly"
            style={{
              opacity: 0.9,
              filter: "blur(0.5px)",
              height: "100px",
            }}
          />
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
