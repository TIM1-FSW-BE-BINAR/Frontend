import { createContext, useEffect, useState } from "react";

export const HomepageContext = createContext();

export function HomepageProvider({ children }) {
  const departureDateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };


  const [fromInput, setFromInput] = useState("Jakarta-CGK");
  const [toInput, setToInput] = useState("Surabaya-SUB");
  const [departureDate, setDepartureDate] = useState(
    departureDateFormat(new Date().toISOString())
  );
  const [returnDate, setReturnDate] = useState("");
  const [adultInput, setAdultInput] = useState(1);
  const [childInput, setChildInput] = useState(1);
  const [babyInput, setBabyInput] = useState(1);
  const [totalPassengers, setTotalPassengers] = useState(3);
  const [classInput, setClassInput] = useState("First Class");

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

  return (
    <HomepageContext.Provider value={value}>
      {children}
    </HomepageContext.Provider>
  );
}
