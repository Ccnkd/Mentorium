import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/pages/components/AppSideBar"
import { UserContext } from '@/contexts/UserContext'


export default function GlobalLayout(){
  const {user} = useContext(UserContext);
  return (
    <SidebarProvider>            
      <div className="flex min-h-screen w-full">
        <AppSidebar
          userDisplayName={user?.first_name || user?.email}
          userRole={user?.role}
        />
      <main className="flex-1 px-6 py-4">
        <Outlet />
      </main>
      </div>
    </SidebarProvider>
  )
}