import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import type { Student, ProjectGroup } from "@/utils/types";
import LoadingFlag from "@/components/ui/loadingflag";

export const MenteeContext = createContext(null);

export default function MenteeProvider({ children }: { children: React.ReactNode }) {
  const [mentees, setMentees] = useState<Student[]>([]);
  const [projectGroups, setProjectGroups] = useState<ProjectGroup[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [menteeRes, projectGroupRes] = await Promise.all([
        axiosInstance.get(API_PATHS.USERS.GET_MENTEES),
        axiosInstance.get(API_PATHS.DEFENSE.GET_PROJECT_GROUPS)
      ]);

      setMentees(menteeRes.data.mentees);
      setProjectGroups(projectGroupRes.data);
    } catch (err) {
      console.error("MenteeContext fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MenteeContext.Provider value={{ mentees, setMentees, projectGroups, setProjectGroups, refetchMentees: fetchData }}>
      {loading ? (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <LoadingFlag />
        </div>
      ) : (
        children
      )}
    </MenteeContext.Provider>
  );
}
