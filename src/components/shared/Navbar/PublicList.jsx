import React from "react";
import { Link } from "react-router-dom";

const li = () => {
  return (
    <>
      <li>
        <Link className="text-[15px]" to="/">
          Home
        </Link>
      </li>
      <li>
        <Link className="text-[15px]" to="/features">
          Features
        </Link>
      </li>
      <li>
        <Link className="text-[15px]" to="/about">
          About
        </Link>
      </li>
    </>
  );
};

export default li;
