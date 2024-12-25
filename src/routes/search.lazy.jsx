import { createLazyFileRoute, useLocation } from "@tanstack/react-router";
import SearchLayout from "../layouts/SearchLayout";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAirports } from "../service/airport/airportService";

export const Route = createLazyFileRoute("/search")({
  component: () => <Search />,
});

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const fromInput = searchParams.get("fromInput");
  const toInput = searchParams.get("toInput");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const totalPassengers = searchParams.get("totalPassengers");
  const adultInput = searchParams.get("adultInput");
  const childInput = searchParams.get("childInput");
  const babyInput = searchParams.get("babyInput");
  let classInput = searchParams.get("classInput");
  classInput = classInput?.replace(/\+/g, " ");

  const departureAirportCode = fromInput?.split("-")[1];
  const returnAirportCode = toInput?.split("-")[1];

  const infoDepartureCityName = fromInput?.split("-")[0];
  const infoReturnCityName = toInput?.split("-")[0];

  const [airports, setAirports] = useState([]);
  const [departureAirportId, setDepartureAirportId] = useState(null);
  const [returnAirportId, setReturnAirportId] = useState(null);

  const [seatClassValue, setSeatClassValue] = useState(classInput);

  useEffect(() => {
    if (classInput === "Premium Economy") {
      setSeatClassValue("PREMIUM_ECONOMY");
    } else {
      setSeatClassValue(classInput?.split(" ")[0]);
    }
  }, [classInput]);

  const { data, isSuccess, } = useQuery({
    queryKey: ["airports"],
    queryFn: () => getAirports(),
  });

  useEffect(() => {
    if (isSuccess) {
      setAirports(data);
      setDepartureAirportId(null);
      setReturnAirportId(null);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    if (departureAirportCode) {
      const filteredAirportDeparture = airports.filter(
        (airport) => airport.code == departureAirportCode
      );
      setDepartureAirportId(filteredAirportDeparture[0]?.id || null);
    }
  }, [departureAirportCode, airports]);

  useEffect(() => {
    if (returnAirportCode) {
      const filteredAirportReturn = airports.filter(
        (airport) => airport.code == returnAirportCode
      );
      setReturnAirportId(filteredAirportReturn[0]?.id || null);
    }
  }, [returnAirportCode, airports]);

  const [flightSelect, setFlightSelect] = useState("");
  const [returnScreen, setReturnScreen] = useState(false);

  return (
    <>
      <NavigationBar />

      {returnScreen ? (
        <SearchLayout
          key="return"
          fromInput={toInput?.replace(/\+/g, " ")}
          toInput={fromInput?.replace(/\+/g, " ")}
          infoDepartureCityName={infoDepartureCityName}
          infoReturnCityName={infoReturnCityName}
          infoReturnDate={returnDate}
          departureDate={departureDate}
          returnDate={returnDate}
          passengers={totalPassengers}
          adultInput={adultInput}
          childInput={childInput}
          babyInput={babyInput}
          classInput={seatClassValue}
          departureAirportId={returnAirportId}
          returnAirportId={departureAirportId}
          date={returnDate}
          setReturnScreen={setReturnScreen}
          setFlightSelect={setFlightSelect}
          flightSelect={flightSelect}
        />
      ) : (
        <SearchLayout
          key="departure"
          fromInput={fromInput?.replace(/\+/g, " ")}
          toInput={toInput?.replace(/\+/g, " ")}
          infoDepartureCityName={infoDepartureCityName}
          infoReturnCityName={infoReturnCityName}
          infoReturnDate={returnDate}
          departureDate={departureDate}
          returnDate={returnDate}
          passengers={totalPassengers}
          adultInput={adultInput}
          childInput={childInput}
          babyInput={babyInput}
          classInput={seatClassValue}
          departureAirportId={departureAirportId}
          returnAirportId={returnAirportId}
          date={departureDate}
          setReturnScreen={setReturnScreen}
          setFlightSelect={setFlightSelect}
          flightSelect={null}
        />
      )}

      <Footer />
    </>
  );
}
