import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MenteeContext } from '@/contexts/MenteeContext';
import { UserContext } from '@/contexts/UserContext';
import { Badge, BadgeCent, InfoIcon, TicketCheck, Volume2 } from 'lucide-react';
import React, { useContext } from 'react'

const MenteeOverview:React.FC = () => {
    const { mentees } = useContext(MenteeContext);
    const{user} = useContext(UserContext);
    const firstDept = mentees.length > 0 ? mentees[0].department : null;
    const maleMentees = mentees.filter(m => m.gender === "M");

  return (
<div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
      {/* Project Details */}
      <Card className="col-span-2 font-secondary">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center">
            <InfoIcon className="size-4 text-muted-foreground"/>
            </div>
            <CardTitle className="text-grey font-medium">Overview</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Left Side */}
            <div className="flex-1 space-y-2 pr-4">
              <div>
                <p className="text-muted-foreground text-sm">Number of mentees</p>
                <p className="font-medium text-grey text-4xl">{mentees.length}</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 space-y-2 pl-4 pt-4 md:pt-0">
              <div>
                <p className="text-muted-foreground text-sm">Mentor</p>
                <p className="font-medium text-grey text-xl">{user.firstname} {user.lastname}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Department</p>
                <p className="font-medium text-grey text-xl">{firstDept}</p>
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
            <Volume2 className="size-4 text-muted-foreground"/>
            </div>
            <CardTitle className="font-medium text-grey">Announcements</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xl font-medium text-grey">
            Project Milestones are shown on the Overview Page
          </p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground pt-2">
          <span className="font-medium text-purple-600">Dr. Theresa-Samuelle</span>
          <span>01 January 2025</span>
        </CardFooter>
      </Card>

      {/* Budget */}
      <Card className="font-secondary col-span-2 gap-1">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-sm bg-muted flex items-center justify-center">
            <BadgeCent className="size-4 text-muted-foreground"/>
            </div>
            <CardTitle className="font-medium text-grey">Budget</CardTitle>
          </div>
          <Badge variant="secondary">Approved</Badge>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-4xl font-medium text-end text-grey">GHC 1,500</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default MenteeOverview