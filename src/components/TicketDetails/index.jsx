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
import discountIcon from "../../assets/discount-icon.png";

const TicketDetails = ({
  isSaved,
  setIsPayment,
  dataBooking,
}) => {
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
  const flightId = parseInt(searchParams.get("flightId"), 10) || 0;
  const returnFlightId = parseInt(searchParams.get("returnFlightId"), 10) || 0;
  const [isRoundtrip, setIsRoundtrip] = useState(false);

  const { mutate: snapCreate } = useMutation({
    mutationFn: (data) => {
      return createSnap(data);
    },
    onSuccess: (result) => {
      if (result?.data) {
        const snapToken = result?.data?.token;
        const amount = result?.data?.payment?.amount;
        setIsPayment(true);
        localStorage.setItem("timeLeft", "0");
        navigate({ to: `/payment?snapToken=${snapToken}&amount=${amount}` });
      } else {
        toast.error("Failed to create payment token");
      }
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  const { mutate: booking } = useMutation({
    mutationFn: (data) => {
      return createBooking(data);
    },
    onSuccess: (response) => {
      
      if (response?.bookingId) {
        const bookingId = response.bookingId;
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

      const updatedBookingDetail = dataBooking.bookingDetail.map((detail) => {
        const basePrice = detail.price;
        const discountedPrice = Math.round(
          basePrice - (basePrice * totalDiscount) / 100
        );

        return {
          ...detail,
          price: discountedPrice,
        };
      });

      const updatedDataBooking = {
        ...dataBooking,
        bookingDetail: updatedBookingDetail,
      };

      booking(updatedDataBooking);
    } catch (error) {
      console.error("Payment error:", error);
      if (error.message.includes("Token expired")) {
        navigate({ to: "/login" });
      }
    }
  };

  const priceDeparture = Math.round(
    (flight?.data?.price || 0) * adultInput +
    (flight?.data?.price || 0) * childInput
  );
  
  const priceReturn = Math.round(
    (returnFlight?.data?.price || 0) * adultInput +
    (returnFlight?.data?.price || 0) * childInput
  );

  const discountDeparture = Math.round(priceDeparture * (totalDiscount / 100));
  const discountReturn = Math.round(priceReturn * (totalDiscount / 100));

  const priceAfterDiscountDeparture = priceDeparture - discountDeparture;
  const priceAfterDiscountReturn = priceReturn - discountReturn;

  const totalPriceWithoutTax = priceAfterDiscountDeparture + (isRoundtrip ? priceAfterDiscountReturn : 0);
  const tax = Math.round(totalPriceWithoutTax * 0.03);

  const Total = totalPriceWithoutTax + tax;

  const taxDeparture = Math.round((priceAfterDiscountDeparture / totalPriceWithoutTax) * tax);
  const taxReturn = tax - taxDeparture;

  //const totalPriceDeparture = priceAfterDiscountDeparture + taxDeparture;
  //const totalPriceReturn = isRoundtrip ? (priceAfterDiscountReturn + taxReturn) : 0;


    return (
      <>
        <Toaster position="top-right" />
        <Card.Body
          style={{
            margin: "1px",
            padding: "1px",
          }}
        >
          <style>
            {`.bold-line {
            border: 3px solid black;
            }
          `}
          </style>
          <Card.Body className="border rounded mb-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-1 mt-1">
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
                  <h6>Tax (3%)</h6>
                </span>
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  IDR {taxDeparture}
                </span>
              </div>

              {/* Discount */}
              <div className="d-flex justify-content-between">
                <span>
                  <h6>Discount ({totalDiscount}%)</h6>
                </span>
                <span
                  style={{
                    fontSize: "16px",
                  }}
                >
                  IDR {discountDeparture}
                </span>
              </div>
            </div>
          </Card.Body>

          {isRoundtrip && (
            <>
              <Card.Body className="border rounded mb-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center mb-1 mt-1">
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
                      <h6>Tax (3%)</h6>
                    </span>
                    <span
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      IDR {taxReturn}
                    </span>
                  </div>

                  {/* Discount */}
                  <div className="d-flex justify-content-between">
                    <span>
                      <h6>Discount ({totalDiscount}%)</h6>
                    </span>
                    <span
                      style={{
                        fontSize: "16px",
                      }}
                    >
                      IDR {discountReturn}
                    </span>
                  </div>
                </div>
              </Card.Body>
            </>
          )}

          <Card.Body className="border rounded shadow-sm">
            <Accordion
              activeKey={activeKey}
              onSelect={(key) => setActiveKey(key === activeKey ? null : key)}
              className="mb-3"
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="d-flex align-items-center">
                    <img
                      src={discountIcon}
                      alt="Discount"
                      style={{
                        width: "24px",
                        height: "24px",
                        marginRight: "8px",
                      }}
                    />
                    Discount
                  </div>
                </Accordion.Header>
                {discount?.length > 0 ? (
                  discount.map((discount) => {
                    const isExpired =
                      new Date(discount.endDate) < new Date() ||
                      !discount.isActive;
                    const isSelected = selectedDiscount === discount.id;

                    return (
                      <Accordion.Body
                        key={discount.id}
                        onClick={() =>
                          !isExpired &&
                          handleDiscount(discount.id, discount.value)
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
                          discount : {discount.value} %
                          <br />
                          minimum order : IDR {discount.minPurchase} <br />
                          expired at : {
                            parseDateAndTime(discount.endDate).date
                          }{" "}
                          <br />
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
                IDR {Total}
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
