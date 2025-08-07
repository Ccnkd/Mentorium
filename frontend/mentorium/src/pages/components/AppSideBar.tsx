import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarSeparator,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { UserContext } from "@/contexts/UserContext";
import {
  SIDE_MENU_DATA,
  SIDE_MENU_DATA_COORDINATOR,
  SIDE_MENU_DATA_SUPERVISOR,
  type SideMenuItem,
} from "@/utils/data";

import MentoriumIcon from "@/assets/icons/MentoriumIcon.svg?react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Moon, Sun } from "lucide-react";
import { ProjectsSection } from "./ProjectsSection"; // Import TeamsSection component
import { cn } from "@/lib/utils"; // import cn helper
import { CreateModal } from "../Shared/CreateModal";
import { ManagementSection } from "./ManagementSection";
import { useTheme } from "./ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDetailsModal } from "./ProfileSettingsPage";

type AppSidebarProps = {
  userDisplayName?: string;
  userRole?: string;
};

export function AppSidebar({
  userDisplayName = "User",
  userRole = "Role",
}: AppSidebarProps) {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const { user, clearUser } = useContext(UserContext);
  const location = useLocation();
  const [sideMenuData, setSideMenuData] = useState<SideMenuItem[]>([]);
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      if (user.role === "supervisor") {
        setSideMenuData(SIDE_MENU_DATA_SUPERVISOR);
      } else if (user.role === "coordinator") {
        setSideMenuData(SIDE_MENU_DATA_COORDINATOR);
      } else {
        setSideMenuData(SIDE_MENU_DATA);
      }
    }
    return () => {};
  }, [user]);

  const handleMenuClick = (item) => {
    if (item.title === "Create") {
      setCreateModalOpen(true); // open modal
    } else if (item.url && item.url !== "#") {
      navigate(item.url);
    }
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarHeader className="sticky top-0 z-[99] bg-sidebar">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" asChild>
                  <a href="#">
                    <div>
                      <MentoriumIcon className="size-8" />
                    </div>
                  </a>
                </SidebarMenuButton>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton size="lg" asChild>
                      <a href="#">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                          {userDisplayName?.[0] || "U"}
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight text-grey font-secondary">
                          <span className="truncate font-medium">
                            {userDisplayName}
                          </span>
                          <span className="truncate text-xs">
                            {userRole?.charAt(0).toUpperCase() +
                              userRole?.slice(1)}
                          </span>
                        </div>
                      </a>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 rounded-2xl"
                  >
                    {/* Replaced DropdownMenuItem with UserDetailsModal */}
                    <DropdownMenuItem asChild>
                      <UserDetailsModal />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex items-center justify-between rounded-2xl">
                        Theme
                        {document.documentElement.classList.contains("dark") ? (
                          <Moon className="h-4 w-4" />
                        ) : (
                          <Sun className="h-4 w-4" />
                        )}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent className="w-48 rounded-2xl">
                        <DropdownMenuItem
                          className="rounded-2xl"
                          onClick={() => setTheme("light")}
                        >
                          Light
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-2xl"
                          onClick={() => setTheme("dark")}
                        >
                          Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-2xl"
                          onClick={() => setTheme("system")}
                        >
                          System
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {sideMenuData.map((item) => {
                  const pathname = location.pathname;
                  const isActive =
                    pathname === item.url ||
                    pathname.startsWith(item.url + "/");

                  return (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => handleMenuClick(item)}
                          className={cn(
                            "relative font-secondary text-lg font-medium flex items-center gap-2 px-3 py-2 rounded-md transition-colors",
                            isActive
                              ? "bg-muted text-primary"
                              : "text-muted-foreground hover:bg-muted"
                          )}
                        >
                          {/* Red vertical indicator bar */}
                          {isActive && (
                            <div className="absolute left-0 h-full w-1 bg-red rounded-r-sm" />
                          )}
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          {user?.role === "coordinator" || user?.role === "supervisor" ? (
            <>
              <SidebarSeparator className="mx-0 " />
              <ManagementSection />
            </>
          ) : (
            <></>
          )}
          <SidebarSeparator className="mx-0" />
          <ProjectsSection />
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenuButton
            className="font-secondary text-grey text-sm font-medium flex items-center gap-2 px-3 py-2"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            <span>Log Out</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>

      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </>
  );
}
