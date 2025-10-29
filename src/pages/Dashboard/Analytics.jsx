import React, { useEffect, useState } from "react";
import { FolderKanban } from "lucide-react";
import ProjectDetailsCard from "../../components/ProjectDetailsCard/ProjectDetailsCard";
import { ProjectAPI } from "../../api";
import { useAuth } from "../../hooks/useAuth";

const Analytics = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await ProjectAPI.getUserProjects();
        setProjects(res.data.projects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };

    fetchProjects();
  }, []);

  const createdProject = projects.filter(
    (project) => project.createdBy._id === user._id
  );

  return (
    <div className="p-6 w-full">
      {/* Header */}
      {createdProject.length > 0 && (
        <h1 className="text-2xl font-semibold text-charcoalGray mb-6">
          📊 Project Analytics
        </h1>
      )}

      {/* Project Grid */}
      {createdProject.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          <ProjectDetailsCard projects={createdProject} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
          <FolderKanban size={40} className="mb-3 text-gray-300" />
          <p className="text-sm">You have not created any projects yet.</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
