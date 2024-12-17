import React, { useState } from "react";
import "../components/Login/variables.scss";
import { createLazyFileRoute } from "@tanstack/react-router";
import PaymentLayout from "../layouts/paymentLayout";
import PaymentOptions from "../components/Payment/Payment/Payment";
import Protected from "../components/Auth/Protected";

export const Route = createLazyFileRoute("/payment")({
  component: () => (
    <Protected roles={[1]}>
      <Payment />
    </Protected>
  ),
});

function Payment() {
  const [openPayment, setOpenPayment] = useState(true);
  return (
    <>
      <PaymentLayout openPayment={openPayment} setOpenPayment={setOpenPayment}>
        {openPayment && <PaymentOptions />}
      </PaymentLayout>
    </>
  );
}
