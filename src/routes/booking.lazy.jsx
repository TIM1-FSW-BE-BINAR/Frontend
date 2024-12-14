//import * as React from "react";
import { useState } from "react";
import { createLazyFileRoute, useLocation } from "@tanstack/react-router";
import { Container,Card, Button, Col, Form, Row } from "react-bootstrap";
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
import SeatMap from "../components/SeatMap";
import { createBooking } from "../service/booking";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getFlightId } from "../service/flight/flightService";

export const Route = createLazyFileRoute("/booking")({
  component: Booking,
});

function Booking() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  // const [hasFamilyName, setHasFamilyName] = useState(true);
  // const [passagerId, setPassagerId] = useState("KTP");
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const flightId = parseInt(searchParams.get("flightId"), 10) || 0;
  const totalPassengers = parseInt(searchParams.get("totalPassengers"), 10) || 0;
  const adultInput = parseInt(searchParams.get("adultInput"), 10) || 0;
  const childInput = parseInt(searchParams.get("childInput"), 10) || 0;
  const babyInput = parseInt(searchParams.get("babyInput"), 10) || 0;
  const totalSeat = adultInput + childInput;

  const passengers = Array.from({ length: totalPassengers }, (_, index) => {
    let passengerType = "ADULT";
    if (index < adultInput) {
      passengerType = "ADULT";
    } else if (index < adultInput + childInput) {
      passengerType = "CHILD";
    } else if (index < adultInput + childInput + babyInput) {
      passengerType = "BABY";
    }
    return {
      index,
      type: passengerType,
    };
  });

  const [passengerData, setPassengerData] = useState({
    title: "",
    name: "",
    familyName: "",
    gender: "",
    dob: null,
    citizenship: "Indonesia",
    identityNumber: "",
    countryOfIssue: "Indonesia",
    expiredDate: null,
    type: null,
  });

  const handlePassengerChange = (event) => {
    const { name, value } = event.target;
    const passengerIndex = name.split("_")[1];

    // Mengonversi 'title' menjadi 'gender'
    if (name.startsWith("title")) {
      let gender = "";

      // Menetapkan gender berdasarkan 'title'
      if (value === "Mr.") {
        gender = "MALE";
      } else if (value === "Ms." || value === "Mrs.") {
        gender = "FEMALE";
      }

      // Update state dengan nilai 'title' dan 'gender' berdasarkan index
      setPassengerData((prev) => ({
        ...prev,
        [`${name.split("_")[0]}_${passengerIndex}`]: value,
        [`gender_${passengerIndex}`]: gender, // Menyimpan gender berdasarkan index
      }));
    } else {
      // Update field lain selain title
      setPassengerData((prev) => ({
        ...prev,
        [`${name.split("_")[0]}_${passengerIndex}`]: value,
      }));
    }
  };

  const handleTitleChange = (event, index) => {
    const { value } = event.target;
    const gender = value === "Mr" ? "MALE" : "FEMALE";

    setPassengerData((prev) => ({
      ...prev,
      [`title_${index}`]: value,
      [`gender_${index}`]: gender,
    }));
  };

  const handleDateChange = (field, value, index) => {
    if (value) {
      const formattedDate =
        field === "expiredDate"
          ? dayjs(value).endOf("day").toISOString()
          : dayjs(value).startOf("day").toISOString();

      setPassengerData((prev) => ({
        ...prev,
        [`${field}_${index}`]: formattedDate,
      }));
    }
  };

  const handleSwitchChange = (e, index) => {
    setPassengerData((prev) => ({
      ...prev,
      [`hasFamilyName_${index}`]: e.target.checked,
    }));
  };

  const handleChangePI = (event, index) => {
    const { value } = event.target;

    setPassengerData((prev) => ({
      ...prev,
      [`passagerId_${index}`]: value,
    }));
  };

  const validateForm = () => {
    for (let { index } of passengers) {
      let requiredFields = ["name", "title", "dob"];

      if (passengerData[`hasFamilyName_${index}`]) {
        requiredFields.push("familyName");
      }
      const passagerId = passengerData[`passagerId_${index}`];
      if (passagerId === "KTP") {
        requiredFields.push("identityNumber");
      } else if (passagerId === "Paspor") {
        requiredFields.push("identityNumber", "countryOfIssue", "expiredDate");
      }

      const passengerRequiredFields = requiredFields
        .map((field) => (passengerData[`${field}_${index}`] ? null : field))
        .filter(Boolean);

      if (passengerRequiredFields.length > 0) {
        passengerRequiredFields.forEach((field) =>
          toast.error(
            `Field ${field} untuk Penumpang ${index +1} tidak boleh kosong!`
          )
        );
        return false; 
    }

    if (selectedSeats.length !== totalSeat) {
      toast.error(`Anda harus memilih ${totalSeat} kursi!`);
      return false;
    }

    return true;
  }};

  const { data: flight } = useQuery({
    queryKey: ["flight", flightId],
    queryFn: () => getFlightId(flightId),
    enabled: !!flightId,
  });

  const { mutate: booking } = useMutation({
    mutationFn: (request) => createBooking(request),
    onSuccess: () => {
      toast.success("Data berhasil disimpan.");
      setIsSaved(true);
      //merubah boxtimer menjadi hijau dan "data berhasil dirubah"
    },
    onError: (error) => {
      toast.error(`Terjadi kesalahan: ${error.message}`);
      setIsSaved(false);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    const bookingDate = new Date().toISOString();

    if (!validateForm()) {
      return;
    }

    console.log("Passenger Data:", passengerData);
    console.log("Kursi yang dipilih:", selectedSeats);

    setIsSaved(true);

    const bookingDetail = passengers.map(({ index, type }, seatIndex) => ({
      seatId: selectedSeats[seatIndex] || 0,
      price: flight?.data?.price || 0,
      passenger: {
        name: passengerData[`name_${index}`] || "",
        familyName: passengerData[`familyName_${index}`] || "",
        gender: passengerData[`gender_${index}`] || "",
        identityNumber: passengerData[`identityNumber_${index}`] || 0,
        citizenship: passengerData[`citizenship_${index}`] || "Indonesia",
        countryOfIssue: passengerData[`countryOfIssue_${index}`] || "Indonesia",
        title: passengerData[`title_${index}`] || "",
        dob: passengerData[`dob_${index}`] || "",
        expiredDate: passengerData[`expiredDate_${index}`] || "0",
        type,
      },
    }));

    const request = {
      flightId,
      returnFlightId: null,
      bookingDate,
      bookingDetail,
    };

    console.log(request);
    console.log("Request dalam format JSON:", JSON.stringify(request, null, 2));

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
      <Toaster position="top-right" />
      <NavigationBar />
      <NavbarBooking isSaved={isSaved} />
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col
            sm={12}
            md={12}
            lg={7}
            xl={6}
          >
            <form onSubmit={onSubmit}>
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
                              value={user?.firstName}
                              className="custom-input"
                              disabled={!!user?.firstName}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Nama Belakang</Form.Label>
                            <Form.Control
                              value={user?.lastName}
                              className="custom-input"
                              disabled={!!user?.lastName}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Nomor Telepon</Form.Label>
                            <Form.Control
                              value={user?.phone}
                              className="custom-input"
                              disabled={!!user?.phone}
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
              <div className="mb-3 shadow-sm">
                <Card style={{ width: "" }}>
                  <Card.Body>
                    <Card.Title>
                      <b>Isi Data Penumpang</b>
                    </Card.Title>
                    {passengers.map(({ index, type }) => (
                      <div key={index}>
                        <Card style={{ border: "none" }}>
                          <Card.Header
                            className="text-white"
                            style={{ background: "#3C3C3C" }}
                          >
                            Data Diri Pemesan {index + 1} - {type}
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
                                    name={`title_${index}`}
                                    value={
                                      passengerData[`title_${index}`] || ""
                                    }
                                    onChange={(event) =>
                                      handleTitleChange(event, index)
                                    }
                                    fullWidth
                                    sx={{
                                      width: "100%",
                                      height: "40px",
                                      border: "none",
                                    }}
                                    disabled={isSaved}
                                  >
                                    <MenuItem value="Mr">Mr</MenuItem>
                                    <MenuItem value="Mrs">Mrs</MenuItem>
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
                                  name={`name_${index}`}
                                  value={passengerData[`name_${index}`] || ""}
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
                                  style={{
                                    color: "black",
                                    fontWeight: "normal",
                                  }}
                                >
                                  Punya nama keluarga?
                                </Form.Label>
                                <IOSSwitch
                                  checked={
                                    passengerData[`hasFamilyName_${index}`] ||
                                    false
                                  }
                                  onChange={(e) => handleSwitchChange(e, index)}
                                  disabled={isSaved}
                                />
                              </Form.Group>
                            </Row>
                            {passengerData[`hasFamilyName_${index}`] && (
                              <Row className="mb-3">
                                <Form.Group
                                  as={Col}
                                  controlId="validationCustom01"
                                >
                                  <Form.Label>Nama Keluarga</Form.Label>
                                  <Form.Control
                                    required
                                    type="text"
                                    placeholder="Nama Keluarga"
                                    name={`familyName_${index}`}
                                    value={
                                      passengerData[`familyName_${index}`] || ""
                                    }
                                    onChange={handlePassengerChange}
                                    disabled={isSaved}
                                    className="custom-input"
                                  />
                                </Form.Group>
                              </Row>
                            )}
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                controlId="validationCustom01"
                              >
                                <Form.Label>Tanggal Lahir</Form.Label>
                                <LocalizationProvider
                                  dateAdapter={AdapterDayjs}
                                >
                                  <DatePicker
                                    sx={{ width: "100%" }}
                                    value={
                                      dayjs(passengerData[`dob_${index}`]) ||
                                      null
                                    }
                                    onChange={(value) =>
                                      handleDateChange("dob", value, index)
                                    }
                                    disabled={isSaved}
                                  />
                                </LocalizationProvider>
                              </Form.Group>
                            </Row>
                            <Row className="mb-3">
                              <Form.Group
                                as={Col}
                                controlId="validationCustom01"
                              >
                                <Form.Label>Kewarganegaraan</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  name={`citizenship_${index}`}
                                  value={
                                    passengerData[`citizenship_${index}`] || ""
                                  }
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
                                    value={
                                      passengerData[`passagerId_${index}`] ||
                                      "KTP"
                                    }
                                    onChange={(event) =>
                                      handleChangePI(event, index)
                                    }
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
                                  name={`identityNumber_${index}`}
                                  value={
                                    passengerData[`identityNumber_${index}`] ||
                                    ""
                                  }
                                  onChange={handlePassengerChange}
                                  className="custom-input"
                                  disabled={isSaved}
                                />
                              </Form.Group>
                            </Row>
                            {passengerData[`passagerId_${index}`] ===
                              "Paspor" && (
                              <>
                                <Row className="mb-3 ">
                                  <Form.Group>
                                    <Form.Label>Negara Penerbit</Form.Label>
                                    <Col>
                                      <Select
                                        name={`countryOfIssue_${index}`}
                                        value={
                                          passengerData[
                                            `countryOfIssue_${index}`
                                          ] || ""
                                        }
                                        onChange={(event) =>
                                          setPassengerData((prev) => ({
                                            ...prev,
                                            [`countryOfIssue_${index}`]:
                                              event.target.value,
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
                                        <MenuItem value="Austria">
                                          Austria
                                        </MenuItem>
                                        <MenuItem value="Bahrain">
                                          Bahrain
                                        </MenuItem>
                                        <MenuItem value="Bangladesh">
                                          Bangladesh
                                        </MenuItem>
                                        <MenuItem value="Bhutan">
                                          Bhutan
                                        </MenuItem>
                                        <MenuItem value="Bolivia">
                                          Bolivia
                                        </MenuItem>
                                        <MenuItem value="Brazil">
                                          Brazil
                                        </MenuItem>
                                        <MenuItem value="Brunei">
                                          Brunei
                                        </MenuItem>
                                        <MenuItem value="Bulgaria">
                                          Bulgaria
                                        </MenuItem>
                                        <MenuItem value="Cambodia">
                                          Cambodia
                                        </MenuItem>
                                        <MenuItem value="Canada">
                                          Canada
                                        </MenuItem>
                                        <MenuItem value="China">China</MenuItem>
                                        <MenuItem value="Colombia">
                                          Colombia
                                        </MenuItem>
                                        <MenuItem value="Denmark">
                                          Denmark
                                        </MenuItem>
                                        <MenuItem value="Egypt">Egypt</MenuItem>
                                        <MenuItem value="Finland">
                                          Finland
                                        </MenuItem>
                                        <MenuItem value="France">
                                          France
                                        </MenuItem>
                                        <MenuItem value="Germany">
                                          Germany
                                        </MenuItem>
                                        <MenuItem value="India">India</MenuItem>
                                        <MenuItem value="Indonesia">
                                          Indonesia
                                        </MenuItem>
                                        <MenuItem value="Iran">Iran</MenuItem>
                                        <MenuItem value="Iraq">Iraq</MenuItem>
                                        <MenuItem value="Italy">Italy</MenuItem>
                                        <MenuItem value="Japan">Japan</MenuItem>
                                        <MenuItem value="Jordan">
                                          Jordan
                                        </MenuItem>
                                        <MenuItem value="Kazakhstan">
                                          Kazakhstan
                                        </MenuItem>
                                        <MenuItem value="Korea (North)">
                                          Korea (North)
                                        </MenuItem>
                                        <MenuItem value="Korea (South)">
                                          Korea (South)
                                        </MenuItem>
                                        <MenuItem value="Kuwait">
                                          Kuwait
                                        </MenuItem>
                                        <MenuItem value="Laos">Laos</MenuItem>
                                        <MenuItem value="Malaysia">
                                          Malaysia
                                        </MenuItem>
                                        <MenuItem value="Maldives">
                                          Maldives
                                        </MenuItem>
                                        <MenuItem value="Mexico">
                                          Mexico
                                        </MenuItem>
                                        <MenuItem value="Monaco">
                                          Monaco
                                        </MenuItem>
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
                                        <MenuItem value="Russia">
                                          Russia
                                        </MenuItem>
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
                                        <MenuItem value="Turkey">
                                          Turkey
                                        </MenuItem>
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
                                        <MenuItem value="Vietnam">
                                          Vietnam
                                        </MenuItem>
                                        <MenuItem value="Yemen">Yemen</MenuItem>
                                        <MenuItem value="Zambia">
                                          Zambia
                                        </MenuItem>
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
                                          dayjs(
                                            passengerData[
                                              `expiredDate_${index}`
                                            ]
                                          ) || null
                                        }
                                        onChange={(value) =>
                                          handleDateChange(
                                            "expiredDate",
                                            value,
                                            index
                                          )
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
                      </div>
                    ))}
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
                      totalSeat={totalSeat}
                    />
                  </Card.Body>
                </Card>
              </div>

              {/* Button save */}
              <div className="shadow-sm">
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
          </Col>

          {/* Card detail booking */}
          <Col
            sm={12}
            md={12}
            lg={5}
            xl={4}
          >
            <Card className="shadow-sm ">
              <Card.Body>
                <TicketDetails />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
