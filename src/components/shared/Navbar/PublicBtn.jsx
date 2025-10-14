import React from "react";

const PublicBtn = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="btn btn-outline btn-sm text-[#2979FF] bg-[#FAFAFA] hover:bg-[#2979FF] hover:text-white transition">
        Login
      </button>
      <button className="btn btn-primary btn-sm text-white bg-[#8E24AA] hover:bg-[#8E24AA]/90 transition">
        Signup
      </button>
    </div>
  );
};

export default PublicBtn;
