import { Button } from "@/components/ui/button";
import { MenteeContext } from "@/contexts/MenteeContext";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import React, { useContext, useState } from "react";
import ProjectGroupCard from "@/pages/components/ProjectGroupCard";
import type { Member, ProjectGroup } from "@/utils/types";
import ShufflePreviewModal from "@/pages/components/ShufflePreviewModal";

const ProjectGroupPage: React.FC = () => {
  const { finalYears, projectGroups, setProjectGroups } = useContext(MenteeContext);
    const [shuffledGroups, setShuffledGroups] = useState<ProjectGroup[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const shuffleStudents = async () => {
        const shuffled = [...finalYears].sort(()=> Math.random()-0.5)
        const result = projectGroups.map(projectGroup =>({...projectGroup, members: [] as Member[]}))

        shuffled.forEach((student, index) => {
            result[index % result.length].members.push({
            user_id: student.user_id,
            firstname: student.users.firstname,
            lastname: student.users.lastname,
            email: student.email
            });
        });
    
        setShuffledGroups(result);
        setIsModalOpen(true);
  };

  const handleSaveShuffled = async () => {
  try {
    const assignments = shuffledGroups.flatMap(projectGroup =>
      projectGroup.members.map(member => ({
        projectGroupId: projectGroup.project_group_id,
        studentId: member.user_id,
      }))
    );

    console.log("Sending assignments:", assignments);

    const res = await axiosInstance.post(API_PATHS.DEFENSE.ASSIGN_PROJECT_GROUPS, { assignments });

    console.log("Response:", res.data);
    setIsModalOpen(false);
    alert("Assignments Saved!");
  } catch (error: any) {
    console.error("Assignment failed:", error.response?.data || error.message);
    alert(`Assignment failed: ${error.response?.data?.message || error.message}`);
  }
};

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Groups</h1>
        <div className="flex gap-2 space x-2">
        <Button onClick={shuffleStudents} variant="secondary" className="rounded-lg">Shuffle Students</Button>
        <Button onClick={handleCreateProjectGroup} className="rounded-lg">Create Group</Button>
       </div>
      </div>
    <p>{finalYears.length} final year student(s)</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectGroups?.length > 0 ? (
        projectGroups.map((projectGroup) => (
            <ProjectGroupCard
            key={projectGroup.project_group_id}
            group={projectGroup}
            onDelete={handleDeleteProjectGroup}
            onEdit={handleDeleteProjectGroup}
            />
        ))
        ) : (
        <p>No project groups yet.</p>
        )}
      </div>

    <ShufflePreviewModal
      open={isModalOpen}
      title="Preview"
      onClose={() => setIsModalOpen(false)}
      onSave={handleSaveShuffled}
    >
      {shuffledGroups.map((projectGroup) => (
        <ProjectGroupCard key={projectGroup.project_group_id} group={projectGroup} previewMode />
      ))}
    </ShufflePreviewModal>
    </div>
  );
};

export default ProjectGroupPage;
