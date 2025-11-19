import React, { useState } from "react";
import { toast } from "react-toastify";
// prettier-ignore
import { Bell, LogOut, MessageCircle, Plus, Settings, User, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import Notification from "../../Toggle/Notification";
import Chat from "../../Toggle/Chat";
import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import Modal from "../../Modal/Modal";
import CreateProject from "../../Forms/CreateProject";

const PrivateBtn = () => {
  const { logout } = useAuth();
  const { unread, markAsRead } = useNotification();
  const [openNotification, setOpenNotification] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openPlus, setOpenPlus] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  if (unread > 0) toast.success("You have new notifications");

  return (
    <div className="flex items-center gap-x-0 md:gap-x-5">
      <button
        className="relative btn btn-sm px-2 border-none shadow-none bg-electricBlue text-softWhite hover:bg-softWhite hover:text-charcoalGray"
        onClick={() => {
          setOpenNotification((prev) => !prev);
          setOpenMessage(false);
          markAsRead();
        }}
      >
        <Bell />
        {unread > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
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
      <button
        className="btn btn-sm px-2 border-none shadow-none bg-electricBlue text-softWhite hover:bg-softWhite hover:text-charcoalGray"
        onClick={() => setOpenPlus(!openPlus)}
      >
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
          <li onClick={logout}>
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
        {openPlus && (
          <div className="absolute mt-1 right-0 w-40 bg-[#FAFAFA] border border-gray-200 rounded-md shadow-lg z-20">
            <ul className="py-1">
              <li
                className="px-4 py-2 text-sm text-[#263238] hover:bg-[#EDE7F6] cursor-pointer transition"
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
      {
        // active create project list on modal
        activeModal && (
          <Modal
            render={<CreateProject setActiveModal={setActiveModal} />}
            setActiveModal={setActiveModal}
          />
        )
      }
    </div>
  );
};

export default PrivateBtn;
