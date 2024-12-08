import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import NotifikasiLayout from "../layouts/Notifikasi/NotifikasiLayout";
import ScreenNotifikasi from "../components/Notifikasi/ScreenNotifikasi";
import NotFoundNotifikasi from "../components/Notifikasi/NotFound/NotFoundNotifikasi";
import { useState } from "react";
import { getUserNotifications } from "../service/notification";
import Protected from "../components/Auth/Protected";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const Route = createLazyFileRoute("/notification")({
  component: () => (
    <Protected roles={[1]}>
      <Notification />
    </Protected>
  ),
});

function Notification() {
  const { token } = useSelector((state) => state.auth);
  const [openNotifikasi, setOpenNotifikasi] = useState(true);
  const [openNotFoundNotifikasi, setOpenNotFoundNotifikasi] = useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["getUserNotification"],
    queryFn: getUserNotifications,
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess && (!data || data.length === 0)) {
      // Jika query sukses tetapi data kosong
      setOpenNotFoundNotifikasi(true);
      setOpenNotifikasi(false);
    }
  }, [isSuccess, data]);
  return (
    <>
      <NotifikasiLayout
        openNotifikasi={openNotifikasi}
        setOpenNotifikasi={setOpenNotifikasi}
        openNotFoundNotifikasi={openNotFoundNotifikasi}
        setOpenNotFoundNotifikasi={setOpenNotFoundNotifikasi}
      >
        {openNotifikasi && <ScreenNotifikasi />}
        {openNotFoundNotifikasi && <NotFoundNotifikasi />}
      </NotifikasiLayout>
    </>
  );
}
