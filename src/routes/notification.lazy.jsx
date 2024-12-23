import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import NotificationLayout from "../layouts/Notification/NotificationLayout";
import ScreenNotification from "../components/Notification/ScreenNotification";
import NotFoundNotification from "../components/Notification/NotFound/NotFoundNotification";
import { NotificationProvider } from "../components/Notification/NotificationContext";
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
  const [openNotification, setOpenNotification] = useState(true);
  const [openNotFoundNotification, setOpenNotFoundNotification] =
    useState(false);

  const { data, isSuccess } = useQuery({
    queryKey: ["getUserNotification"],
    queryFn: getUserNotifications,
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess && (!data || data.length === 0)) {
      setOpenNotFoundNotification(true);
      setOpenNotification(false);
    }
  }, [isSuccess, data]);
  return (
    <>
      <NotificationProvider>
        <NotificationLayout
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
          openNotFoundNotification={openNotFoundNotification}
          setOpenNotFoundNotification={setOpenNotFoundNotification}
        >
          {openNotification && <ScreenNotification />}
          {openNotFoundNotification && <NotFoundNotification />}
        </NotificationLayout>
      </NotificationProvider>
    </>
  );
}
