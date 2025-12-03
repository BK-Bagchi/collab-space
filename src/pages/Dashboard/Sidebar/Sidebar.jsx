import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminLinks, bottomLinks, commonLinks } from "./sidebarLinks";
import { useAuth } from "../../../hooks/useAuth";
import { useNotification } from "../../../hooks/useNotification";
import Avatar from "../../../assets/Default_Avatar.jpg";
import formatText from "../../../utils/textFormater";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { unread, markAsRead } = useNotification();
  const location = useLocation();
  const navigate = useNavigate();
  const { name: userName, role: userRole, avatar: userAvatar } = user || {};
  const [activeRoute, setActiveRoute] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname.includes("logout")) return logout();
    setActiveRoute(location.pathname);
  }, [location, logout]);

  return (
    <aside className="flex flex-col justify-between h-screen px-3 py-6 bg-charcoalGray text-softWhite w-[250px]">
      <div>
        {/* Project Info Section */}
        <div
          className="flex items-center gap-3 px-3 py-2 my-4 rounded-md bg-[#37474F] hover:bg-[#455A64] transition cursor-pointer"
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
              onClick={() =>
                link.name === "Notifications" && unread > 0 && markAsRead()
              }
            >
              {link.icon}
              <span>{link.name}</span>
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
{
  /* <button
        className="relative flex items-center justify-center w-9 h-9 rounded-full 
  bg-electricBlue text-softWhite hover:bg-white hover:text-charcoalGray 
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
      </button> */
}
