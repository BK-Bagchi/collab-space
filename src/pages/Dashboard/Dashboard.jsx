import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-softWhite text-charcoalGray">
      <div className="w-64 h-full bg-white shadow-sm body-font">
        <Sidebar />
      </div>
      <div className="flex-1 p-8 overflow-y-auto body-font bg-softWhite">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
