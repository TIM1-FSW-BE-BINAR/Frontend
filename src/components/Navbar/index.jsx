import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import { useQuery } from "@tanstack/react-query";
import { IoIosNotificationsOutline, IoIosList } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";
import { RxPerson } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: profile,
    enabled: token ? true : false,
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (isError) {
    }
  }, [isSuccess, isError, data, dispatch]);

  return (
    <>
      {["xxl"].map((expand) => (
        <Navbar
          style={{
            background: "#FFFFFF",
            boxShadow: "1px -20px 30px 0px grey",
          }}
          key={expand}
          expand={expand}
          className="mb-0 "
        >
          <Container>
            <Navbar.Brand
              as={Link}
              to="/"
              style={{ cursor: "pointer" }}
              className="fw-bold"
            >
              TiketKU
            </Navbar.Brand>

            <div
              style={{
                padding: "5px",
                paddingInline: "15px",
                margin: "5px",
                borderRadius: "10px",
                width: "350px",
                display: "flex",
                justifyContent: "center",
                gap: "0em",
                alignItems: "center",
                backgroundColor: "#EEEEEE",
              }}
            >
              <input
                type="text"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
                style={{
                  width: "100%",
                  border: "none",
                  zIndex: "1",
                  backgroundColor: "#EEEEEE",
                  outline: "1px grey",
                }}
                placeholder="Cari di sini ..."
              />

              <LuSearch />
            </div>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  TiketKU
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 text-black">
                  {user ? (
                    <>
                      <Nav.Link as={Link} to="/#faq">
                        <IoIosList />
                      </Nav.Link> History
                      <Nav.Link as={Link} to="/#faq">
                        <IoIosNotificationsOutline />
                      </Nav.Link> Notification
                      <Nav.Link as={Link} to="/#faq">
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
                        Masuk
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
