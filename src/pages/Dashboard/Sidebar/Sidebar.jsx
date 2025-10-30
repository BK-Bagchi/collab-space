import { useState } from "react";
import { Link } from "react-router-dom";
import { adminLinks, bottomLinks, commonLinks } from "./sidebarLinks";
import { useAuth } from "../../../hooks/useAuth";
import Avatar from "../../../assets/Default_Avatar.jpg";
import formatText from "../../../utils/textFormater";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const { name: userName, role: userRole, avatar: userAvatar } = user || {};
  const [activeRoute, setActiveRoute] = useState("/dashboard");
  const role = "Admin"; // "Admin", "PM", "Member"

  return (
    <aside className="flex flex-col justify-between h-screen px-3 py-6 bg-charcoalGray text-softWhite w-[250px]">
      <div>
        {/* Project Info Section */}
        <div className="flex items-center gap-3 px-3 py-2 my-4 rounded-md bg-[#37474F] hover:bg-[#455A64] transition cursor-pointer">
          {/* User Info */}
          <div className="flex items-center justify-center w-10 h-10 rounded-md text-softWhite">
            {userAvatar ? (
              <img className="rounded-full" src={userAvatar} alt="" />
            ) : (
              <img className="rounded-full" src={Avatar} alt="" />
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
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-[#2979FF] hover:text-white transition ${
                activeRoute === link.route ? "bg-electricBlue text-white" : ""
              }`}
              onClick={() => setActiveRoute(link.route)}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          ))}

          <p className="text-charcoalGray bg-gray-400 h-px">.</p>

          {/* Admin/PM Extra Links */}
          {(role === "Admin" || role === "PM") &&
            adminLinks.map((link) => (
              <Link
                key={link.name}
                to={link.route}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-[#8E24AA] hover:text-white transition ${
                  activeRoute === link.route
                    ? "bg-vibrantPurple text-white"
                    : ""
                }`}
                onClick={() => setActiveRoute(link.route)}
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
          const handelClick = () => {
            if (link.name === "Logout") logout();
            else setActiveRoute(link.route);
          };
          return (
            <Link
              key={link.name}
              to={link.route}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-[#26A69A] hover:text-white transition"
              onClick={handelClick}
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
