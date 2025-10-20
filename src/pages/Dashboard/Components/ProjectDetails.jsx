import { Edit3, MessageSquare, UserPlus } from "lucide-react";

const ProjectDetails = ({
  selectedProject,
  setInviteModal,
  setUpdateModal,
}) => {
  return (
    <div className="bg-softWhite w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
      <h3 className="text-xl font-bold text-vibrantPurple">
        {selectedProject.title}
      </h3>
      <p className="text-gray-700 mt-1">{selectedProject.description}</p>

      <div className="mt-4">
        <h4 className="font-semibold text-charcoalGray">Members</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedProject.members.map((member) => {
            const { _id, name } = member;
            return (
              <span
                key={_id}
                className="px-3 py-1 bg-electricBlue text-softWhite text-xs rounded-full"
              >
                {name}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setUpdateModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-electricBlue hover:bg-[#E3F2FD] rounded-md transition"
          >
            <Edit3 size={16} />
            <span>Update Project</span>
          </button>

          <button
            onClick={() => setInviteModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-electricBlue hover:bg-[#E3F2FD] rounded-md transition"
          >
            <UserPlus size={16} />
            <span>Invite Members</span>
          </button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-charcoalGray flex items-center gap-2">
          <MessageSquare size={16} /> Chat / Tasks coming soon...
        </h4>
      </div>
    </div>
  );
};

export default ProjectDetails;
