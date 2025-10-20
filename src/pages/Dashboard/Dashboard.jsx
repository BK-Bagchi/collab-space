import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = () => {
  const projectId = localStorage.getItem("projectId");
  return (
    <div className="flex min-h-screen bg-softWhite text-charcoalGray">
      <div className="w-64 h-full bg-white shadow-sm body-font">
        <Sidebar projectId={projectId} />
      </div>
      <div className="flex-1 p-8 overflow-y-auto body-font bg-softWhite">
        <Outlet context={projectId} />
      </div>
    </div>
  );
};

export default Dashboard;
