import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/employeeService";

function AddEmployee() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
        designation: "",
        salary: "",
        joiningDate: "",
        status: "ACTIVE",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            await API.post("/employees", {
                ...formData,
                salary: Number(formData.salary),
            });

            navigate("/employees");
        } catch (error) {
            console.error(error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else {
                setError("Failed to add employee.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Add Employee
                </h1>

                <p className="text-gray-500 mt-1">
                    Add a new employee to the system
                </p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6 max-w-4xl">

                {error && (
                    <div className="mb-5 rounded-md bg-red-50 border border-red-200 p-3 text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>

                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Department
                            </label>

                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Designation */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Designation
                            </label>

                            <input
                                type="text"
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Salary
                            </label>

                            <input
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Joining Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Joining Date
                            </label>

                            <input
                                type="date"
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="ACTIVE">Active</option>
                                <option value="INACTIVE">Inactive</option>
                                <option value="ON_LEAVE">On Leave</option>
                            </select>
                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-7">

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Adding..." : "Add Employee"}
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate("/employees")}
                            className="border border-gray-300 px-5 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}

export default AddEmployee;