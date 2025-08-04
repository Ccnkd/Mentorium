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
import { BookOpenTextIcon } from "lucide-react";

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
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
              <BookOpenTextIcon className="text-muted-foreground size-5" />
            </div>
            <h1 className="text-4xl text-grey">Lecturer Management</h1>
          </div>
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