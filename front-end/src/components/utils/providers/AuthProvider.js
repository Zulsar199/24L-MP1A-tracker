import { usePathname, useRouter } from "next/navigation";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";

const AuthContext = createContext();

const authPaths = ["/login", "register"];

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await api.xpost("/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);

      setUser(response.data.user);

      router.replace("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsReady(false);
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.log(error);

        localStorage.removeItem("token");
        toast.error("Your session has expired. Please login again.");
      } finally {
        setIsReady(true);
      }
    };

    loadUser();
  }, []);

  useEffect(() => {
    if (authPaths.includes(pathname)) return;

    if (!isReady) return;

    // if (!user) router.replace("/login");
  }, [pathname, user, isReady]);

  // if (!isReady) return null;

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
