import React, { useState } from "react";
import Modal from "../Modal/Modal";

const InviteMembers = ({ setInviteModal, projectId }) => {
  const [emails, setEmails] = useState("");

  const handleInvite = async () => {
    console.log("Invite sent to:", emails, "for project:", projectId);
    setInviteModal(false);
  };

  return (
    <div className="bg-softWhite rounded-xl shadow-lg p-6 w-full max-w-md relative">
      <h3 className="text-lg font-semibold text-vibrantPurple mb-4">
        Invite Members
      </h3>
      <input
        type="text"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        placeholder="Enter emails, comma separated"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2979FF]"
      />
      <button
        onClick={handleInvite}
        className="w-full mt-4 py-2 bg-[#2979FF] text-softWhite rounded-lg hover:bg-[#1E63D0]"
      >
        Send Invites
      </button>
    </div>
  );
};

export default InviteMembers;
