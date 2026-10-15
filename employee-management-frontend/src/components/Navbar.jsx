
import { Bell, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data if stored
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    // Redirect to login page
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          Employee Management System
        </h2>
      </div>

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="text-gray-600 hover:text-gray-900"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>

        
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;

