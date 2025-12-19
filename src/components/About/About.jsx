import { Link } from "react-router-dom";
import { Puzzle, Zap, BarChart3 } from "lucide-react";
import CtaSection from "../Home/Components/CtaSection";
import TechShowcase from "../Home/Components/TechShowcase";
import CollabCover from "../../assets/Collab_Space_cover_large.png";
import Features from "../Home/Components/Features";
import LivePreview from "../Home/Components/LivePreview";
import { useAuth } from "../../hooks/useAuth";
import projectName, { projectSlogan } from "../../utils/getProjectName";

const About = () => {
  const { loggedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-softWhite text-charcoalGray">
      {/* HERO SECTION */}
      <section className="px-8 md:px-16 py-20 bg-linear-to-br  from-electricBlue/20 via-vibrantPurple/20 to-tealGreen/20 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold logo-font leading-tight">
              About <span className="text-electricBlue">{projectName()}</span>
            </h1>

            <h2 className="text-lg md:text-2xl font-semibold logo-font text-charcoalGray">
              {projectSlogan()} 🚀
            </h2>

            <p className="text-gray-700 text-lg body-font">
              A modern workspace where teams collaborate, manage tasks, exchange
              files, chat in real-time, and organize projects—all from one
              unified platform.
            </p>

            <p className="text-gray-700 body-font">
              {projectName()} is a full-stack collaboration and productivity
              platform built with the MERN stack, Socket.IO, and a fully
              customizable modern UI. It provides project management, task
              workflow, real-time messaging, analytics, notes, and team activity
              tracking — all in one unified workspace.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to={loggedIn ? "/dashboard" : "/register"}
                className="px-6 py-3 bg-white text-electricBlue border border-amber-50 font-semibold rounded-lg hover:bg-transparent hover:text-gray-600 transition logo-font"
              >
                Get Started
              </Link>

              {!loggedIn && (
                <Link
                  to="/login"
                  className="px-6 py-3 border border-white font-semibold text-gray-600 rounded-lg hover:bg-white hover:text-electricBlue transition logo-font"
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src={CollabCover}
              alt="Collaboration Illustration"
              className="w-[85%] max-w-md drop-shadow-xl rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* WHY WE BUILT IT */}
      <section className="px-8 md:px-20 py-20 bg-softWhite dark:bg-darkSlate">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 heading-font text-charcoalGray dark:text-softWhite">
            Why We Built It
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mx-auto max-w-3xl body-font">
            Teams constantly juggle different tools—tasks, chat, files,
            scheduling, analytics. Collab Space merges all of these into a
            single seamless and powerful workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mt-16">
          {[
            {
              title: "Fragmented Tools",
              desc: "Stop switching between apps. Everything you need lives here.",
              icon: <Puzzle size={40} className="text-electricBlue" />,
              text: "text-electricBlue",
              color: "from-electricBlue/20 to-electricBlue/5",
            },
            {
              title: "Slow Collaboration",
              desc: "Real-time updates ensure instant communication and sync.",
              icon: <Zap size={40} className="text-vibrantPurple" />,
              text: "text-vibrantPurple",
              color: "from-vibrantPurple/20 to-vibrantPurple/5",
            },
            {
              title: "Lack of Visibility",
              desc: "Get project clarity using analytics, dashboards, and timelines.",
              icon: <BarChart3 size={40} className="text-tealGreen" />,
              text: "text-tealGreen",
              color: "from-tealGreen/20 to-tealGreen/5",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-10 rounded-3xl shadow-md border border-gray-100
        bg-linear-to-br ${item.color}
        hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center`}
            >
              <div className="flex justify-center mb-5">{item.icon}</div>
              <h3 className={`text-lg font-semibold ${item.text} heading-font`}>
                {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 body-font">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <TechShowcase />

      {/* FEATURES */}
      <Features />

      {/* LIVE PREVIEW */}
      <LivePreview />

      {/* CTA */}
      <CtaSection />
    </div>
  );
};

export default About;
