import {
  BookOpenTextIcon,
  ChevronDown,
  ChevronRight,
  GraduationCapIcon,
  IdCardLanyard,
  LibraryBigIcon,
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

export function ManagementSection() {
  const location = useLocation();


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
                <SidebarMenuSubItem className="font-secondary">
                  <SidebarMenuSubButton asChild className="text-grey">
                    <Link to="/defense/">
                      <GraduationCapIcon className="size-4" />
                      <span>Project Defense</span>
                    </Link>
                  </SidebarMenuSubButton>

                  <SidebarMenuSubButton asChild>
                    <Link
                      to="/management/"
                    >
                      <IdCardLanyard className="size-4" />
                      <span>Students</span>
                    </Link>
                  </SidebarMenuSubButton>

                  <SidebarMenuSubButton asChild>
                    <Link
                      to="/coordinator/supervisorManagement"
                    >
                      <LibraryBigIcon className="size-4" />
                      <span>Supervisors</span>
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
