"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Ban } from "lucide-react";

export default function Home() {
  const [allUsers, setAllUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "" });
  const disabled = (newUser.name && newUser.password) === "";
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/user");
    setAllUsers(response.data);
  };
  //   const getUserById = async (id) => {
  //      const response = await axios.get(`http://localhost:5000/user/${id}`);
  //      setAllUsers(response.data);
  //    };
  const createUser = async () => {
    const response = await axios.post("http://localhost:5000/user", newUser);
    // console.log(newUser);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="m-10">
      <div>helloo</div>
      <div className="flex flex-col w-[300px] gap-3 *:border *:border-black *:rounded-sm">
        <input
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="name"
        />
        {/* <input
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          placeholder="email"
        /> */}
        <input
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          placeholder="password"
        />
        {/* <input placeholder="re password" /> */}
        <div
          style={{ backgroundColor: disabled ? "lightgray" : "white" }}
          className="flex gap-3"
        >
          <button
            disabled={disabled}
            onClick={createUser}
            style={{ color: disabled ? "black" : "black" }}
          >
            create user
          </button>
          {disabled && <Ban color="black" />}
        </div>
      </div>
      <div className="mt-10">
        {allUsers?.map((el, i) => {
          return (
            <div key={i} className="flex gap-3">
              <p>{i + 1}.</p>
              <p>{el.name}</p>
              <p>{el.password}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
