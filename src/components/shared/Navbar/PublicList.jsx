import React from "react";
import { Link } from "react-router-dom";
import PublicBtn from "./PublicBtn";

const li = () => {
  return (
    <>
      <li className="mt-2">
        <Link className="text-[15px]" to="/">
          Home
        </Link>
      </li>
      <li className="mt-2">
        <Link className="text-[15px]" to="/features">
          Features
        </Link>
      </li>
      <li className="mt-2">
        <Link className="text-[15px]" to="/about">
          About
        </Link>
      </li>
    </>
  );
};

export default li;
