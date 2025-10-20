import { Calendar, Trash2, Users } from "lucide-react";
import formatDate from "../../../utils/dateFormater";

const CreatedProjects = ({
  createdProjects,
  setSelectedProject,
  handleDeleteProject,
}) => {
  return (
    // Created Projects
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-vibrantPurple mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-vibrantPurple rounded-full"></span>
        Created Projects
      </h2>

      {createdProjects.length > 0 ? (
        <div className="space-y-4">
          {createdProjects.map((project) => (
            <div
              key={project._id}
              className="p-4 rounded-xl border border-gray-200 bg-softWhite hover:shadow-md transition cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold text-electricBlue hover:underline">
                  {project.title}
                </h3>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteProject(project._id);
                  }}
                  className="text-gray-500 hover:text-red-500 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {project.description}
              </p>

              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(project.deadline)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{project.members.length} members</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No created projects yet.</p>
      )}
    </div>
  );
};

export default CreatedProjects;
