"use client";

import { useAuth } from "@/components/utils/providers/AuthProvider";
import { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-100">
      <div className="flex flex-col gap-2 p-6 bg-white rounded-sm shadow-md">
        <input
          className="border p-2 w-[300px]"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="border p-2 w-[300px]"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          className="p-2 mt-6 text-white bg-blue-500 rounded-md"
          onClick={() => login(email, password)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Page;
