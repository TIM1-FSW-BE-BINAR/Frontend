import * as React from "react";
import { useState } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import NavbarBooking from "../components/NavbarBooking";
import Footer from "../components/Footer";
import NavigationBar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TicketDetails from "../components/TicketDetails";
//import Seatpicker from "../components/Seat-Picker";
import SeatMap from "../components/SeatMap";
//import { FormControl } from "@mui/material";
//import { useNavigate, useLocation } from "@tanstack/react-router";
import {createBooking} from "../service/booking";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";


export const Route = createLazyFileRoute("/booking")({
  component: Booking,
});

function Booking() {
  const [hasFamilyName, setHasFamilyName] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passagerId, setPassagerId] = useState("KTP");
  const [passengerCount, setPassengerCount] = useState(3);

  const { user } = useSelector((state) => state.auth); 
  
  const [orderData, setOrderData] = useState({
    name: user?.name || "",
    familyName: user?.familyName || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
  });
  console.log(orderData);

  const [passengerData, setPassengerData] = useState({
    title: "",
    name: "",
    familyName: "",
    dob: null,
    citizenship: "Indonesia",
    identityNumber: "",
    countryOfIssue: "Indonesia",
    expiredDate: null,
    type: null,
  });

  const handlePassengerChange = (event) => {
    const { name, value } = event.target;
    setPassengerData((prev) => ({ ...prev, [name]: value }));
  };
  const handleDateChange = (field, value) => {
    if (value) {
      const formattedDate =
        field === "expiredDate"
          ? dayjs(value).endOf("day").toISOString()
          : dayjs(value).startOf("day").toISOString();

      setPassengerData((prev) => ({ ...prev, [field]: formattedDate }));
    }
  };
  const handleSwitchChange = (e) => {
    setHasFamilyName(e.target.checked);
  };
  const handleChangePI = (event) => {
    setPassagerId(event.target.value);
  };

  const validateForm = () => {
    const requiredFields = ["name", "title", "dob"];
    if (hasFamilyName) {
      requiredFields.push("familyName");
    }
    if (passagerId === "KTP") {
      requiredFields.push("identityNumber");
    } else if (passagerId === "Paspor") {
      requiredFields.push("identityNumber", "countryOfIssue", "expiredDate");
    }
    if (selectedSeats.length !== passengerCount) {
      toast.error(`Anda harus memilih ${passengerCount} kursi!`);
      return false;
    }

    const emptyFields = requiredFields.filter((field) => {
      return !orderData[field] && !passengerData[field];
    });

    if (emptyFields.length > 0) {
      emptyFields.forEach((field) =>
        toast.error(`Field ${field} tidak boleh kosong!`)
      );
      return false;
    }
    return true;
  };

  const { mutate: booking } = useMutation({
    mutationFn: (booking) => createBooking(booking),
    onSuccess: () => {
      toast.success("Data berhasil disimpan.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSaved(true);
      //merubah boxtimer menjadi hijau dan "data berhasil dirubah"
    },
    onError: (error) => {
      toast.error(`Terjadi kesalahan: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSaved(false);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log("Order Data:", orderData);
    console.log("Passenger Data:", passengerData);
    console.log("Kursi yang dipilih:", selectedSeats);
    3;

    setIsSaved(true);

    toast.info("Form berhasil divalidasi, mengirim data...", {
      position: "top-right",
      autoClose: 3000,
    });

    const request = {
      orderData,
      passengerData,
      selectedSeats,
    };
    booking(request);
  };

  const IOSSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor: "#9C27B0",
          opacity: 1,
          border: 0,
          ...theme.applyStyles("dark", {
            backgroundColor: "#9C27B0",
          }),
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#9C27B0",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[100],
        ...theme.applyStyles("dark", {
          color: theme.palette.grey[600],
        }),
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.7,
        ...theme.applyStyles("dark", {
          opacity: 0.3,
        }),
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
      ...theme.applyStyles("dark", {
        backgroundColor: "#39393D",
      }),
    },
  }));

  return (
    <>
      <ToastContainer />
      <NavigationBar />
      <NavbarBooking isSaved={isSaved} />
      <div className="container my-4">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-7 col-xl-6 d-flex align-items-center flex-column">
            <form className="p-3" onSubmit={onSubmit}>
              {/* Card Pemesan */}
              <div className="mb-3 shadow-sm">
                <Card style={{ width: "" }}>
                  <Card.Body>
                    <Card.Title>
                      <b>Isi Data Pemesan</b>
                    </Card.Title>
                    <Card style={{ border: "none" }}>
                      <Card.Header
                        className="text-white"
                        style={{ background: "#3C3C3C" }}
                      >
                        Data Diri Pemesan
                        {isSaved && (
                          <div
                            className="fa fa-check-circle"
                            style={{
                              color: "#73CA5C",
                              fontSize: "20px",
                              position: "absolute",
                              right: "10px",
                            }}
                          ></div>
                        )}
                      </Card.Header>
                      <Card.Body
                        style={{ color: "purple", fontWeight: "bold" }}
                      >
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control
                              value={user?.name}
                              className="custom-input"
                              disabled={!!user?.name}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Nama Keluarga</Form.Label>
                            <Form.Control
                              value={user?.familyName}
                              className="custom-input"
                              disabled={!!user?.familyName}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control
                              value={user?.phoneNumber}
                              className="custom-input"
                              disabled={!!user?.phoneNumber}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              value={user?.email}
                              className="custom-input"
                              disabled={!!user?.email}
                            />
                          </Form.Group>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
              </div>

              {/* Card penumpang */}
            {/* <form className="p-3" onSubmit={onSubmit}>*/}
              <div className="mb-3 shadow-sm">
                <Card style={{ width: "" }}>
                  <Card.Body>
                    <Card.Title>
                      <b>Isi Data Penumpang</b>
                    </Card.Title>
                    {/* {passengers?.length !== 0 && passengers.map(passengers, index)=>(
            <div key={index}> 

            masukin card
            Data Diri Pemesan {index + 1} - {passanger.type}

            </div>
          )} */}
                    <Card style={{ border: "none" }}>
                      <Card.Header
                        className="text-white"
                        style={{ background: "#3C3C3C" }}
                      >
                        Data Diri Pemesan 1 -Adult
                        {isSaved && (
                          <div
                            className="fa fa-check-circle"
                            style={{
                              color: "#73CA5C",
                              fontSize: "20px",
                              position: "absolute",
                              right: "10px",
                            }}
                          ></div>
                        )}
                      </Card.Header>
                      <Card.Body
                        style={{ color: "purple", fontWeight: "bold" }}
                      >
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Col>
                              <Select
                                name="title"
                                value={passengerData.title}
                                onChange={(event) =>
                                  setPassengerData((prev) => ({
                                    ...prev,
                                    title: event.target.value,
                                  }))
                                }
                                fullWidth
                                sx={{
                                  width: "100%",
                                  height: "40px",
                                  border: "none",
                                }}
                                disabled={isSaved}
                              >
                                <MenuItem value="Mr.">Mr.</MenuItem>
                                <MenuItem value="Ms.">Ms.</MenuItem>
                                <MenuItem value="Mrs.">Mrs.</MenuItem>
                              </Select>
                            </Col>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Nama Lengkap</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Nama Lengkap"
                              name="name"
                              value={passengerData.name}
                              onChange={handlePassengerChange}
                              className="custom-input"
                              disabled={isSaved}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3 align-items-center">
                          <Form.Group
                            as={Col}
                            controlId="switchFamilyName"
                            className="d-flex justify-content-between"
                          >
                            <Form.Label
                              style={{ color: "black", fontWeight: "normal" }}
                            >
                              Punya nama keluarga?
                            </Form.Label>
                            <IOSSwitch
                              checked={hasFamilyName}
                              onChange={handleSwitchChange}
                              disabled={isSaved}
                            />
                          </Form.Group>
                        </Row>
                        {hasFamilyName && (
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Nama Keluarga</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Nama Keluarga"
                                name="familyName"
                                value={passengerData.familyName}
                                onChange={handlePassengerChange}
                                disabled={isSaved}
                                className="custom-input"
                              />
                            </Form.Group>
                          </Row>
                        )}
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Tanggal Lahir</Form.Label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                sx={{ width: "100%" }}
                                value={
                                  passengerData.dob
                                    ? dayjs(passengerData.dob)
                                    : null
                                }
                                onChange={(value) =>
                                  handleDateChange("dob", value)
                                }
                                disabled={isSaved}
                              />
                            </LocalizationProvider>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="validationCustom01">
                            <Form.Label>Kewarganegaraan</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              name="citizenship"
                              value={passengerData.citizenship}
                              onChange={handlePassengerChange}
                              className="custom-input"
                              disabled={isSaved}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>KTP/Paspor</Form.Label>
                            <Col>
                              <Select
                                value={passagerId}
                                onChange={handleChangePI}
                                fullWidth
                                defaultValue="KTP"
                                sx={{
                                  width: "100%",
                                  height: "40px",
                                  border: "none",
                                  borderRadius: "7px",
                                }}
                                disabled={isSaved}
                              >
                                <MenuItem value="KTP">KTP</MenuItem>
                                <MenuItem value="Paspor">Paspor</MenuItem>
                              </Select>
                            </Col>
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Nomor ID</Form.Label>
                            <Form.Control
                              required
                              type="text"
                              placeholder="Nomor ID"
                              name="identityNumber"
                              value={passengerData.identityNumber}
                              onChange={handlePassengerChange}
                              className="custom-input"
                              disabled={isSaved}
                            />
                          </Form.Group>
                        </Row>
                        {passagerId === "Paspor" && (
                          <>
                            <Row className="mb-3 ">
                              <Form.Group
                                as={Col}
                                controlId="validationCustom01"
                              >
                                <Form.Label>Negara Penerbit</Form.Label>
                                <Col>
                                  <Select
                                    name="countryOfIssue"
                                    value={passengerData.countryOfIssue}
                                    onChange={(event) =>
                                      setPassengerData((prev) => ({
                                        ...prev,
                                        countryOfIssue: event.target.value,
                                      }))
                                    }
                                    fullWidth
                                    sx={{
                                      width: "100%",
                                      height: "40px",
                                      border: "none",
                                      borderRadius: "7px",
                                    }}
                                    disabled={isSaved}
                                  >
                                    <MenuItem value="Afghanistan">
                                      Afghanistan
                                    </MenuItem>
                                    <MenuItem value="Argentina">
                                      Argentina
                                    </MenuItem>
                                    <MenuItem value="Australia">
                                      Australia
                                    </MenuItem>
                                    <MenuItem value="Austria">Austria</MenuItem>
                                    <MenuItem value="Bahrain">Bahrain</MenuItem>
                                    <MenuItem value="Bangladesh">
                                      Bangladesh
                                    </MenuItem>
                                    <MenuItem value="Bhutan">Bhutan</MenuItem>
                                    <MenuItem value="Bolivia">Bolivia</MenuItem>
                                    <MenuItem value="Brazil">Brazil</MenuItem>
                                    <MenuItem value="Brunei">Brunei</MenuItem>
                                    <MenuItem value="Bulgaria">
                                      Bulgaria
                                    </MenuItem>
                                    <MenuItem value="Cambodia">
                                      Cambodia
                                    </MenuItem>
                                    <MenuItem value="Canada">Canada</MenuItem>
                                    <MenuItem value="China">China</MenuItem>
                                    <MenuItem value="Colombia">
                                      Colombia
                                    </MenuItem>
                                    <MenuItem value="Denmark">Denmark</MenuItem>
                                    <MenuItem value="Egypt">Egypt</MenuItem>
                                    <MenuItem value="Finland">Finland</MenuItem>
                                    <MenuItem value="France">France</MenuItem>
                                    <MenuItem value="Germany">Germany</MenuItem>
                                    <MenuItem value="India">India</MenuItem>
                                    <MenuItem value="Indonesia">
                                      Indonesia
                                    </MenuItem>
                                    <MenuItem value="Iran">Iran</MenuItem>
                                    <MenuItem value="Iraq">Iraq</MenuItem>
                                    <MenuItem value="Italy">Italy</MenuItem>
                                    <MenuItem value="Japan">Japan</MenuItem>
                                    <MenuItem value="Jordan">Jordan</MenuItem>
                                    <MenuItem value="Kazakhstan">
                                      Kazakhstan
                                    </MenuItem>
                                    <MenuItem value="Korea (North)">
                                      Korea (North)
                                    </MenuItem>
                                    <MenuItem value="Korea (South)">
                                      Korea (South)
                                    </MenuItem>
                                    <MenuItem value="Kuwait">Kuwait</MenuItem>
                                    <MenuItem value="Laos">Laos</MenuItem>
                                    <MenuItem value="Malaysia">
                                      Malaysia
                                    </MenuItem>
                                    <MenuItem value="Maldives">
                                      Maldives
                                    </MenuItem>
                                    <MenuItem value="Mexico">Mexico</MenuItem>
                                    <MenuItem value="Monaco">Monaco</MenuItem>
                                    <MenuItem value="Myanmar (Burma)">
                                      Myanmar (Burma)
                                    </MenuItem>
                                    <MenuItem value="Nepal">Nepal</MenuItem>
                                    <MenuItem value="Oman">Oman</MenuItem>
                                    <MenuItem value="Pakistan">
                                      Pakistan
                                    </MenuItem>
                                    <MenuItem value="Philippines">
                                      Philippines
                                    </MenuItem>
                                    <MenuItem value="Qatar">Qatar</MenuItem>
                                    <MenuItem value="Russia">Russia</MenuItem>
                                    <MenuItem value="Saudi Arabia">
                                      Saudi Arabia
                                    </MenuItem>
                                    <MenuItem value="Singapore">
                                      Singapore
                                    </MenuItem>
                                    <MenuItem value="Spain">Spain</MenuItem>
                                    <MenuItem value="Sri Lanka">
                                      Sri Lanka
                                    </MenuItem>
                                    <MenuItem value="Thailand">
                                      Thailand
                                    </MenuItem>
                                    <MenuItem value="Turkey">Turkey</MenuItem>
                                    <MenuItem value="United Arab Emirates">
                                      United Arab Emirates
                                    </MenuItem>
                                    <MenuItem value="United Kingdom">
                                      United Kingdom
                                    </MenuItem>
                                    <MenuItem value="United States">
                                      United States
                                    </MenuItem>
                                    <MenuItem value="Uzbekistan">
                                      Uzbekistan
                                    </MenuItem>
                                    <MenuItem value="Vietnam">Vietnam</MenuItem>
                                    <MenuItem value="Yemen">Yemen</MenuItem>
                                    <MenuItem value="Zambia">Zambia</MenuItem>
                                    <MenuItem value="Zimbabwe">
                                      Zimbabwe
                                    </MenuItem>
                                  </Select>
                                </Col>
                              </Form.Group>
                            </Row>

                            <Row className="mb-3">
                              <Form.Group>
                                <Form.Label>Berlaku Sampai</Form.Label>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    sx={{ width: "100%" }}
                                    value={
                                      passengerData.expiredDate
                                        ? dayjs(passengerData.expiredDate)
                                        : null
                                    }
                                    onChange={(value) =>
                                      handleDateChange("expiredDate", value)
                                    }
                                    disabled={isSaved}
                                  />
                                </LocalizationProvider>
                              </Form.Group>
                            </Row>
                          </>
                        )}
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
              </div>

              {/* Card Seat */}
              <div className="mb-3 shadow-sm">
                <Card style={{ width: "" }}>
                  <Card.Body>
                    <Card.Title>
                      <b>Pilih Kursi</b>
                    </Card.Title>
                    <div
                      id="box-timer"
                      style={{
                        background: "#73CA5C",
                        border: "1px solid white",
                        borderRadius: "10px",
                        marginTop: "15px",
                        zIndex: "1",
                      }}
                    >
                      {"Economy - 45 Seats Available"}
                    </div>
                    {/* <Seatpicker
                      isSaved={isSaved}
                      onSave={handleSeatSelection}
                      selectedSeats={selectedSeats}
                    /> */}
                    <SeatMap
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                      passengerCount={passengerCount}
                    />
                  </Card.Body>
                </Card>
              </div>

              {/* Button save */}
              <div className="mb-3 shadow-sm">
                <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    variant="purple"
                    className=" px-4 py-2 w-100"
                    style={{
                      backgroundColor: isSaved ? "#D0D0D0" : "#6a1b9a",
                      borderColor: isSaved ? "#D0D0D0" : "#6a1b9a",
                      color: isSaved ? "black" : "white",
                      cursor: isSaved ? "not-allowed" : "pointer",
                    }}
                    onClick={onSubmit}
                    disabled={isSaved}
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Card detail booking */}
          <div className="col-sm-12 col-md-12 col-lg-5 col-xl-4 d-flex align-items-center flex-column">
            {/* <FlightDetailCard /> */}
            <TicketDetails />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
