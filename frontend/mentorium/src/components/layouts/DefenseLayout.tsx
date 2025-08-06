import {GraduationCap } from 'lucide-react'
import React, { useContext } from 'react'
import { UserContext } from '@/contexts/UserContext';
import { NavLink, Outlet } from 'react-router-dom'
import {
  DEFENSE_NAVBAR
} from "@/utils/data";
import PageHeader from '@/pages/components/PageHeader';

const DefenseLayout :React.FC= () => {
  const navItems = DEFENSE_NAVBAR;
  return (
        <main className="flex flex-1 flex-col px-6 py-4 gap-4">
          {/* Project Header */}
          <PageHeader title="Project Defense" icon={GraduationCap} />

          {/* Project Tabs */}
          <div className="flex gap-10 border-b text-sm font-medium text-muted-foreground font-secondary">
            {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={`/defense/${item.path}`}
              end={item.path === ""}
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