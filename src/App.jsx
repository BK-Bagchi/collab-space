import { Routes, Route, Outlet } from "react-router-dom";
import Footer from "./components/shared/Footer/Footer";
import Navbar from "./components/shared/Navbar/navbar";
import Sidebar from "./components/shared/Sidebar/Sidebar";
import NotFound from "./components/shared/404/404";

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
        <Route index element={<div>Home</div>} />
        <Route path="/dashboard" element={<Sidebar />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
