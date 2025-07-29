import { FolderClosed, GraduationCap } from 'lucide-react'
import React, { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext';
import { NavLink, Outlet } from 'react-router-dom'
import {
  DEFENSE_NAVBAR
} from "@/utils/data";

const DefenseLayout :React.FC= () => {
  const { user } = useContext(UserContext);
  const navItems = DEFENSE_NAVBAR;
  return (
        <main className="flex flex-1 flex-col px-6 py-4 gap-4">
          {/* Project Header */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center">
              <GraduationCap className="text-muted-foreground size-5" />
            </div>
            <h1 className="text-4xl text-grey">Defense</h1>
          </div>

          {/* Project Tabs */}
          <div className="flex gap-10 border-b text-sm font-medium text-muted-foreground font-secondary">
            {navItems.map((item) => (
              <NavLink
                key={item.title}
                to={`/defense/${item.path}`}
                className={({ isActive }) =>
                  `pb-2 ${isActive ? "border-b-3 border-primary" : ""}`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          {/* Main Content */}
          <div className="pt-4">
            <Outlet/>
          </div>
        </main>
  )
}

export default DefenseLayout