import { useState } from "react";
import { MessageSquare, UploadCloud, User } from "lucide-react";
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

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <label className="text-sm font-semibold text-charcoalGray">
          Full Name <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 bg-softWhite 
                     focus:ring-2 focus:ring-electricBlue outline-none"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Bio */}
        <label className="text-sm font-semibold text-charcoalGray">Bio</label>
        <div className="relative">
          <MessageSquare
            className="absolute left-3 top-3 text-gray-500"
            size={18}
          />
          <textarea
            placeholder="Write something about yourself…"
            {...register("bio")}
            className="w-full pl-10 pr-3 py-2 h-24 rounded-lg border border-gray-300 bg-softWhite 
                     focus:ring-2 focus:ring-electricBlue outline-none resize-none"
          />
        </div>
        {errors.bio && (
          <p className="text-red-500 text-sm">{errors.bio.message}</p>
        )}

        {/* Image Upload */}
        <label className="text-sm font-semibold text-charcoalGray">
          Profile Picture
        </label>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-electricBlue text-white rounded-lg hover:bg-[#1E63D0] transition">
            <UploadCloud size={18} />
            <span>Upload</span>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="hidden"
            />
          </label>
        </div>

        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
        {editError.status && (
          <p className="text-red-500 text-sm">{editError.message}</p>
        )}

        {/* Buttons */}
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
            className="px-4 py-1 bg-vibrantPurplerple text-softWhite rounded-lg hover:bg-[#751C8E] transition disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
