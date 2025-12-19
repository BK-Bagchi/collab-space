import { HatGlasses, KeyRound, LogOut } from "lucide-react";

const Security = ({ logout, setPasswordModal }) => {
  return (
    <div className="mt-8 animate-fadeIn space-y-5">
      <h3 className="text-lg font-semibold text-charcoalGray dark:text-softWhite flex items-center gap-2">
        <HatGlasses className="text-vibrantPurple" size={20} />
        Security
      </h3>

      <div className="bg-softWhite dark:bg-gray-900 p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
        {/* Change Password */}
        <button
          onClick={() => setPasswordModal(true)}
          className="w-full flex items-center justify-between px-4 py-3 border border-electricBlue text-electricBlue font-medium rounded-lg hover:bg-electricBlue hover:text-white transition shadow-sm"
        >
          <span>Change Password</span>
          <KeyRound size={18} />
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-between px-4 py-3 border border-tealGreen text-tealGreen font-medium rounded-lg hover:bg-tealGreen hover:text-white transition shadow-sm"
        >
          <span>Logout</span>
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Security;
