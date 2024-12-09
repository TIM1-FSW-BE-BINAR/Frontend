import React from "react";
import NavigationBar from "../components/Navbar";
import NavbarPayment from "../components/Payment/NavbarPayment";

export default function PaymentLayout({ openPayment, openSuccess, children }) {
  return (
    <>
      <NavigationBar />
      <NavbarPayment openPayment={openPayment} openSuccess={openSuccess} />
      {children}
    </>
  );
}
