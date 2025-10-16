import { useState } from "react";
import selectTab from "./SeeProfileTab";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../hooks/useAuth";

export default function SeeProfile() {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeModal, setActiveModal] = useState(false);

  const user = {
    name: "Dipto Bagchi",
    email: "dipto@example.com",
    role: "Project Manager",
    bio: "Building ideas, managing teams, and creating collaboration tools.",
    createdAt: "2025-01-10",
    avatar: "/default-avatar.png",
    stats: { created: 4, joined: 7 },
  };

  const projects = [
    { _id: "1", name: "Collab Space", type: "Collaboration App" },
    { _id: "2", name: "TaskFlow", type: "Project Management" },
  ];

  return (
    <div className="bg-white">
      {" "}
      <div className="py-32 px-6 md:px-10 max-w-4xl mx-auto text-charcoalGray">
        {/* Profile Header */}
        <div className="bg-softWhite border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-[#2979FF] object-cover"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">
              Member since: {user.createdAt}
            </p>
          </div>
          <button
            onClick={() => setActiveModal(true)}
            className="bg-[#2979FF] hover:bg-[#1E63D0] text-white px-4 py-2 rounded-lg transition"
          >
            Edit Profile
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mt-8 border-b pb-2">
          {["overview", "projects", "settings", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize px-4 py-2 rounded-t-md font-medium transition-all ${
                activeTab === tab
                  ? "bg-vibrantPurple text-softWhite"
                  : "text-[#455A64] hover:text-[#8E24AA]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dynamic Tab Content */}
        {selectTab({ activeTab, user, projects, logout })}

        {/* Edit Profile Modal */}
        {activeModal && (
          <Modal
            setActiveModal={setActiveModal}
            render={
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold text-vibrantPurple mb-4">
                  Edit Profile
                </h3>
                <form className="space-y-3">
                  <input
                    type="text"
                    defaultValue={user.name}
                    placeholder="Full Name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
                  />
                  <textarea
                    defaultValue={user.bio}
                    placeholder="Bio"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
                  />
                  <input
                    type="file"
                    className="w-full file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-[#2979FF] file:text-white hover:file:bg-[#1E63D0]"
                  />
                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setActiveModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#8E24AA] text-softWhite rounded-lg hover:bg-[#751C8E] transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
}
