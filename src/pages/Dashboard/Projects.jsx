import React, { useEffect, useState } from "react";
import { FolderOpen, Plus } from "lucide-react";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
import InviteMembers from "../../components/Forms/InviteMembers";
import CreateProject from "../../components/Forms/CreateProject";
import { ProjectAPI } from "../../api";
import UpdateProject from "../../components/Forms/UpdateProject";
import { useAuth } from "../../hooks/useAuth";
import CreatedProjects from "./Components/CreatedProjects";
import JoinedProjects from "./Components/JoinedProjects";
import ProjectDetails from "./Components/ProjectDetails";
import AssignTasks from "../../components/Forms/AssignTasks";
import Loading from "../../components/Loading/Loading";
import confirmToast from "../../components/ConfirmToast/ConfirmToast";

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [assignedTaskModal, setAssignedTaskModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectAPI.getUserProjects();
        const { projects } = res.data;
        setProjects(projects);
      } catch (error) {
        console.warn("Error fetching projects:", error.response?.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [assignedTaskModal, createModal, inviteModal, updateModal]);
  // console.log(projects);
  // console.log(selectedProject);

  const createdProjects = projects.filter(
    (project) => project.createdBy._id === user._id
  );

  const joinedProjects = projects.filter(
    (project) => project.createdBy._id !== user._id
  );

  const handleDeleteProject = async (projectId) => {
    //prettier-ignore
    const confirmed = await confirmToast("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
      const res = await ProjectAPI.deleteProject(projectId);
      toast.success(res.data.message);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error.response.data.message);
    }
  };

  return (
    <div className="space-y-6 dark:bg-darkSlate rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FolderOpen size={26} className="text-vibrantPurple" />
          <h2 className="text-2xl font-bold text-charcoalGray dark:text-softWhite">
            Projects
          </h2>
        </div>

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
        <Loading loading={loading}>
          <CreatedProjects
            createdProjects={createdProjects}
            setSelectedProject={setSelectedProject}
            handleDeleteProject={handleDeleteProject}
          />
        </Loading>

        {/* Joined Projects */}
        <Loading loading={loading}>
          <JoinedProjects joinedProjects={joinedProjects} />
        </Loading>
      </div>

      {/* Project Details (when selected) */}
      {selectedProject && (
        <Modal
          render={
            <ProjectDetails
              selectedProject={selectedProject}
              setInviteModal={setInviteModal}
              setUpdateModal={setUpdateModal}
              setSelectedProject={setSelectedProject}
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
              project={selectedProject}
              setInviteModal={setInviteModal}
              setSelectedProject={setSelectedProject}
            />
          }
          setActiveModal={setInviteModal}
        />
      )}
      {assignedTaskModal && (
        <Modal
          render={
            <AssignTasks
              project={selectedProject}
              setAssignedTaskModal={setAssignedTaskModal}
              setSelectedProject={setSelectedProject}
            />
          }
          setActiveModal={setAssignedTaskModal}
        />
      )}
    </div>
  );
};

export default Projects;
