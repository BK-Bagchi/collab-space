import { Link } from "react-router-dom";
import PublicList from "./PublicList.jsx";
import projectName from "../../../utils/getProjectName.js";
import PrivateList from "./PrivateList.jsx";
import PrivateBtn from "./PrivateBtn.jsx";
import PublicBtn from "./PublicBtn.jsx";
import { useAuth } from "../../../hooks/useAuth.js";
import useUserActive from "../../../hooks/useUserActive.js";

const Navbar = () => {
  const { loggedIn } = useAuth();
  useUserActive();

  return (
    <div className="navbar bg-electricBlue text-softWhite shadow-sm px-3">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
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
            className="menu menu-sm body-font bg-electricBlue dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {loggedIn ? (
              <>
                <PrivateList />
                <PublicList />
              </>
            ) : (
              <PublicList />
            )}
          </ul>
        </div>
        <Link to="/" className="text-2xl font-bold logo-font cursor-pointer">
          {projectName()}
        </Link>
      </div>
      <div className="navbar-center">
        <div className="hidden lg:flex w-full">
          <ul
            tabIndex="1"
            className="menu menu-sm body-font w-full rounded-box z-1 p-2 flex flex-row items-center gap-4"
          >
            {loggedIn ? (
              <>
                <PrivateList />
                <PublicList />
              </>
            ) : (
              <PublicList />
            )}
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
