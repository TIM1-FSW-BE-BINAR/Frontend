<<<<<<< HEAD
import React, { useState } from "react";
import NavigationBar from "../components/Navbar";
import NavbarPayment from "../components/Payment/NavbarPayment";

export default function PaymentLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <NavbarPayment />
=======
import React from "react";
import NavigationBar from "../components/Navbar";
import NavbarPayment from "../components/Payment/NavbarPayment";

export default function PaymentLayout({ openPayment, openSuccess, children }) {
  return (
    <>
      <NavigationBar />
      <NavbarPayment openPayment={openPayment} openSuccess={openSuccess} />
>>>>>>> b2da5b75fc80298b068d8fa6492f6576339aa165
      {children}
    </>
  );
}
