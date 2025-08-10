import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import type {Defense, Lecturer, Panel} from "@/utils/types";
import LoadingFlag from "@/components/ui/loadingflag";

export const DefenseContext = createContext(null);

export default function DefenseProvider({ children }: { children: React.ReactNode }) {
  const [defense, setDefense] = useState<Defense>();
  const [panels, setPanels] = React.useState<Panel[]>([])
  const [lecturers, setLecturers] = React.useState<Lecturer[]>([])
  const [formattedStartDate, setFormattedStartDate] = useState<string>("");
  const [formattedEndDate, setFormattedEndDate] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
    const response = await axiosInstance.get<Defense>(API_PATHS.DEFENSE.GET_DEFENSE("2"));
    const panelRes = await axiosInstance.get(API_PATHS.DEFENSE.GET_PANELS);
    const lecturerRes = await axiosInstance.get(API_PATHS.USERS.GET_LECTURERS);
    
    const defenseData = response.data;

    
    if (defenseData?.defDetails?.start_date) {
      const startDate = new Date(defenseData.defDetails.start_date);
      const formattedStart = startDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setFormattedStartDate(formattedStart);
    }

    if (defenseData?.defDetails?.end_date) {
      const endDate = new Date(defenseData.defDetails.end_date);
      const formattedEnd = endDate.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      setFormattedEndDate(formattedEnd);
    }

    if (panelRes?.data) {
    setPanels(panelRes.data);
    } else {
    console.warn("No panel data received:", panelRes);
    }

    if (lecturerRes?.data?.users) {
    setLecturers(lecturerRes.data.users);
    } else {
    console.warn("No lecturer data received:", lecturerRes);
    }


    // Assuming your state setter is named setDefense and matches the Defense type
        setDefense(defenseData);
    } catch (err) {
        console.error("DefenseContext fetch error", err);
    } finally {
        setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <DefenseContext.Provider value={{ defense, setDefense, panels, setPanels, lecturers, setLecturers, formattedStartDate,formattedEndDate }}>
      {loading ? (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <LoadingFlag />
        </div>
      ) : (
        children
      )}
    </DefenseContext.Provider>
  );
}
