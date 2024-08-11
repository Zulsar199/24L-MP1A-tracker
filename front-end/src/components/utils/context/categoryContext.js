"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CategoryContext = createContext(null);

export const CategoryContextProvider = ({ children }) => {
  const [allCategories, setAllCategories] = useState([]);
  const getCategories = async () => {
    const response = await axios.get("http://localhost:5000/category");
    setAllCategories(response.data);
  };
//   const getCategoryById = async (id) => {
//      const response = await axios.get(`http://localhost:5000/category/${id}`);
//      setAllCategories(response.data);
//    };
  const createCategory = async (newCategory) => {
    const response = await axios.post(
      "http://localhost:5000/category",
      newCategory
    );
    console.log(response.data, "====");
    getCategories();
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <CategoryContext.Provider
      value={{ createCategory, getCategories, allCategories, setAllCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
