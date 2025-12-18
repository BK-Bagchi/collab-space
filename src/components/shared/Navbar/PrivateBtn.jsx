import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
// prettier-ignore
import { Bell, LogOut, MessageCircle, Plus, Settings, User, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Notification from "../../Toggle/Notification";
import Chat from "../../Toggle/Chat";
import { useAuth } from "../../../hooks/useAuth";
import { useActive } from "../../../hooks/useActive";
import { useSettings } from "../../../hooks/useSettings";
import { useNotification } from "../../../hooks/useNotification";
import { useChatNotification } from "../../../hooks/useChatNotification";
import Modal from "../../Modal/Modal";
import CreateProject from "../../Forms/CreateProject";

const PrivateBtn = () => {
  const { user, logout } = useAuth();
  const { activeUsers } = useActive();
  const { activeStatus } = useSettings();
  const { unread, markAsRead } = useNotification();
  const { unreadChatsCount, markChatsAsRead } = useChatNotification();

  const [openNotification, setOpenNotification] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openPlus, setOpenPlus] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  useEffect(() => {
    if (unread > 0) toast.info("You have new notifications");
  }, [unread]);

  useEffect(() => {
    if (unreadChatsCount > 0)
      toast.info(`You have ${unreadChatsCount} new messages`);
  }, [unreadChatsCount]);

  return (
    <div className="flex items-center gap-x-2 md:gap-x-4">
      {/* Notification Button */}
      <button
        className="relative flex items-center justify-center w-9 h-9 rounded-full 
  bg-electricBlue dark:bg-darkSlate text-softWhite hover:bg-[#3D86FF]
  transition shadow-sm"
        onClick={() => {
          setOpenNotification((prev) => !prev);
          setOpenMessage(false);
          markAsRead();
        }}
      >
        <Bell size={20} />

        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] 
      flex items-center justify-center text-[10px] font-bold 
      bg-red-500 text-white rounded-full px-1 shadow-md"
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Message Button */}
      <button
        className="relative flex items-center justify-center w-9 h-9 rounded-full 
      bg-electricBlue dark:bg-darkSlate text-softWhite hover:bg-[#3D86FF] 
      transition shadow-sm"
        onClick={() => {
          setOpenMessage(!openMessage);
          setOpenNotification(false);
          markChatsAsRead();
        }}
      >
        <MessageCircle size={20} />
        {unreadChatsCount > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] 
      flex items-center justify-center text-[10px] font-bold 
      bg-red-500 text-white rounded-full px-1 shadow-md"
          >
            {unreadChatsCount > 9 ? "9+" : unreadChatsCount}
          </span>
        )}
      </button>

      {/* Plus Button */}
      <button
        className="flex items-center justify-center w-9 h-9 rounded-full 
      bg-electricBlue dark:bg-darkSlate text-softWhite hover:bg-[#3D86FF] 
      transition shadow-sm"
        onClick={() => setOpenPlus(!openPlus)}
      >
        <Plus size={20} />
      </button>

      {/* Profile Dropdown */}
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="relative flex items-center justify-center w-9 h-9 rounded-full 
    bg-electricBlue dark:bg-darkSlate text-softWhite hover:bg-[#3D86FF] 
    transition shadow-sm cursor-pointer"
        >
          {user?.avatar ? (
            <img
              className="h-full w-full rounded-full object-cover"
              src={user?.avatar}
              alt={user?.name}
            />
          ) : (
            <UserRound size={20} />
          )}

          {/* Active Indicator */}
          {activeStatus && activeUsers.includes(user?._id) && (
            <span
              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full 
      bg-electricBlue border border-white shadow-sm"
              title="Active Now"
            />
          )}
        </label>

        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow-lg bg-electricBlue dark:bg-darkSlate 
        text-white rounded-xl w-44"
        >
          <li>
            <Link
              className="hover:bg-blue-600 rounded-lg transition"
              to="/profile"
            >
              <User size={20} /> Profile
            </Link>
          </li>

          <li>
            <Link
              className="hover:bg-blue-600 rounded-lg transition"
              to="/profile"
            >
              <Settings size={20} /> Settings
            </Link>
          </li>

          <li onClick={logout}>
            <a className="hover:bg-blue-600 rounded-lg transition cursor-pointer">
              <LogOut size={20} /> Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Toggles & Menus */}
      <div className="relative">
        {openNotification && (
          <Notification open={openNotification} setOpen={setOpenNotification} />
        )}

        {openMessage && <Chat open={openMessage} setOpen={setOpenMessage} />}

        {openPlus && (
          <div
            className="absolute mt-2 right-0 w-44 bg-white border border-gray-200 
        rounded-xl shadow-xl z-20 animate-fadeIn"
          >
            <ul className="py-1">
              <li
                className="px-4 py-2 text-sm text-charcoalGray hover:bg-blue-100 
              rounded-lg cursor-pointer transition"
                onClick={() => {
                  setActiveModal(true);
                  setOpenPlus(false);
                }}
              >
                New Project
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {activeModal && (
        <Modal
          render={<CreateProject setCreateModal={setActiveModal} />}
          setActiveModal={setActiveModal}
        />
      )}
    </div>
  );
};

export default PrivateBtn;
