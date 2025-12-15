import { useState } from "react";
import { toast } from "react-toastify";
import { Trash2, LogOut, ShieldAlert } from "lucide-react";
import { ActivityAPI } from "../../../api";
import confirmToast from "../../../components/ConfirmToast/ConfirmToast";
import Waiting from "../../../components/Loading/Waiting";

const DangerZone = () => {
  const [loading, setLoading] = useState(false);

  const handleClearActivityLog = async () => {
    const confirm = await confirmToast(
      "Are you sure you want to clear your activity log?"
    );
    if (!confirm) return;
    setLoading(true);

    try {
      const res = await ActivityAPI.clearActivityLog();
      toast.success(res.data.message);
    } catch (error) {
      console.error(
        "Error clearing activity log:",
        error.response.data.message
      );
    } finally {
      setLoading(false);
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
          {loading ? <Waiting color="red" /> : <Trash2 size={18} />}
        </button>

        {/* Logout from All Devices */}
        <button
          className="w-full flex items-center justify-between px-4 py-3 border border-tealGreen text-tealGreen font-medium rounded-lg hover:bg-tealGreen hover:text-white transition shadow-sm"
          onClick={() =>
            toast.info("Logout from all devices feature is under development")
          }
        >
          <span>Logout from All Devices</span>
          <LogOut size={18} />
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
