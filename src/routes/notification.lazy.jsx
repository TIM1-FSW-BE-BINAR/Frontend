import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import ScreenNotifikasi from "../components/Notifikasi/ScreenNotifikasi";
import { useState } from "react";
import NotifikasiLayout from "../layouts/NotifikasiLayout";
import Protected from "../components/Auth/Protected";

export const Route = createLazyFileRoute("/notification")({
  component: () => (
    <Protected roles={[1]}>
      <Notification />
    </Protected>
  ),
});

function Notification() {
  const [openNotifikasi, setOpenNotifikasi] = useState(true);
  return (
    <>
      <NotifikasiLayout
        openNotifikasi={openNotifikasi}
        setOpenNotifikasi={setOpenNotifikasi}
      >
        {openNotifikasi && <ScreenNotifikasi />}
      </NotifikasiLayout>
    </>
  );
}
