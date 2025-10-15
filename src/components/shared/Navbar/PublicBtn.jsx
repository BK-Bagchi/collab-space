import React from "react";
import { Link } from "react-router-dom";

const PublicBtn = () => {
  return (
    <div className="flex items-center gap-3">
      <button className="btn btn-outline btn-md px-5 text-softWhite bg-softWhit hover:shadow-sm hover:bg-[#2979FF]">
        <Link className="font-normal" to="/login">
          Login
        </Link>
      </button>
      <button className="btn btn-primary btn-md px-5 text-softWhite bg-vibrantPurple">
        <Link className="font-normal" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
};

export default PublicBtn;
