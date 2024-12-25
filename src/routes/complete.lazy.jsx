import React from "react";
import "../components/Login/variables.scss";
import { createLazyFileRoute } from "@tanstack/react-router";
import CheckoutLayout from "../layouts/CheckoutLayout";
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
  return (
    <CheckoutLayout
      openPayment={false}
      openSuccess={true}
      
    >
      <SuccessPayment />
    </CheckoutLayout>
  );
}
