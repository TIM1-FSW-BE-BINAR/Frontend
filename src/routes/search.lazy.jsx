import * as React from "react";
import { createLazyFileRoute, useLocation } from "@tanstack/react-router";
import ScreenSearch from "../components/Search/SearchFlight";
import NavigationBar from "../components/Navbar";
import { useState } from "react";

export const Route = createLazyFileRoute("/search")({
  component: () => <Search />,
});

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams);

  const fromInput = searchParams.get("fromInput");
  const toInput = searchParams.get("toInput");
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const totalPassengers = searchParams.get("totalPassengers");
  const classInput = searchParams.get("classInput");

  console.log("Data dari query params:", {
    fromInput,
    toInput,
    departureDate,
    returnDate,
    totalPassengers,
    classInput,
  });

  return (
    <>
     <NavigationBar />
      <ScreenSearch
        fromInput={fromInput}
        toInput={toInput}
        departureDate={departureDate}
        returnDate={returnDate}
        passengers={totalPassengers}
        classInput={classInput}
      />
    </>
  );
}
