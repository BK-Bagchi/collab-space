import { Trash2, LogOut, ShieldAlert } from "lucide-react";

const DangerZone = () => {
  return (
    <div className="mt-8 space-y-5 animate-fadeIn">
      <h3 className="text-lg font-semibold text-charcoalGray flex items-center gap-2">
        <ShieldAlert className="text-red-500" size={20} />
        Danger Zone
      </h3>

      <div className="bg-softWhite p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        {/* Clear Activity Log */}
        <button className="w-full flex items-center justify-between px-4 py-3 border border-electricBlue text-electricBlue font-medium rounded-lg hover:bg-electricBlue hover:text-white transition shadow-sm">
          <span>Clear Activity Log</span>
          <Trash2 size={18} />
        </button>

        {/* Logout from All Devices */}
        <button className="w-full flex items-center justify-between px-4 py-3 border border-tealGreen text-[#26A69A] font-medium rounded-lg hover:bg-[#26A69A] hover:text-white transition shadow-sm">
          <span>Logout from All Devices</span>
          <LogOut size={18} />
        </button>

        {/* Delete Account */}
        <button className="w-full flex items-center justify-between px-4 py-3 border border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-500 hover:text-white transition shadow-sm">
          <span>Delete Account</span>
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
