// prettier-ignore
import { Home, CheckCircle, MessageCircle, File, Calendar, Settings, HelpCircle, LogOut, BarChart, Sliders, LayoutDashboard, FolderKanban } from "lucide-react";

export const commonLinks = [
  { name: "Dashboard", icon: <Home size={20} />, route: "/dashboard" },
  {
    name: "My Projects",
    icon: <FolderKanban size={20} />,
    route: "/dashboard/projects",
  },
  {
    name: "My Tasks",
    icon: <CheckCircle size={20} />,
    route: "/dashboard/tasks",
  },
  { name: "Chat", icon: <MessageCircle size={20} />, route: "/dashboard/chat" },
  { name: "Files", icon: <File size={20} />, route: "/dashboard/files" },
  {
    name: "Calendar",
    icon: <Calendar size={20} />,
    route: "/dashboard/calendar",
  },
];

export const adminLinks = [
  {
    name: "Manage Projects",
    icon: <LayoutDashboard size={20} />,
    route: "/dashboard/manage-projects",
  },
  {
    name: "Analytics",
    icon: <BarChart size={20} />,
    route: "/dashboard/analytics",
  },
  {
    name: "Project Settings",
    icon: <Sliders size={20} />,
    route: "/dashboard/project-settings",
  },
];

export const bottomLinks = [
  {
    name: "Settings",
    icon: <Settings size={20} />,
    route: "/dashboard/settings",
  },
  {
    name: "Help / Support",
    icon: <HelpCircle size={20} />,
    route: "/dashboard/help",
  },
  { name: "Logout", icon: <LogOut size={20} />, route: null },
];
