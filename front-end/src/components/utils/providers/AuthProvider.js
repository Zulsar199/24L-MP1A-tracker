import { useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      toast.success(response.data.message);
      setIsLoggedIn(true);
      localStorage.setItem("token", "token");
      router.push("/record");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (isChecking) return;
    // if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, isChecking]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
