import { createLazyFileRoute } from "@tanstack/react-router";
import AkunLayout from "../layouts/AkunLayout";
import { useState } from "react";
import ScreenUbahProfil from "../components/Akun/ScreenUbahProfil";
import ScreenPengaturanAkun from "../components/Akun/ScreenPengaturanAkun";
export const Route = createLazyFileRoute("/account")({
  component: Account,
});

function Account() {
  const [openUbahProfil, setOpenUbahProfil] = useState(true);
  const [openPengaturanAkun, setOpenPengaturanAkun] = useState(false);
  return (
    <>
      <AkunLayout
        openUbahProfil={openUbahProfil}
        setOpenUbahProfil={setOpenUbahProfil}
        openPengaturanAkun={openPengaturanAkun}
        setOpenPengaturanAkun={setOpenPengaturanAkun}
      >
        {openUbahProfil && <ScreenUbahProfil />}
        {openPengaturanAkun && <ScreenPengaturanAkun />}
      </AkunLayout>
    </>
  );
}
