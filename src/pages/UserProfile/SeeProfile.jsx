import { useEffect, useState } from "react";
import Avatar from "../../assets/Default_Avatar.jpg";
import Modal from "../../components/Modal/Modal";
import { useAuth } from "../../hooks/useAuth";
import { UserAPI } from "../../api";
import formatDate from "../../utils/dateFormater";
import EditProfile from "../../components/Forms/EditProfile";
import formatText from "../../utils/textFormater";
import Overview from "./ProfileTabs/Overview";
import Security from "./ProfileTabs/Security";
import ChangePassword from "../../components/Forms/ChangePassword";
import Appearance from "./ProfileTabs/Appearance";
import Notification from "./ProfileTabs/Notification";
import Chat from "./ProfileTabs/Chat";
import DangerZone from "./ProfileTabs/DangerZone";
import Loading from "../../components/Loading/Loading";

const SeeProfile = () => {
  const { setUser: setContextUser, logout } = useAuth();
  //prettier-ignore
  const tabs = [ "overview", "appearance", "notification", "chat", "security", "danger zone" ];
  const [activeTab, setActiveTab] = useState("overview");
  const [activeModal, setActiveModal] = useState(false); // Edit Profile
  const [passwordModal, setPasswordModal] = useState(false); // Change Password

  const [user, setUser] = useState({});
  useEffect(() => {
    setContextUser(user);
  }, [user, setContextUser]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userRes = await UserAPI.getLoggedInUser();
        setUser(userRes.data);
      } catch (error) {
        console.error("Login error:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
  // console.log(user);

  const selectTab = (
    // prettier-ignore
    { activeTab, logout }
  ) => {
    switch (activeTab) {
      case "overview":
        // prettier-ignore
        return <Overview />

      case "appearance":
        return <Appearance />;

      case "notification":
        return <Notification />;

      case "chat":
        return <Chat />;

      case "security":
        return <Security logout={logout} setPasswordModal={setPasswordModal} />;

      case "danger zone":
        return <DangerZone />;

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg h-full overflow-y-auto scrollbar-hide">
      <Loading loading={loading}>
        {" "}
        <div className="py-32 px-6 md:px-10 max-w-4xl mx-auto text-charcoalGray">
          {/* Profile Header */}
          <div className="bg-softWhite border border-gray-200 shadow-sm p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6">
            <img
              src={user.avatar || Avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-electricBlue object-cover"
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
              className="bg-electricBlue hover:bg-[#1E63D0] text-white px-4 py-2 rounded-lg transition"
            >
              Edit Profile
            </button>
          </div>

          {/* Tabs */}
          <div className="flex justify-between gap-3 mt-8 border-b pb-2">
            {tabs.map((tab) => (
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
            selectTab({ activeTab, user ,logout })
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
      </Loading>
    </div>
  );
};

export default SeeProfile;
