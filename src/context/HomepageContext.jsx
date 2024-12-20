import { createContext, useState } from "react";

export const HomepageContext = createContext();

export function HomepageProvider({ children }) {
  const [fromInput, setFromInput] = useState("");
  const [toInput, setToInput] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [adultInput, setAdultInput] = useState(0);
  const [childInput, setChildInput] = useState(0);
  const [babyInput, setBabyInput] = useState(0);
  const [totalPassengers, setTotalPassengers] = useState("");
  const [classInput, setClassInput] = useState("");

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
