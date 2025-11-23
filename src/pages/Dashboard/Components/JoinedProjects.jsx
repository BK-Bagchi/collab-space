import { Calendar, CornerDownRight, Users } from "lucide-react";
import formatDate from "../../../utils/dateFormater";
import Avatar from "../../../assets/Default_Avatar.jpg";

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
              className="p-4 rounded-xl border border-gray-200 bg-softWhite hover:shadow-md transition"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {/* Project Title */}
                  <h3 className="text-base font-semibold text-vibrantPurple">
                    {project.title}
                  </h3>
                  {/* Color Dot */}
                  <span
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: project.color || "#2979FF" }}
                  ></span>
                </div>
              </div>

              {/* PROJECT META */}
              <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                {/* Deadline */}
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-electricBlue" />
                  <span>{formatDate(project.deadline)}</span>
                </div>

                {/* Members */}
                <div className="flex items-center gap-1">
                  <Users size={14} className="text-tealGreen" />
                  <span>{project.members.length} members</span>

                  {/* Member Avatars */}
                  <div className="flex -space-x-2 ml-2">
                    {project.members && project.members.length > 0 ? (
                      project.members
                        .slice(0, 3)
                        .map((member) => (
                          <img
                            key={member._id}
                            src={member.avatar || Avatar}
                            alt={member.name}
                            title={member.name}
                            className="w-6 h-6 rounded-full border-2 border-white shadow-sm hover:scale-110 hover:z-10 transition-transform duration-200"
                          />
                        ))
                    ) : (
                      <span className="text-gray-400 text-[10px]">
                        No members
                      </span>
                    )}

                    {/* + More indicator */}
                    {project.members?.length > 3 && (
                      <span className="w-6 h-6 flex items-center justify-center text-[10px] font-medium text-gray-700 bg-gray-200 rounded-full border-2 border-white shadow-sm">
                        +{project.members.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* ✅ COLLAPSIBLE TASKS SECTION */}
              <div className="mt-3 border-t border-gray-200 pt-2">
                <button className="flex items-center gap-2 text-sm text-gray-700 font-medium hover:text-electricBlue transition">
                  <CornerDownRight size={16} />
                  {project.tasks.length} Assigned Task(s)
                </button>
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
