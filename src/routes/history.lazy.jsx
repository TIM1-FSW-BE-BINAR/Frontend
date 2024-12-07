//import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import RiwayatLayout from "../layouts/RiwayatLayout";
import ScreenRiwayat from "../components/Riwayat/ScreenRiwayat";
import DetailPesanan from "../components/Riwayat/Detail/DetailPesananan";
import NotFound from "../components/Riwayat/Detail/NotFound";
import { getAllBookings } from "../service/booking";
import { useState } from "react";
import Protected from "../components/Auth/Protected";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/history")({
  component: () => (
    <Protected roles={[1]}>
      <History />
    </Protected>
  ),
});

function History() {
  const { token } = useSelector((state) => state.auth);
  const [openRiwayat, setOpenRiwayat] = useState(true);
  const [openDetailRiwayat, setOpenDetailRiwayat] = useState(false);
  const [openNotFound, setOpenNotFound] = useState(false);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAllbookings"],
    queryFn: getAllBookings,
    enabled: !!token,
  });

  // Effect untuk mengatur state jika tidak ada data
  useEffect(() => {
    if (isSuccess && (!data || data.length === 0)) {
      // Jika query sukses tetapi data kosong
      setOpenNotFound(true);
      setOpenRiwayat(false);
      setOpenDetailRiwayat(false);
    }
  }, [isSuccess, data]);

  return (
    <>
      <RiwayatLayout
        openRiwayat={openRiwayat}
        setOpenRiwayat={setOpenRiwayat}
        openDetailRiwayat={openDetailRiwayat}
        setOpenDetailRiwayat={setOpenDetailRiwayat}
        openNotFound={openNotFound}
        setOpenNotFound={setOpenNotFound}
      >
        {openRiwayat && <ScreenRiwayat />}
        {openDetailRiwayat && <DetailPesanan />}
        {openNotFound && <NotFound />}
      </RiwayatLayout>
    </>
  );
}
