import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "../../validations/project.validation";
import { useAuth } from "../../hooks/useAuth";

const CreateProject = ({ setActiveModal }) => {
  const { user } = useAuth();

  // prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      color: "#2979FF",
      deadline: "",
      members: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    const payload = {
      ...data,
      createdBy: user._id,
    };
    console.log(payload);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-vibrantPurple mb-6 heading-font">
        Create New Project
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Project Title */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            {...register("title")}
            placeholder="Enter project title"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Describe your project"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Color */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">Project Color</label>
          <input
            type="color"
            {...register("color")}
            className="w-16 h-10 p-1 border rounded-lg cursor-pointer"
          />
          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
          )}
        </div>

        {/* Deadline */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">Deadline</label>
          <input
            type="date"
            {...register("deadline")}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.deadline && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>

        {/* Members */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">
            Members (emails, comma separated)
          </label>
          <input
            type="text"
            {...register("members")}
            placeholder="e.g. dipto@example.com, bk@example.com"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.members && (
            <p className="text-red-500 text-sm mt-1">
              {errors.members.message}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="reset"
            className="px-4 py-2 border border-gray-300 text-charcoalGray rounded-lg hover:bg-gray-100 transition"
            onClick={() => setActiveModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-vibrantPurple text-softWhite rounded-lg hover:bg-[#751C8E] transition"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
