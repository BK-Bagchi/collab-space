import { Suspense, useEffect, useState } from "react";
import Avatar from "../../assets/Default_Avatar.jpg";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../hooks/useAuth";
import { ProjectAPI, UserAPI } from "../../api";
import formatDate from "../../utils/dateFormater";
import EditProfile from "./editProfile";
import formatText from "../../utils/textFormater";
import Overview from "./ProfileTabs/Overview";
import Settings from "./ProfileTabs/Settings";
import Security from "./ProfileTabs/Security";
import Projects from "./ProfileTabs/Projects";
import ChangePassword from "./ChangePassword";

const SeeProfile = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeModal, setActiveModal] = useState(false); // Edit Profile
  const [passwordModal, setPasswordModal] = useState(false); // Change Password

  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [totalCreatedProjects, setTotalCreatedProjects] = useState(0);
  const [totalJoinedProjects, setTotalJoinedProjects] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await UserAPI.getLoggedInUser();
        const projectsRes = await ProjectAPI.getUserProjects();

        setUser(userRes.data);
        setProjects(projectsRes.data.projects);
        setTotalCreatedProjects(projectsRes.data.totalCreated);
        setTotalJoinedProjects(projectsRes.data.totalMember);
      } catch (error) {
        console.error("Login error:", error.response);
        alert(error.response.data.message);
      }
    };

    fetchProfile();
  }, []);
  // console.log(user, projects, totalCreatedProjects, totalJoinedProjects);

  const selectTab = (
    // prettier-ignore
    { activeTab, user, projects, totalCreatedProjects, totalJoinedProjects, logout }
  ) => {
    switch (activeTab) {
      case "overview":
        // prettier-ignore
        return <Overview user={user} totalCreatedProjects={totalCreatedProjects} totalJoinedProjects={totalJoinedProjects} />

      case "projects":
        return <Projects projects={projects} />;

      case "settings":
        return <Settings />;

      case "security":
        return <Security logout={logout} setPasswordModal={setPasswordModal} />;

      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-white">
        {" "}
        <div className="py-32 px-6 md:px-10 max-w-4xl mx-auto text-charcoalGray">
          {/* Profile Header */}
          <div className="bg-softWhite border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
            <img
              src={user.avatar || Avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-[#2979FF] object-cover"
            />
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">
                {user.email} || {formatText(user.role)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Bio: {user.bio || "I love Collab Space"}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Member since: {formatDate(user.createdAt)}
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
          {
            // prettier-ignore
            selectTab({ activeTab, user, projects, totalCreatedProjects, totalJoinedProjects ,logout })
          }

          {/* Edit Profile Modal */}
          {activeModal && (
            <Modal
              setActiveModal={setActiveModal}
              render={
                <EditProfile
                  user={user}
                  setUser={setUser}
                  setActiveModal={setActiveModal}
                />
              }
            />
          )}

          {/* Change Password Modal */}
          {passwordModal && (
            <Modal
              setActiveModal={setPasswordModal}
              render={<ChangePassword setActiveModal={setPasswordModal} />}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default SeeProfile;
