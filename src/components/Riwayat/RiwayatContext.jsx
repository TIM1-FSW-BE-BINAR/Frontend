import React, { createContext, useContext, useState } from "react";

// Create Context
const RiwayatContext = createContext();

export const RiwayatProvider = ({ children }) => {
  const [filterDate, setFilterDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <RiwayatContext.Provider
      value={{ filterDate, setFilterDate, searchQuery, setSearchQuery }}
    >
      {children}
    </RiwayatContext.Provider>
  );
};

// Custom hook to use Notification Context
export const useRiwayatContext = () => {
  return useContext(RiwayatContext);
};
