import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import HistoryLayout from "../layouts/History/HistoryLayout";
import ScreenHistory from "../components/History/ScreenHistory";
import DetailHistory from "../components/History/Detail/DetailHistory";
import NotFound from "../components/History/Detail/NotFound";
import { HistoryProvider } from "../components/History/HistoryContext";
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
  const [openHistory, setOpenHistory] = useState(true);
  const [openDetailHistory, setOpenDetailHistory] = useState(false);
  const [openNotFound, setOpenNotFound] = useState(false);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["getAllbookings"],
    queryFn: getAllBookings,
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess && (!data || data.length === 0)) {
      setOpenNotFound(true);
      setOpenHistory(false);
      setOpenDetailHistory(false);
    }
  }, [isSuccess, data]);

  return (
    <>
      <HistoryProvider>
        <HistoryLayout
          openHistory={openHistory}
          setOpenHistory={setOpenHistory}
          openDetailHistory={openDetailHistory}
          setOpenDetailHistory={setOpenDetailHistory}
          openNotFound={openNotFound}
          setOpenNotFound={setOpenNotFound}
        >
          {openHistory && <ScreenHistory />}
          {openDetailHistory && <DetailHistory />}
          {openNotFound && <NotFound />}
        </HistoryLayout>
      </HistoryProvider>
    </>
  );
}
