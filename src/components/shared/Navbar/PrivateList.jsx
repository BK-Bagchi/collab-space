import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../../../hooks/Dropdown/useDropdown";

const PrivateList = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <li>
        <Link to="/projects" className="text-[15px] cursor-pointer">
          Projects
        </Link>
      </li>
      <li>
        <Link to="/dashboard" className="text-[15px] cursor-pointer">
          Dashboard
        </Link>
      </li>
      {/* Trigger */}
      <li
        className="text-[15px] cursor-pointer px-3 py-1 rounded hover:bg-[#3D86FF] transition"
        onClick={() => setOpen(!open)}
      >
        Create
      </li>
      {open && (
        <Dropdown
          open={open}
          render={
            <div className="absolute mt-1 right-0 w-40 bg-[#FAFAFA] border border-gray-200 rounded-md shadow-lg z-20">
              <ul className="py-1">
                <li
                  className="px-4 py-2 text-sm text-[#263238] hover:bg-[#EDE7F6] cursor-pointer transition"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  New Project
                </li>
              </ul>
            </div>
          }
        />
      )}
      <li className="hidden lg:inline">
        <label className="input input-bordered flex items-center gap-2 max-w-md shadow-md bg-[#FAFAFA] text-[#263234]">
          {/* prettier-ignore */}
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 opacity-70" >
          {/* prettier-ignore */}
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="What are you searching for?"
          />
        </label>
      </li>
    </>
  );
};

export default PrivateList;
