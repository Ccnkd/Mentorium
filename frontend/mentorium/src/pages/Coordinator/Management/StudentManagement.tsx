import { API_PATHS } from "@/utils/apiPaths"
import React, { useContext, useEffect, useState } from "react";
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
import { ManagementContext } from "@/contexts/ManagementContext";

const StudentManagement :React.FC= () => {
  const {students,setStudents} = useContext(ManagementContext);

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
    <div className="space-y-4">
      <Table>
        <TableHeader className="font-secondary text-grey">
          <TableRow>
            <TableHead>Index Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>CWA</TableHead>    
            <TableHead>Year Of Admission</TableHead>      
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>          
          {students.map((student) => (
            <TableRow key={student.user_id} className="font-secondary">
              <TableCell>{student.index_number}</TableCell>
              <TableCell>{student.users.firstname} {student.users.lastname}</TableCell>
              <TableCell>{student.current_cwa}</TableCell>
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