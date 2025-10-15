import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleLogin } from "@react-oauth/google";
import { registrationSchema } from "../../validations/auth.validation";
import googleLogin from "../../utils/googleLogin";

const Register = () => {
  // prettier-ignore
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registrationSchema),
  })

  const onSubmit = (data) => {
    console.log(data);
    // TODO: Call /api/auth/signup with formData
  };

  return (
    <div className="flex items-center justify-center py-16 px-4 bg-softWhite">
      <div className="card w-full max-w-md shadow-xl p-8 rounded-2xl text-charcoalGray bg-[#FFFFFF]">
        <h2 className="text-3xl text-center mb-6 font-bold text-electricBlue logo-font">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            {...register("name")}
            placeholder="Full Name"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
            required
          />
          {/* prettier-ignore */}
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
          <input
            type="email"
            {...register("email")}
            placeholder="Email Address"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
            required
          />
          {/* prettier-ignore */}
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
            required
          />
          {/* prettier-ignore */}
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-lg border border-[#E0E0E0] bg-softWhite text-charcoalGray focus:outline-none focus:ring-2 focus:ring-[#2979FF] transition"
            required
          />
          {/* prettier-ignore */}
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
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
        <GoogleLogin
          onSuccess={googleLogin}
          onError={() => console.log("Login Failed")}
        />
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
