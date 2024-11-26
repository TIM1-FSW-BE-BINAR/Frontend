/* eslint-disable react/prop-types */
import {
  Container,
  Row,
  Col,
  Nav,
  Dropdown,
  Image,
  Navbar,
} from "react-bootstrap";
import { VscEdit, VscGear, VscSignOut } from "react-icons/vsc";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { useCallback, useEffect } from "react";
import { profile } from "../../service/auth";
import { useQuery } from "@tanstack/react-query";

export default function SidebarAkun({
  openUbahProfil,
  setOpenUbahProfil,
  openPengaturanAkun,
  setOpenPengaturanAkun,
  children,
}) {
  const handleClick = (setterFunction) => {
    setOpenUbahProfil(false);
    setOpenPengaturanAkun(false);
    setterFunction((prev) => !prev); // Toggle the state
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
                    href="#"
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
                  //   style={
                  //     openPengaturanAkun
                  //       ? { cursor: "pointer", background: "#CFD4ED" }
                  //       : {}
                  //   }
                >
                  <Nav.Link
                    as={Col}
                    xs="auto"
                    md={10}
                    xl={10}
                    href="#"
                    className="align-middle text-black py-2 d-flex justify-content-center align-items-center m-0 p-0 w-100"
                    // onClick={() => handleClick(setOpenPengaturanAkun)}
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
      </Container>
    </>
  );
}
