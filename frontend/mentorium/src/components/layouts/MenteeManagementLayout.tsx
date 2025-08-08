import PageHeader from '@/pages/components/PageHeader';
import { MENTEE_MANAGEMENT_NAVBAR } from '@/utils/data';
import { IdCardIcon } from 'lucide-react';
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';

const MenteeManagementLayout:React.FC = () => {
  const navItems = MENTEE_MANAGEMENT_NAVBAR;
  return (
        <main className="flex flex-1 flex-col px-6 py-4 gap-4">
          {/* Project Header */}
          <PageHeader title="Mentee Management" icon={IdCardIcon} />

          {/* Project Tabs */}
          <div className="flex gap-10 border-b text-sm font-medium text-muted-foreground font-secondary">
            {navItems.map((item) => (
            <NavLink
              key={item.title}
              to={`/mentee/${item.path}`}
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

export default MenteeManagementLayout