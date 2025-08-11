import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import type { Project } from "@/utils/types";
import LoadingFlag from "@/components/ui/loadingflag";

type ProjectContextType = {
  project: Project | null;
  loading: boolean;
  error: string | null;
};

export const ProjectContext = createContext<ProjectContextType>({
  project: null,
  loading: true,
  error: null,
});

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { project_id } = useParams<{ project_id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!project_id) return;

    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(API_PATHS.PROJECTS.GET_PROJECT_BY_ID(project_id));
        setProject(response.data.project); // Adjust based on API response
        setError(null);
      } catch (err) {
        setError("Failed to fetch project");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [project_id]);

  return (
    <ProjectContext.Provider value={{ project, loading, error }}>
      {loading ? (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
            <LoadingFlag />
        </div>
      ) : (
        children
      )}
    </ProjectContext.Provider>
  );
};