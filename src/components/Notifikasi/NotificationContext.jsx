import React, { createContext, useContext, useState } from "react";

// Create Context
const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [filterDate, setFilterDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <NotificationContext.Provider
      value={{ filterDate, setFilterDate, searchQuery, setSearchQuery }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use Notification Context
export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
