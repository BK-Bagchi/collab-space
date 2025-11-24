import { NavLink } from "react-router-dom";

const PrivateList = () => {
  return (
    <>
      <li className="m-1">
        <NavLink to="/dashboard" className="text-[15px] cursor-pointer">
          Dashboard
        </NavLink>
      </li>
      <li className="m-1">
        <NavLink
          to="/dashboard/projects"
          className="text-[15px] cursor-pointer"
        >
          Projects
        </NavLink>
      </li>
      {/* Trigger */}
      <li className="m-1">
        <NavLink to="/users" className="text-[15px] cursor-pointer">
          Users
        </NavLink>
      </li>
      {/*<li className="hidden lg:inline">
        <label className="input input-bordered flex items-center gap-2 max-w-md shadow-md bg-[#FAFAFA] text-[#263234]">
          <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-5 w-5 opacity-70" >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="What are you searching for?"
          />
        </label>
      </li>*/}
    </>
  );
};

export default PrivateList;
