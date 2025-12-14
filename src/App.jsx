import { Routes, Route } from "react-router-dom";
import Layout from "./components/shared/Layout/Layout";
import NotFound from "./components/shared/404/404";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import SeeProfile from "./pages/UserProfile/SeeProfile";
import Home from "./components/Home/Home";
import Features from "./components/Features/Features";
import About from "./components/About/About";
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
import { ActiveProvider } from "./context/ActiveContext";
import Chat from "./pages/Dashboard/Chat";
import Notification from "./pages/Dashboard/Notification";
import Files from "./pages/Dashboard/Files";
import Help from "./pages/Dashboard/Help";
import { NotificationProvider } from "./context/NotificationContext";
import Notes from "./pages/Dashboard/Notes";
import { ChatNotificationProvider } from "./context/ChatNotificationContext";

function App() {
  return (
    <AuthProvider>
      <ActiveProvider>
        <NotificationProvider>
          <ChatNotificationProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/features" element={<Features />} />
                <Route path="/about" element={<About />} />

                {/* login protected routes */}
                <Route element={<LoginProtectedRoute />}>
                  <Route path="profile" element={<SeeProfile />} />
                  <Route path="users" element={<UserList />} />
                  <Route path="user/:id" element={<SeeProfile />} />
                  <Route path="dashboard" element={<Dashboard />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="notes" element={<Notes />} />
                    <Route path="tasks" element={<Tasks />} />
                    <Route path="chats" element={<Chat />} />
                    <Route path="notifications" element={<Notification />} />
                    <Route path="files" element={<Files />} />
                    <Route path="calendar" element={<TaskCalendar />} />

                    {/* protected route from general members */}
                    <Route element={<ManagerProtectedRoute />}>
                      {/* prettier-ignore */}
                      <Route path="manage-projects" element={<ManageProjects />} />
                      {/* prettier-ignore */}
                      <Route path="manage-projects/:projectId" element={<ManageProjectsTaskList />} />
                      <Route path="team-activity" element={<TeamActivity />} />
                      <Route path="analytics" element={<Analytics />} />
                    </Route>

                    <Route path="help" element={<Help />} />
                    <Route path="settings" element={<SeeProfile />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </ChatNotificationProvider>
        </NotificationProvider>
      </ActiveProvider>
    </AuthProvider>
  );
}

export default App;
