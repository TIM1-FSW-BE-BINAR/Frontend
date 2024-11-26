import React from "react";
import "../styles/variables.scss";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import OtpForm from "../components/Register/OTP";
import NavigationBarOtp from "../components/Register/OTP/NavbarOtp";

export const Route = createLazyFileRoute("/otp")({
  component: Otp,
});

function Otp() {
  const { token } = useSelector((state) => state.auth);

  // if (token) {
  //   navigate({ to: "/" });
  // }

  return (
    <>
      <NavigationBarOtp />
      <OtpForm />
    </>
  );
}
