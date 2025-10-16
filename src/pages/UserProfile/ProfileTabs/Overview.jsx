import React from "react";

const Overview = ({ user, totalCreatedProjects, totalJoinedProjects }) => {
  return (
    <div className="mt-6 space-y-6 animate-fadeIn">
      <h3 className="text-lg font-semibold text-charcoalGray mb-2">About</h3>
      <p className="text-sm text-[#455A64] leading-relaxed">{user.bio}</p>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-softWhite border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Projects Created</p>
          <p className="text-2xl font-semibold text-electricBlue">
            {totalCreatedProjects}
          </p>
        </div>
        <div className="rounded-xl bg-softWhite border border-gray-200 p-4 shadow-sm">
          <p className="text-sm text-gray-500">Projects Joined</p>
          <p className="text-2xl font-semibold text-vibrantPurple">
            {totalJoinedProjects}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
