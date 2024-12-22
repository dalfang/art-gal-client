import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const nav = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // only when the /verify is good, we set this to false (not waiting for data anymore)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const authenticateUser = async () => {
    const tokenFromStorage = localStorage.getItem("authToken");
    try {
      const { data } = await axios.get(`${API_URL}/auth/verify`, {
        headers: { authorization: `Bearer ${tokenFromStorage}` },
      });
      // console.log("Response from verify: ", data);
      setCurrentUser(data.user);
      setIsLoading(false);
      setIsLoggedIn(true);
    } catch (error) {
      console.log("Error authenticating the user", error);
      setCurrentUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
      nav("/");
    }
  };
  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    nav("/");
    setCurrentUser(null);
    console.log("User was logged out successfully");

    // clear unfulfilled orders
    try {
      await axios.delete(`${API_URL}/api/orders/user/${currentUser?._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        handleLogout,
        currentUser,
        isLoading,
        isLoggedIn,
        authenticateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };
