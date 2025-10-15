import React, { useState } from "react";
import {
  Bell,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
  User,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import Dropdown from "../../DropDown/DropDown";
import Notification from "../../Toggle/Notification";

const PrivateBtn = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-x-0 md:gap-x-5">
      <button
        className="btn btn-sm px-2 border-none shadow-none bg-electricBlue text-softWhite hover:bg-softWhite hover:text-charcoalGray"
        onClick={() => setOpen(!open)}
      >
        <Bell />
      </button>
      <button className="btn btn-sm px-2 border-none shadow-none bg-electricBlue text-softWhite hover:bg-softWhite hover:text-charcoalGray">
        <MessageCircle />
      </button>
      <button className="btn btn-sm px-2 border-none shadow-none bg-electricBlue text-softWhite hover:bg-softWhite hover:text-charcoalGray">
        <Plus />
      </button>
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-sm px-2 rounded-full border-none shadow-none bg-electricBlue text-softWhite hover:bg-softWhite hover:text-charcoalGray"
        >
          <UserRound />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-[#2972FF] rounded-box w-40"
        >
          <li>
            <Link to="/profile">
              <User />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <Settings />
              Settings
            </Link>
          </li>
          <li>
            <a>
              <LogOut />
              Logout
            </a>
          </li>
        </ul>
      </div>
      {/* Notification Dropdown (must be OUTSIDE the flex flow) */}
      {open && (
        <Dropdown
          open={open}
          render={<Notification open={open} setOpen={setOpen} />}
        />
      )}
    </div>
  );
};

export default PrivateBtn;
