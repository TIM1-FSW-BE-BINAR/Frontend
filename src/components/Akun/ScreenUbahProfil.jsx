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

const ScreenUbahProfil = () => {
  const { token } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  // Fetch profil data
  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["profileMe"],
    queryFn: profileMe,
    enabled: !!token,
  });

  // Mutation untuk memperbarui profil
  const { mutate: updateProfile, isLoading: isUpdating } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      toast.success("Profil berhasil diperbarui!");
      queryClient.invalidateQueries(["profileMe"]); // Refresh data profil
    },
    onError: (error) => {
      toast.error(`Gagal memperbarui profil: ${error?.message}`);
    },
  });

  // Mengisi data form dengan data yang diambil dari API
  useEffect(() => {
    if (isSuccess && data) {
      setFormData({
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        phone: data?.phone || "",
      });
    }
  }, [data, isSuccess]);

  // Handler perubahan input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler perubahan nomor telepon
  const handlePhoneChange = (phone) => {
    setFormData((prevData) => ({
      ...prevData,
      phone,
    }));
  };

  // Handler submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center ">
        <BeatLoader style={{ position: "relative", marginTop: "15rem" }} />
      </div>
    );

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
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label>Nama Depan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Depan"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label>Nama Belakang</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nama Belakang"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formPhone" className="mb-3">
                <Form.Label>Nomor Telepon</Form.Label>
                <PhoneInput
                  placeholder="Masukkan nomor telepon"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  defaultCountry="ID"
                  international
                  className="form-control"
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="johndoe@gmail.com"
                  name="email"
                  value={data.email}
                  readOnly
                />
              </Form.Group>

              <Button
                size="lg"
                type="submit"
                className="d-flex justify-content-center mx-auto w-25"
                style={{ background: "#4B1979" }}
                disabled={isUpdating}
              >
                {isUpdating ? "Menyimpan..." : "Simpan"}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ScreenUbahProfil;
