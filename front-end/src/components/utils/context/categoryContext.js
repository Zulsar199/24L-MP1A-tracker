"use client";

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CategoryContext = createContext(null);

export const CategoryContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const [allCategories, setAllCategories] = useState([]);

  const getCategories = async () => {
    const response = await axios.get("http://localhost:5000/category", {
      headers: {
          'Authorization': 'Bearer '+token
      },  }  );
    setAllCategories(response.data);
  };

  const createCategory = async (newCategory) => {
    const response = await axios.post(
      "http://localhost:5000/category",
      newCategory, {
        headers: {
            'Authorization': 'Bearer '+token
        },  } 
    );
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
