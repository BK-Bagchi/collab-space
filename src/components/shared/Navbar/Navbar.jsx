import React, { useEffect, useState } from "react";
import PublicList from "./PublicList.jsx";
import projectName from "../../../utils/getProjectName.js";
import PrivateList from "./PrivateList.jsx";
import PrivateBtn from "./PrivateBtn.jsx";
import PublicBtn from "./PublicBtn.jsx";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(true);
  }, []);

  return (
    <div className="navbar bg-[#2979FF] text-[#FAFAFA] shadow-sm px-3">
      <div className="navbar-start">
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {/* prettier-ignore */}
            <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"  stroke="currentColor" >
              {" "}
            {/* prettier-ignore */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              {" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm body-font bg-[#2979FF] dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {loggedIn ? <PrivateList /> : <PublicList />}
          </ul>
        </div>
        <div className="hidden md:flex w-full">
          <ul
            tabIndex="1"
            className="menu menu-sm body-font w-full rounded-box z-1 p-2 flex flex-row items-center gap-4"
          >
            {loggedIn ? <PrivateList /> : <PublicList />}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-2xl font-bold logo-font">{projectName()}</a>
      </div>
      <div className="navbar-end body-font pl-2">
        {loggedIn ? <PrivateBtn /> : <PublicBtn />}
      </div>
    </div>
  );
};

export default Navbar;

// [ Collab Space ]    Home | Features | About     [ Login ] [ Signup ]
// +--------------------------------------------------------------------------------------------------+
// | 🪶 Collab Space     🔍 [Search Bar]          🔔 💬 ➕  👤 (Profile Dropdown)   🌞/🌙               |
// +--------------------------------------------------------------------------------------------------+
// +----------------------------------+
// | 👤 Dipto Bagchi (Admin)          |
// |----------------------------------|
// | 🏠 Dashboard                     |
// | 📁 Projects                      |
// | ✅ Tasks                         |
// | 💬 Chat                          |
// | 📎 Files                         |
// | 👥 Team Members                  |
// | 📊 Analytics                     |
// | ⚙️ Settings                      |
// |----------------------------------|
// | ⬅️ Collapse | 🚪 Logout          |
// +----------------------------------+
