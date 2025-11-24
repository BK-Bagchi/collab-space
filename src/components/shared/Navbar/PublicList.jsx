import { NavLink } from "react-router-dom";

const li = () => {
  return (
    <>
      <li className="m-1">
        <NavLink className="text-[15px]" to="/">
          Home
        </NavLink>
      </li>
      <li className="m-1">
        <NavLink className="text-[15px]" to="/features">
          Features
        </NavLink>
      </li>
      <li className="m-1">
        <NavLink className="text-[15px]" to="/about">
          About
        </NavLink>
      </li>
    </>
  );
};

export default li;
