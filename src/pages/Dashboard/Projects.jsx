import React, { useEffect, useState } from "react";
// prettier-ignore
import { Plus, Users, Calendar, MessageSquare, Edit3, UserPlus, Trash2} from "lucide-react";
import Modal from "../../components/Modal/Modal";
import InviteMembers from "../../components/Forms/InviteMembers";
import CreateProject from "../../components/Forms/CreateProject";
import { ProjectAPI } from "../../api";
import UpdateProject from "../../components/Forms/UpdateProject";
import { useAuth } from "../../hooks/useAuth";
import CreatedProjects from "./Components/CreatedProjects";
import JoinedProjects from "./Components/JoinedProjects";
import ProjectDetails from "./Components/ProjectDetails";
import AssignedTasks from "./Components/AssignedTasks";

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [assignedTaskModal, setAssignedTaskModal] = useState(false);

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
  // console.log(selectedProject);

  const createdProjects = projects.filter(
    (project) => project.createdBy._id === user._id
  );

  const joinedProjects = projects.filter(
    (project) => project.createdBy._id !== user._id
  );

  const handleAssign = (data) => {
    console.log("Assigned Task:", data);
    // call API here — TaskAPI.createTask(data)
  };
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
        {user?.role !== "MEMBER" && (
          <button
            onClick={() => setCreateModal(true)}
            className="flex items-center gap-2 bg-vibrantPurple text-softWhite px-4 py-2 rounded-lg hover:bg-[#751C8E] transition"
          >
            <Plus size={18} />
            New Project
          </button>
        )}
      </div>

      {/* Projects Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Created Projects */}
        <CreatedProjects
          createdProjects={createdProjects}
          setSelectedProject={setSelectedProject}
          handleDeleteProject={handleDeleteProject}
        />

        {/* Joined Projects */}
        <JoinedProjects joinedProjects={joinedProjects} />
      </div>

      {/* Project Details (when selected) */}
      {selectedProject && (
        <Modal
          render={
            <ProjectDetails
              selectedProject={selectedProject}
              setInviteModal={setInviteModal}
              setUpdateModal={setUpdateModal}
              setAssignedTaskModal={setAssignedTaskModal}
            />
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
      {assignedTaskModal && (
        <Modal
          render={
            <AssignedTasks
              project={selectedProject}
              setAssignedTaskModal={setAssignedTaskModal}
              onAssign={handleAssign}
            />
          }
          setActiveModal={setAssignedTaskModal}
        />
      )}
    </div>
  );
};

export default Projects;
