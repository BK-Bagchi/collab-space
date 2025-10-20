import { Calendar, Users } from "lucide-react";
import formatDate from "../../../utils/dateFormater";

const JoinedProjects = ({ joinedProjects }) => {
  return (
    //  Joined Projects
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold text-electricBlue mb-4 flex items-center gap-2">
        <span className="w-2 h-2 bg-electricBlue rounded-full"></span>
        Joined Projects
      </h2>

      {joinedProjects.length > 0 ? (
        <div className="space-y-4">
          {joinedProjects.map((project) => (
            <div
              key={project._id}
              className="p-4 rounded-xl border border-gray-200 bg-softWhite hover:shadow-md transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base font-semibold text-vibrantPurple">
                  {project.title}
                </h3>
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
        <p className="text-sm text-gray-500 italic">No joined projects yet.</p>
      )}
    </div>
  );
};

export default JoinedProjects;
