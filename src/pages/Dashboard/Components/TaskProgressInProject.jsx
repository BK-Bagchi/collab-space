import ProgressChart from "../../../components/ProgressChart/ProgressChart";

const TaskProgressInProject = ({ projectList, tasks }) => {
  // Prepare chart data
  const assignedInProjects = projectList.filter((project) =>
    tasks.some((task) => task.project._id === project._id)
  );
  const projectProgressData = assignedInProjects.map((project) => {
    const allSubtasks = project.tasks.flatMap((t) => t.subtasks);
    const total = allSubtasks.length || 1; // prevent division by 0
    const completed = allSubtasks.filter((s) => s.done).length;
    const remaining = total - completed;

    return {
      project: project.title,
      completed,
      remaining,
    };
  });

  return <ProgressChart {...{ projectProgressData }} />;
};

export default TaskProgressInProject;
