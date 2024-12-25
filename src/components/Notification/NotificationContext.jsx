import React, { createContext, useContext, useState } from "react";

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

export const useNotificationContext = () => {
  return useContext(NotificationContext);
};
