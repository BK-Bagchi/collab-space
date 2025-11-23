import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import projectName from "../../../utils/getProjectName";

const CtaSection = () => {
  const { loggedIn } = useAuth();

  return (
    <section className="text-center py-20 px-8 md:px-16 bg-gradient-to-br from-[#2979FF]/20 via-[#8E24AA]/20 to-[#26A69A]/20">
      <h2 className="text-3xl font-bold mb-6 logo-font">
        Empower Your Team with {projectName()} 💡
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-8 body-font">
        Manage projects, communicate, track tasks, share files, and get
        real-time updates — all in one place.
      </p>

      <Link
        to={loggedIn ? "/dashboard" : "/register"}
        className="px-8 py-3 bg-[#2979FF] font-semibold rounded-lg hover:bg-[#1E63D0] transition text-white logo-font"
      >
        Start Free Today
      </Link>
    </section>
  );
};

export default CtaSection;
