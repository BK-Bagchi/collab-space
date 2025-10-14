import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
          />
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
        <button className="w-full py-2 rounded-lg flex items-center justify-center gap-2 border border-[#E0E0E0] text-[#263238] hover:bg-[#F5F5F5] transition">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          <span className="font-medium">Login with Google</span>
        </button>
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
}
