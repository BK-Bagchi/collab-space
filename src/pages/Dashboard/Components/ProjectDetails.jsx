import { useEffect, useState } from "react";
import { toast } from "react-toastify";
//prettier-ignore
import { ClipboardList, Edit3, UserPlus, CalendarDays, User, Flag, Loader, CheckCircle2, AlertCircle, CircleCheck, Trash2 } from "lucide-react";
import { TaskAPI } from "../../../api";
import formatText from "../../../utils/textFormater";
import formatDate from "../../../utils/dateFormater";
import Modal from "../../../components/Modal/Modal";
import UpdateTask from "../../../components/Forms/UpdateTask";
import Loading from "../../../components/Loading/Loading";

const ProjectDetails = ({
  selectedProject,
  setInviteModal,
  setUpdateModal,
  setSelectedProject,
  setAssignedTaskModal,
}) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await TaskAPI.getProjectTasks(selectedProject._id);
        setTasks(res.data.tasks);
      } catch (error) {
        console.warn("Error fetching tasks:", error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [selectedProject]);

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await TaskAPI.deleteTask(taskId);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting task:", error.response.data.message);
    } finally {
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="bg-softWhite dark:bg-darkSlate w-full max-w-2xl rounded-xl shadow-lg p-6 relative max-h-screen overflow-y-auto scrollbar-hide">
      <h3 className="text-xl font-bold text-vibrantPurple">
        {selectedProject.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-400 mt-1">
        {selectedProject.description}
      </p>

      <div className="mt-4">
        <h4 className="font-semibold text-charcoalGray dark:text-softWhite">
          Members
        </h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedProject.members.map((member) => {
            const { _id, name } = member;
            return (
              <span
                key={_id}
                className="px-3 py-1 bg-electricBlue text-softWhite text-xs rounded-full"
              >
                {name}
              </span>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setUpdateModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-electricBlue hover:bg-[#E3F2FD] rounded-md transition"
          >
            <Edit3 size={16} />
            <span>Update Project</span>
          </button>

          <button
            onClick={() => setInviteModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-electricBlue hover:bg-[#E3F2FD] rounded-md transition"
          >
            <UserPlus size={16} />
            <span>Invite Members</span>
          </button>

          <button
            onClick={() => setAssignedTaskModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-electricBlue hover:bg-[#E3F2FD] rounded-md transition"
          >
            <ClipboardList size={16} />
            <span>Assign Tasks</span>
          </button>
        </div>
      </div>

      {/* Tasks */}
      <div className="mt-6 bg-white dark:bg-gray-600 rounded-xl shadow-md border border-gray-100 p-5">
        <h4 className="font-semibold text-charcoalGray dark:text-gray-300 flex items-center gap-2 mb-4">
          Tasks
        </h4>

        <Loading loading={loading}>
          {tasks && tasks.length > 0 ? (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className={`bg-[#F9FAFB] dark:bg-gray-900 p-4 rounded-lg shadow-sm border ${
                    new Date(task.dueDate) < new Date()
                      ? "border-red-600"
                      : "border-gray-100"
                  }  hover:shadow-md transition`}
                >
                  <div className="flex justify-between">
                    <h5 className="font-medium text-lg text-charcoalGray dark:text-softWhite">
                      {task.title}
                    </h5>
                    <div className="flex items-center mb-4">
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setUpdateTaskModal(true);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-electricBlue hover:bg-[#E3F2FD] dark:hover:bg-gray-600 rounded-md transition"
                      >
                        {/* update task */}
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm text-electricBlue hover:bg-[#E3F2FD] dark:hover:bg-gray-600 rounded-md transition"
                      >
                        {/* delete task */}
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      {task.assignees.length > 0 && (
                        <User className="w-4 h-4 text-electricBlue" />
                      )}
                      {task.assignees.map((a, i) => (
                        <span key={i} className="dark:text-gray-300">
                          {a.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      {new Date(task.dueDate) < new Date() ? (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-600" />{" "}
                          <span className="text-red-600">
                            {formatDate(task.dueDate)}
                          </span>
                        </>
                      ) : (
                        <>
                          <CalendarDays className="w-4 h-4 text-vibrantPurple" />{" "}
                          <span className="dark:text-gray-300">
                            {formatDate(task.dueDate)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      {task.status && task.status === "TODO" && (
                        <CircleCheck className="w-4 h-4 text-electricBlue" />
                      )}
                      {task.status && task.status === "IN_PROGRESS" && (
                        <Loader className="w-4 h-4 text-electricBlue" />
                      )}
                      {task.status && task.status === "DONE" && (
                        <CheckCircle2 className="w-4 h-4 text-tealGreen" />
                      )}

                      <span className="dark:text-gray-300">
                        {formatText(task.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flag
                        className={`w-4 h-4 ${
                          task.priority === "HIGH"
                            ? "text-red-500"
                            : task.priority === "MEDIUM"
                            ? "text-yellow-500"
                            : "text-tealGreen"
                        }`}
                      />
                      <span className="font-medium dark:text-gray-300">
                        {formatText(task.priority)} Priority
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 text-gray-400">
              <p className="text-sm font-medium">No tasks yet!</p>
              <p className="text-xs mt-1">
                Tasks assigned to this project will appear here.
              </p>
            </div>
          )}
        </Loading>
      </div>

      {/* Update Task Modal */}
      {updateTaskModal && (
        <Modal
          render={
            <UpdateTask
              task={selectedTask}
              project={selectedProject}
              setUpdateTaskModal={setUpdateTaskModal}
              setSelectedProject={setSelectedProject}
            />
          }
          setActiveModal={setUpdateTaskModal}
        />
      )}
    </div>
  );
};

export default ProjectDetails;
