import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import type { Student, MenteeGroup } from "@/utils/types";
import LoadingFlag from "@/components/ui/loadingflag";

export const ManagementContext = createContext(null);

export default function ManagementProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [menteeGroups, setMenteeGroups] = useState<MenteeGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [studentRes, menteeGroupRes] = await Promise.all([
        axiosInstance.get(API_PATHS.USERS.GET_STUDENTS),
        axiosInstance.get(API_PATHS.USERS.GET_MENTEE_GROUPS)
      ]);

      setStudents(studentRes.data.users);
      setMenteeGroups(menteeGroupRes.data);
    } catch (err) {
      console.error("MenteeContext fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    const currentYear = new Date().getFullYear();

    const finalYears = students.filter(
    s => currentYear - s.year_of_admission === 3
    );

    const unassigned = students.filter(s => s.mentee_group_id === null);

  return (
    <ManagementContext.Provider value={{ students, setStudents, menteeGroups, finalYears ,setMenteeGroups, unassigned,refetchMentees: fetchData }}>
      {loading ? (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <LoadingFlag />
        </div>
      ) : (
        children
      )}
    </ManagementContext.Provider>
  );
}
