import { useEffect, useState } from "react";
import { Users, UserCheck, UserX, CalendarDays } from "lucide-react";

import { getEmployeeStats } from "../services/employeeService";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEmployeeStats();

      setStats(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load employee statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

        <p className="text-gray-500 mt-1">Overview of employee information</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Employees */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.totalEmployees}
              </h2>
            </div>

            <div className="p-3 bg-blue-100 rounded-lg">
              <Users size={24} className="text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Employees */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Employees</p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.activeEmployees}
              </h2>
            </div>

            <div className="p-3 bg-green-100 rounded-lg">
              <UserCheck size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Inactive Employees */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Inactive Employees</p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.inactiveEmployees}
              </h2>
            </div>

            <div className="p-3 bg-red-100 rounded-lg">
              <UserX size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        {/* Employees On Leave */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On Leave</p>

              <h2 className="text-3xl font-bold text-gray-800 mt-2">
                {stats.onLeaveEmployees}
              </h2>
            </div>

            <div className="p-3 bg-yellow-100 rounded-lg">
              <CalendarDays size={24} className="text-yellow-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;