import { createLazyFileRoute } from "@tanstack/react-router";
import BookingForm from "../components/Booking/BookingForm";
import Protected from "../components/Auth/Protected";
import CheckoutLayout from "../layouts/CheckoutLayout";
import { useState } from "react";

export const Route = createLazyFileRoute("/booking")({
  component: () => (
    <Protected roles={[1]}>
      <Booking />
    </Protected>
  ),
});

function Booking() {
  const [isSaved, setIsSaved] = useState(false);
  const [isPayment, setIsPayment] = useState(false);

  return (
    <CheckoutLayout
      openPayment={false}
      openSuccess={false}
      isSaved={isSaved}
      isPayment={isPayment}
    >
      <BookingForm
        setIsSaved={setIsSaved}
        isSaved={isSaved}
        setIsPayment={setIsPayment}
        isPayment={isPayment}
      />
    </CheckoutLayout>
  );
}
