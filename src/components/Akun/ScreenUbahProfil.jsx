import {
  Container,
  Row,
  Col,
  Button,
  Nav,
  Dropdown,
  Image,
  Navbar,
  Card,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { profile } from "../../service/auth";
import { useState } from "react";

const ScreenUbahProfil = () => {
  const { token } = useSelector((state) => state.auth);

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token,
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <Container className="d-flex flex-column py-2">
      <h1
        className="mb-3"
        style={{
          marginTop: "-1rem",
          right: "6.8rem",
          position: "relative",
          color: "#000000",
        }}
      >
        Ubah Data Profil
      </h1>

      <Card style={{ width: "37rem", right: "7rem" }}>
        <Card.Header className="text-white" style={{ background: "#A06ECE" }}>
          <h5 className="mb-0">Data Diri</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formNamaLengkap" className="mb-3">
              <Form.Label>Nama Lengkap</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nama"
                value={`${data?.firstName || ""} ${data?.lastName || ""}`}
              />
            </Form.Group>

            <Form.Group controlId="formNomorTelepon" className="mb-3">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control
                type="text"
                placeholder="+62 123456789"
                value={`${data?.phone || ""} `}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="johndoe@gmail.com"
                value={`${data?.email || ""}`}
              />
            </Form.Group>

            <Button
              size="lg"
              className="d-flex justify-content-center mx-auto w-25"
              style={{ background: "#4B1979" }}
            >
              Simpan
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScreenUbahProfil;
