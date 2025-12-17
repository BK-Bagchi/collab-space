import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { loginSchema } from "../../validations/auth.validation";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import { AuthAPI } from "../../api";
import { useAuth } from "../../hooks/useAuth";
import { getDeviceId } from "../../utils/getDeviceId";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState({ status: false, message: "" });
  const { handleGoogleLogin, error } = useGoogleAuth();

  //prettier-ignore
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const device = {
      deviceId: getDeviceId(),
      platform: "WEB",
    };
    data.device = device;

    try {
      const res = await AuthAPI.login(data);
      const { token, user } = res.data;

      login(user, token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response);
      setLoginError({ status: true, message: error.response.data.message });
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-16 bg-softWhite">
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 bg-white text-charcoalGray">
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-4 text-electricBlue logo-font">
          Welcome Back 👋
        </h2>
        <p className="text-center mb-8 text-sm text-[#607D8B] body-font">
          Login to continue your collaboration
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-charcoalGray">
              Email Address <span className="text-red-500 text-sm">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                required
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
              bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 
              focus:ring-electricBlue transition"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-semibold text-charcoalGray">
              Password <span className="text-red-500 text-sm">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                required
                className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 
              bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 
              focus:ring-electricBlue transition"
              />

              {/* Show/Hide Password toggle */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-electricBlue transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Validation errors */}
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {(error.status || loginError.status) && (
              <p className="text-red-500 text-sm">
                {error.message || loginError.message}
              </p>
            )}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-vibrantPurple" />
              <span className="text-[#455A64]">Remember me</span>
            </label>

            <Link
              to="/forgot-password"
              className="text-vibrantPurple hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-electricBlue text-softWhite 
          font-semibold heading-font transition hover:opacity-90 shadow-md"
          >
            {isSubmitting ? "Logging in..." : "Login"}
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

        {/* Register */}
        <p className="text-center mt-6 text-sm text-[#455A64] body-font">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold hover:underline text-vibrantPurple"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
