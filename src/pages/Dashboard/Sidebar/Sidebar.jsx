import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminLinks, bottomLinks, commonLinks } from "./sidebarLinks";
import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import { useChatNotification } from "../../../hooks/useChatNotification";
import Avatar from "../../../assets/Default_Avatar.jpg";
import formatText from "../../../utils/textFormater";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { unread, markAsRead } = useNotification();
  const { unreadProjectChatsCount, markProjectChatsAsRead } =
    useChatNotification();

  const location = useLocation();
  const navigate = useNavigate();
  const { name: userName, role: userRole, avatar: userAvatar } = user || {};
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname.includes("logout")) return logout();
    setActiveRoute(location.pathname);
  }, [location, logout]);

  useEffect(() => {
    if (unreadProjectChatsCount > 0 && user.pushNotifications)
      toast.info(
        `You have ${unreadProjectChatsCount} unread project chat messages`
      );
  }, [unreadProjectChatsCount, user.pushNotifications]);

  return (
    <aside className="flex flex-col justify-between h-screen w-full border-r border-gray-500 px-3 py-6 bg-charcoalGray dark:bg-darkSlate text-softWhite">
      <div>
        {/* Project Info Section */}
        <div
          className="flex items-center gap-3 px-3 py-2 my-4 rounded-md bg-[#37474F] dark:bg-gray-600 hover:bg-[#455A64] transition cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          {/* User Info */}
          <div className="flex items-center justify-center rounded-md text-softWhite">
            {userAvatar ? (
              <img
                className="rounded-full w-10 h-10"
                src={userAvatar}
                alt={userName}
              />
            ) : (
              <img
                className="rounded-full w-10 h-10"
                src={Avatar}
                alt={userName}
              />
            )}
          </div>

          {/* Project Details */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-softWhite">
              {userName}
            </span>
            <span className="text-xs text-gray-400">
              {formatText(userRole)}
            </span>
          </div>
        </div>
        {/* Top Links */}
        <div className="flex flex-col gap-2">
          {commonLinks.map((link) => (
            <Link
              key={link.name}
              to={link.route}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-electricBlue hover:text-white transition ${
                activeRoute === link.route ? "bg-electricBlue text-white" : ""
              }`}
              onClick={() => {
                //prettier-ignore
                link.name === "Chats" && unreadProjectChatsCount > 0 && markProjectChatsAsRead()
                link.name === "Notifications" && unread > 0 && markAsRead();
              }}
            >
              {link.icon}
              <span>{link.name}</span>

              {/* For Chats */}
              {link.name === "Chats" && unreadProjectChatsCount > 0 && (
                <span
                  className="text-center text-[10px] font-bold 
      bg-red-500 text-white rounded-full h-4 w-4 shadow-md"
                >
                  {unreadProjectChatsCount > 9 ? "9+" : unreadProjectChatsCount}
                </span>
              )}

              {/* For Notification */}
              {link.name === "Notifications" && unread > 0 && (
                <span
                  className="text-center text-[10px] font-bold 
      bg-red-500 text-white rounded-full h-4 w-4 shadow-md"
                >
                  {unread > 9 ? "9+" : unread}
                </span>
              )}
            </Link>
          ))}

          {userRole != "MEMBER" && (
            <p className="text-charcoalGray bg-gray-400 h-px">.</p>
          )}

          {/* Admin/PM Extra Links */}
          {userRole != "MEMBER" &&
            adminLinks.map((link) => (
              <Link
                key={link.name}
                to={link.route}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-vibrantPurple hover:text-white transition ${
                  activeRoute === link.route
                    ? "bg-vibrantPurple text-white"
                    : ""
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="flex flex-col gap-2">
        {bottomLinks.map((link) => {
          return (
            <Link
              key={link.name}
              to={link.route}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-tealGreen hover:text-white transition ${
                activeRoute === link.route ? "bg-tealGreen text-white" : ""
              }`}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
