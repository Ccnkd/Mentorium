import type {Lecturer } from "../../utils/types"
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
import { BookOpenTextIcon, LibraryBig } from "lucide-react";
import PageHeader from "../components/PageHeader";

const SupervisorManagement :React.FC= () => {
  const [lecturers, setLecturers] = React.useState<Lecturer[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const lecturerRes = await axiosInstance.get(API_PATHS.USERS.GET_LECTURERS);

      setLecturers(lecturerRes.data.users);
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
      <PageHeader title="Lecturer Management" icon={LibraryBig} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>      
            <TableHead>Panel</TableHead>      
            <TableHead>Department</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lecturers.map((lecturer) => (
            <TableRow key={lecturer.id}>
              <TableCell>{lecturer.title}</TableCell>
              <TableCell>{lecturer.firstname} {lecturer.lastname}</TableCell>
              <TableCell>{lecturer.email}</TableCell>
              <TableCell>{lecturer.panel_id}</TableCell>
              <TableCell>{lecturer.department}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePromote(lecturer.id)}
                >
                  Promote
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SupervisorManagement