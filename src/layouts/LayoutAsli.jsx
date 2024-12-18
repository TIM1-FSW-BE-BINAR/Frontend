import React from "react";
import NavigationBar from "../components/Navbar";
import NavbarBooking from "../components/NavbarBooking";
import PropTypes from "prop-types";

export default function LayoutAsli({
  openPayment = false,
  openSuccess = false,
  isSaved = false,
  isPayment = false,
  isComplete = false,
  children
}) {
  return (
    <>
      <NavigationBar />
      <NavbarBooking
        isSaved={isSaved}
        isPayment={isPayment}
        isComplete={openSuccess}
      />
      {children}
    </>
  );
}

LayoutAsli.propTypes = {
  children: PropTypes.node.isRequired,
  openPayment: PropTypes.bool,
  openSuccess: PropTypes.bool,
  isSaved: PropTypes.bool,
  isPayment: PropTypes.bool,
  isComplete: PropTypes.bool,
};