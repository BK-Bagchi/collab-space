import { useEffect, useState } from "react";
import { Calendar, FileText, FolderKanban, Palette, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { projectSchema } from "../../validations/project.validation";
import { ProjectAPI, UserAPI } from "../../api";

const CreateProject = ({ setCreateModal }) => {
  const { user } = useAuth();
  const [fetchedMembers, setFetchedMembers] = useState([]);
  const [searchedMembers, setSearchedMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [creatingProjectError, setCreatingProjectError] = useState({
    status: false,
    message: "",
  });
  let debounceTimer;

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

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await UserAPI.getAllUsers();
        setFetchedMembers(res.data);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);
  // console.log(fetchedMembers);
  // console.log(selectedMembers);

  const handleMembersChange = (e) => {
    const email = e.target.value;
    if (email === "") {
      setSearchedMembers([]);
      clearTimeout(debounceTimer);
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const foundMember = fetchedMembers.find((member) =>
        member.email.toLowerCase().includes(email.toLowerCase())
      );
      // check if this member is not already selected
      if (foundMember) {
        const alreadySelected = searchedMembers.some(
          (member) => member.email === foundMember.email
        );
        if (!alreadySelected)
          setSearchedMembers((prev) => [...prev, foundMember]);
      }
    }, 500);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      createdBy: user._id,
      members: selectedMembers.map((member) => member._id),
    };
    try {
      const res = await ProjectAPI.createProject(payload);

      if (user?.role === "MEMBER")
        // migrate user role to manager unless already manager or an admin
        await UserAPI.updateUserRole(user._id, "MANAGER");

      alert(res.data.message);
      setCreateModal(false);
    } catch (error) {
      console.error("Error creating project:", error.response);
      setCreatingProjectError({
        status: true,
        message: error.response.data.message,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-vibrantPurple mb-6 heading-font">
        Create New Project
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Project Title */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("title")}
              placeholder="Enter project title"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
            />
            <FolderKanban className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <textarea
              {...register("description")}
              placeholder="Describe your project"
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
            />
            <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
          </div>

          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Color */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">
            Project Color <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-3">
            <Palette className="h-6 w-6 text-gray-600" />
            <input
              type="color"
              {...register("color")}
              className="w-16 h-10 p-1 border rounded-lg cursor-pointer"
            />
          </div>

          {errors.color && (
            <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
          )}
        </div>

        {/* Deadline */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">
            Deadline <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              {...register("deadline")}
              required
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
            />
            <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {errors.deadline && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deadline.message}
            </p>
          )}
        </div>

        {/* Members */}
        <div className="text-charcoalGray">
          <label className="block font-medium mb-1">
            Members (search by email)
            <span className="text-red-500">*</span>
          </label>

          <div className="relative">
            <input
              type="text"
              {...register("members")}
              placeholder="e.g. dipto@example.com"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
              onChange={handleMembersChange}
            />
            <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          </div>

          {/* Selected Users */}
          {selectedMembers &&
            selectedMembers.map((member) => {
              const { _id, name } = member;
              return (
                <p key={_id} className="badge bg-electricBlue border-none m-1">
                  {name}
                  <span
                    className="cursor-pointer"
                    onClick={() =>
                      setSelectedMembers(
                        selectedMembers.filter((m) => m.email !== member.email)
                      )
                    }
                  >
                    &times;
                  </span>
                </p>
              );
            })}

          {/* Dynamic Avatars */}
          <div className="flex flex-wrap gap-4 mt-3">
            {searchedMembers &&
              searchedMembers.map((member) => {
                const { _id, name, email, avatar } = member;
                const initials = email.charAt(0).toUpperCase();
                return (
                  <div
                    key={_id}
                    className="flex flex-col items-center text-center"
                    onClick={() =>
                      setSelectedMembers((prev) => [...prev, member])
                    }
                  >
                    {avatar ? (
                      <img
                        src={avatar}
                        alt={name}
                        className="w-12 h-12 rounded-full cursor-pointer shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full cursor-pointer bg-electricBlue text-softWhite flex items-center justify-center text-lg font-semibold shadow-sm">
                        {initials}
                      </div>
                    )}
                    <p className="text-xs text-gray-600 mt-1 truncate max-w-[80px]">
                      {name}
                    </p>
                  </div>
                );
              })}
          </div>

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
            onClick={() => setCreateModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#8E24AA] text-softWhite rounded-lg hover:bg-[#751C8E] transition"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>

          {creatingProjectError.status && (
            <p className="text-red-500 text-sm mt-1">
              {creatingProjectError.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
