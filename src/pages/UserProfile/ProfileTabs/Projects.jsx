import { Link } from "react-router-dom";

const Projects = ({ projects }) => {
  return (
    <div className="mt-6 grid gap-4 animate-fadeIn">
      {projects.map((p) => (
        <div
          key={p._id}
          className="bg-softWhite border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-center hover:shadow-md transition"
        >
          <div>
            <h3 className="font-medium text-charcoalGray">{p.title}</h3>
            <p className="text-xs text-gray-500">{p.description}</p>
          </div>
          <Link
            to={`/dashboard/projects`}
            className="bg-[#2979FF] hover:bg-[#1E63D0] text-white px-4 py-1.5 rounded-lg text-sm transition"
          >
            View
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Projects;
