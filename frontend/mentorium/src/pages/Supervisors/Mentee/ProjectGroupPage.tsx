import { Button } from "@/components/ui/button";
import { MenteeContext } from "@/contexts/MenteeContext";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import React, { useContext } from "react";
import ProjectGroupCard from "@/pages/components/ProjectGroupCard";

const ProjectGroupPage: React.FC = () => {
  const { mentees, projectGroups, setProjectGroups } = useContext(MenteeContext);
    const firstDept = mentees.length > 0 ? mentees[0] : null;

  const handleCreateProjectGroup = async () => {
    try {
      const res = await axiosInstance.post(
        API_PATHS.DEFENSE.CREATE_PROJECT_GROUPS
      );
      setProjectGroups((prev) => [...prev, res.data]);
    } catch (error) {
      console.error("Error creating project group", error);
    }
  };

  const handleDeleteProjectGroup = async (id: string) => {
    try {
      await axiosInstance.delete(API_PATHS.DEFENSE.DELETE_PROJECT_GROUPS(id));
      setProjectGroups((prev) => prev.filter((g) => g.id !== id));
    } catch (error) {
      console.error("Error deleting project group", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Groups</h1>
        <Button onClick={handleCreateProjectGroup}>Create Project Group</Button>
      </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectGroups?.length > 0 ? (
        projectGroups.map((projectGroup) => (
            <ProjectGroupCard
            key={projectGroup.id}
            group={projectGroup}
            onDelete={handleDeleteProjectGroup}
            onEdit={handleDeleteProjectGroup}
            />
        ))
        ) : (
        <p>No project groups yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectGroupPage;
