import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editProfileSchema } from "../../validations/user.validation";
import { UserAPI } from "../../api";

const EditProfile = ({ user, setUser, setActiveModal }) => {
  const [editError, setEditError] = useState({ status: false, message: "" });
  // prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name || "",
      bio: user.bio || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      let imageUrl = user.avatar; // keep old avatar if not changed

      // If user uploaded a new image
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        // Upload to imgbb
        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );

        imageUrl = imgbbRes.data.data.url;
      }

      // Send to backend
      const res = await UserAPI.updateUserProfile({
        name: data.name,
        bio: data.bio,
        avatar: imageUrl,
      });

      //   console.log("✅ Updated user:", res.data);
      setUser(res.data.user);
      setActiveModal(false);
    } catch (error) {
      console.error("Profile update error:", error.response);
      setEditError({ status: true, message: error.response.data.message });
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-vibrantPurple mb-4">
        Edit Profile
      </h3>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Bio"
            {...register("bio")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            className="w-full file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-[#2979FF] file:text-white hover:file:bg-[#1E63D0]"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
          {editError.status && (
            <p className="text-red-500 text-sm mt-1">{editError.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={() => setActiveModal(false)}
            className="px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-1 bg-[#8E24AA] text-softWhite rounded-lg hover:bg-[#751C8E] transition"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
