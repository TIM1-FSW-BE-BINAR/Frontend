import React, { useState } from "react";
import "../components/Login/variables.scss";
import { createLazyFileRoute } from "@tanstack/react-router";
import PaymentLayout from "../layouts/paymentLayout";
import SuccessPayment from "../components/Payment/Payment/SuccessPayment";
import Protected from "../components/Auth/Protected";

export const Route = createLazyFileRoute("/complete")({
  component: () => (
    <Protected roles={[1]}>
      <CompletePayment />
    </Protected>
  ),
});

function CompletePayment() {
  const [openSuccess, setOpenSuccess] = useState(true);
  return (
    <>
      <PaymentLayout openSuccess={openSuccess} setOpenSuccess={setOpenSuccess}>
        {openSuccess && <SuccessPayment />}
      </PaymentLayout>
    </>
  );
}
