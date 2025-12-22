import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Avatar from "../../assets/Default_Avatar.jpg";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../hooks/useAuth";
import { useActive } from "../../hooks/useActive";
import { useSettings } from "../../hooks/useSettings";
import { UserAPI } from "../../api";
import formatDate from "../../utils/dateFormater";
import formatText from "../../utils/textFormater";
import EditProfile from "../../components/Forms/EditProfile";
import Loading from "../../components/Loading/Loading";

const TABS = [
  { label: "overview", path: "" },
  { label: "appearance", path: "appearance" },
  { label: "notification", path: "notification" },
  { label: "chat", path: "chat" },
  { label: "security", path: "security" },
  { label: "danger zone", path: "danger-zone" },
];

const SeeProfile = () => {
  const { setUser: setContextUser } = useAuth();
  const { activeUsers } = useActive();
  const { activeStatus } = useSettings();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);

  let activeTab = location.pathname.split("/").pop();
  if (activeTab === "profile") activeTab = "overview";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await UserAPI.getLoggedInUser();
        setUser(res.data);
        setContextUser(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setContextUser]);

  return (
    <div className="bg-white dark:bg-darkSlate h-full overflow-y-auto scrollbar-hide">
      <Loading loading={loading}>
        {" "}
        <div className="py-32 px-6 md:px-10 max-w-4xl mx-auto text-charcoalGray">
          {/* Profile Header */}
          <div className="bg-softWhite dark:bg-gray-900 border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar || Avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-2 border-electricBlue dark:border-deepCharcoal object-cover"
              />
              {/* Active Indicator */}
              {activeStatus && activeUsers.includes(user?._id) && (
                <span
                  className="absolute right-0.5 bottom-3 w-4 h-4 rounded-full 
      bg-electricBlue border border-white shadow-sm"
                  title="Active Now"
                />
              )}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold dark:text-softWhite">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-200">
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
              onClick={() => setEditModal(true)}
              className="bg-electricBlue hover:bg-[#1E63D0] text-white px-4 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>

          {/* TABS */}
          <div className="flex justify-between gap-3 mt-8 border-b pb-2">
            {TABS.map((tab) => (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`capitalize px-4 py-2 rounded-t-md font-medium transition ${
                  activeTab === tab.path || activeTab === tab.label
                    ? "bg-vibrantPurple text-softWhite"
                    : "text-[#455A64] dark:text-gray-400 hover:text-vibrantPurple"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT */}
          <div className="mt-6">
            <Outlet />
          </div>

          {/* MODALS */}
          {editModal && (
            <Modal
              setActiveModal={setEditModal}
              render={
                <EditProfile
                  user={user}
                  setUser={setUser}
                  setActiveModal={setEditModal}
                />
              }
            />
          )}
        </div>
      </Loading>
    </div>
  );
};

export default SeeProfile;
