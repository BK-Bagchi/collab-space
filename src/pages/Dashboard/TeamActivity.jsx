import React, { useEffect, useState } from "react";
// prettier-ignore
import { FolderKanban } from "lucide-react";
import { ProjectAPI } from "../../api";
import ProjectProgress from "./Components/ProjectProgress";
import TaskStatus from "../../charts/TeamActivity/TaskStatus";
import TeamProgress from "../../charts/TeamActivity/TeamProgress";
import DeadlineProgress from "../../charts/TeamActivity/DeadlineProgress";
import ProjectDetailsCard from "../../components/ProjectDetailsCard/ProjectDetailsCard";
import Loading from "../../components/Loading/Loading";
import { useAuth } from "../../hooks/useAuth";

const TeamActivity = () => {
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
    <div className="p-6 space-y-8">
      <Loading loading={loading}>
        {/* 🔹 Top Section — Project Progress Summary */}
        {createdProject.length > 0 && (
          <div>
            <ProjectProgress projectList={createdProject} />
          </div>
        )}

        {/* 🔹 Second Section — Individual Project Activity */}
        <div className="space-y-8">
          {createdProject.length > 0 ? (
            createdProject.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="grid grid-rows-2 gap-4">
                    {/* 🔸 Top Left — Project Info */}
                    <ProjectDetailsCard
                      projects={[project]}
                      navigateURL={true}
                    />
                    <div className="rounded-xl bg-[#F9FAFB] flex items-center justify-center shadow-inner">
                      <DeadlineProgress project={project} />
                    </div>
                  </div>

                  {/* 🔸These 2 at right */}
                  <div className="grid grid-rows-2 gap-4">
                    <div className="rounded-xl bg-[#F9FAFB] flex items-center justify-center shadow-inner">
                      <TaskStatus project={project} />
                    </div>
                    <div className="rounded-xl bg-[#F9FAFB] flex items-center justify-center shadow-inner">
                      <TeamProgress project={project} />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-20 text-gray-400">
              <FolderKanban size={40} className="mb-3 text-gray-300" />
              <p className="text-sm font-medium mb-2">No projects found</p>
              <p className="text-xs text-gray-400">
                Once you create a project, you’ll see their activities here.
              </p>
            </div>
          )}
        </div>
      </Loading>
    </div>
  );
};

export default TeamActivity;
