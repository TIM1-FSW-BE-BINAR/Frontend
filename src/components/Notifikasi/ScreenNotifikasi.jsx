import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { IoNotificationsCircle, IoEllipse } from "react-icons/io5";
import {
  getAllNotifications,
  readNotification,
  getUserNotifications,
} from "../../service/notification";
import { useNotificationContext } from "./NotificationContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BeatLoader } from "react-spinners";
import "./ScreenNotification.css";
import ScreenNotifikasiLoading from "./Loading/ScreenNotifikasiLoading";

const ScreenNotifikasi = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const { filterDate, searchQuery } = useNotificationContext();

  const { data, isLoading } = useQuery({
    queryKey: ["getUserNotification"],
    queryFn: getUserNotifications,
    enabled: !!token, // Enable only when token exists
  });

  const formatDateTime = (dateString) => {
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Gunakan format 24 jam
    };
    return format(new Date(dateString), "dd MMMM yyyy, HH:mm", { locale: id });
  };

  const filteredNotifications = data?.filter((notif) => {
    // Filter by date if filterDate exists
    if (filterDate) {
      const notifDate = new Date(notif.createdAt).setHours(0, 0, 0, 0);
      const selectedDate = new Date(filterDate).setHours(0, 0, 0, 0);
      if (notifDate !== selectedDate) return false;
    }
    // Filter by search query if searchQuery exists
    if (searchQuery) {
      return notif.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const mutation = useMutation({
    mutationFn: readNotification,
    onSuccess: (updatedNotification, { notificationID }) => {
      queryClient.setQueryData(["getUserNotification"], (Notifications) =>
        Notifications.map((notif) =>
          notif.id === notificationID ? { ...notif, isRead: true } : notif
        )
      );
    },
    onError: (error) => {
      console.error("Failed to mark notification as read:", error.message);
    },
  });

  const handleNotificationClick = (index, notificationID, isRead) => {
    if (!notificationID) {
      console.error("Notification ID is undefined");
      return;
    }

    if (!isRead) {
      console.log("Marking notification as read...");
      mutation.mutate({ notificationID });
    }
  };

  if (isLoading) return <ScreenNotifikasiLoading />;

  return (
    <Container fluid className=" py-3" style={{ background: "#FFFFFF" }}>
      <Row className="align-items-center">
        <Col md={8} className="offset-md-2">
          {/* Tampilkan pesan jika tidak ada notifikasi yang ditemukan */}
          {filteredNotifications?.length === 0 ? (
            <div className=" d-flex justify-content-center align-items-center mt-5 flex-column">
              <img
                src="src/assets/homepage/not-found.png"
                alt="tidak-ditemukan"
                style={{ width: "25rem" }}
                className="img-search-not-found"
              />
              <span className="mt-3 text-center">
                Maaf, pencarian Anda tidak ditemukan
              </span>
            </div>
          ) : (
            filteredNotifications?.map((notif, index) => (
              <Card
                key={index}
                className="mb-2 card-notif"
                style={{
                  borderRadius: "10px",
                  position: "relative",
                  alignSelf: "center",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleNotificationClick(index, notif.id, notif.isRead)
                }
              >
                <IoNotificationsCircle
                  size={25}
                  style={{
                    background: "white",
                    borderRadius: "50%",
                    color: "#7126B580",
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                  }}
                />
                <Card.Body className="ps-5">
                  <Card.Title className="d-flex justify-content-between align-items-center">
                    <span
                      className="notif-type"
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "400",
                        color: "#8A8A8A",
                      }}
                    >
                      {notif.type}
                    </span>
                    <div
                      className="notif-date d-flex align-items-center gap-2"
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "400",
                        color: "#8A8A8A",
                      }}
                    >
                      <span>{formatDateTime(notif.createdAt)}</span>

                      <IoEllipse
                        style={{ color: notif.isRead ? "#198754" : "#dc3545" }}
                      />
                    </div>
                  </Card.Title>
                  <Card.Text
                    className="notif-title"
                    style={{ fontSize: "1rem" }}
                  >
                    {notif.title}
                  </Card.Text>
                  {notif.isRead && (
                    <Card.Text
                      className="notif-description"
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: "400",
                        color: "#8A8A8A",
                      }}
                    >
                      {notif.description}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ScreenNotifikasi;
