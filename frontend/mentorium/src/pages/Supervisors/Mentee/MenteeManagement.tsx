import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { API_PATHS } from '@/utils/apiPaths';
import axiosInstance from '@/utils/axiosInstance';
import type { Student } from '@/utils/types';
import React, { useEffect } from 'react'

const MenteeManagement:React.FC = () => {
const [mentees, setMentees] = React.useState<Student[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const menteeRes = await axiosInstance.get(API_PATHS.USERS.GET_MENTEES);

      setMentees(menteeRes.data.mentees);
    };

    fetchData();
  }, []);


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
          {mentees.map((mentee) => (
            <TableRow key={mentee.user_id} className="font-secondary">
              <TableCell>{mentee.index_number}</TableCell>
              <TableCell>{mentee.users.firstname} {mentee.users.lastname}</TableCell>
              <TableCell>{mentee.current_cwa}</TableCell>
              <TableCell>{mentee.year_of_admission}</TableCell>
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

export default MenteeManagement