/* eslint-disable react/prop-types */
import { Container, Row, Col, Nav } from "react-bootstrap";
import { VscEdit, VscGear, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { useCallback, useEffect, useState } from "react";
import { profile } from "../../service/auth";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SidebarAkun({
  openUbahProfil,
  setOpenUbahProfil,
  openPengaturanAkun,
  setOpenPengaturanAkun,
  children,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleClick = (setterFunction) => {
    setOpenUbahProfil(false);
    setOpenPengaturanAkun(false);
    setterFunction((prev) => !prev); // Toggle the state
  };

  const handleLogout = useCallback(() => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/" });
  }, [dispatch, navigate]);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: token ? true : false,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (isError) {
      handleLogout();
    }
  }, [isSuccess, isError, data, dispatch, handleLogout]);

  const logoutConfirmation = (event) => {
    event.preventDefault();
    setOverlayVisible(true); // Show the overlay when toast is triggered
    toast.warn(
      <div style={{ textAlign: "center" }}>
        <p>Apakah Anda yakin ingin keluar?</p>
        <div style={{ marginTop: "10px" }}>
          <button
            onClick={() => {
              toast.dismiss();
              setOverlayVisible(false); // Hide overlay after toast is dismissed
              handleLogout();
            }}
            style={{
              marginRight: "10px",
              background: "#FF5C5C",
              border: "none",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Ya
          </button>
          <button
            onClick={() => {
              toast.dismiss();
              setOverlayVisible(false); // Hide overlay when user dismisses the toast
            }}
            style={{
              background: "#ccc",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Tidak
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
        className: "custom-toast-center",
        bodyClassName: "custom-toast-body",
      }
    );
  };

  return (
    <>
      <Container fluid>
        <Row className="flex-nowrap">
          <Col xs="auto" md={6} xl={6} className="bg-white shadow-sm mx-3">
            <div className="d-flex flex-column align-items-center ">
              <Nav
                className="flex-column mb-sm-0 align-items-center m-0 p-0"
                id="menu"
              >
                <Nav.Item
                  as={Row}
                  className="w-100 offset-md-1"
                  style={
                    openUbahProfil
                      ? {
                          cursor: "pointer",
                          background: "#CFD4ED",
                        }
                      : {}
                  }
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={10}
                    xl={10}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={() => handleClick(setOpenUbahProfil)}
                  >
                    <VscEdit
                      style={{
                        marginLeft: "10px",
                        marginRight: "-10px",
                        width: "24px",
                        height: "24px",
                        color: "#7126B5",
                      }}
                    />
                    <span className="ms-5 d-none d-sm-inline fs-10 w-100">
                      Ubah Profil
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100 offset-md-1"
                  style={
                    openPengaturanAkun
                      ? {
                          cursor: "pointer",
                          background: "#CFD4ED",
                        }
                      : {}
                  }
                >
                  <Nav.Link
                    as={Col}
                    className="text-black py-2 d-flex  align-items-center m-0 p-0"
                    style={{ width: "15rem" }}
                    onClick={() => handleClick(setOpenPengaturanAkun)}
                  >
                    <VscGear
                      style={{
                        marginLeft: "10px",
                        marginRight: "-10px",
                        width: "24px",
                        height: "24px",
                        color: "#7126B5",
                      }}
                    />
                    <span className="ms-5 d-none d-sm-inline fs-10 w-100">
                      Pengaturan Akun
                    </span>
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item
                  as={Row}
                  className="w-100 offset-md-1"
                  style={{ cursor: "pointer" }}
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={10}
                    xl={10}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    onClick={logoutConfirmation}
                  >
                    <VscSignOut
                      style={{
                        marginLeft: "10px",
                        marginRight: "-10px",
                        width: "24px",
                        height: "24px",
                        color: "#7126B5",
                      }}
                    />
                    <span className="ms-5 d-none d-sm-inline fs-10 w-100">
                      Keluar
                    </span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
          </Col>

          <Col
            className="m-0 p-0   min-vh-100 "
            style={{ background: "#F4F5F7" }}
          >
            {children}
          </Col>
        </Row>

        {/* Overlay for Toast */}
        {overlayVisible && <div className="custom-toast-overlay" />}

        <ToastContainer />

        {/* Custom Style */}
        <style jsx>{`
          .custom-toast-center {
            position: fixed !important; /* Memastikan posisi tetap */
            top: 50%; /* Vertikal di tengah */
            left: 50%; /* Horizontal di tengah */
            transform: translate(
              -50%,
              -50%
            ); /* Menyesuaikan dengan titik tengah */
            margin: 0; /* Menghilangkan margin bawaan */
            z-index: 9999; /* Pastikan di atas elemen lainnya */
            max-width: 400px; /* Batas lebar maksimal */
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* Bayangan */
          }

          .custom-toast-body {
            text-align: center; /* Konten toast rata tengah */
          }

          .custom-toast-overlay {
            position: fixed !important;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5); /* Latar belakang transparan */
            z-index: 9998; /* Di bawah toast, tetapi tetap di atas konten */
            pointer-events: none; /* Agar elemen lain masih bisa di-interact */
          }
        `}</style>
      </Container>
    </>
  );
}
