import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://excelanalytics-backend-l7ql.onrender.com/auth/user", {
        withCredentials: true,
      });
     setUser(res.data.user);
      console.log("Fetched user:", res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
