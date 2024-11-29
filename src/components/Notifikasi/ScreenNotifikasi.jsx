import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Card,
  Modal,
  Form,
} from "react-bootstrap";
import {
  VscArrowLeft,
  VscFilter,
  VscSearch,
  VscChromeClose,
} from "react-icons/vsc";
import { IoNotificationsCircle, IoEllipse } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const notificationsData = [
  {
    type: "Promosi",
    title: "Dapatkan Potongan 50% Tiket!",
    description: "Syarat dan Ketentuan berlaku!",
    date: "20 Maret, 14:04",
    isRead: true,
  },
  {
    type: "Notifikasi",
    title:
      "Terdapat perubahan pada jadwal penerbangan kode booking 45GT6. Cek jadwal perjalanan Anda disini!",
    description: "kode booking 45GT6. Cek jadwal perjalanan Anda disini!",
    date: "5 Maret, 14:04",
    isRead: false,
  },
];

const ScreenNotifikasi = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleNotificationClick = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].isRead = true; // Mark as read
    setNotifications(updatedNotifications); // Update state
  };

  return (
    <Container fluid className="bg-light py-3">
      {/* Daftar Notifikasi */}
      <Row className="align-items-center">
        <Col md={8} className="offset-md-2" style={{ marginLeft: "19rem" }}>
          {notifications.map((notif, index) => (
            <Card
              key={index}
              className="mb-2"
              style={{
                borderRadius: "10px",
                position: "relative",
                cursor: "pointer", // Menambahkan cursor pointer saat card diklik
              }}
              onClick={() => handleNotificationClick(index)}
            >
              {/* Ikon di sebelah kiri atas */}
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
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "400",
                      color: "#8A8A8A",
                    }}
                  >
                    {notif.type}
                  </span>
                  <div
                    className="d-flex align-items-center gap-2"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: "400",
                    }}
                  >
                    <span>{notif.date}</span>
                    <IoEllipse
                      style={{ color: notif.isRead ? "#198754" : "#dc3545" }}
                    />
                  </div>
                </Card.Title>
                <Card.Text style={{ fontSize: "1rem" }}>
                  {notif.title}
                </Card.Text>
                {notif.isRead && (
                  <Card.Text
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
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ScreenNotifikasi;
