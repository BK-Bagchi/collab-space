import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) alert("Passwords do not match");
    else console.log(name, email, password);
    // TODO: Call /api/auth/signup with formData
  };

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-softWhite">
      <div className="card w-full max-w-md shadow-xl p-8 rounded-2xl text-charcoalGray bg-[#FFFFFF]">
        <h2 className="text-3xl text-center mb-6 font-bold text-electricBlue logo-font">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-[#FAFAFA] text-[#263238] focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-electricBlue text-softWhite font-semibold transition"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center justify-center my-6 text-[#9E9E9E]">
          <span className="border-t w-1/4"></span>
          <span className="px-2 text-sm">OR</span>
          <span className="border-t w-1/4"></span>
        </div>
        <button className="w-full py-2 rounded-lg flex items-center justify-center gap-2 border border-gray-400 text-charcoalGray transition">
          <img src="/google-icon.svg" alt="Google" className="w-5 h-5" />
          <span>Sign up with Google</span>
        </button>
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
