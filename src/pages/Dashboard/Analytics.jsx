import React, { useEffect, useState } from "react";
import { FolderKanban } from "lucide-react";
import ProjectDetailsCard from "../../components/ProjectDetailsCard/ProjectDetailsCard";
import { ProjectAPI } from "../../api";
import { useAuth } from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";

const Analytics = () => {
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

  const createdProject = projects.filter(
    (project) => project.createdBy._id === user._id
  );

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-charcoalGray mb-6">
        📊 Project Analytics
      </h1>

      {/* Project Grid */}
      <Loading loading={loading}>
        {createdProject.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            <ProjectDetailsCard projects={createdProject} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
            <FolderKanban size={40} className="mb-3 text-gray-300" />
            <p className="text-sm font-medium mb-2">No projects found</p>
            <p className="text-xs text-gray-400">
              Once you create a project, you’ll see their activities here.
            </p>
          </div>
        )}
      </Loading>
    </div>
  );
};

export default Analytics;
