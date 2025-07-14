import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      console.log("Fetched user profile:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error("User not authenticated", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) return;

    const accessToken = localStorage.getItem("token");
    console.log("Access token found:", accessToken);

    if (!accessToken) {
      setLoading(false);
      return;
    }

    fetchUser();
  }, [user]);

  const updateUser = (userData: any) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser, refetchUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
