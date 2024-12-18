import { useEffect, useState } from "react";
import { Card, Button, Accordion } from "react-bootstrap";
import { getFlightId } from "../../service/flight/flightService";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import TicketDetailsLoading from "../Loading/ticketDetailsLoading";
import { getAllDiscounts } from "../../service/discount";
import { useMutation } from "@tanstack/react-query";
import { createSnap } from "../../service/payment/snap";
import { createBooking } from "../../service/booking";

const TicketDetails = ({ isSaved, setIsPayment, dataBooking }) => {
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [activeKey, setActiveKey] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const adultInput = parseInt(searchParams.get("adultInput") || "0", 10);
  const childInput = parseInt(searchParams.get("childInput") || "0", 10);
  const babyInput = parseInt(searchParams.get("babyInput") || "0", 10);
  const totalSeat = adultInput + childInput;
  const flightId = parseInt(searchParams.get("flightId"), 10) || 0;
  const returnFlightId = parseInt(searchParams.get("returnFlightId"), 10) || 0;
  const [isRoundtrip, setIsRoundtrip] = useState(false);

  const { mutate: snapCreate } = useMutation({
    mutationFn: (data) => {
      console.log("Calling createSnap with data:", data); // Debug log
      return createSnap(data);
    },
    onSuccess: (result) => {
      console.log("Snap creation success:", result); // Debug log
      if (result?.data) {
        const snapData = result?.data;
        setIsPayment(true);
        navigate({ to: `/payment?snapData=${snapData}` });
      } else {
        toast.error("Failed to create payment token");
      }
    },
    onError: (err) => {
      console.error("Snap creation error:", err); // Debug log
      toast.error(err?.message);
    },
  });

  const { mutate: booking } = useMutation({
    mutationFn: (data) => {
      console.log("Calling createBooking with data:", data);
      return createBooking(data);
    },
    onSuccess: (response) => {
      console.log("Booking success response:", response);
      toast.success("Data successfully saved.", {
        autoClose: 3000,
      });
      if (response?.bookingId) {
        const bookingId = response.bookingId;
        console.log("Got bookingId:", bookingId);
        localStorage.setItem("bookingId", bookingId);
        snapCreate({
          bookingId: bookingId,
        });
      } else {
        console.error("No bookingId in response:", response);
      }
      setIsPayment(true);
    },
    onError: (error) => {
      console.error("Booking error:", error);
      toast.error(`Error: ${error.message}`);
    },
  });
  
  const { data: flight, isLoading } = useQuery({
    queryKey: ["flight", flightId],
    queryFn: () => getFlightId(flightId),
    enabled: !!flightId,
  });

  const { data: returnFlight } = useQuery({
    queryKey: ["returnFlight", returnFlightId],
    queryFn: () => getFlightId(returnFlightId),
    enabled: !!returnFlightId,
  });

  const { data: discount } = useQuery({
    queryKey: ["discount"],
    queryFn: getAllDiscounts,
    enabled: !!token,
  });

  useEffect(() => {
    if (returnFlightId) {
      setIsRoundtrip(true);
    }
  }, [returnFlightId]);

  if (isLoading) return <TicketDetailsLoading />;

  const parseDateAndTime = (isoString) => {
    if (!isoString) return { date: "", time: "" };

    const date = new Date(isoString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return { date: formattedDate, time: formattedTime };
  };

  const { date: departureDate, time: departureTime } = parseDateAndTime(
    flight?.data?.departureTime
  );
  const { date: arrivalDate, time: arrivalTime } = parseDateAndTime(
    flight?.data?.arrivalTime
  );
  const { date: returnDepartureDate, time: returnDepartureTime } =
    parseDateAndTime(returnFlight?.data?.departureTime);
  const { date: returnArrivalDate, time: returnArrivalTime } = parseDateAndTime(
    returnFlight?.data?.arrivalTime
  );

  const handleDiscount = (discountId, discountValue) => {
    if (selectedDiscount === discountId) {
      setTotalDiscount(0);
      setSelectedDiscount(null);
      toast.info("Diskon dibatalkan");
    } else {
      setTotalDiscount(discountValue);
      setSelectedDiscount(discountId);
      toast.success("Yeay! Discount has been successfully applied🎉");
    }
  };

  const handlePayment = async () => {
    try {
      if (!isSaved) {
        toast.error("You must enter form first!");
        return;
      }

      if (!dataBooking) {
        throw new Error("Booking data not found. Please fill the form first.");
      }

      console.log("Starting payment process with data:", dataBooking); // Debug log
      booking(dataBooking);
    } catch (error) {
      console.error("Payment error:", error); // Debug log
      if (error.message.includes("Token expired")) {
        navigate({ to: "/login" });
      }
    }
  };

  const totalPrice =
    (flight?.data?.price || 0) * adultInput +
    (flight?.data?.price || 0) * childInput +
    10 * totalSeat -
    totalDiscount +
    ((returnFlight?.data?.price || 0) * adultInput +
      (returnFlight?.data?.price || 0) * childInput +
      (isRoundtrip ? 10 * totalSeat : 0) -
      totalDiscount);

  return (
    <>
      <Toaster position="top-right" />
      <Card.Body>
        <Card.Title className="text-secondary text-center">
          Ticket Details
        </Card.Title>
        <style>
          {`.bold-line {
            border: 3px solid black;
            }
          `}
        </style>
        <div className="d-flex justify-content-between align-items-center mb-1 mt-2">
          <h5 className="fw-bold">
            {isRoundtrip ? "Departure Flight Details" : "Flight Details"}
          </h5>
          <b></b>
        </div>

        <div className="mb-3 d-flex align-items-start justify-content-between">
          <div>
            <p className="m-0 fw-bold">{departureTime}</p>
            <p className="m-0 fw-">{departureDate}</p>
            <p className="m-0">
              {`${flight?.data?.departure?.name} - Terminal ${flight?.data?.terminal}`}
            </p>
          </div>
          <span
            className="fw-bold"
            style={{
              color: "#A06ECE",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Departure
          </span>
        </div>

        <hr />

        <div className="mb-3 d-flex align-items-center">
          <img
            className="me-4"
            src={flight?.data?.airline?.imageUrl}
            style={{ width: "40px", height: "40px" }}
          ></img>
          <div>
            <h6 className="m-0 fw-bold">{flight?.data?.airline?.name}</h6>
            <p className="m-0 fw-bold">{flight?.data?.flightNumber}</p>
            <div className="mt-4">
              <h6 className="fw-bolder mb-0">Information</h6>
              {flight?.data?.information}
            </div>
          </div>
        </div>

        <hr />

        <div className="mb-3 d-flex align-items-start justify-content-between">
          <div>
            <p className="m-0 fw-bold">{arrivalTime}</p>
            <p className="m-0 ">{arrivalDate}</p>
            <p className="m-0 ">{flight?.data?.arrival?.name}</p>
          </div>
          <span
            style={{
              color: "#A06ECE",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Arrival
          </span>
        </div>

        <hr />

        <div>
          <b>Price Detail</b>

          {/* Harga untuk Adult */}
          {adultInput > 0 && (
            <div className="d-flex justify-content-between">
              <span>
                <h6>{adultInput} Adults</h6>
              </span>
              <span
                style={{
                  fontSize: "16px",
                }}
              >
                IDR {flight?.data?.price * adultInput || 0}
              </span>
            </div>
          )}

          {/* Harga untuk Child */}
          {childInput > 0 && (
            <div className="d-flex justify-content-between">
              <span>
                <h6>{childInput} Child</h6>
              </span>
              <span
                style={{
                  fontSize: "16px",
                }}
              >
                IDR {flight?.data?.price * childInput || 0}
              </span>
            </div>
          )}

          {/* Harga untuk Baby */}
          {babyInput > 0 && (
            <div className="d-flex justify-content-between">
              <span>
                <h6>{babyInput} Baby</h6>
              </span>
              <span
                style={{
                  fontSize: "16px",
                }}
              >
                IDR 0
              </span>
            </div>
          )}

          {/* Tax */}
          <div className="d-flex justify-content-between">
            <span>
              <h6>Tax</h6>
            </span>
            <span
              style={{
                fontSize: "16px",
              }}
            >
              IDR {10 * totalSeat}
            </span>
          </div>

          {/* Discount */}
          <div className="d-flex justify-content-between">
            <span>
              <h6>Discount</h6>
            </span>
            <span
              style={{
                fontSize: "16px",
              }}
            >
              IDR {totalDiscount}
            </span>
          </div>
        </div>

        {isRoundtrip ? (
          <>
            <hr className="bold-line" />
            <div className="d-flex justify-content-between align-items-center mb-1 mt-3">
              <h5 className="fw-bold">Return Flight Details</h5>
            </div>
            <div className="mb-3 d-flex align-items-start justify-content-between">
              <div>
                <p className="m-0 fw-bold">{returnDepartureTime}</p>
                <p className="m-0 fw-">{returnDepartureDate}</p>
                <p className="m-0">
                  {`${returnFlight?.data?.departure?.name} - Terminal ${returnFlight?.data?.terminal}`}
                </p>
              </div>
              <span
                className="fw-bold"
                style={{
                  color: "#A06ECE",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Departure
              </span>
            </div>
            <hr />
            <div className="mb-3 d-flex align-items-center">
              <img
                className="me-4"
                src={returnFlight?.data?.airline?.imageUrl}
                style={{ width: "40px", height: "40px" }}
              ></img>
              <div>
                <h6 className="m-0 fw-bold">
                  {returnFlight?.data?.airline?.name}
                </h6>
                <p className="m-0 fw-bold">
                  {returnFlight?.data?.flightNumber}
                </p>
                <div className="mt-4">
                  <h6 className="fw-bolder mb-0">Information</h6>
                  {returnFlight?.data?.information}
                </div>
              </div>
            </div>
            <hr />
            <div className="mb-3 d-flex align-items-start justify-content-between">
              <div>
                <p className="m-0 fw-bold">{returnArrivalTime}</p>
                <p className="m-0 ">{returnArrivalDate}</p>
                <p className="m-0 ">{returnFlight?.data?.arrival?.name}</p>
              </div>
              <span
                style={{
                  color: "#A06ECE",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Arrival
              </span>
            </div>

            <hr />

            <div>
              <b>Price Detail</b>

              {/* Harga untuk Adult */}
              {adultInput > 0 && (
                <div className="d-flex justify-content-between">
                  <span>
                    <h6>{adultInput} Adults</h6>
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    IDR {returnFlight?.data?.price * adultInput || 0}
                  </span>
                </div>
              )}

              {/* Harga untuk Child */}
              {childInput > 0 && (
                <div className="d-flex justify-content-between">
                  <span>
                    <h6>{childInput} Child</h6>
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    IDR {returnFlight?.data?.price * childInput || 0}
                  </span>
                </div>
              )}

              {/* Harga untuk Baby */}
              {babyInput > 0 && (
                <div className="d-flex justify-content-between">
                  <span>
                    <h6>{babyInput} Baby</h6>
                  </span>
                  <span
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    IDR 0
                  </span>
                </div>
              )}

              {/* Tax */}
              <div className="d-flex justify-content-between">
                <span>
                  <h6>Tax</h6>
                </span>
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  IDR {10 * totalSeat}
                </span>
              </div>

              {/* Discount */}
              <div className="d-flex justify-content-between">
                <span>
                  <h6>Discount</h6>
                </span>
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  IDR {totalDiscount}
                </span>
              </div>
            </div>
            <hr className="bold-line" />
          </>
        ) : (
          <hr />
        )}

        <Accordion
          activeKey={activeKey}
          onSelect={(key) => setActiveKey(key === activeKey ? null : key)}
          className="mb-3"
        >
          <Accordion.Item eventKey="0">
            <Accordion.Header>Discount</Accordion.Header>
            {discount?.length > 0 ? (
              discount.map((discount) => {
                const isExpired =
                  new Date(discount.endDate) < new Date() || !discount.isActive;
                const isSelected = selectedDiscount === discount.id;

                return (
                  <Accordion.Body
                    key={discount.id}
                    onClick={() =>
                      !isExpired && handleDiscount(discount.id, discount.value)
                    }
                    style={{
                      position: "relative",
                      margin: 0,
                      padding: "0.5rem 1rem",
                      backgroundColor: isSelected
                        ? "#D1E7DD"
                        : isExpired
                          ? "#f0f0f0"
                          : "white",
                      border: isSelected ? "1px solid #0F5132" : "none",
                      borderRadius: isSelected ? "12px" : "0px",
                      cursor: !isExpired ? "pointer" : "not-allowed",
                      opacity: isExpired ? 0.5 : 1,
                    }}
                  >
                    <h6>{discount.name}</h6>
                    <p>{discount.description}</p>
                    <span>
                      discount : IDR {discount.value}
                      <br />
                      minimum order : IDR {discount.minPurchase} <br />
                      expired at : {discount.endDate} <br />
                    </span>
                    {isSelected && (
                      <div
                        className="fa fa-check-circle"
                        style={{
                          color: "#73CA5C",
                          fontSize: "20px",
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                        }}
                      ></div>
                    )}

                    {isExpired && (
                      <small style={{ color: "red" }}>
                        This discount not available
                      </small>
                    )}
                    <hr style={{ margin: "0px", padding: "0px" }} />
                  </Accordion.Body>
                );
              })
            ) : (
              <p>No discounts available</p>
            )}
          </Accordion.Item>
        </Accordion>

        <div className="d-flex justify-content-between">
          <span>
            <h4>
              <b>Total</b>
            </h4>
          </span>
          <span
            style={{
              color: "#7126B5",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            IDR {totalPrice}
          </span>
        </div>

        <Button
          variant="danger"
          id="box-timer"
          style={{ zIndex: "1", marginTop: "1rem" }}
          onClick={handlePayment}
        >
          Payment
        </Button>
      </Card.Body>
    </>
  );
};

TicketDetails.propTypes = {
  isSaved: PropTypes.bool.isRequired,
  isPayment: PropTypes.bool.isRequired,
  setIsPayment: PropTypes.func.isRequired,
  dataBooking: PropTypes.object,
};
export default TicketDetails;
