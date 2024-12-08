import * as React from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { Card, Button, Col, Form, Row } from 'react-bootstrap'
import { useState } from 'react'
import NavbarBooking from '../components/NavbarBooking'
import Footer from '../components/Footer'
import NavigationBar from '../components/Navbar'
import { styled } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TicketDetails from '../components/TicketDetails'
import Seatpicker from '../components/Seat-Picker'
//import { toast } from "react-toastify";
//import { FormControl } from "@mui/material";
import 'font-awesome/css/font-awesome.min.css'
//import { useNavigate, useLocation } from "@tanstack/react-router";
//import createBooking from "../service/booking/index";

export const Route = createLazyFileRoute('/booking/lazy copy')({
  component: Booking,
})

function Booking() {
  const [hasFamilyName, setHasFamilyName] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  const [orderData, setOrderData] = useState({
    name: '',
    familyName: '',
    phoneNumber: '',
    email: '',
  })
  const [passengerData, setPassengerData] = useState({
    title: '',
    name: '',
    familyName: '',
    dob: '',
    citizenship: '',
    idType: '',
    identityNumber: '',
    countryOfIssue: '',
    expiredDate: '',
    type: '',
  })
  const handleOrderChange = async (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setOrderData({
      ...orderData,
      [name]: value,
    })
  }
  const handlePassengerChange = async (index, event) => {
    event.preventDefault()
    const { name, value } = event.target
    setPassengerData({
      ...passengerData,
      [name]: value,
    })
  }

  const handleSwitchChange = (e) => {
    setHasFamilyName(e.target.checked)
  }

  const [title, setTitle] = React.useState('')
  const [passagerId, setPassagerId] = React.useState('KTP')
  const [negaraPenerbit, setNegaraPenerbit] = React.useState('Indonesia')
  const handleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleChangePI = (event) => {
    setPassagerId(event.target.value)
  }
  const handleChangeNP = (event) => {
    setNegaraPenerbit(event.target.value)
  }
  const handleSave = () => {
    setIsSaved(true)
  }

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
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: '#9C27B0',
          opacity: 1,
          border: 0,
          ...theme.applyStyles('dark', {
            backgroundColor: '#9C27B0',
          }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#9C27B0',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[100],
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[600],
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
        ...theme.applyStyles('dark', {
          opacity: 0.3,
        }),
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#E9E9EA',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
      ...theme.applyStyles('dark', {
        backgroundColor: '#39393D',
      }),
    },
  }))

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
                <Card style={{ width: '' }}>
                  <Card.Body>
                    <Card.Title>
                      <b>Isi Data Pemesan</b>
                    </Card.Title>
                    <Card style={{ border: 'none' }}>
                      <Card.Header
                        className="text-white"
                        style={{ background: '#3C3C3C' }}
                      >
                        Data Diri Pemesan
                        {isSaved && (
                          <div
                            className="fa fa-check-circle"
                            style={{
                              color: '#73CA5C',
                              fontSize: '20px',
                              position: 'absolute',
                              right: '10px',
                            }}
                          ></div>
                        )}
                      </Card.Header>
                      <Card.Body
                        style={{ color: 'purple', fontWeight: 'bold' }}
                      >
                        <Form>
                          <Row className="mb-3">
                            <Form.Group>
                              <Form.Label>Nama Lengkap</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Nama Lengkap"
                                name="name"
                                value={orderData.name}
                                onChange={handleOrderChange}
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
                                style={{ color: 'black', fontWeight: 'normal' }}
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
                              <Form.Group>
                                <Form.Label>Nama Keluarga</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Nama Keluarga"
                                  name="familyName"
                                  value={orderData.familyName}
                                  onChange={handleOrderChange}
                                  disabled={isSaved}
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
                                name="phoneNumber"
                                value={orderData.phoneNumber}
                                onChange={handleOrderChange}
                                className="custom-input"
                                disabled={isSaved}
                              />
                            </Form.Group>
                          </Row>
                          <Row className="mb-3">
                            <Form.Group as={Col} controlId="validationCustom01">
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                required
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={orderData.email}
                                onChange={handleOrderChange}
                                className="custom-input"
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
                <Card style={{ width: '' }}>
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
                    <Card style={{ border: 'none' }}>
                      <Card.Header
                        className="text-white"
                        style={{ background: '#3C3C3C' }}
                      >
                        Data Diri Pemesan 1 -Adult
                        {isSaved && (
                          <div
                            className="fa fa-check-circle"
                            style={{
                              color: '#73CA5C',
                              fontSize: '20px',
                              position: 'absolute',
                              right: '10px',
                            }}
                          ></div>
                        )}
                      </Card.Header>
                      <Card.Body
                        style={{ color: 'purple', fontWeight: 'bold' }}
                      >
                        <Form>
                          <Row className="mb-3">
                            <Form.Group>
                              <Form.Label>Title</Form.Label>
                              <Col>
                                <Select
                                  // name="title"
                                  // value={passengerData.title}
                                  // onChange={handlePassengerChange}
                                  value={title}
                                  onChange={handleChange}
                                  displayEmpty
                                  fullWidth
                                  sx={{
                                    width: '100%',
                                    height: '40px',
                                    border: 'none',
                                  }}
                                  disabled={isSaved}
                                >
                                  <MenuItem value="">Mr.</MenuItem>
                                  <MenuItem value={1}>Ms.</MenuItem>
                                  <MenuItem value={3}>Mrs.</MenuItem>
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
                                style={{ color: 'black', fontWeight: 'normal' }}
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
                              <Form.Group
                                as={Col}
                                controlId="validationCustom01"
                              >
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
                                  sx={{ width: '100%' }}
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
                                type="email"
                                defaultValue="Indonesia"
                                citizenship="citizenship"
                                value={passengerData.citizenship}
                                onChange={handlePassengerChange}
                                placeholder="Kewarganegaraan"
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
                                    width: '100%',
                                    height: '40px',
                                    border: 'none',
                                    borderRadius: '7px',
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
                          {passagerId === 'Paspor' && (
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
                                        width: '100%',
                                        height: '40px',
                                        border: 'none',
                                        borderRadius: '7px',
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
                                      <MenuItem value="Bhutan">Bhutan</MenuItem>
                                      <MenuItem value="Bolivia">
                                        Bolivia
                                      </MenuItem>
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
                                      <MenuItem value="Denmark">
                                        Denmark
                                      </MenuItem>
                                      <MenuItem value="Egypt">Egypt</MenuItem>
                                      <MenuItem value="Finland">
                                        Finland
                                      </MenuItem>
                                      <MenuItem value="France">France</MenuItem>
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
                                    <DatePicker
                                      sx={{ width: '100%' }}
                                      disabled={isSaved}
                                      expiredDate="expiredDate"
                                      value={passengerData.expiredDate}
                                      onChange={handlePassengerChange}
                                    />
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
                <Card style={{ width: '' }}>
                  <Card.Body>
                    <Card.Title>
                      <b>Pilih Kursi</b>
                    </Card.Title>
                    <div
                      id="box-timer"
                      style={{
                        background: '#73CA5C',
                        border: '1px solid white',
                        borderRadius: '10px',
                        marginTop: '15px',
                        zIndex: '1',
                      }}
                    >
                      {'Economy - 45 Seats Available'}
                    </div>
                    <Seatpicker
                      isSaved={isSaved}

                      //navsaved={navsaved}
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
                      backgroundColor: isSaved ? '#D0D0D0' : '#6a1b9a',
                      borderColor: isSaved ? '#D0D0D0' : '#6a1b9a',
                      color: isSaved ? 'black' : 'white',
                      cursor: isSaved ? 'not-allowed' : 'pointer',
                    }}
                    onClick={handleSave}
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
  )
}
