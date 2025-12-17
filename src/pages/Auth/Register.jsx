import { useState } from "react";
import { toast } from "react-toastify";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { registrationSchema } from "../../validations/auth.validation";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import { AuthAPI } from "../../api";
import Waiting from "../../components/Loading/Waiting";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [registerError, setRegisterError] = useState({
    status: false,
    message: "",
  });
  const navigate = useNavigate();
  const { handleGoogleLogin, error } = useGoogleAuth();

  // prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit = async (data) => {
    try {
      const res = await AuthAPI.signup(data);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterError({ status: true, message: error.response.data.message });
    }
  };

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-softWhite">
      <div className="card w-full max-w-md shadow-xl p-8 rounded-2xl text-charcoalGray bg-[#FFFFFF]">
        <h2 className="text-3xl text-center mb-6 font-bold text-electricBlue logo-font">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name */}
          <label className="text-sm font-semibold text-charcoalGray">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              {...register("name")}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite 
                       text-charcoalGray focus:outline-none focus:ring-2 focus:ring-electricBlue transition"
              required
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}

          {/* Email */}
          <label className="text-sm font-semibold text-charcoalGray">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="email"
              {...register("email")}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite 
                       text-charcoalGray focus:outline-none focus:ring-2 focus:ring-electricBlue transition"
              required
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}

          {/* Password */}
          <label className="text-sm font-semibold text-charcoalGray">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite 
                       text-charcoalGray focus:outline-none focus:ring-2 focus:ring-electricBlue transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          {/* Confirm Password */}
          <label className="text-sm font-semibold text-charcoalGray">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite 
                       text-charcoalGray focus:outline-none focus:ring-2 focus:ring-electricBlue transition"
              required
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

          {/* Server Errors */}
          {error.status && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
          {registerError.status && (
            <p className="text-red-500 text-sm mt-1">{registerError.message}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-electricBlue text-softWhite font-semibold transition"
          >
            {isSubmitting ? (
              <p className="flex gap-2 justify-center">
                <Waiting color="white" /> Registering...
              </p>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center my-6 text-[#9E9E9E]">
          <span className="border-t w-1/4"></span>
          <span className="px-2 text-sm">OR</span>
          <span className="border-t w-1/4"></span>
        </div>

        {/* Google Login */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Login Failed")}
        />

        {/* Redirect */}
        <p className="text-center mt-6 text-sm body-font text-[#455A64]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:underline text-vibrantPurple"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
