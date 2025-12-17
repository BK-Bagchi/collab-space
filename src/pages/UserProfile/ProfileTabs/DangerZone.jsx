import { useState } from "react";
import { toast } from "react-toastify";
import { Trash2, LogOut, ShieldAlert } from "lucide-react";
import { ActivityAPI, AuthAPI } from "../../../api";
import confirmToast from "../../../components/ConfirmToast/ConfirmToast";
import Waiting from "../../../components/Loading/Waiting";
import { useAuth } from "../../../hooks/useAuth";

const DangerZone = () => {
  const { clearSession } = useAuth();

  const [loadingClearActivity, setLoadingClearActivity] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  const handleClearActivityLog = async () => {
    const confirm = await confirmToast(
      "Are you sure you want to clear your activity log?"
    );
    if (!confirm) return;
    setLoadingClearActivity(true);

    try {
      const res = await ActivityAPI.clearActivityLog();
      toast.success(res.data.message);
    } catch (error) {
      console.error(
        "Error clearing activity log:",
        error.response.data.message
      );
    } finally {
      setLoadingClearActivity(false);
    }
  };

  const handleLogout = async () => {
    const confirm = await confirmToast(
      "Logging out from all devices will logout from the device you are currently logged in from."
    );
    if (!confirm) return;
    setLoadingLogout(true);

    try {
      const res = await AuthAPI.logoutAllDevices();
      toast.success(res.data.message);
      clearSession();
    } catch (error) {
      console.error("Error logging out from all devices:", error);
    } finally {
      setLoadingLogout(false);
    }
  };

  return (
    <div className="mt-8 space-y-5 animate-fadeIn">
      <h3 className="text-lg font-semibold text-charcoalGray flex items-center gap-2">
        <ShieldAlert className="text-red-500" size={20} />
        Danger Zone
      </h3>

      <div className="bg-softWhite p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        {/* Clear Activity Log */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 border border-electricBlue text-electricBlue font-medium rounded-lg hover:bg-electricBlue hover:text-white transition shadow-sm"
          onClick={() => handleClearActivityLog()}
        >
          <span>Clear Activity Log</span>
          {loadingClearActivity ? (
            <Waiting color="electricBlue" />
          ) : (
            <Trash2 size={18} />
          )}
        </button>

        {/* Logout from All Devices */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 border border-tealGreen text-tealGreen font-medium rounded-lg hover:bg-tealGreen hover:text-white transition shadow-sm"
          onClick={handleLogout}
        >
          <span>Logout from All Devices</span>
          {loadingLogout ? <Waiting color="tealGreen" /> : <LogOut size={18} />}
        </button>

        {/* Delete Account */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 border border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-500 hover:text-white transition shadow-sm"
          onClick={() =>
            toast.error("You're not permitted to delete your account yet")
          }
        >
          <span>Delete Account</span>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
