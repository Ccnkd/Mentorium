//import { UserContext } from '@/contexts/UserContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ManagementContext } from '@/contexts/ManagementContext';
import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import { AlertOctagon, LandPlot, TicketCheck, UsersRound, Volume2 } from 'lucide-react';
import React, { useContext } from 'react';

const StudentsOverview :React.FC= () => {
  useUserAuth();
  const{user} = useContext(UserContext);
    const {students,menteeGroups,finalYears,unassigned} = useContext(ManagementContext);

  return (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
        {/* Project Details */}
        <Card className="col-span-2 font-secondary">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center">
              <LandPlot className="size-4 text-muted-foreground"/>
              </div>
              <CardTitle className="text-grey font-medium">Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Left Side */}
              <div className="flex-1 space-y-2 pr-4">
                <div>
                  <p className="text-muted-foreground text-sm">Coordinator Name</p>
                  <p className="font-medium text-grey text-2xl">{user.firstname} {user.lastname}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Department</p>
                  <p className="font-medium text-grey text-2xl">{}</p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex-1 space-y-2 pl-4 pt-4 md:pt-0">
                <div>
                  <p className="text-muted-foreground text-sm">Student Count</p>
                  <p className="font-medium text-grey text-2xl">{students.length}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Final Year Students</p>
                  <p className="font-medium text-grey text-2xl">{finalYears.length}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks */}
        <Card className="col-span-2 font-secondary">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center">
              <TicketCheck className="size-4 text-muted-foreground"/>
              </div>
              <CardTitle className="text-grey font-medium">Mentees</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex justify-between text-sm  ">
            <div>
            <ul className="space-y-1 mb-4">
              <li>All Tasks (10)</li>
              <li className="text-red-500">Overdue (0)</li>
              <li className="text-orange-500">High Priority (3)</li>
              <li className="text-yellow-500">Medium Priority (0)</li>
              <li className="text-green-500">Low Priority (7)</li>
            </ul>
            </div>
            <div className="w-[200px] h-[200px] gap-2">
            </div>
          </CardContent>
        </Card>

        {/* Announcements */}
        <Card className="font-secondary col-span-2 gap-1">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center">
              <AlertOctagon className="size-4 text-muted-foreground"/>
              </div>
              <CardTitle className="font-medium text-grey">Alert</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-2xl font-medium text-grey">
              {unassigned.length} students have no mentor
            </p>
          </CardContent>
        </Card>

        {/* Budget */}
        <Card className="font-secondary col-span-2 gap-1">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center">
              <UsersRound className="size-4 text-muted-foreground"/>
              </div>
              <CardTitle className="font-medium text-grey">Mentee Groups</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-4xl font-medium text-end text-grey">{menteeGroups.length}</p>
          </CardContent>
        </Card>
      </div>
  )
}

export default StudentsOverview