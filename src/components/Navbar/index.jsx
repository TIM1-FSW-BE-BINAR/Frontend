import { Container, Offcanvas, Navbar, Nav } from "react-bootstrap";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import { useQuery } from "@tanstack/react-query";
import { IoIosNotificationsOutline, IoIosList } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { RxPerson } from "react-icons/rx";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (isError) {
    }
  }, [isSuccess, isError, data, dispatch]);

  return (
    <>
      {["xl"].map((expand) => (
        <Navbar
          style={{
            background: "#FFFFFF",
            boxShadow: "1px -20px 30px 0px grey",
          }}
          key={expand}
          expand={expand}
          className="mb-0"
        >
          <Container>
            <Navbar.Brand
              as={Link}
              to="/"
              style={{ cursor: "pointer" }}
              className="fw-bold"
            >
              <img
                src="/img/logo_airfly_black_inline.png"
                width="80"
                height="22"
                className="d-inline-block align-center"
                alt="Airfly logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  AirFly
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 text-black align-items-center  ">
                  {user ? (
                    <>
                      <Nav.Link as={Link} to="/history">
                        <IoIosList /> History
                      </Nav.Link>
                      <Nav.Link as={Link} to="/notification">
                        <IoIosNotificationsOutline /> Notification
                      </Nav.Link>
                      <Nav.Link as={Link} to="/account">
                        <RxPerson /> Account
                      </Nav.Link>
                    </>
                  ) : (
                    <>
                      <Nav.Link
                        as={Link}
                        to="/login"
                        className="rounded-3 text-white px-3"
                        style={{
                          background: "#7126B5",
                        }}
                      >
                        <LuLogIn style={{ marginRight: "10px" }} />
                        Login
                      </Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default NavigationBar;
