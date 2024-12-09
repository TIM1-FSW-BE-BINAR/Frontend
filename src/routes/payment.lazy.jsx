import React, { useState } from "react";
import "../styles/variables.scss";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import PaymentLayout from "../layouts/paymentLayout";
import PaymentOptions from "../components/Payment/Payment/Payment";
import SuccessPayment from "../components/Payment/Payment/SuccessPayment";

export const Route = createLazyFileRoute("/payment")({
  component: payment,
});

function payment() {
  const { token } = useSelector((state) => state.auth);
  const [openPayment, setOpenPayment] = useState(true);
  const [openSuccess, setOpenSuccess] = useState(false);

  // const { data, isSuccess, isLoading } = useQuery({
  //   queryKey: ["getAllbookings"],
  //   queryFn: getAllBookings,
  //   enabled: !!token,
  // });

  // // Effect untuk mengatur state jika tidak ada data
  // useEffect(() => {
  //   if (isSuccess && (!data || data.length === 0)) {
  //     // Jika query sukses tetapi data kosong
  //     setOpenNotFound(true);
  //     setOpenRiwayat(false);
  //     setOpenDetailRiwayat(false);
  //   }
  // }, [isSuccess, data]);

  return (
    <>
      <PaymentLayout
        openPayment={openPayment}
        setOpenPayment={setOpenPayment}
        openSuccess={openSuccess}
        setOpenSuccess={setOpenSuccess}
      >
        {openPayment && <PaymentOptions />}
        {openSuccess && <SuccessPayment />}
      </PaymentLayout>
    </>
  );
}
