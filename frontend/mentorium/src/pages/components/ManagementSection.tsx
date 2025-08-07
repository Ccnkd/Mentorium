"use client";

import {
  BookOpenTextIcon,
  ChevronDown,
  ChevronRight,
  GraduationCapIcon,
  SquareCheckBigIcon,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function ManagementSection() {
  const location = useLocation();

  const navLinkClass = (path: string) =>
    cn(
      "flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-grey",
      location.pathname === path ||
        (location.pathname.startsWith(path + "/") && "text-primary"),
      "hover:text-primary"
    );

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Collapsible>
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton className="text-grey hover:text-primary data-[state=open]:text-primary">
                <SidebarGroupLabel asChild>
                  <span className="font-semibold tracking-wide text-sm">
                    MANAGE
                  </span>
                </SidebarGroupLabel>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/defense/" className={navLinkClass("/defense")}>
                      <GraduationCapIcon className="size-4" />
                      <span>Project Defense</span>
                    </Link>
                  </SidebarMenuSubButton>

                  <SidebarMenuSubButton asChild>
                    <Link
                      to="/coordinator/studentManagement"
                      className={navLinkClass("#")}
                    >
                      <GraduationCapIcon className="size-4" />
                      <span>Students</span>
                    </Link>
                  </SidebarMenuSubButton>

                  <SidebarMenuSubButton asChild>
                    <Link
                      to="/coordinator/supervisorManagement"
                      className={navLinkClass(
                        "/coordinator/supervisorManagement"
                      )}
                    >
                      <BookOpenTextIcon className="size-4" />
                      <span>Supervisors</span>
                    </Link>
                  </SidebarMenuSubButton>

                  <SidebarMenuSubButton asChild>
                    <Link to="#" className={navLinkClass("approvals")}>
                      <SquareCheckBigIcon className="size-4" />
                      <span>Approvals</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}
