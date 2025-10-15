import { Link } from "react-router-dom";
import { adminLinks, bottomLinks, commonLinks } from "./sidebarLinks";

const Sidebar = () => {
  const activeRoute = "/dashboard";
  const role = "Admin"; // "Admin", "PM", "Member"

  return (
    <aside className="flex flex-col justify-between h-screen px-3 py-6 bg-charcoalGray text-softWhite w-[250px]">
      <div>
        {/* Project Info Section */}
        <div className="flex items-center gap-3 px-3 py-2 my-4 rounded-md bg-[#37474F] hover:bg-[#455A64] transition cursor-pointer">
          {/* Project Icon */}
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-vibrantPurple text-softWhite">
            📁
          </div>

          {/* Project Details */}
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-softWhite">
              Project Name
            </span>
            <span className="text-xs text-gray-400">Project Type</span>
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
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
        </div>
      </div>

      {/* Bottom Links */}
      <div className="flex flex-col gap-2">
        {bottomLinks.map((link) => (
          <Link
            key={link.name}
            to={link.route}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-[#26A69A] hover:text-white transition"
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
