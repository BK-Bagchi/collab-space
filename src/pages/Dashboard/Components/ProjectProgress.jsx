import ProgressChart from "../../../components/ProgressChart/ProgressChart";

const ProjectProgress = ({ projectList }) => {
  const title = "Project Progress";
  const colors = ["#26A69A", "#2979FF"]; //["Completed", "Remaining"];

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

  return <ProgressChart {...{ projectProgressData, title, colors }} />;
};

export default ProjectProgress;
