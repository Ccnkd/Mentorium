import React, { useContext, useEffect } from 'react';
import { UserContext } from '@/contexts/UserContext';
import { Progress } from "@/components/ui/progress";
import { FolderClosed } from 'lucide-react';
import {NavLink, Outlet, useParams } from 'react-router-dom';
import {
  STUDENT_PROJECT_NAVBAR,
  SUPERVISOR_PROJECT_NAVBAR,
} from "@/utils/data";



export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const { user } = useContext(UserContext);
  const { projectId } = useParams();
  const navItems =
    user?.role === "supervisor"
      ? SUPERVISOR_PROJECT_NAVBAR
      : STUDENT_PROJECT_NAVBAR;

  return (     
        <main className="flex flex-1 flex-col px-6 py-4 gap-4">
          {/* Project Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
              <FolderClosed className="text-muted-foreground size-5" />
            </div>
            <h1 className="text-4xl text-grey">Project Title</h1>
          </div>

          {/* Project Tabs */}
          <div className="flex gap-6 border-b text-sm font-medium text-muted-foreground font-secondary">
            {navItems.map((item) => (
              <NavLink
                key={item.title}
                to={`/project/${projectId}/${item.path}`}
                className={({ isActive }) =>
                  `pb-2 ${isActive ? "border-b-2 border-primary text-foreground" : ""}`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Milestone Progress Bar */}
          <div className='font-secondary text-xl'>
            Milestones
          </div>
          <div className="w-full">
            <Progress value={45} className="h-1 bg-[#CFD8D7]" />
          </div>

          {/* Main Content */}
          <div className="pt-4">
            <Outlet/>
          </div>
        </main>
  );
}