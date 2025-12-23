import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import useUserActive from "../../hooks/useUserActive";

const Dashboard = () => {
  useUserActive();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen bg-softWhite dark:bg-darkSlate text-charcoalGray">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden absolute top-2 left-2 z-50 bg-softWhite dark:bg-darkSlate text-electricBlue dark:text-softWhite p-2 rounded-md shadow-md"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Sidebar */}
      <div
        className={`absolute lg:static inset-y-0 left-0 z-40 w-64 h-full bg-white shadow-sm body-font transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 `}
      >
        {/* Close button (mobile only) */}
        {/* <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4"
        >
          <X className="w-5 h-5 text-electricBlue dark:text-softWhite" />
        </button> */}

        <Sidebar />
      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto body-font bg-softWhite dark:bg-darkSlate max-h-screen w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
