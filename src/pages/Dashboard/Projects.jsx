import React, { useEffect, useState } from "react";
// prettier-ignore
import { Plus, Users, Calendar, MessageSquare, Edit3, UserPlus, Trash2} from "lucide-react";
import Modal from "../../components/Modal/Modal";
import InviteMembers from "../../components/Forms/InviteMembers";
import CreateProject from "../../components/Forms/CreateProject";
import { ProjectAPI } from "../../api";
import formatDate from "../../utils/dateFormater";
import UpdateProject from "../../components/Forms/UpdateProject";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectAPI.getUserProjects();
        const { projects } = res.data;
        setProjects(projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [inviteModal, createModal, updateModal]);
  // console.log(projects);

  const handleDeleteProject = async (projectId) => {
    console.log(projectId);
    try {
      const res = await ProjectAPI.deleteProject(projectId);
      alert(res.data.message);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-charcoalGray">Your Projects</h2>
        <button
          onClick={() => setCreateModal(true)}
          className="flex items-center gap-2 bg-vibrantPurple text-softWhite px-4 py-2 rounded-lg hover:bg-[#751C8E] transition"
        >
          <Plus size={18} />
          New Project
        </button>
      </div>

      {/* Project Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3
                className="text-lg font-semibold text-vibrantPurple cursor-pointer hover:underline"
                onClick={() => setSelectedProject(project)}
              >
                {project.title}
              </h3>
              <span
                className="cursor-pointer"
                onClick={() => handleDeleteProject(project._id)}
              >
                <Trash2 size={15} />
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{project.description}</p>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={15} />
                <span>{formatDate(project.deadline)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={15} />
                <span>{project.members.length} members</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details (when selected) */}
      {selectedProject && (
        <Modal
          render={
            <div className="bg-softWhite w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
              <h3 className="text-xl font-bold text-vibrantPurple">
                {selectedProject.title}
              </h3>
              <p className="text-gray-700 mt-1">
                {selectedProject.description}
              </p>

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
          }
          setActiveModal={setSelectedProject}
        />
      )}

      {/* Modals */}
      {createModal && (
        <Modal
          render={<CreateProject setCreateModal={setCreateModal} />}
          setActiveModal={setCreateModal}
        />
      )}
      {updateModal && (
        <Modal
          render={
            <UpdateProject
              project={selectedProject}
              setUpdateModal={setUpdateModal}
              setSelectedProject={setSelectedProject}
            />
          }
          setActiveModal={setUpdateModal}
        />
      )}
      {inviteModal && (
        <Modal
          render={
            <InviteMembers
              setInviteModal={setInviteModal}
              projectId={selectedProject?._id}
            />
          }
          setActiveModal={setInviteModal}
        />
      )}
    </div>
  );
};

export default Projects;
