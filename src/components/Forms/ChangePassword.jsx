import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../../validations/user.validation";
import { UserAPI } from "../../api";

const ChangePassword = ({ setActiveModal }) => {
  const [passwordError, setPasswordError] = useState({
    status: false,
    message: "",
  });
  //prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await UserAPI.updatePassword(data);
      const { message } = res.data;
      alert(message);
      setActiveModal(false);
    } catch (error) {
      console.error("Change password error:", error.response);
      setPasswordError({ status: true, message: error.response.data.message });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold text-vibrantPurple mb-4">
        Change Password
      </h3>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {/* Current Password */}
        <div>
          <input
            type="password"
            placeholder="Current Password"
            {...register("currentPassword")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentPassword.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <input
            type="password"
            placeholder="New Password"
            {...register("newPassword")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm New Password"
            {...register("confirmPassword")}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-softWhite focus:ring-2 focus:ring-[#2979FF] outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
          {passwordError.status && (
            <p className="text-red-500 text-sm mt-1">{passwordError.message}</p>
          )}
        </div>

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
            className="px-4 py-1 bg-[#8E24AA] text-softWhite rounded-lg hover:bg-[#751C8E] transition disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
