import React from "react";
import "../styles/variables.scss";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Background from "/img/Frame 1.svg";
import LoginForm from "../components/Login/Form/index";

export const Route = createLazyFileRoute("/login")({
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

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
        ></div>

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
