import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Users, Calendar, MessageSquare } from "lucide-react";
import Modal from "../../components/Modal/Modal";
import InviteMembers from "../../components/Forms/InviteMembers";
import CreateProject from "../../components/Forms/CreateProject";

const Projects = () => {
  const projectId = useOutletContext();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);

  // Fetch projects
  useEffect(() => {
    // Replace with real API call
    const fetchProjects = async () => {
      const res = [
        {
          _id: "p1",
          title: "Team Alpha",
          description: "Marketing website redesign",
          deadline: "2025-11-10",
          members: ["dipto@example.com", "bk@example.com"],
        },
        {
          _id: "p2",
          title: "Mobile App",
          description: "Cross-platform React Native app",
          deadline: "2025-12-01",
          members: ["golu@example.com"],
        },
        {
          _id: "p3",
          title: "Mobile App",
          description: "Cross-platform React Native app",
          deadline: "2025-12-01",
          members: ["golu@example.com"],
        },
      ];
      setProjects(res);
    };
    fetchProjects();
  }, [projectId]);

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
            onClick={() => setSelectedProject(project)}
            className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <h3 className="text-lg font-semibold text-vibrantPurple">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{project.description}</p>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar size={15} />
                <span>{project.deadline}</span>
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
                  {selectedProject.members.map((m, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-electricBlue text-softWhite text-xs rounded-full"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setInviteModal(true)}
                  className="mt-4 text-sm text-electricBlue hover:underline"
                >
                  + Invite Members
                </button>
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
          render={<CreateProject setActiveModal={setCreateModal} />}
          setActiveModal={setCreateModal}
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
