import { useState } from "react";
import { toast } from "react-toastify";
//prettier-ignore
import { UserPlus, Calendar, Tag, CheckCircle2, Trash2, PlusCircle, Edit3, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignTaskSchema } from "../../validations/task.validation";
import { formatISODate } from "../../utils/dateFormater";
import Avatar from "../../assets/Default_Avatar.jpg";
import { TaskAPI } from "../../api";

const UpdateTask = ({
  task,
  project,
  setUpdateTaskModal,
  setSelectedProject,
}) => {
  const [selectedMembers, setSelectedMembers] = useState(task.assignees);
  const [selectedMembersError, setSelectedMembersError] = useState({
    status: false,
    message: "",
  });
  // prettier-ignore
  const { register, handleSubmit, control,  formState: { errors, isSubmitting }, } = useForm({
    resolver: zodResolver(assignTaskSchema),
    defaultValues: {
      title: task.title,
      status: task.status,
      dueDate: formatISODate(task.dueDate),
      priority: task.priority,
      subtasks: task.subtasks.map((s) => ({ title: s.title })),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const toggleMember = (member) => {
    setSelectedMembersError({ status: false, message: "" });
    setSelectedMembers((prev) =>
      prev.some((m) => m._id === member._id)
        ? prev.filter((m) => m._id !== member._id)
        : [...prev, member]
    );
  };

  const onSubmit = async (data) => {
    if (selectedMembers.length === 0) {
      setSelectedMembersError({
        status: true,
        message: "Please select at least one member.",
      });
      return;
    }
    // console.log(selectedMembers);
    const taskData = {
      title: data.title,
      status: data.status,
      project: project._id,
      assignees: selectedMembers.map((member) => member._id),
      dueDate: data.dueDate,
      priority: data.priority,
      subtasks: data.subtasks.map((s) => ({
        title: s.title,
      })),
    };
    // console.log(taskData);

    try {
      const res = await TaskAPI.updateTask(task._id, taskData);
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error updating task:", error.response);
    } finally {
      setUpdateTaskModal(false);
      setSelectedProject(null);
    }
  };

  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative max-h-screen overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <UserPlus className="text-electricBlue" size={20} />
        <h2 className="text-lg font-semibold text-charcoalGray">
          Update Task — <span>{project.title}</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Task Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Task Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("title")}
              placeholder="Enter task title..."
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electricBlue"
            />
            <Edit3 className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Task Status */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Task Status <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("status")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electricBlue"
            >
              <option value="" className="hidden">
                Select status
              </option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Completed</option>
            </select>
            <CheckCircle2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Due Date */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Due Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              {...register("dueDate")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electricBlue"
            />
            <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          {errors.dueDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Priority <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("priority")}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electricBlue"
            >
              <option value="" className="hidden">
                Select priority
              </option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            <Tag className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          {errors.priority && (
            <p className="text-red-500 text-xs mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* Subtasks */}
        <div className="mb-5">
          <label className="block font-medium mb-2">
            Subtasks <span className="text-red-500">*</span>
          </label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  type="text"
                  {...register(`subtasks.${index}.title`)}
                  placeholder={`Subtask ${index + 1}`}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-electricBlue"
                />
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-1 text-gray-400 hover:text-red-500 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {errors.subtasks &&
            errors.subtasks.map(
              (err, index) =>
                err?.title && (
                  <p key={index} className="text-red-500 text-xs mt-1">
                    {err.title.message}
                  </p>
                )
            )}
          <button
            type="button"
            onClick={() => append({ title: "" })}
            className="flex items-center gap-1 mt-2 text-sm text-electricBlue hover:underline"
          >
            <PlusCircle size={14} /> Add Subtask
          </button>
        </div>

        {/* Assigned Members Preview */}
        {selectedMembers.length > 0 && (
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {selectedMembers.map((m) => (
              <div key={m._id} className="relative">
                <img
                  src={m.avatar || Avatar}
                  alt={m.name}
                  className="w-8 h-8 rounded-full border-2 border-electricBlue shadow-sm"
                  title={m.name}
                />
                <button
                  type="button"
                  onClick={() =>
                    setSelectedMembers((prev) =>
                      prev.filter((mem) => mem._id !== m._id)
                    )
                  }
                  className="absolute -top-1.5 -right-1.5 bg-white border border-gray-300 rounded-full p-[2px] hover:bg-red-100 hover:border-red-400 transition"
                  title="Remove member"
                >
                  <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Member List */}
        <div>
          {selectedMembersError.status && (
            <p className="text-red-500 text-xs mt-1">
              {selectedMembersError.message}
            </p>
          )}
          <label className="block font-medium mb-1">
            Members <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {project.members.length > 0 ? (
              project.members.map((member) => {
                const isSelected = selectedMembers.some(
                  (m) => m._id === member._id
                );
                return (
                  <div
                    key={member._id}
                    onClick={() => toggleMember(member)}
                    className={`cursor-pointer flex flex-col items-center transition-all duration-200 ${
                      isSelected ? "scale-105" : "hover:scale-105"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={member.avatar || Avatar}
                        alt={member.name}
                        className={`w-12 h-12 rounded-full border-2 ${
                          isSelected
                            ? "border-electricBlue"
                            : "border-transparent"
                        }`}
                      />
                      {isSelected && (
                        <div className="absolute bottom-0 right-0 bg-electricBlue text-white rounded-full p-[2px]">
                          <CheckCircle2 size={12} />
                        </div>
                      )}
                    </div>
                    <span className="text-xs mt-1 text-gray-600">
                      {member.name}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-sm">
                No members in this project.
              </p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => setUpdateTaskModal(false)}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm rounded-md bg-electricBlue text-white hover:bg-blue-600 transition"
          >
            {isSubmitting ? "Updating..." : "Update Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
