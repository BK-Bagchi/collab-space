import { FolderPlus } from "lucide-react";
import ProgressChart from "../../../components/ProgressChart/ProgressChart";

const TaskProgressInProject = ({ projectList, tasks }) => {
  const title = "Task progress in assigned projects";
  const colors = ["#26A69A", "#8E24AA"]; //["Completed", "Remaining"];
  const icon = <FolderPlus className="w-6 h-6 text-electricBlue" />;

  const assignedInProjects = projectList.filter((project) =>
    tasks.some((task) => task.project._id === project._id)
  );
  const projectProgressData = assignedInProjects.map((project) => {
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

  return projectProgressData.length ? (
    <ProgressChart {...{ projectProgressData, title, colors, icon }} />
  ) : (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col text-center mb-8">
      {/* Header with icon and title */}
      <div className="flex items-center gap-3 mb-4 text-left">
        <div className="p-2 rounded-lg bg-[#F3F7FF]">
          <FolderPlus className="w-6 h-6 text-electricBlue" />
        </div>
        <h3 className="text-lg font-semibold text-charcoalGray">{title}</h3>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="p-4 rounded-full bg-[#F3F7FF] mb-4">
          <FolderPlus className="w-8 h-8 text-electricBlue" />
        </div>

        <h3 className="text-sm font-medium text-gray-500 mb-2">
          No assigned task in any projects yet!
        </h3>

        <p className="text-xs text-gray-400 max-w-sm">
          You don't have any assigned task to you. Join or create a new project
          to get started — tasks and progress will show up here.
        </p>
      </div>
    </div>
  );
};

export default TaskProgressInProject;
