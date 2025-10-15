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
import Chat from "../../Toggle/Chat";

const PrivateBtn = () => {
  const [openNotification, setOpenNotification] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <div className="flex items-center gap-x-0 md:gap-x-5">
      <button
        className="btn btn-sm px-2 border-none shadow-none bg-electricBlue text-softWhite hover:bg-softWhite hover:text-charcoalGray"
        onClick={() => {
          setOpenNotification(!openNotification);
          setOpenMessage(false);
        }}
      >
        <Bell />
      </button>
      <button
        className="btn btn-sm px-2 border-none shadow-none bg-electricBlue text-softWhite hover:bg-softWhite hover:text-charcoalGray"
        onClick={() => {
          setOpenMessage(!openMessage);
          setOpenNotification(false);
        }}
      >
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
      <div className="relative inline-block text-left mt-10">
        {/* Dropdown */}
        {openNotification && (
          <Notification open={openNotification} setOpen={setOpenNotification} />
        )}
        {openMessage && <Chat open={openMessage} setOpen={setOpenMessage} />}
      </div>
    </div>
  );
};

export default PrivateBtn;
