import React, { useEffect, useState } from "react";
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
import Projects from "./pages/Dashboard/projects";
import Tasks from "./pages/Dashboard/tasks";
import LoginProtectedRoute from "./routes/LoginProtectedRoute";
import { AuthProvider } from "./context/authContext";

function Layout({ loggedIn }) {
  return (
    <>
      <Navbar loggedIn={loggedIn} />
      <Outlet />
      <Footer />
    </>
  );
}
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) setLoggedIn(true);
    else setLoggedIn(false);
  }, []);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout loggedIn={loggedIn} />}>
          <Route index element={<Home loggedIn={loggedIn} />} />

          {/* login protected routes */}
          <Route element={<LoginProtectedRoute />}>
            <Route path="profile" element={<SeeProfile />} />
            <Route path="dashboard" element={<Dashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="projects" element={<Projects />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>

          <Route path="login" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route
            path="register"
            element={<Register setLoggedIn={setLoggedIn} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
