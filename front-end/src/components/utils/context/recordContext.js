"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const RecordContext = createContext(null);

export const RecordContextProvider = ({ children }) => {
  const [allRecords, setAllRecords] = useState([]);

  const getRecords = async () => {
    const response = await axios.get("http://localhost:5000/record");
    setAllRecords(response.data);
  };

  const createRecord = async (newRecord) => {
    const response = await axios.post(
      "http://localhost:5000/record",
      newRecord
    );
    getRecords();
  };
  useEffect(() => {
     getRecords();
  }, []);
  return (
    <RecordContext.Provider
      value={{ allRecords, setAllRecords, getRecords, createRecord}}
    >
      {children}
    </RecordContext.Provider>
  );
};
