import { Routes, Route, Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import Navbar from "./components/shared/Navbar/navbar";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import NotFound from "./components/shared/404/404";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import SeeProfile from "./pages/UserProfile/SeeProfile";
import Home from "./components/Home/Home";

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/profile" element={<SeeProfile />} />
        <Route path="/dashboard" element={<Sidebar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
