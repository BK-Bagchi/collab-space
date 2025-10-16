import {
  Home,
  Folder,
  CheckCircle,
  MessageCircle,
  File,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Users,
  BarChart,
  Sliders,
} from "lucide-react";

export const commonLinks = [
  { name: "Dashboard", icon: <Home size={20} />, route: "/dashboard" },
  {
    name: "My Projects",
    icon: <Folder size={20} />,
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
    name: "Manage Users",
    icon: <Users size={20} />,
    route: "/dashboard/manage-users",
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
