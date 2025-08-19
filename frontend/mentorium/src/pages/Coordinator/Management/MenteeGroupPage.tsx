import * as React from "react";
import { Button } from "@/components/ui/button";
import MenteeGroupCard from "../../components/MenteeGroupCard";
import ShufflePreviewModal from "../../components/ShufflePreviewModal";
import type { MenteeGroup, Student } from "@/utils/types";
import axiosInstance from "@/utils/axiosInstance";
import { API_PATHS } from "@/utils/apiPaths";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ManagementContext } from "@/contexts/ManagementContext";

export const MenteeGroupPage: React.FC = () => {
  const {students,setStudents,menteeGroups,finalYears,setMenteeGroups} = React.useContext(ManagementContext);
  const [assignments, setAssignments] = React.useState<{ [groupId: string]: Student[] }>({});
  const [unassigned, setUnassigned] = React.useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const groupless = students.filter(
      s => s.mentee_group_id === null
    )
  const groupStudents = (students: Student[], method: "random" | "sorted") => {
    const grouped: { [groupId: string]: Student[] } = {};
    const leftovers: Student[] = [];
    const groupsByDept: { [dept: string]: MenteeGroup[] } = {};

    menteeGroups.forEach((group) => {
      const dept = group.mentor.department;
      if (!groupsByDept[dept]) groupsByDept[dept] = [];
      groupsByDept[dept].push(group);
    });

    const studentsByDept: { [dept: string]: Student[] } = {};
    students.forEach((student) => {
      const dept = student.department;
      if (!groupsByDept[dept]) {
        leftovers.push(student);
        return;
      }
      if (!studentsByDept[dept]) studentsByDept[dept] = [];
      studentsByDept[dept].push(student);
    });

    Object.entries(studentsByDept).forEach(([dept, deptStudents]) => {
      const deptGroups = groupsByDept[dept];

      if (method === "sorted") {
        deptStudents.sort((a, b) => {
          if (a.year_of_admission !== b.year_of_admission) {
            return a.year_of_admission - b.year_of_admission;
          }
          return b.current_cwa - a.current_cwa;
        });
      } else {
        deptStudents = deptStudents.sort(() => Math.random() - 0.5);
      }

      let direction = 1;
      let i = 0;
      for (const student of deptStudents) {
        const group = deptGroups[i];
        if (!grouped[group.id]) grouped[group.id] = [];
        grouped[group.id].push(student);

        i += direction;
        if (i === deptGroups.length) {
          direction = -1;
          i = deptGroups.length - 1;
        } else if (i < 0) {
          direction = 1;
          i = 0;
        }
      }
    });

    setAssignments(grouped);
    setUnassigned(leftovers);
    setIsModalOpen(true);
  };

  const handleSaveAssignments = async () => {
    const payload = Object.entries(assignments).flatMap(([groupId, students]) =>
      students.map((s) => ({ studentId: s.user_id, menteeGroupId: groupId }))
    );

    try {
      await axiosInstance.post(API_PATHS.USERS.ASSIGN_MENTEE_GROUPS, { assignments: payload });
      alert("Student assignments saved!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save assignments.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mentee Groups</h1>
        <div className="space-x-2">
          <Button onClick={() => groupStudents(students, "random")}>Random Shuffle</Button>
          <Button onClick={() => groupStudents(students, "sorted")}>Sorted Shuffle</Button>
        </div>
      </div>

      <ScrollArea className="h-[68vh] rounded-xl border-t-1 border-b-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {menteeGroups.map((group) => (
          <MenteeGroupCard key={group.id} menteegroup={group} />
        ))}
      </div>
        <br></br>
      <div className="p-4 border-1 rounded-xl border-primary">
        <h1>Unassigned Students ({groupless.length})</h1>
      <div className="p-4">  
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 font-secondary">
        {groupless.map((student) => (
          <div>
            {student.users.firstname} {student.users.lastname}
            </div>
        ))}
      </div>
      </div>
      </div>
      </ScrollArea>


      <ShufflePreviewModal
        title="Preview"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAssignments}
      >
        {Object.entries(assignments).map(([groupId, assignedStudents]) => {
          const group = menteeGroups.find((g) => g.id === groupId);
          return group ? (
            <MenteeGroupCard key={group.id} menteegroup={{ ...group, students: assignedStudents }} previewMode />
          ) : null;
        })}
      </ShufflePreviewModal>

      {unassigned.length > 0 && (
        <div className="mt-6 p-4 border border-red-200 rounded-lg bg-red-50">
          <h2 className="text-xl font-semibold text-red-700 mb-3">Unassigned Students</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {unassigned.map((student) => (
              <div
                key={student.user_id}
                className="p-3 rounded-lg border border-muted shadow-sm bg-white"
              >
                <div className="text-sm text-muted-foreground">{student.department}</div>
                <div className="font-medium text-lg text-gray-900">
                  {student.users.firstname} {student.users.lastname}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
