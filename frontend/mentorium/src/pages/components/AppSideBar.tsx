import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


import { UserContext } from "@/contexts/UserContext";
import { SIDE_MENU_DATA, SIDE_MENU_DATA_COORDINATOR, SIDE_MENU_DATA_SUPERVISOR } from "@/utils/data";
import MentoriumIcon from "@/assets/icons/MentoriumIcon.svg?react";
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate ,Link } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
// Menu items.

type AppSidebarProps = {
  userDisplayName?: string;
  userRole?: string;
};

export function AppSidebar({ userDisplayName = "User", userRole = "Role" }: AppSidebarProps) {
  const {user,clearUser}= useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();
  
  const handleLogout =() =>{
    localStorage.clear();
    clearUser();
    navigate("/login");
  }

  useEffect(()=>{
    if(user){
      if(user.role ==='supervisor'){
        setSideMenuData(SIDE_MENU_DATA_SUPERVISOR)
      }else if (user.role==='coordinator'){
        setSideMenuData(SIDE_MENU_DATA_COORDINATOR)
      }else{
        setSideMenuData(SIDE_MENU_DATA)
      }
    }
    return()=>{};
  },[user]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div>
                  <MentoriumIcon className="size-8" />
                </div>
              </a>
            </SidebarMenuButton>
                <SidebarMenuButton size="lg" asChild>
                <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  {userDisplayName?.[0] || "U"}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight text-grey font-secondary">
                  <span className="truncate font-medium">{userDisplayName}</span>
                  <span className="truncate text-xs">{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}</span>
                </div>
               </a>
               </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sideMenuData.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url} className="font-secondary text-grey text-lg font-medium">
                      {<item.icon className="size-4"/>}
                      <span >{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
      </SidebarGroup>
      <SidebarSeparator className="mx-0" />
      </SidebarContent>
      <SidebarFooter>
            <SidebarMenuButton asChild>
                <a href="#" className="font-secondary text-grey text-lg font-medium">
                      {<Settings className="size-4"/>}
                      <span >Settings</span>
                </a>
            </SidebarMenuButton>
            <SidebarMenuButton
                className="font-secondary text-grey text-sm font-medium"
                onClick = {handleLogout}>
                      {<LogOut className="size-4"/>}
                      <span >Log Out</span>
            </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}