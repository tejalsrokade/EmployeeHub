import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";

import { getEmployeeById } from "../services/employeeService";

function EmployeeProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch employee by ID
  const fetchEmployee = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getEmployeeById(id);

      setEmployee(response.data);
    } catch (error) {
      console.error(error);

      setError("Failed to load employee.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading employee...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>

        <button
          onClick={() => navigate("/employees")}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={18} />
          Back to Employees
        </button>
      </div>
    );
  }

  if (!employee) {
    return null;
  }

  // Status badge
  const getStatusClass = (status) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-700";

      case "INACTIVE":
        return "bg-red-100 text-red-700";

      case "ON_LEAVE":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6">
      {/* Header */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => navigate("/employees")}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-3"
          >
            <ArrowLeft size={18} />
            Back to Employees
          </button>

          <h1 className="text-3xl font-bold text-gray-800">Employee Profile</h1>

          <p className="text-gray-500 mt-1">View employee details</p>
        </div>

        {/* Edit Button */}

        <button
          onClick={() => navigate(`/employees/${employee.id}/edit`)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Pencil size={18} />
          Edit Employee
        </button>
      </div>

      {/* Employee Information */}

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Employee Name Header */}

        <div className="bg-gray-50 border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-800">
            {employee.firstName} {employee.lastName}
          </h2>

          <p className="text-gray-500 mt-1">Employee ID: {employee.id}</p>
        </div>

        {/* Details */}

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* First Name */}

            <div>
              <p className="text-sm text-gray-500">First Name</p>

              <p className="mt-1 text-gray-800 font-medium">
                {employee.firstName}
              </p>
            </div>

            {/* Last Name */}

            <div>
              <p className="text-sm text-gray-500">Last Name</p>

              <p className="mt-1 text-gray-800 font-medium">
                {employee.lastName}
              </p>
            </div>

            {/* Email */}

            <div>
              <p className="text-sm text-gray-500">Email</p>

              <p className="mt-1 text-gray-800 font-medium">{employee.email}</p>
            </div>

            {/* Phone */}

            <div>
              <p className="text-sm text-gray-500">Phone</p>

              <p className="mt-1 text-gray-800 font-medium">{employee.phone}</p>
            </div>

            {/* Department */}

            <div>
              <p className="text-sm text-gray-500">Department</p>

              <p className="mt-1 text-gray-800 font-medium">
                {employee.department}
              </p>
            </div>

            {/* Designation */}

            <div>
              <p className="text-sm text-gray-500">Designation</p>

              <p className="mt-1 text-gray-800 font-medium">
                {employee.designation}
              </p>
            </div>

            {/* Salary */}

            <div>
              <p className="text-sm text-gray-500">Salary</p>

              <p className="mt-1 text-gray-800 font-medium">
                ₹{employee.salary}
              </p>
            </div>

            {/* Joining Date */}

            <div>
              <p className="text-sm text-gray-500">Joining Date</p>

              <p className="mt-1 text-gray-800 font-medium">
                {employee.joiningDate}
              </p>
            </div>

            {/* Status */}

            <div>
              <p className="text-sm text-gray-500">Status</p>

              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                  employee.status
                )}`}
              >
                {employee.status}
              </span>
            </div>

            {/* Created At */}

            <div>
              <p className="text-sm text-gray-500">Created At</p>

              <p className="mt-1 text-gray-800 font-medium">
                {employee.createdAt
                  ? new Date(employee.createdAt).toLocaleString()
                  : "-"}
              </p>
            </div>

            {/* Updated At */}

            <div>
              <p className="text-sm text-gray-500">Updated At</p>

              <p className="mt-1 text-gray-800 font-medium">
                {employee.updatedAt
                  ? new Date(employee.updatedAt).toLocaleString()
                  : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;