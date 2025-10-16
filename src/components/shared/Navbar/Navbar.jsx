import PublicList from "./PublicList.jsx";
import projectName from "../../../utils/getProjectName.js";
import PrivateList from "./PrivateList.jsx";
import PrivateBtn from "./PrivateBtn.jsx";
import PublicBtn from "./PublicBtn.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/authContext.jsx";

const Navbar = () => {
  const { loggedIn } = useAuth();
  return (
    <div className="navbar bg-[#2979FF] text-[#FAFAFA] shadow-sm px-3">
      <div className="navbar-start">
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            {/* prettier-ignore */}
            <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"  stroke="currentColor" >
              {" "}
            {/* prettier-ignore */}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              {" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm body-font bg-[#2979FF] dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {loggedIn ? <PrivateList /> : <PublicList />}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold logo-font cursor-pointer">
          {projectName()}
        </Link>
      </div>
      <div className="navbar-center">
        <div className="hidden md:flex w-full">
          <ul
            tabIndex="1"
            className="menu menu-sm body-font w-full rounded-box z-1 p-2 flex flex-row items-center gap-4"
          >
            {loggedIn ? <PrivateList /> : <PublicList />}
          </ul>
        </div>
      </div>
      <div className="navbar-end body-font pl-2">
        {loggedIn ? <PrivateBtn /> : <PublicBtn />}
      </div>
    </div>
  );
};

export default Navbar;
