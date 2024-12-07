import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import NavbarBooking from '../components/NavbarBooking'
import NavigationBar from "../components/Navbar";
//import SuccessPayment from "../components/Payment/Payment/SuccessPayment";
import PaymentOptions from '../components/Payment/Payment/Payment';

export const Route = createLazyFileRoute('/payment')({
  component: Payment,
})

function Payment() {
  return (
    <>
      <NavigationBar />
      <NavbarBooking />
      <PaymentOptions />
      {/* <SuccessPayment /> */}
    </>
  );
}
