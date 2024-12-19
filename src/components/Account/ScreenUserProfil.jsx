import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Button, Card, Form, Row, Col } from "react-bootstrap";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { profileMe } from "../../service/auth";
import { updateUser } from "../../service/user";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { BeatLoader } from "react-spinners";
import "./ScreenUserProfil.css";
import ScreenUserProfilLoading from "./Loading/ScreenUserProfilLoading";

const ScreenUserProfil = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["profileMe"],
    queryFn: profileMe,
    enabled: !!token,
  });

  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui!");
      queryClient.invalidateQueries(["profileMe"]);
    },
    onError: (error) => {
      toast.error(`Gagal memperbarui profil: ${error?.message}`);
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      setFormData({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        phone: data?.phone || "",
      });
    }
  }, [data, isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (phone) => {
    setFormData((prevData) => ({
      ...prevData,
      phone,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (isLoading) return <ScreenUserProfilLoading />;

  return (
    <Container
      fluid="xxl"
      className="d-flex flex-column py-2 ms-5 custom-ubah-profil"
      style={{ position: "relative", left: "12rem", background: "#FFFFFF" }}
    >
      <h1
        className="mb-3 custom-h1-ubah"
        style={{
          marginTop: "-1rem",
          marginLeft: "-5rem",
          position: "relative",
          color: "#000000",
        }}
      >
        User Profile
      </h1>

      <Card
        className="custom-card-ubah"
        style={{
          width: "37rem",
          marginLeft: "-5rem",
        }}
      >
        <Card.Header className="text-white" style={{ background: "#A06ECE" }}>
          <h5 className="mb-0 custom-h5-ubah">Profile</h5>
        </Card.Header>
        <Card.Body>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label className="custom-h5-ubah">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="form-control-data-diri"
                />
              </Form.Group>

              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label className="custom-h5-ubah">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="form-control-data-diri"
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label className="custom-h5-ubah">Phone Number</Form.Label>
                <PhoneInput
                  placeholder="Masukkan nomor telepon"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  defaultCountry="ID"
                  international
                  className="form-control form-control-data-diri"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label className="custom-h5-ubah">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="johndoe@gmail.com"
                  name="email"
                  value={data.email}
                  readOnly
                  className="form-control-data-diri"
                />
              </Form.Group>

              <Button
                size="lg"
                type="submit"
                variant="none"
                className="d-flex justify-content-center mx-auto w-25 text-white button-save"
                style={{ background: "#4B1979" }}
                disabled={isUpdating}
              >
                {isUpdating ? "Saving..." : "Save"}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScreenUserProfil;
