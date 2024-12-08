import * as React from "react";
import { createLazyFileRoute, useLocation } from "@tanstack/react-router";
import ScreenSearch from "../components/Search/SearchFlight";
import NavigationBar from "../components/Navbar";
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
  const classInput = searchParams.get("classInput");

  const departureAirportCode = fromInput?.split("-")[1];
  const returnAirportCode = toInput?.split("-")[1];

  console.log("Data dari query params:", {
    fromInput,
    toInput,
    departureDate,
    returnDate,
    totalPassengers,
    classInput,
    departureAirportCode,
    returnAirportCode,
  });

  const [airports, setAirports] = useState([]);
  const [departureAirportId, setDepartureAirportId] = useState(null);
  const [returnAirportId, setReturnAirportId] = useState(null);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["airports"],
    queryFn: () => getAirports(),
    staleTime: 0, // Paksa fetch ulang setiap kali query dijalankan
  });

  useEffect(() => {
    if (isSuccess) {
      setAirports(data);
      // Reset departure and return airport IDs
      setDepartureAirportId(null);
      setReturnAirportId(null);
    } else if (isError) {
      console.log("Airports error occurred.");
    }
  }, [data, isError, isSuccess]);

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

  return (
    <>
      <NavigationBar />
      <ScreenSearch
        fromInput={fromInput}
        toInput={toInput}
        departureDate={departureDate}
        returnDate={returnDate}
        passengers={totalPassengers}
        classInput={classInput?.replace("+", " ")}
        departureAirportId={departureAirportId}
        returnAirportId={returnAirportId}
      />
    </>
  );
}
