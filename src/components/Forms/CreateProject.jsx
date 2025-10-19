import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";
import { projectSchema } from "../../validations/project.validation";
import { ProjectAPI, UserAPI } from "../../api";

const CreateProject = ({ setActiveModal }) => {
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
      setActiveModal(false);
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
            onChange={handleMembersChange}
          />
          {/* 👤 Selected Avatars */}
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
          {/* 👤 Dynamic Avatars */}
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
                      //include this member in list
                      setSelectedMembers((prev) => [...prev, member])
                    }
                  >
                    {
                      // Avatar
                      avatar ? (
                        <img
                          src={avatar}
                          alt={name}
                          className="w-12 h-12 rounded-full cursor-pointer shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full cursor-pointer bg-electricBlue text-softWhite flex items-center justify-center text-lg font-semibold shadow-sm">
                          {initials}
                        </div>
                      )
                    }
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
          {/* Error while creating project */}
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
