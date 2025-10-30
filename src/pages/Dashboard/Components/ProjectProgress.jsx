import { FolderKanban } from "lucide-react";
import ProgressChart from "../../../components/ProgressChart/ProgressChart";

const ProjectProgress = ({ projectList }) => {
  const title = "Project Progress";
  const colors = ["#26A69A", "#2979FF"]; //["Completed", "Remaining"];
  const icon = <FolderKanban className="w-6 h-6 text-electricBlue" />;

  const projectProgressData = projectList.map((project) => {
    const allSubtasks = project.tasks.flatMap((t) => t.subtasks);
    const total = allSubtasks.length;
    const completed = allSubtasks.filter((s) => s.done).length;
    const remaining = total - completed;

    return {
      project: project.title,
      completed,
      remaining,
    };
  });

  return projectList.length ? (
    <ProgressChart {...{ projectProgressData, title, colors, icon }} />
  ) : (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col text-center mb-8">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-4 text-left">
        <div className="p-2 rounded-lg bg-[#F3F7FF]">
          <FolderKanban className="w-6 h-6 text-electricBlue" />
        </div>
        <h3 className="text-lg font-semibold text-charcoalGray">{title}</h3>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="p-4 rounded-full bg-[#F3F7FF] mb-4">
          <FolderKanban className="w-8 h-8 text-electricBlue" />
        </div>

        <h3 className="text-sm font-medium text-gray-500 mb-2">
          No assigned projects yet!
        </h3>

        <p className="text-xs text-gray-400 max-w-sm">
          You don’t have any created or assigned projects. Create a new project
          or explore available ones to get started — tasks and progress will
          appear here.
        </p>
      </div>
    </div>
  );
};

export default ProjectProgress;
