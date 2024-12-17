import  { createContext, useState } from "react";

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [isSaved, setIsSaved] = useState(true);

  const value = {
    isSaved, setIsSaved
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}
