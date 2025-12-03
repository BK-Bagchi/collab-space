import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import projectName, { projectSlogan } from "../../../utils/getProjectName";
import CollabCover from "../../../assets/Collab_Space_cover_large.png";

const Banner = () => {
  const { loggedIn } = useAuth();

  return (
    <section className="flex flex-col md:flex-row items-center justify-between min-h-[50vh] px-8 md:px-16 py-20 bg-gradient-to-br from-electricBlue via-vibrantPurple to-[#26A69A] text-white shadow-lg">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight logo-font">
          {projectSlogan()} 🚀
        </h1>
        <p className="text-lg text-gray-100 body-font">
          {projectName()} is a full-stack collaboration and productivity
          platform built with the MERN stack, Socket.IO, and a fully
          customizable, modern UI. It provides project management, task
          workflow, real-time messaging, notifications, analytics, notes, and
          team activity tracking — all in one unified workspace.
        </p>

        <div className="flex gap-4">
          <Link
            to={loggedIn ? "/dashboard" : "/register"}
            className="px-6 py-3 bg-white text-electricBlue border border-amber-50 font-semibold rounded-lg hover:bg-transparent hover:text-white transition logo-font"
          >
            Get Started
          </Link>

          {!loggedIn && (
            <Link
              to="/login"
              className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-electricBlue transition logo-font"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <img
          src={CollabCover}
          alt="Collaboration"
          className="w-[85%] max-w-md drop-shadow-xl rounded-2xl"
        />
      </div>
    </section>
  );
};

export default Banner;
