import React, { createContext, useState } from "react";

// Membuat context
export const HomepageContext = createContext();

// Membuat provider untuk context
export function HomepageProvider({ children }) {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [departureDate, setDepartureDate] = useState(""); // Untuk Departure
  const [returnDate, setReturnDate] = useState("");
  const [adultInput, setAdultInput] = useState(0);
  const [childInput, setChildInput] = useState(0);
  const [babyInput, setBabyInput] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState("");
  const [classInput, setClassInput] = useState("");

  // Membuat value yang akan diakses oleh komponen lain
  const value = {
    fromInput,
    setFromInput,
    toInput,
    setToInput,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    adultInput,
    setAdultInput,
    childInput,
    setChildInput,
    babyInput,
    setBabyInput,
    totalPassengers,
    setTotalPassengers,
    classInput,
    setClassInput,
  };

  return <HomepageContext.Provider value={value}>{children}</HomepageContext.Provider>;
}
