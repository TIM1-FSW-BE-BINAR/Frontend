import { createLazyFileRoute } from "@tanstack/react-router";
import GuestLayout from "../layouts/GuestLayout";
import { useState } from "react";
import ScreenHomepage from "../components/Homepage/ScreenHomepage";
export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [openHomepage, setOpenHomepage] = useState(true); // components yang akan dirender pertama kali nilainya true, sedangkan component yg lain nilai defaultnya false dulu
  return (
    <>
        <GuestLayout
          openHomepage={openHomepage}
          setOpenHomepage={setOpenHomepage}
        >
          {openHomepage && <ScreenHomepage />}
        </GuestLayout>
    </>
  );
}
