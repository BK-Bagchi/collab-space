import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import useUserActive from "../../hooks/useUserActive";

const Dashboard = () => {
  useUserActive();
  return (
    <div className="flex min-h-screen bg-softWhite dark:bg-darkSlate text-charcoalGray">
      <div className="w-64 h-full bg-white shadow-sm body-font">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 overflow-y-auto body-font bg-softWhite dark:bg-darkSlatee max-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
