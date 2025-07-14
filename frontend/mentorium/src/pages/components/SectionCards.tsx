import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeDollarSignIcon, Ticket } from "lucide-react";

const SectionCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4">
      {/* Project Details */}
      <Card className="col-span-2 font-secondary">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            {/* Replace with icon */}
            <div className="w-6 h-6 rounded-sm bg-muted" />
            <CardTitle className="text-grey font-medium">Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-4 ">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Left Side */}
            <div className="flex-1 space-y-2 pr-4">
              <div>
                <p className="text-muted-foreground text-sm">Due Date</p>
                <p className="font-medium text-grey text-xl">12th May, 2025</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Next Milestone</p>
                <p className="font-medium text-grey text-xl">Presentation</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Budget</p>
                <p className="font-medium text-grey text-xl">GHC 1,500.00</p>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 space-y-2 pl-4 pt-4 md:pt-0">
              <div>
                <p className="text-muted-foreground text-sm">Supervisor</p>
                <p className="font-medium text-grey text-xl">Dr. Theresa-Samuelle Adjiadoo</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Institution</p>
                <p className="font-medium text-grey text-xl">
                  Kwame Nkrumah University of Science & Technology
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tasks */}
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            {/* Replace with icon */}
            <div className="w-6 h-6 rounded-sm bg-muted" />
            <CardTitle className="text-base font-semibold">Tasks</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0 text-sm">
          <ul className="space-y-1 mb-4">
            <li>All Tasks (10)</li>
            <li className="text-red-500">Overdue (0)</li>
            <li className="text-orange-500">High Priority (3)</li>
            <li className="text-yellow-500">Medium Priority (0)</li>
            <li className="text-green-500">Low Priority (7)</li>
          </ul>
          {/* Replace this with actual progress donut chart */}
          <div className="w-full flex justify-center">
            <div className="text-2xl font-bold">27%</div>
          </div>
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card className="font-secondary col-span-2 gap-1">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            {/* Replace with icon */}
            <div className="w-6 h-6 rounded-sm bg-muted" />
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
            <div className="w-6 h-6 rounded-sm bg-muted">
            <BadgeDollarSignIcon className="size-4"/>
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
  );
};

export default SectionCards;
