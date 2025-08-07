import {
  Home,
  Search,
  Calendar,
  Bell,
  Trash2,
  TicketCheckIcon,
  PlusCircle,
  Pencil,
  BookMarked,
  Volume2,
} from "lucide-react";

export interface SideMenuItem {
  id: string;
  title: string;
  url: string;
  icon: React.ElementType;
}

export const SIDE_MENU_DATA: SideMenuItem[] = [
  {
    id: "01",
    title: "Home",
    url: "/student/dashboard",
    icon: Home,
  },
  { id: "02", title: "Create", url: "#", icon: PlusCircle },
  { id: "03", title: "Search", url: "#", icon: Search },
  { id: "04", title: "Completed", url: "/completed", icon: TicketCheckIcon },
  { id: "05", title: "Calendar", url: "#", icon: Calendar },
  { id: "06", title: "Notifications", url: "/project/test-id/", icon: Bell },
  { id: "07", title: "Announcements", url: "/announcements", icon: Volume2 },
  { id: "08", title: "Archives", url: "/archivesStudent", icon: BookMarked },
  { id: "09", title: "Trash", url: "/trash", icon: Trash2 },
];

export const SIDE_MENU_DATA_SUPERVISOR: SideMenuItem[] = [
  {
    id: "01",
    title: "Home",
    url: "/supervisor/dashboard",
    icon: Home,
  },
  { id: "02", title: "Create", url: "#", icon: PlusCircle },
  { id: "03", title: "Manage", url: "#", icon: Pencil },
  { id: "04", title: "Search", url: "#", icon: Search },
  { id: "05", title: "Completed", url: "#", icon: TicketCheckIcon },
  { id: "06", title: "Calendar", url: "#", icon: Calendar },
  { id: "07", title: "Notifications", url: "#", icon: Bell },
  { id: "08", title: "Announcements", url: "/announcements", icon: Volume2 },
  { id: "09", title: "Archives", url: "#", icon: BookMarked },
  { id: "10", title: "Trash", url: "#", icon: Trash2 },
];

export const SIDE_MENU_DATA_COORDINATOR: SideMenuItem[] = [
  {
    id: "01",
    title: "Home",
    url: "/supervisor/dashboard",
    icon: Home,
  },
  { id: "02", title: "Create", url: "#", icon: PlusCircle },
  { id: "03", title: "Search", url: "#", icon: Search },
  { id: "04", title: "Completed", url: "/completed", icon: TicketCheckIcon },
  { id: "05", title: "Calendar", url: "#", icon: Calendar },
  { id: "06", title: "Notifications", url: "/project/test-id/", icon: Bell },
  { id: "07", title: "Announcements", url: "/announcements", icon: Volume2 },
  { id: "08", title: "Archives", url: "/archivesStudent", icon: BookMarked },
  { id: "09", title: "Trash", url: "/trash", icon: Trash2 },
];

export const PRIORITY_OPTIONS = [
  { label: "Very Low", value: 1 },
  { label: "Low", value: 2 },
  { label: "Medium", value: 3 },
  { label: "High", value: 4 },
  { label: "Very High", value: 5 }
];


export const STUDENT_PROJECT_NAVBAR = [
  { title: "Overview", path: "" },
  { title: "Tasks", path: "tasks" },
  { title: "Team", path: "team" },
  { title: "Budget", path: "budget" },
  { title: "Announcements", path: "projectannouncement" },
];

export const SUPERVISOR_PROJECT_NAVBAR = [
  { title: "Overview", url: "/project/test-id" },
  { title: "Tasks", url: "/project/test-id/tasks" },
  { title: "Assignments", url: "/project/test-id/assignments" },
  { title: "Team", url: "/project/test-id/team" },
  { title: "Announcements", url: "/project/test-id/announcements" },
];

export const DEFENSE_NAVBAR = [
  { title: "Overview", path: "" },
  { title: "Panels", path: "panels" },
  { title: "Students", path: "students" },
  { title: "Schedule", path: "schedule" },
  { title: "Scoresheet", path: "scoresheet" },
];
