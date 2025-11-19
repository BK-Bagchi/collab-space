import { Navigate, Outlet } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { useAuth } from "../hooks/useAuth";

const LoginProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-10">
        <FadeLoader
          color="#2979FF"
          height={16}
          loading={loading}
          margin={2}
          radius={2}
          speedMultiplier={2}
          width={5}
        />
        <p className="text-electricBlue mt-5">Checking authentication...</p>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default LoginProtectedRoute;
