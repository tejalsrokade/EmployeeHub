import { NavLink } from "react-router-dom";
import {
  House,
  LayoutDashboard,
  Users,
  UserPlus,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: Users,
    },
    {
      name: "Add Employee",
      path: "/employees/add",
      icon: UserPlus,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
      
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">
          EmployeeHub
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

    </aside>
  );
}

export default Sidebar;
