import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const LoginProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-[#26A69A] font-semibold">
        Checking authentication...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default LoginProtectedRoute;
