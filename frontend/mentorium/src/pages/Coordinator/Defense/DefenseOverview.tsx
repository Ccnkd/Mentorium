//import { UserContext } from '@/contexts/UserContext';
import { useUserAuth } from '@/hooks/useUserAuth'
import React, { useContext } from 'react';
import { DefenseContext } from '@/contexts/DefenseContext';
import { UserContext } from '@/contexts/UserContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertOctagon, LandPlot, TicketCheck, UsersRound } from 'lucide-react';


const DefenseOverview :React.FC= () => {
  useUserAuth();
  const {user} = useContext(UserContext);
  const {defense, formattedStartDate,formattedEndDate} = useContext(DefenseContext);

  return (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
        {/* Project Details */}
        <Card className="col-span-2 font-secondary hover:border-2 ">
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
                  <p className="text-muted-foreground text-sm">Faculty</p>
                  <p className="font-medium text-grey text-2xl">{defense.defDetails.faculty}</p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex-1 space-y-2 pl-4 pt-4 md:pt-0">
                <div>
                  <p className="text-muted-foreground text-sm">Students</p>
                  <p className="font-medium text-grey text-2xl">{defense.studentCount}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Project Groups</p>
                  <p className="font-medium text-grey text-2xl">{defense.projectGroupCount}</p>
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
              <CardTitle className="font-medium text-grey">Schedule</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className='flex items-center justify-between'>
            <div>
            <p className="text-muted-foreground text-sm">Start Date</p>
            <p className="font-medium text-grey text-2xl">{formattedStartDate}</p>
            </div>
            <hr className="w-[12vw] border-t border-primary" />
            <div>
            <p className="text-muted-foreground text-sm text-right">End Date</p>
            <p className="font-medium text-grey text-2xl">{formattedEndDate}</p>
            </div>
            </div>
          </CardContent>
        </Card>

        {/* Budget */}
        <Card className="font-secondary col-span-2 gap-1">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center">
              <UsersRound className="size-4 text-muted-foreground"/>
              </div>
              <CardTitle className="font-medium text-grey">Panels</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-4xl font-medium text-end text-grey">4</p>
          </CardContent>
        </Card>
      </div>
  )
}

export default DefenseOverview