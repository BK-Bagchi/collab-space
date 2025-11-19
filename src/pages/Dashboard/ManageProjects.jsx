import React, { useEffect, useState } from "react";
import { FolderKanban } from "lucide-react";
import { ProjectAPI } from "../../api";
import Avatar from "../../assets/Default_Avatar.jpg";
import { useAuth } from "../../hooks/useAuth";
import ProjectDetailsCard from "../../components/ProjectDetailsCard/ProjectDetailsCard";
import Loading from "../../components/Loading/Loading";

const ManageUsers = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectAPI.getUserProjects();
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);
  // console.log(projects);
  // console.log(user);

  const createdProject = projects.filter(
    (project) => project.createdBy._id === user._id
  );

  return (
    <div className="bg-softWhite p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-charcoalGray flex items-center gap-2">
          <FolderKanban className="text-electricBlue" size={22} />
          All Projects
          <span className="text-sm text-gray-500 italic hover:text-[#2979FF] hover:underline cursor-pointer">
            Click to see details
          </span>
        </h2>
      </div>

      {/* Project Grid */}
      <Loading loading={loading}>
        {createdProject.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProjectDetailsCard projects={createdProject} navigateURL={true} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <FolderKanban size={40} className="mb-3 text-gray-300" />
            <p className="text-sm">You have not created any projects yet.</p>
          </div>
        )}
      </Loading>
    </div>
  );
};

export default ManageUsers;
