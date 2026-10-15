import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <Navbar />

      <main className="ml-64 pt-16 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;