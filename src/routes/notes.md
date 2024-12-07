import * as React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import NavbarBooking from "../components/NavbarBooking";
import Footer from "../components/Footer";
import NavigationBar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TicketDetails from "../components/TicketDetails";
import Seatpicker from "../components/Seat-Picker";


export const Route = createLazyFileRoute("/booking")({
  component: Booking,
});

function Booking() {
  const [validated, setValidated] = useState(false);
  const [hasFamilyName, setHasFamilyName] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleSave = () => {
    setIsSaved(true); // Ubah isSaved menjadi true
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
  const handleSwitchChange = (e) => {
    setHasFamilyName(e.target.checked);
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

  const [title, setTitle] = React.useState("");
  const [passagerId, setPassagerId] = React.useState("KTP");
  const [negaraPenerbit, setNegaraPenerbit] = React.useState("Indonesia");
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleChangePI = (event) => {
    setPassagerId(event.target.value);
  };
  const handleChangeNP = (event) => {
    setNegaraPenerbit(event.target.value);
  };

  return (
    <>
      <NavigationBar />
      <NavbarBooking />
      <div className="container my-4">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-7 col-xl-6 d-flex align-items-center flex-column">
            <form className="p-3">
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
                      </Card.Header>
                      <Card.Body
                        style={{ color: "purple", fontWeight: "bold" }}
                      >
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={handleSubmit}
                        >
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Nama Lengkap</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Nama Lengkap"
                                defaultValue="Harry"
                                className="custom-input"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
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
                              />
                            </Form.Group>
                          </Row>
                          {hasFamilyName && (
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
                                  defaultValue="Potter"
                                  disabled={!hasFamilyName}
                                  className="custom-input"
                                />
                              </Form.Group>
                            </Row>
                          )}
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Nomor Telepon</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Nomor Telepon"
                                className="custom-input"
                              />
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                required
                                type="email"
                                placeholder="Contoh: johndoe@gmail.com"
                                className="custom-input"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={isSaved}
                              />
                            </Form.Group>
                          </Row>
                        </Form>
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
                      </Card.Header>
                      <Card.Body
                        style={{ color: "purple", fontWeight: "bold" }}
                      >
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={handleSubmit}
                        >
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Title</Form.Label>
                              <Col>
                                <Select
                                  value={title}
                                  onChange={handleChange}
                                  displayEmpty
                                  fullWidth
                                  sx={{
                                    width: "100%",
                                    height: "40px",
                                    border: "none",
                                  }}
                                >
                                  <MenuItem value="">Mr.</MenuItem>
                                  <MenuItem value={1}>Ms.</MenuItem>
                                  <MenuItem value={3}>Mrs.</MenuItem>
                                </Select>
                              </Col>
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Nama Lengkap</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Nama Lengkap"
                                defaultValue="Harry"
                                className="custom-input"
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
                              />
                            </Form.Group>
                          </Row>
                          {hasFamilyName && (
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
                                  defaultValue="Potter"
                                  disabled={!hasFamilyName}
                                  className="custom-input"
                                />
                              </Form.Group>
                            </Row>
                          )}
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Tanggal Lahir</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Nomor Telepon"
                                className="custom-input"
                              />
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Kewarganegaraan</Form.Label>
                              <Form.Control
                                required
                                type="email"
                                defaultValue="Indonesia"
                                placeholder="Kewarganegaraan"
                                className="custom-input"
                              />
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
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
                                >
                                  <MenuItem value="KTP">KTP</MenuItem>
                                  <MenuItem value="Paspor">Paspor</MenuItem>
                                </Select>
                              </Col>
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Nomor ID</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Nomor ID"
                                className="custom-input"
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
                                      value={negaraPenerbit}
                                      onChange={handleChangeNP}
                                      displayEmpty
                                      fullWidth
                                      sx={{
                                        width: "100%",
                                        height: "40px",
                                        border: "none",
                                        borderRadius: "7px",
                                      }}
                                    >
                                      <MenuItem value="Afghanistan">
                                        Afghanistan
                                      </MenuItem>
                                      <MenuItem value="Albania">
                                        Albania
                                      </MenuItem>
                                      <MenuItem value="Algeria">
                                        Algeria
                                      </MenuItem>
                                      <MenuItem value="Andorra">
                                        Andorra
                                      </MenuItem>
                                      <MenuItem value="Angola">Angola</MenuItem>
                                      <MenuItem value="Antigua and Barbuda">
                                        Antigua and Barbuda
                                      </MenuItem>
                                      <MenuItem value="Argentina">
                                        Argentina
                                      </MenuItem>
                                      <MenuItem value="Armenia">
                                        Armenia
                                      </MenuItem>
                                      <MenuItem value="Australia">
                                        Australia
                                      </MenuItem>
                                      <MenuItem value="Austria">
                                        Austria
                                      </MenuItem>
                                      <MenuItem value="Azerbaijan">
                                        Azerbaijan
                                      </MenuItem>
                                      <MenuItem value="Bahamas">
                                        Bahamas
                                      </MenuItem>
                                      <MenuItem value="Bahrain">
                                        Bahrain
                                      </MenuItem>
                                      <MenuItem value="Bangladesh">
                                        Bangladesh
                                      </MenuItem>
                                      <MenuItem value="Barbados">
                                        Barbados
                                      </MenuItem>
                                      <MenuItem value="Belarus">
                                        Belarus
                                      </MenuItem>
                                      <MenuItem value="Belgium">
                                        Belgium
                                      </MenuItem>
                                      <MenuItem value="Belize">Belize</MenuItem>
                                      <MenuItem value="Benin">Benin</MenuItem>
                                      <MenuItem value="Bhutan">Bhutan</MenuItem>
                                      <MenuItem value="Bolivia">
                                        Bolivia
                                      </MenuItem>
                                      <MenuItem value="Bosnia and Herzegovina">
                                        Bosnia and Herzegovina
                                      </MenuItem>
                                      <MenuItem value="Botswana">
                                        Botswana
                                      </MenuItem>
                                      <MenuItem value="Brazil">Brazil</MenuItem>
                                      <MenuItem value="Brunei">Brunei</MenuItem>
                                      <MenuItem value="Bulgaria">
                                        Bulgaria
                                      </MenuItem>
                                      <MenuItem value="Burkina Faso">
                                        Burkina Faso
                                      </MenuItem>
                                      <MenuItem value="Burundi">
                                        Burundi
                                      </MenuItem>
                                      <MenuItem value="Cabo Verde">
                                        Cabo Verde
                                      </MenuItem>
                                      <MenuItem value="Cambodia">
                                        Cambodia
                                      </MenuItem>
                                      <MenuItem value="Cameroon">
                                        Cameroon
                                      </MenuItem>
                                      <MenuItem value="Canada">Canada</MenuItem>
                                      <MenuItem value="Central African Republic">
                                        Central African Republic
                                      </MenuItem>
                                      <MenuItem value="Chad">Chad</MenuItem>
                                      <MenuItem value="Chile">Chile</MenuItem>
                                      <MenuItem value="China">China</MenuItem>
                                      <MenuItem value="Colombia">
                                        Colombia
                                      </MenuItem>
                                      <MenuItem value="Comoros">
                                        Comoros
                                      </MenuItem>
                                      <MenuItem value="Congo (Congo-Brazzaville)">
                                        Congo (Congo-Brazzaville)
                                      </MenuItem>
                                      <MenuItem value="Congo (Congo-Kinshasa)">
                                        Congo (Congo-Kinshasa)
                                      </MenuItem>
                                      <MenuItem value="Costa Rica">
                                        Costa Rica
                                      </MenuItem>
                                      <MenuItem value="Croatia">
                                        Croatia
                                      </MenuItem>
                                      <MenuItem value="Cuba">Cuba</MenuItem>
                                      <MenuItem value="Cyprus">Cyprus</MenuItem>
                                      <MenuItem value="Czechia">
                                        Czechia
                                      </MenuItem>
                                      <MenuItem value="Denmark">
                                        Denmark
                                      </MenuItem>
                                      <MenuItem value="Djibouti">
                                        Djibouti
                                      </MenuItem>
                                      <MenuItem value="Dominica">
                                        Dominica
                                      </MenuItem>
                                      <MenuItem value="Dominican Republic">
                                        Dominican Republic
                                      </MenuItem>
                                      <MenuItem value="Ecuador">
                                        Ecuador
                                      </MenuItem>
                                      <MenuItem value="Egypt">Egypt</MenuItem>
                                      <MenuItem value="El Salvador">
                                        El Salvador
                                      </MenuItem>
                                      <MenuItem value="Equatorial Guinea">
                                        Equatorial Guinea
                                      </MenuItem>
                                      <MenuItem value="Eritrea">
                                        Eritrea
                                      </MenuItem>
                                      <MenuItem value="Estonia">
                                        Estonia
                                      </MenuItem>
                                      <MenuItem value="Eswatini">
                                        Eswatini
                                      </MenuItem>
                                      <MenuItem value="Ethiopia">
                                        Ethiopia
                                      </MenuItem>
                                      <MenuItem value="Fiji">Fiji</MenuItem>
                                      <MenuItem value="Finland">
                                        Finland
                                      </MenuItem>
                                      <MenuItem value="France">France</MenuItem>
                                      <MenuItem value="Gabon">Gabon</MenuItem>
                                      <MenuItem value="Gambia">Gambia</MenuItem>
                                      <MenuItem value="Georgia">
                                        Georgia
                                      </MenuItem>
                                      <MenuItem value="Germany">
                                        Germany
                                      </MenuItem>
                                      <MenuItem value="Ghana">Ghana</MenuItem>
                                      <MenuItem value="Greece">Greece</MenuItem>
                                      <MenuItem value="Grenada">
                                        Grenada
                                      </MenuItem>
                                      <MenuItem value="Guatemala">
                                        Guatemala
                                      </MenuItem>
                                      <MenuItem value="Guinea">Guinea</MenuItem>
                                      <MenuItem value="Guinea-Bissau">
                                        Guinea-Bissau
                                      </MenuItem>
                                      <MenuItem value="Guyana">Guyana</MenuItem>
                                      <MenuItem value="Haiti">Haiti</MenuItem>
                                      <MenuItem value="Honduras">
                                        Honduras
                                      </MenuItem>
                                      <MenuItem value="Hungary">
                                        Hungary
                                      </MenuItem>
                                      <MenuItem value="Iceland">
                                        Iceland
                                      </MenuItem>
                                      <MenuItem value="India">India</MenuItem>
                                      <MenuItem value="Indonesia">
                                        Indonesia
                                      </MenuItem>
                                      <MenuItem value="Iran">Iran</MenuItem>
                                      <MenuItem value="Iraq">Iraq</MenuItem>
                                      <MenuItem value="Ireland">
                                        Ireland
                                      </MenuItem>
                                      <MenuItem value="Israel">Israel</MenuItem>
                                      <MenuItem value="Italy">Italy</MenuItem>
                                      <MenuItem value="Jamaica">
                                        Jamaica
                                      </MenuItem>
                                      <MenuItem value="Japan">Japan</MenuItem>
                                      <MenuItem value="Jordan">Jordan</MenuItem>
                                      <MenuItem value="Kazakhstan">
                                        Kazakhstan
                                      </MenuItem>
                                      <MenuItem value="Kenya">Kenya</MenuItem>
                                      <MenuItem value="Kiribati">
                                        Kiribati
                                      </MenuItem>
                                      <MenuItem value="Korea (North)">
                                        Korea (North)
                                      </MenuItem>
                                      <MenuItem value="Korea (South)">
                                        Korea (South)
                                      </MenuItem>
                                      <MenuItem value="Kosovo">Kosovo</MenuItem>
                                      <MenuItem value="Kuwait">Kuwait</MenuItem>
                                      <MenuItem value="Kyrgyzstan">
                                        Kyrgyzstan
                                      </MenuItem>
                                      <MenuItem value="Laos">Laos</MenuItem>
                                      <MenuItem value="Latvia">Latvia</MenuItem>
                                      <MenuItem value="Lebanon">
                                        Lebanon
                                      </MenuItem>
                                      <MenuItem value="Lesotho">
                                        Lesotho
                                      </MenuItem>
                                      <MenuItem value="Liberia">
                                        Liberia
                                      </MenuItem>
                                      <MenuItem value="Libya">Libya</MenuItem>
                                      <MenuItem value="Liechtenstein">
                                        Liechtenstein
                                      </MenuItem>
                                      <MenuItem value="Lithuania">
                                        Lithuania
                                      </MenuItem>
                                      <MenuItem value="Luxembourg">
                                        Luxembourg
                                      </MenuItem>
                                      <MenuItem value="Madagascar">
                                        Madagascar
                                      </MenuItem>
                                      <MenuItem value="Malawi">Malawi</MenuItem>
                                      <MenuItem value="Malaysia">
                                        Malaysia
                                      </MenuItem>
                                      <MenuItem value="Maldives">
                                        Maldives
                                      </MenuItem>
                                      <MenuItem value="Mali">Mali</MenuItem>
                                      <MenuItem value="Malta">Malta</MenuItem>
                                      <MenuItem value="Marshall Islands">
                                        Marshall Islands
                                      </MenuItem>
                                      <MenuItem value="Mauritania">
                                        Mauritania
                                      </MenuItem>
                                      <MenuItem value="Mauritius">
                                        Mauritius
                                      </MenuItem>
                                      <MenuItem value="Mexico">Mexico</MenuItem>
                                      <MenuItem value="Micronesia">
                                        Micronesia
                                      </MenuItem>
                                      <MenuItem value="Moldova">
                                        Moldova
                                      </MenuItem>
                                      <MenuItem value="Monaco">Monaco</MenuItem>
                                      <MenuItem value="Mongolia">
                                        Mongolia
                                      </MenuItem>
                                      <MenuItem value="Montenegro">
                                        Montenegro
                                      </MenuItem>
                                      <MenuItem value="Morocco">
                                        Morocco
                                      </MenuItem>
                                      <MenuItem value="Mozambique">
                                        Mozambique
                                      </MenuItem>
                                      <MenuItem value="Myanmar (Burma)">
                                        Myanmar (Burma)
                                      </MenuItem>
                                      <MenuItem value="Namibia">
                                        Namibia
                                      </MenuItem>
                                      <MenuItem value="Nauru">Nauru</MenuItem>
                                      <MenuItem value="Nepal">Nepal</MenuItem>
                                      <MenuItem value="Netherlands">
                                        Netherlands
                                      </MenuItem>
                                      <MenuItem value="New Zealand">
                                        New Zealand
                                      </MenuItem>
                                      <MenuItem value="Nicaragua">
                                        Nicaragua
                                      </MenuItem>
                                      <MenuItem value="Niger">Niger</MenuItem>
                                      <MenuItem value="Nigeria">
                                        Nigeria
                                      </MenuItem>
                                      <MenuItem value="North Macedonia">
                                        North Macedonia
                                      </MenuItem>
                                      <MenuItem value="Norway">Norway</MenuItem>
                                      <MenuItem value="Oman">Oman</MenuItem>
                                      <MenuItem value="Pakistan">
                                        Pakistan
                                      </MenuItem>
                                      <MenuItem value="Palau">Palau</MenuItem>
                                      <MenuItem value="Panama">Panama</MenuItem>
                                      <MenuItem value="Papua New Guinea">
                                        Papua New Guinea
                                      </MenuItem>
                                      <MenuItem value="Paraguay">
                                        Paraguay
                                      </MenuItem>
                                      <MenuItem value="Peru">Peru</MenuItem>
                                      <MenuItem value="Philippines">
                                        Philippines
                                      </MenuItem>
                                      <MenuItem value="Poland">Poland</MenuItem>
                                      <MenuItem value="Portugal">
                                        Portugal
                                      </MenuItem>
                                      <MenuItem value="Qatar">Qatar</MenuItem>
                                      <MenuItem value="Romania">
                                        Romania
                                      </MenuItem>
                                      <MenuItem value="Russia">Russia</MenuItem>
                                      <MenuItem value="Rwanda">Rwanda</MenuItem>
                                      <MenuItem value="Saint Kitts and Nevis">
                                        Saint Kitts and Nevis
                                      </MenuItem>
                                      <MenuItem value="Saint Lucia">
                                        Saint Lucia
                                      </MenuItem>
                                      <MenuItem value="Saint Vincent and the Grenadines">
                                        Saint Vincent and the Grenadines
                                      </MenuItem>
                                      <MenuItem value="Samoa">Samoa</MenuItem>
                                      <MenuItem value="San Marino">
                                        San Marino
                                      </MenuItem>
                                      <MenuItem value="São Tomé and Príncipe">
                                        São Tomé and Príncipe
                                      </MenuItem>
                                      <MenuItem value="Saudi Arabia">
                                        Saudi Arabia
                                      </MenuItem>
                                      <MenuItem value="Senegal">
                                        Senegal
                                      </MenuItem>
                                      <MenuItem value="Serbia">Serbia</MenuItem>
                                      <MenuItem value="Seychelles">
                                        Seychelles
                                      </MenuItem>
                                      <MenuItem value="Sierra Leone">
                                        Sierra Leone
                                      </MenuItem>
                                      <MenuItem value="Singapore">
                                        Singapore
                                      </MenuItem>
                                      <MenuItem value="Slovakia">
                                        Slovakia
                                      </MenuItem>
                                      <MenuItem value="Slovenia">
                                        Slovenia
                                      </MenuItem>
                                      <MenuItem value="Solomon Islands">
                                        Solomon Islands
                                      </MenuItem>
                                      <MenuItem value="Somalia">
                                        Somalia
                                      </MenuItem>
                                      <MenuItem value="South Africa">
                                        South Africa
                                      </MenuItem>
                                      <MenuItem value="South Sudan">
                                        South Sudan
                                      </MenuItem>
                                      <MenuItem value="Spain">Spain</MenuItem>
                                      <MenuItem value="Sri Lanka">
                                        Sri Lanka
                                      </MenuItem>
                                      <MenuItem value="Sudan">Sudan</MenuItem>
                                      <MenuItem value="Suriname">
                                        Suriname
                                      </MenuItem>
                                      <MenuItem value="Sweden">Sweden</MenuItem>
                                      <MenuItem value="Switzerland">
                                        Switzerland
                                      </MenuItem>
                                      <MenuItem value="Syria">Syria</MenuItem>
                                      <MenuItem value="Tajikistan">
                                        Tajikistan
                                      </MenuItem>
                                      <MenuItem value="Tanzania">
                                        Tanzania
                                      </MenuItem>
                                      <MenuItem value="Thailand">
                                        Thailand
                                      </MenuItem>
                                      <MenuItem value="Timor-Leste">
                                        Timor-Leste
                                      </MenuItem>
                                      <MenuItem value="Togo">Togo</MenuItem>
                                      <MenuItem value="Tonga">Tonga</MenuItem>
                                      <MenuItem value="Trinidad and Tobago">
                                        Trinidad and Tobago
                                      </MenuItem>
                                      <MenuItem value="Tunisia">
                                        Tunisia
                                      </MenuItem>
                                      <MenuItem value="Turkey">Turkey</MenuItem>
                                      <MenuItem value="Turkmenistan">
                                        Turkmenistan
                                      </MenuItem>
                                      <MenuItem value="Tuvalu">Tuvalu</MenuItem>
                                      <MenuItem value="Uganda">Uganda</MenuItem>
                                      <MenuItem value="Ukraine">
                                        Ukraine
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
                                      <MenuItem value="Uruguay">
                                        Uruguay
                                      </MenuItem>
                                      <MenuItem value="Uzbekistan">
                                        Uzbekistan
                                      </MenuItem>
                                      <MenuItem value="Vanuatu">
                                        Vanuatu
                                      </MenuItem>
                                      <MenuItem value="Vatican City">
                                        Vatican City
                                      </MenuItem>
                                      <MenuItem value="Venezuela">
                                        Venezuela
                                      </MenuItem>
                                      <MenuItem value="Vietnam">
                                        Vietnam
                                      </MenuItem>
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
                                <Form.Group
                                  as={Col}
                                  controlId="validationCustom01"
                                >
                                  <Form.Label>Berlaku Sampai</Form.Label>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                  >
                                    <DatePicker sx={{ width: "100%" }} />
                                  </LocalizationProvider>
                                </Form.Group>
                              </Row>
                            </>
                          )}
                        </Form>
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
                    <Seatpicker />
                  </Card.Body>
                </Card>
              </div>

              {/* Button save */}
              <div className="mb-3 shadow-sm">
                {/* {!isSaved && ( */}
                <div className="d-flex justify-content-center">
                  <Button
                    type="submit"
                    variant="purple"
                    className=" px-4 py-2 w-100"
                    style={{
                      backgroundColor: isSaved ? "#D0D0D0" : "#6a1b9a", // Warna berubah sesuai status
                      borderColor: isSaved ? "#D0D0D0" : "#6a1b9a",
                      color: isSaved ? "white" : "white",
                      cursor: isSaved ? "not-allowed" : "pointer", // Cursor menunjukkan tombol tidak dapat diklik
                    }}
                    onClick={handleSave}
                    disabled={isSaved} // Disable tombol jika isSaved true
                  >
                    Simpan
                  </Button>
                </div>
                {/* )} */}
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