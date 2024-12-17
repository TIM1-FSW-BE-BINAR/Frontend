import React from "react";
import NavigationBar from "../components/Navbar";
import NavbarBooking from "../components/NavbarBooking";
import PropTypes from "prop-types";

export default function LayoutAsli({
  openPayment,
  openSuccess,
  children,
  isSaved,
  isPayment,
}) {
  return (
    <>
      <NavigationBar />
      <NavbarBooking
        openPayment={openPayment}
        openSuccess={openSuccess}
        isSaved={isSaved}
        isPayment={isPayment}
      />
      {children}
    </>
  );
}
LayoutAsli.propTypes = {
  children: PropTypes.node.isRequired,
  isSaved: PropTypes.bool.isRequired,
  isPayment: PropTypes.bool.isRequired,
};