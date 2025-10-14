import React from "react";
import {
  Bell,
  LogOut,
  MessageCircle,
  Plus,
  Settings,
  User,
  UserRound,
} from "lucide-react";

const PrivateBtn = () => {
  return (
    <div className="flex items-center gap-x-0 md:gap-x-5">
      <button className="btn btn-ghost btn-sm px-2 text-charcoalGray hover:bg-[#FAFAFA] hover:text-[#2979FF]">
        <Bell />
      </button>
      <button className="btn btn-ghost btn-sm px-2 text-charcoalGray hover:bg-[#FAFAFA] hover:text-[#2979FF]">
        <MessageCircle />
      </button>
      <button className="btn btn-ghost btn-sm px-2 text-charcoalGray hover:bg-[#FAFAFA] hover:text-[#2979FF]">
        <Plus />
      </button>
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-ghost btn-sm px-2 rounded-full text-charcoalGray hover:bg-[#FAFAFA] hover:text-[#2979FF]"
        >
          <UserRound />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-[#2972FF] rounded-box w-40"
        >
          <li>
            <a>
              <User />
              Profile
            </a>
          </li>
          <li>
            <a>
              <Settings />
              Settings
            </a>
          </li>
          <li>
            <a>
              <LogOut />
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivateBtn;
