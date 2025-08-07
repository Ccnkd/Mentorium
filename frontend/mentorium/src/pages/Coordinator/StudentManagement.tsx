import type {Student } from "../../utils/types"
import { API_PATHS } from "@/utils/apiPaths"
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { BookOpenTextIcon } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { ScrollArea } from "@/components/ui/scroll-area";

const StudentManagement :React.FC= () => {
  const [students, setStudents] = React.useState<Student[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const studentRes = await axiosInstance.get(API_PATHS.USERS.GET_STUDENTS);

      setStudents(studentRes.data.users);
    };

    fetchData();
  }, []);

  const handlePromote = async (lecturerId: string) => {
    try {
      await axiosInstance.put(API_PATHS.USERS.PROMOTE_LECTURER(lecturerId));
      alert("Lecturer promoted successfully!");
    } catch (err) {
      console.error("Promotion failed", err);
      alert("Promotion failed");
    }
  };

 return (
    <div className="p-6 space-y-4">
      <PageHeader title="Student Management" icon={BookOpenTextIcon} />
      <Table>
        <TableHeader className="font-secondary text-grey">
          <TableRow>
            <TableHead>Index Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>CWA</TableHead>
            <TableHead>Mentor</TableHead>      
            <TableHead>Year Of Admission</TableHead>      
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>          
          {students.map((student) => (
            <TableRow key={student.user_id} className="font-secondary">
              <TableCell>{student.index_number}</TableCell>
              <TableCell>{student.firstname} {student.lastname}</TableCell>
              <TableCell>{student.current_cwa}</TableCell>
              <TableCell>{student.mentor}</TableCell>
              <TableCell>{student.year_of_admission}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default StudentManagement