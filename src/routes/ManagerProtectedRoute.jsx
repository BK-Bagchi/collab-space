import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ManagerProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-tealGreen font-semibold">
        Checking permissions...
      </div>
    );

  if (!user) return <Navigate to="/login" replace />;
  if (user.role == "MEMBER") return <Navigate to="/dashboard" replace />;

  return <Outlet />;
};

export default ManagerProtectedRoute;
