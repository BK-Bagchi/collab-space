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
  { name: "My Projects", icon: <Folder size={20} />, route: "/projects" },
  { name: "My Tasks", icon: <CheckCircle size={20} />, route: "/tasks" },
  { name: "Chat", icon: <MessageCircle size={20} />, route: "/chat" },
  { name: "Files", icon: <File size={20} />, route: "/files" },
  { name: "Calendar", icon: <Calendar size={20} />, route: "/calendar" },
];

export const adminLinks = [
  { name: "Manage Users", icon: <Users size={20} />, route: "/manage-users" },
  { name: "Analytics", icon: <BarChart size={20} />, route: "/analytics" },
  {
    name: "Project Settings",
    icon: <Sliders size={20} />,
    route: "/project-settings",
  },
];

export const bottomLinks = [
  { name: "Settings", icon: <Settings size={20} />, route: "/settings" },
  { name: "Help / Support", icon: <HelpCircle size={20} />, route: "/help" },
  { name: "Logout", icon: <LogOut size={20} />, route: "/logout" },
];
