import { Link } from "react-router-dom";
import { Users, MessageSquare, FolderKanban } from "lucide-react";
import projectName, { projectSlogan } from "../../utils/getProjectName";
import CollabCover from "../../assets/Collab_Space_cover_large.png";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { loggedIn } = useAuth();
  return (
    <div className="min-h-screen flex flex-col bg-softWhite text-charcoalGray">
      {/* ===== HERO SECTION ===== */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-gradient-to-br from-[#2979FF] via-[#8E24AA] to-[#26A69A] text-white shadow-lg">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight logo-font">
            {projectSlogan()} 🚀
          </h1>
          <p className="text-lg text-gray-100 body-font">
            {projectName()} is where teams, creators, and innovators work
            together effortlessly. Manage projects, chat in real time, and share
            files — all in one place.
          </p>
          <div className="flex gap-4 body-font">
            <Link
              to={loggedIn ? "/dashboard" : "/register"}
              className="px-6 py-3 bg-white text-electricBlue font-semibold rounded-lg hover:bg-[#E3F2FD] transition"
            >
              Get Started
            </Link>
            {!loggedIn && (
              <Link
                to="/login"
                className="px-6 py-3 border border-white font-semibold rounded-lg hover:bg-white hover:text-[#263238] transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={CollabCover}
            alt="Collaboration Illustration"
            className="w-[85%] max-w-md drop-shadow-xl rounded-2xl"
          />
        </div>
      </section>

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-20 px-8 md:px-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-charcoalGray mb-10 heading-font">
          Collaborate Smarter, Together 🤝
        </h2>
        <div className="grid md:grid-cols-3 gap-8 body-font">
          {/* Feature 1 */}
          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-lg transition bg-[#E3F2FD]">
            <Users className="mx-auto text-electricBlue" size={40} />
            <h3 className="text-xl font-semibold mt-4">Team Collaboration</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Bring your team together in a shared workspace — connect, discuss,
              and stay aligned.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-lg transition bg-[#F3E5F5]">
            <MessageSquare className="mx-auto text-vibrantPurple" size={40} />
            <h3 className="text-xl font-semibold mt-4">Real-time Chat</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Exchange ideas instantly through real-time chat and group
              messaging.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 border rounded-2xl shadow-sm hover:shadow-lg transition bg-[#E0F2F1]">
            <FolderKanban className="mx-auto text-tealGreen" size={40} />
            <h3 className="text-xl font-semibold mt-4">Project Management</h3>
            <p className="text-gray-600 mt-2 text-sm">
              Organize projects, assign tasks, and track progress visually with
              Kanban-style boards.
            </p>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="bg-charcoalGray text-white text-center py-20 px-8 md:px-16 body-font">
        <h2 className="text-3xl font-bold mb-6 heading-font">
          Empower Your Team with {projectName()} 💡
        </h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Whether you’re managing a startup, a student project, or a remote team
          — {projectName()} keeps everyone connected and productive.
        </p>
        <Link
          to={loggedIn ? "/dashboard" : "/register"}
          className="px-8 py-3 bg-[#2979FF] font-semibold rounded-lg hover:bg-[#1E63D0] transition"
        >
          Start Free Today
        </Link>
      </section>
      <p className="h-px">.</p>
    </div>
  );
};

export default Home;
