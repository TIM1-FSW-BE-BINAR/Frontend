/* eslint-disable react/prop-types */
import { Container, Row, Col, Nav } from "react-bootstrap";
import { VscEdit, VscGear, VscSignOut } from "react-icons/vsc";
import { Link, useNavigate } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { useCallback, useEffect, useState } from "react";
import { profileMe } from "../../service/auth";
import { useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import "./SidebarAccount.css";
import SidebarAccountLoading from "./Loading/SidebarAccountLoading";

export default function SidebarAccount({
  openUserProfil,
  setOpenUserProfil,
  openAccountSetting,
  setOpenAccountSetting,
  children,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const [overlayVisible, setOverlayVisible] = useState(false);

  const handleClick = (setterFunction) => {
    setOpenUserProfil(false);
    setOpenAccountSetting(false);
    setterFunction((prev) => !prev);
  };

  const handleLogout = useCallback(() => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/" });
  }, [dispatch, navigate]);

  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: ["profileMe"],
    queryFn: profileMe,
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (isError) {
      handleLogout();
    }
  }, [isSuccess, isError, data, dispatch, handleLogout]);

  if (isLoading) return <SidebarAccountLoading />;

  const logoutConfirmation = (event) => {
    event.preventDefault();
    setOverlayVisible(true);

    toast(
      (t) => (
        <div className="text-center logout-toast">
          <p>Are You sure you want to logout?</p>
          <div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setOverlayVisible(false);
                handleLogout();
              }}
              className="btn btn-danger me-2"
            >
              Yes
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                setOverlayVisible(false);
              }}
              className="btn btn-secondary"
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  return (
    <>
      <Container
        fluid
        className="p-0 mt-4 custom-sidebar"
        style={{
          position: "relative",
          left: "10rem",
          bottom: "4rem",
          width: "50vw",
        }}
      >
        <Row className="flex-nowrap">
          <Col
            xs={12}
            md={4}
            xl={3}
            className="p-3"
            style={{ width: "19rem", minHeight: "100vh" }}
          >
            <Nav className="flex-column">
              <Nav.Item
                className="py-2 custom-nav-item"
                style={{
                  backgroundColor: openUserProfil ? "#e3e3e3" : "transparent",
                }}
              >
                <Nav.Link
                  href="#"
                  className="d-flex align-items-center text-dark "
                  onClick={() => handleClick(setOpenUserProfil)}
                  style={{}}
                >
                  <VscEdit
                    size={24}
                    className="me-3 custom-nav-icon"
                    style={{ color: "#7126B5" }}
                  />
                  <span className="custom-span">User Profile</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item
                className="py-2 custom-nav-item"
                style={{
                  backgroundColor: openAccountSetting
                    ? "#e3e3e3"
                    : "transparent",
                }}
              >
                <Nav.Link
                  href="#"
                  className="d-flex align-items-center text-dark"
                  onClick={() => handleClick(setOpenAccountSetting)}
                >
                  <VscGear
                    size={24}
                    className="me-3 custom-nav-icon"
                    style={{ color: "#7126B5" }}
                  />
                  <span className="custom-span">Account Setting</span>
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="py-2 custom-nav-item">
                <Nav.Link
                  href="#"
                  className="d-flex align-items-center text-dark"
                  onClick={logoutConfirmation}
                >
                  <VscSignOut
                    size={24}
                    className="me-3 custom-nav-icon"
                    style={{ color: "#7126B5" }}
                  />
                  <span className="custom-span"> Logout</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col className="p-4 ">{children}</Col>
        </Row>

        {overlayVisible && (
          <div
            className="position-fixed w-100 h-100 top-0 start-0 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
          />
        )}

        <Toaster
          containerClassName="toaster-logout "
          containerStyle={{
            top: "50vh",
          }}
        />
      </Container>
    </>
  );
}
