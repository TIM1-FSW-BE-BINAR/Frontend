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
const ScreenUbahProfil = () => {
  return (
    <Container className="d-flex flex-column py-2">
      <h1
        className="mb-3"
        style={{
          marginTop: "-1rem",
          right: "6.8rem",
          position: "relative",
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
              <Form.Control type="text" placeholder="Nama" />
            </Form.Group>

            <Form.Group controlId="formNomorTelepon" className="mb-3">
              <Form.Label>Nomor Telepon</Form.Label>
              <Form.Control type="text" placeholder="+62 123456789" />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="johndoe@gmail.com" />
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
