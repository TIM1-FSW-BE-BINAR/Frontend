import React, { useState } from "react";
import NavigationBar from "../components/Navbar";
import NavbarPayment from "../components/Payment/NavbarPayment";

export default function PaymentLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <NavbarPayment />
      {children}
    </>
  );
}
