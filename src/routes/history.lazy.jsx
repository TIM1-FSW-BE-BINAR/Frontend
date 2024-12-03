import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import RiwayatLayout from "../layouts/RiwayatLayout";
import ScreenRiwayat from "../components/Riwayat/ScreenRiwayat";
import { useState } from "react";
import Protected from "../components/Auth/Protected";

export const Route = createLazyFileRoute("/history")({
  component: () => (
    <Protected roles={[1]}>
      <History />
    </Protected>
  ),
});

function History() {
  const [openRiwayat, setOpenRiwayat] = useState(true);
  return (
    <>
      <RiwayatLayout openRiwayat={openRiwayat} setOpenRiwayat={setOpenRiwayat}>
        {openRiwayat && <ScreenRiwayat />}
      </RiwayatLayout>
    </>
  );
}
