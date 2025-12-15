import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "../../validations/user.validation";
import { UserAPI } from "../../api";
import Waiting from "../Loading/Waiting";

const ChangePassword = ({ setActiveModal }) => {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
      toast.success(res.data.message);
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
        <label className="text-sm font-semibold text-charcoalGray">
          Current Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type={showCurrent ? "text" : "password"}
            placeholder="Current Password"
            {...register("currentPassword")}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-softWhite 
                   focus:ring-2 focus:ring-electricBlue outline-none"
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.currentPassword.message}
          </p>
        )}

        {/* New Password */}
        <label className="text-sm font-semibold text-charcoalGray">
          New Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            {...register("newPassword")}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-softWhite 
                   focus:ring-2 focus:ring-electricBlue outline-none"
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
          >
            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.newPassword.message}
          </p>
        )}

        {/* Confirm Password */}
        <label className="text-sm font-semibold text-charcoalGray">
          Confirm New Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm New Password"
            {...register("confirmPassword")}
            className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 bg-softWhite 
                   focus:ring-2 focus:ring-electricBlue outline-none"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
        {passwordError.status && (
          <p className="text-red-500 text-sm mt-1">{passwordError.message}</p>
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
            className="px-4 py-1 bg-vibrantPurple text-softWhite rounded-lg hover:bg-[#751C8E] 
                   transition disabled:opacity-60"
          >
            {isSubmitting ? <Waiting color="#FFFF" /> : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
