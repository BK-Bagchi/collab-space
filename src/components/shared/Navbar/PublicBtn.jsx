import React from "react";
import { Link } from "react-router-dom";

const PublicBtn = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="btn btn-outline btn-md px-5 text-softWhite bg-softWhit hover:shadow-sm hover:bg-[#2979FF]">
        <Link to="/login">Login</Link>
      </button>
      <button className="btn btn-primary btn-md px-5 text-softWhite bg-vibrantPurple">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
};

export default PublicBtn;
