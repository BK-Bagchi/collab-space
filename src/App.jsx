import { Routes, Route, Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import Navbar from "./components/shared/Navbar/navbar";
import NotFound from "./components/shared/404/404";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import SeeProfile from "./pages/UserProfile/SeeProfile";
import Home from "./components/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/Home";
import Projects from "./pages/Dashboard/Projects";
import Tasks from "./pages/Dashboard/Tasks";
import LoginProtectedRoute from "./routes/LoginProtectedRoute";
import { AuthProvider } from "./context/authContext";
import TaskCalendar from "./pages/Dashboard/TaskCalender";
import ManageProjects from "./pages/Dashboard/ManageProjects";
import ManageProjectsTaskList from "./pages/Dashboard/ManageProjectsTaskList";
import Analytics from "./pages/Dashboard/Analytics";
import TeamActivity from "./pages/Dashboard/TeamActivity";
import ManagerProtectedRoute from "./routes/ManagerProtectedRoute";
import UserList from "./pages/UserList/UserList";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          {/* login protected routes */}
          <Route element={<LoginProtectedRoute />}>
            <Route path="profile" element={<SeeProfile />} />
            <Route path="users" element={<UserList />} />
            <Route path="user/:id" element={<SeeProfile />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="projects" element={<Projects />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="calendar" element={<TaskCalendar />} />

              {/* protected route from general members */}
              <Route element={<ManagerProtectedRoute />}>
                <Route path="manage-projects" element={<ManageProjects />} />
                {/* prettier-ignore */}
                <Route path="manage-projects/:projectId" element={<ManageProjectsTaskList />} />
                <Route path="team-activity" element={<TeamActivity />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
