import { useState } from "react";
import { UserPlus, CheckCircle2, PlusCircle, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignTaskSchema } from "../../validations/task.validation";

const UpdateTask = ({
  task,
  project,
  setUpdateTaskModal,
  setSelectedProject,
}) => {
  console.log(task);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedMembersError, setSelectedMembersError] = useState({
    status: false,
    message: "",
  });
  // prettier-ignore
  const { register, handleSubmit, control,  formState: { errors, isSubmitting }, } = useForm({
    resolver: zodResolver(assignTaskSchema),
    defaultValues: {
      title: "",
      subtasks: [{ title: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "subtasks",
  });

  const toggleMember = (member) => {
    setSelectedMembers((prev) =>
      prev.some((m) => m._id === member._id)
        ? prev.filter((m) => m._id !== member._id)
        : [...prev, member]
    );
  };

  //   const handleTaskUpdate = async () => {
  //     console.log("Triggered handleTaskUpdate");
  //     try {
  //       const res = await TaskAPI.updateTask(data);
  //       alert(res.data.message);
  //     } catch (error) {
  //       console.error("Error updating task:", error.response);
  //     }
  //   };

  const onSubmit = (data) => {
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
    console.log(taskData);
    setUpdateTaskModal(false);
    setSelectedProject(null);
  };

  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <UserPlus className="text-electricBlue" size={20} />
        <h2 className="text-lg font-semibold text-charcoalGray">
          Assign Task — <span>{project.title}</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Task Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Task Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter task title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Status Section */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Task Status
          </label>
          <select
            {...register("status")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
          >
            <option value="" className="hidden">
              Select status
            </option>
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Due Date Section */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Due Date</label>
          <input
            type="date"
            {...register("dueDate")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        {/* Priority Section */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Priority</label>
          <select
            {...register("priority")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
          >
            <option value="">Select priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-xs mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* Subtasks Section */}
        <div className="mb-5">
          <label className="block text-sm text-gray-600 mb-2">Subtasks</label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <input
                  type="text"
                  {...register(`subtasks.${index}.title`)}
                  placeholder={`Subtask ${index + 1}`}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2979FF]"
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

          {/* Subtask validation errors */}
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
          <div className="flex items-center gap-2 mb-4">
            {selectedMembers.map((m) => (
              <img
                key={m._id}
                src={m.avatar}
                alt={m.name}
                className="w-7 h-7 rounded-full border-2 border-[#2979FF] shadow-sm"
                title={m.name}
              />
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
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Select Members
          </h3>
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
                        src={member.avatar}
                        alt={member.name}
                        className={`w-12 h-12 rounded-full border-2 ${
                          isSelected ? "border-[#2979FF]" : "border-transparent"
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

        {/* Footer */}
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
            {isSubmitting ? "Assigning..." : "Assign Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
