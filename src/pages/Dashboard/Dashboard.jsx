import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-softWhite text-charcoalGray">
      {/* Sidebar */}
      <div className="w-64 h-full bg-white shadow-sm body-font">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto body-font">
        <Outlet /> {/* Render selected tab here */}
      </div>
    </div>
  );
};

export default Dashboard;
