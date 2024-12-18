import { useEffect, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import SeatMapReturn from "../SeatMapReturn";
import TicketDetails from "../TicketDetails";
import SeatMap from "../SeatMap";
//import { createBooking } from "../../service/booking";
import { getFlightId } from "../../service/flight/flightService";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Container, Card, Button, Col, Form, Row } from "react-bootstrap";
import "font-awesome/css/font-awesome.min.css";
import PropTypes from "prop-types";

function BookingForm({ setIsSaved, isSaved, setIsPayment, isPayment }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedSeatsReturn, setSelectedSeatsReturn] = useState([]);
  const [isRoundtrip, setIsRoundtrip] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [dataBooking, setDataBooking] = useState(null);

  const flightId = parseInt(searchParams.get("flightId") || "0", 10);
  const returnFlightId = parseInt(
    searchParams.get("returnFlightId") || "0",
    10
  );
  const totalPassengers = Math.max(
    0,
    parseInt(searchParams.get("totalPassengers") || "0", 10)
  );
  const adultInput = parseInt(searchParams.get("adultInput") || "0", 10);
  const childInput = parseInt(searchParams.get("childInput") || "0", 10);
  const babyInput = parseInt(searchParams.get("babyInput") || "0", 10);
  const totalSeat = adultInput + childInput;
  const passengers = Array.from(
    { length: totalPassengers > 0 ? totalPassengers : 0 },
    (_, index) => {
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
    }
  );

  const { data: flight } = useQuery({
    queryKey: ["flight", flightId],
    queryFn: () => getFlightId(flightId),
    enabled: !!flightId,
  });

  const { data: returnFlight } = useQuery({
    queryKey: ["flight", returnFlightId],
    queryFn: () => getFlightId(returnFlightId),
    enabled: !!returnFlightId,
  });

  const [passengerData, setPassengerData] = useState({
    title: "",
    name: "",
    familyName: "",
    gender: "",
    dob: null,
    citizenship: "",
    identityNumber: "",
    countryOfIssue: "",
    expiredDate: null,
    type: null,
  });

  const handlePassengerChange = (event) => {
    const { name, value } = event.target;
    const passengerIndex = name.split("_")[1];

    if (name.startsWith("title")) {
      let gender = "";

      if (value === "Mr.") {
        gender = "MALE";
      } else if (value === "Ms." || value === "Mrs.") {
        gender = "FEMALE";
      }

      setPassengerData((prev) => ({
        ...prev,
        [`${name.split("_")[0]}_${passengerIndex}`]: value,
        [`gender_${passengerIndex}`]: gender,
      }));
    } else {
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
      let requiredFields = [
        "name",
        "title",
        "dob",
        "citizenship",
        "identityNumber",
      ];

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
            `Field ${field} untuk Penumpang ${index + 1} tidak boleh kosong!`
          )
        );
        return false;
      }

      if (selectedSeats.length !== totalSeat) {
        toast.error(`Anda harus memilih ${totalSeat} kursi!`);
        return false;
      }

      return true;
    }
  };

  useEffect(() => {
    if (returnFlightId) {
      setIsRoundtrip(true);
    }
  }, [returnFlightId]);

  const seatNumbers =
    selectedSeats?.map((seat) => seat.seatNumber).join(", ") ||
    "No seat selected.";
  const seatNumbersReturn =
    selectedSeatsReturn?.map((seat) => seat.seatNumber).join(", ") ||
    "No seat selected.";

  // const { mutate: booking, isLoading } = useMutation({
  //   mutationFn: (request) => createBooking(request),
  //   onSuccess: () => {
  //     toast.success("Data successfully saved.", {
  //       autoClose: 3000,
  //     });
  //     toast.success(`Seat ${seatNumbers} Successfully booked.`, {
  //       autoClose: 3000,
  //     });
  //     toast.success(
  //       `Seat ${seatNumbersReturn} Successfully booked for the return flight.`,
  //       {
  //         autoClose: 3000,
  //       }
  //     );
  //     setIsSaved(true);
  //   },
  //   onError: (error) => {
  //     toast.error(`Error: ${error.message}`);
  //     setIsSaved(false);
  //   },
  // });

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "100vh",
  //         width: "100%",
  //       }}
  //     >
  //       <PulseLoader color="#7126B5" size={15} />
  //     </div>
  //   );
  // }

  const onSubmit = async (event) => {
    event.preventDefault();
    const bookingDate = new Date().toISOString();

    const finalReturnFlightId = returnFlightId || null;

    if (!validateForm()) {
      return;
    }

    console.log("Passenger Data:", passengerData);
    console.log("Selected seat:", selectedSeats);
    console.log("Selected seat return flight:", selectedSeatsReturn);
    setIsSaved(true);

    const bookingDetailOneWay = passengers.map(
      ({ index, type }, seatIndex) => ({
        seatId: selectedSeats?.[seatIndex]?.id || null,
        price: flight?.data?.price || null,
        passenger: {
          name: passengerData[`name_${index}`] || null,
          familyName: passengerData[`familyName_${index}`] || "-",
          gender: passengerData[`gender_${index}`] || null,
          identityNumber: passengerData[`identityNumber_${index}`] || null,
          citizenship: passengerData[`citizenship_${index}`] || null,
          countryOfIssue: passengerData[`countryOfIssue_${index}`] || null,
          title: passengerData[`title_${index}`] || null,
          dob: passengerData[`dob_${index}`] || null,
          expiredDate: passengerData[`expiredDate_${index}`] || null,
          type,
        },
      })
    );

    const bookingDetail = finalReturnFlightId
      ? [
          ...bookingDetailOneWay,
          ...bookingDetailOneWay.map((detail, index) => ({
            ...detail,
            seatId: selectedSeatsReturn?.[index]?.id || null,
            price: returnFlight?.data?.price || null,
          })),
        ]
      : bookingDetailOneWay;

    const request = {
      flightId,
      returnFlightId: finalReturnFlightId,
      bookingDate,
      bookingDetail,
    };

    console.log("Request in JSON format:", JSON.stringify(request, null, 2));

    //booking(request);
    setDataBooking(request);
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
      <Container className="py-4" style={{ maxWidth: "1320px" }}>
        <Row className="justify-content-center" style={{ margin: "0" }}>
          <Col
            sm={12}
            md={12}
            lg={7}
            xl={6}
            style={{ margin: "0px", padding: "0px" }}
          >
            <form onSubmit={onSubmit}>
              {/* Card Pemesan */}
              <div className="mb-3 shadow-sm">
                <Card style={{ width: "" }}>
                  <Card.Body>
                    <Card.Title>
                      <b>Enter User Information</b>
                    </Card.Title>
                    <Card style={{ border: "none" }}>
                      <Card.Header
                        className="text-white"
                        style={{ background: "#3C3C3C" }}
                      >
                        User Information
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
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              value={user?.firstName}
                              className="custom-input"
                              disabled={!!user?.firstName}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              value={user?.lastName}
                              className="custom-input"
                              disabled={!!user?.lastName}
                            />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          <Form.Group>
                            <Form.Label>Phone Number</Form.Label>
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
                      <b>Enter Passenger Information</b>
                    </Card.Title>
                    {passengers.map(({ index, type }) => (
                      <div key={index}>
                        <Card style={{ border: "none" }}>
                          <Card.Header
                            className="text-white"
                            style={{ background: "#3C3C3C" }}
                          >
                            Passenger Information {index + 1} - {type}
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
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Full Name"
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
                                  Have a family name?
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
                                  <Form.Label>Family Name</Form.Label>
                                  <Form.Control
                                    required
                                    type="text"
                                    placeholder="Family Name"
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
                                <Form.Label>Date of Birth</Form.Label>
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
                                    maxDate={dayjs()}
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
                                <Form.Label>Citizenship</Form.Label>
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
                                <Form.Label>ID/Passport</Form.Label>
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
                                    <MenuItem value="KTP">ID</MenuItem>
                                    <MenuItem value="Paspor">Passport</MenuItem>
                                  </Select>
                                </Col>
                              </Form.Group>
                            </Row>
                            <Row className="mb-3">
                              <Form.Group>
                                <Form.Label>ID Number</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="ID Number"
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
                                    <Form.Label>Issuing Country</Form.Label>
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
                                    <Form.Label>Expierd Date</Form.Label>
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
                                        minDate={dayjs()}
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
                      <b>
                        {isRoundtrip ? "Choose Departure Seat" : "Choose Seat"}
                      </b>
                    </Card.Title>
                    <SeatMap
                      selectedSeats={selectedSeats}
                      setSelectedSeats={setSelectedSeats}
                      totalSeat={totalSeat}
                      isSaved={isSaved}
                    />
                  </Card.Body>
                </Card>
              </div>
              {isRoundtrip && (
                <div className="mb-3 shadow-sm">
                  <Card style={{ width: "" }}>
                    <Card.Body>
                      <Card.Title>
                        <b>Choose Return Seat</b>
                      </Card.Title>
                      <SeatMapReturn
                        selectedSeatsReturn={selectedSeatsReturn}
                        setSelectedSeatsReturn={setSelectedSeatsReturn}
                        totalSeat={totalSeat}
                        isSaved={isSaved}
                      />
                    </Card.Body>
                  </Card>
                </div>
              )}

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
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </Col>

          {/* Card detail booking */}
          <Col sm={12} md={12} lg={5} xl={4}>
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <TicketDetails
                  isSaved={isSaved}
                  setIsPayment={setIsPayment}
                  isPayment={isPayment}
                  dataBooking={dataBooking}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
BookingForm.propTypes = {
  setIsSaved: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  setIsPayment: PropTypes.func.isRequired,
  isPayment: PropTypes.bool.isRequired,
};
export default BookingForm;