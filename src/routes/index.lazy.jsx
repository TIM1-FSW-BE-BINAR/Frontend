import { createLazyFileRoute } from "@tanstack/react-router";
import GuestLayout from "../layouts/GuestLayout";
import { useState } from "react";
import ScreenHomepage from "../components/Homepage/ScreenHomepage";
export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [openHomepage, setOpenHomepage] = useState(true); 
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
