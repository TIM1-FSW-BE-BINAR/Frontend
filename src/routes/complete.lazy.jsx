import React from "react";
import "../components/Login/variables.scss";
import { createLazyFileRoute } from "@tanstack/react-router";
import LayoutAsli from "../layouts/LayoutAsli";
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
    <LayoutAsli
      openPayment={false}
      openSuccess={true}
      
    >
      <SuccessPayment />
    </LayoutAsli>
  );
}
