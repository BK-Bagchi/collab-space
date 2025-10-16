import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { loginSchema } from "../../validations/auth.validation";
import useGoogleAuth from "../../hooks/useGoogleAuth";
import { AuthAPI } from "../../api";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState({ status: false, message: "" });
  const { handleGoogleLogin, error } = useGoogleAuth();

  //prettier-ignore
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
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
      <div className="w-full max-w-md rounded-2xl shadow-xl p-8 bg-[#FFFFFF] text-charcoalGray">
        <h2 className="text-3xl font-bold text-center mb-6 text-electricBlue logo-font">
          Welcome Back 👋
        </h2>
        <p className="text-center mb-8 text-sm text-[#607D8B] body-font">
          Login to continue your collaboration
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            {...register("email")}
            required
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
          />
          {/* prettier-ignore */}
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            required
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
          />
          {/* shows form validation errors */}
          {/* prettier-ignore */}
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          {/* shows login errors */}
          {/* prettier-ignore */}
          {error.status && (
            <p className="text-red-500 text-sm mt-1">{error.message}</p>
          )}
          {/* prettier-ignore */}
          {loginError.status && (
            <p className="text-red-500 text-sm mt-1">{loginError.message}</p>
          )}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#8E24AA] cursor-pointer"
              />
              <span className="text-[#455A64]">Remember me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-vibrantPurple hover:underline transition"
            >
              Forgot password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-electricBlue text-softWhite heading-font font-semibold transition hover:opacity-90"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center my-6 text-[#9E9E9E]">
          <span className="border-t w-1/4"></span>
          <span className="px-2 text-sm">OR</span>
          <span className="border-t w-1/4"></span>
        </div>
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.log("Login Failed")}
        />
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
