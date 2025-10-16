import React from "react";

const Security = ({ logout }) => {
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
};

export default Security;
