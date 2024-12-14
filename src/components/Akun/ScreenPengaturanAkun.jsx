import React, { useState } from "react";
import { createLazyFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Container, Card, Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { IoEyeOutline, IoEyeOffOutline, IoArrowBack } from "react-icons/io5";
import { setToken } from "../../redux/slices/auth";
import { deleteUser } from "../../service/user"; // Pastikan path sesuai
import { ToastContainer } from "react-toastify";
import { Toaster, toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk toast
import "./ScreenPengaturanAkun.css";

const ScreenPengaturanAkun = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  // State untuk modal konfirmasi
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await deleteUser(); // Menjalankan fungsi deleteUser
      if (result) {
        dispatch(setToken(null)); // Hapus token dari Redux store
        toast.success("Account deleted successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error("Failed to delete account. Please try again later.");
    }
  };

  return (
    <Container
      className="d-flex flex-column py-2 custom-pengaturan-profil"
      style={{ position: "relative", left: "9rem", background: "#FFFFFF" }}
    >
      <Card className="custom-card-pengaturan" style={{ width: "35rem" }}>
        <Card.Header className="text-white" style={{ background: "#A06ECE" }}>
          <h5 className="mb-0 custom-h5">Hapus Akun</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-gray-600 mb-4 custom-p">
            This action cannot be undone. Please continue with caution
          </p>
          <Button
            size="lg"
            className="d-flex justify-content-center mx-auto w-25 custom-button"
            variant="danger"
            onClick={() => setShowModal(true)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>

      {/* Modal Konfirmasi */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowModal(false);
              handleDelete();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ScreenPengaturanAkun;
