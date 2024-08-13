"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { format, parse } from "date-fns";

export const RecordContext = createContext(null);

export const RecordContextProvider = ({ children }) => {
  const [allRecords, setAllRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    type: "all",
    hiddenCategoryId: [],
    amountRange: { min: 0, max: 0, selectedValue: 0 },
  });

  const filterRecord = () => {
    return allRecords.filter((el) => {
      const isCategoryVisible = !filterOptions.hiddenCategoryId.includes(
        el.category_id
      );

      const isAmountInRange =
        el.amount > filterOptions.amountRange.min &&
        el.amount <= filterOptions.amountRange.selectedValue;

      if (filterOptions.type === "all") {
        return isCategoryVisible && isAmountInRange;
      } else {
        return (
          el.type === filterOptions.type && isCategoryVisible && isAmountInRange
        );
      }
    });
  };

  const getRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5000/record");
      setAllRecords(response.data);
      const maxAmount = Math.max(...response.data.map((item) => item.amount));
      setFilterOptions((prevOptions) => ({
        ...prevOptions,
        amountRange: {
          ...prevOptions.amountRange,

          selectedValue: maxAmount,
          max: maxAmount,
        },
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const createRecord = async (newRecord) => {
    const { date, time, ...otherKeys } = newRecord;

    const dateTime = parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());
    const formattedDateTime = format(dateTime, "yyyy-MM-dd'T'HH:mm:ss+08:00");

    const updatedRecord = {
      ...otherKeys,
      date: formattedDateTime,
    };

    await axios.post("http://localhost:5000/record", updatedRecord);
    getRecords();
  };

  useEffect(() => {
    getRecords();
    setFilteredRecords(filterRecord());
  }, []);

  useEffect(() => {
    setFilteredRecords(filterRecord());
  }, [filterOptions]);

  return (
    <RecordContext.Provider
      value={{
        allRecords,
        setAllRecords,
        getRecords,
        createRecord,
        filterOptions,
        setFilterOptions,
        filteredRecords,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};
