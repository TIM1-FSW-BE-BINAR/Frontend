import { Container, Card, Button, Form } from "react-bootstrap";
const ScreenPengaturanAkun = () => {
  return (
    <Container
      className="d-flex flex-column py-2"
      style={{ marginLeft: "-5rem" }}
    >
      <Card style={{ width: "35rem" }}>
        <Card.Header className="text-white" style={{ background: "#A06ECE" }}>
          <h5 className="mb-0">Ganti Password</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="text" placeholder="********" />
            </Form.Group>

            <Form.Group controlId="formConfirmNewPassword" className=" mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control type="text" placeholder="********" />
            </Form.Group>

            <Button
              size="lg"
              className="d-flex justify-content-center mx-auto w-25"
              style={{ background: "#4B1979" }}
              variant="none text-white"
            >
              Simpan
            </Button>
          </Form>
        </Card.Body>
      </Card>

      <Card style={{ width: "35rem", marginTop: "3rem" }}>
        <Card.Header className="text-white" style={{ background: "#A06ECE" }}>
          <h5 className="mb-0">Hapus Akun</h5>
        </Card.Header>
        <Card.Body>
          <p className="text-gray-600 mb-4">
            This action cannot be undone. Please continue with caution
          </p>
          <Button
            size="lg"
            className=" d-flex justify-content-center mx-auto w-25"
            variant="danger"
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScreenPengaturanAkun;
