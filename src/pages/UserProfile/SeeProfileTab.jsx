import { Link } from "react-router-dom";

const selectTab = ({ activeTab, user, projects, logout }) => {
  switch (activeTab) {
    case "overview":
      return (
        <div className="mt-6 space-y-6 animate-fadeIn">
          <h3 className="text-lg font-semibold text-charcoalGray mb-2">
            About
          </h3>
          <p className="text-sm text-[#455A64] leading-relaxed">{user.bio}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-softWhite border border-gray-200 p-4 shadow-sm">
              <p className="text-sm text-gray-500">Projects Created</p>
              <p className="text-2xl font-semibold text-electricBlue">
                {user.stats.created}
              </p>
            </div>
            <div className="rounded-xl bg-softWhite border border-gray-200 p-4 shadow-sm">
              <p className="text-sm text-gray-500">Projects Joined</p>
              <p className="text-2xl font-semibold text-vibrantPurple">
                {user.stats.joined}
              </p>
            </div>
          </div>
        </div>
      );

    case "projects":
      return (
        <div className="mt-6 grid gap-4 animate-fadeIn">
          {projects.map((p) => (
            <div
              key={p._id}
              className="bg-softWhite border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <h3 className="font-medium text-charcoalGray">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.type}</p>
              </div>
              <Link
                to={`/projects/${p._id}`}
                className="bg-[#2979FF] hover:bg-[#1E63D0] text-white px-4 py-1.5 rounded-lg text-sm transition"
              >
                View
              </Link>
            </div>
          ))}
        </div>
      );

    case "settings":
      return (
        <div className="mt-6 space-y-4 animate-fadeIn">
          <h3 className="text-lg font-semibold text-charcoalGray">
            App Settings
          </h3>
          <div className="flex items-center justify-between bg-softWhite border p-3 rounded-lg">
            <span>Dark Mode</span>
            <input type="checkbox" className="w-5 h-5 accent-[#2979FF]" />
          </div>
          <div className="flex items-center justify-between bg-softWhite border p-3 rounded-lg">
            <span>Notifications</span>
            <input type="checkbox" className="w-5 h-5 accent-[#26A69A]" />
          </div>
        </div>
      );

    case "security":
      return (
        <div className="mt-6 space-y-4 animate-fadeIn">
          <h3 className="text-lg font-semibold text-charcoalGray">Security</h3>
          <button className="w-full border border-[#2979FF] text-[#2979FF] py-2 rounded-lg hover:bg-[#2979FF] hover:text-white transition">
            Change Password
          </button>
          <button
            className="w-full border border-[#26A69A] text-[#26A69A] py-2 rounded-lg hover:bg-[#26A69A] hover:text-white transition"
            onClick={logout}
          >
            Logout
          </button>
          <button className="w-full border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white transition">
            Delete Account
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default selectTab;
