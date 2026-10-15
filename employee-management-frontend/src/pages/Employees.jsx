
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Eye,
    Pencil,
    Trash2,
    Search,
    X,
    ArrowUp,
    ArrowDown,
} from "lucide-react";

import {
    searchAndFilterEmployees,
    deleteEmployee,
} from "../services/employeeService";

function Employees() {
    const navigate = useNavigate();

    // Employee data
    const [employees, setEmployees] = useState([]);

    // Loading and error
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Search and filters
    const [keyword, setKeyword] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [status, setStatus] = useState("");

    // Pagination
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [size] = useState(5);

    // Sorting
    const [sortBy, setSortBy] = useState("id");
    const [direction, setDirection] = useState("asc");

    // Fetch employees
    const fetchEmployees = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await searchAndFilterEmployees({
                keyword,
                department,
                designation,
                status,
                page,
                size,
                sortBy,
                direction,
            });

            setEmployees(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);
        } catch (error) {
            console.error("Failed to fetch employees:", error);
            setError("Failed to load employees.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch whenever search/filter/page/sort changes
    useEffect(() => {
        fetchEmployees();
    }, [
        keyword,
        department,
        designation,
        status,
        page,
        sortBy,
        direction,
    ]);

    // Sorting
    const handleSort = (field) => {
        if (sortBy === field) {
            setDirection(
                direction === "asc" ? "desc" : "asc"
            );
        } else {
            setSortBy(field);
            setDirection("asc");
        }

        setPage(0);
    };

    // Clear all filters
    const clearFilters = () => {
        setKeyword("");
        setDepartment("");
        setDesignation("");
        setStatus("");
        setPage(0);
    };

    // Delete employee
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteEmployee(id);

            // Refresh current page
            fetchEmployees();
        } catch (error) {
            console.error("Failed to delete employee:", error);
            alert("Failed to delete employee.");
        }
    };

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

    // Sort icon
    const getSortIcon = (field) => {
        if (sortBy !== field) {
            return null;
        }

        if (direction === "asc") {
            return <ArrowUp size={14} />;
        }

        return <ArrowDown size={14} />;
    };

    // Loading
    if (loading && employees.length === 0) {
        return (
            <div className="p-6">
                <p className="text-gray-600">
                    Loading employees...
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">

            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        Employees
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage and view all employees
                    </p>
                </div>

            </div>

            {/* Search and Filters */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                    {/* Search */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search
                        </label>

                        <div className="relative">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={keyword}
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                    setPage(0);
                                }}
                                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Department */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                        </label>

                        <select
                            value={department}
                            onChange={(e) => {
                                setDepartment(e.target.value);
                                setPage(0);
                            }}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                All Departments
                            </option>

                            <option value="IT">IT</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Marketing">
                                Marketing
                            </option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(0);
                            }}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                All Status
                            </option>

                            <option value="ACTIVE">
                                Active
                            </option>

                            <option value="INACTIVE">
                                Inactive
                            </option>

                            <option value="ON_LEAVE">
                                On Leave
                            </option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div className="lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Designation
                        </label>

                        <input
                            type="text"
                            placeholder="Search by designation..."
                            value={designation}
                            onChange={(e) => {
                                setDesignation(e.target.value);
                                setPage(0);
                            }}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Clear Filters */}
                    <div className="flex items-end">
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition"
                        >
                            <X size={17} />
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                    {error}
                </div>
            )}

            {/* Employee Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

                <div className="overflow-x-auto">
                    <table className="w-full">

                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>

                                {/* ID */}
                                <th
                                    onClick={() => handleSort("id")}
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        ID
                                        {getSortIcon("id")}
                                    </div>
                                </th>

                                {/* First Name */}
                                <th
                                    onClick={() =>
                                        handleSort("firstName")
                                    }
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        Name
                                        {getSortIcon("firstName")}
                                    </div>
                                </th>

                                {/* Email */}
                                <th
                                    onClick={() =>
                                        handleSort("email")
                                    }
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        Email
                                        {getSortIcon("email")}
                                    </div>
                                </th>

                                {/* Department */}
                                <th
                                    onClick={() =>
                                        handleSort("department")
                                    }
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        Department
                                        {getSortIcon("department")}
                                    </div>
                                </th>

                                {/* Designation */}
                                <th
                                    onClick={() =>
                                        handleSort("designation")
                                    }
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        Designation
                                        {getSortIcon("designation")}
                                    </div>
                                </th>

                                {/* Salary */}
                                <th
                                    onClick={() =>
                                        handleSort("salary")
                                    }
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        Salary
                                        {getSortIcon("salary")}
                                    </div>
                                </th>

                                {/* Status */}
                                <th
                                    onClick={() =>
                                        handleSort("status")
                                    }
                                    className="px-6 py-4 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                                >
                                    <div className="flex items-center gap-1">
                                        Status
                                        {getSortIcon("status")}
                                    </div>
                                </th>

                                {/* Actions */}
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">

                            {employees.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="8"
                                        className="px-6 py-10 text-center text-gray-500"
                                    >
                                        No employees found.
                                    </td>
                                </tr>
                            ) : (
                                employees.map((employee) => (
                                    <tr
                                        key={employee.id}
                                        className="hover:bg-gray-50"
                                    >

                                        {/* ID */}
                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {employee.id}
                                        </td>

                                        {/* Name */}
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                            {employee.firstName}{" "}
                                            {employee.lastName}
                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {employee.email}
                                        </td>

                                        {/* Department */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {employee.department}
                                        </td>

                                        {/* Designation */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {employee.designation}
                                        </td>

                                        {/* Salary */}
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            ₹{employee.salary}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(
                                                    employee.status
                                                )}`}
                                            >
                                                {employee.status}
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">

                                                {/* View */}
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/employees/${employee.id}`
                                                        )
                                                    }
                                                    title="View Employee"
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                {/* Edit */}
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/employees/${employee.id}/edit`
                                                        )
                                                    }
                                                    title="Edit Employee"
                                                    className="text-gray-600 hover:text-gray-800"
                                                >
                                                    <Pencil size={18} />
                                                </button>

                                                {/* Delete */}
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            employee.id
                                                        )
                                                    }
                                                    title="Delete Employee"
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalElements > 0 && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-gray-200">

                        {/* Result Count */}
                        <p className="text-sm text-gray-600">
                            Showing{" "}
                            {page * size + 1} -{" "}
                            {Math.min(
                                (page + 1) * size,
                                totalElements
                            )}{" "}
                            of {totalElements} employees
                        </p>

                        {/* Pagination Controls */}
                        <div className="flex items-center gap-2">

                            {/* Previous */}
                            <button
                                onClick={() =>
                                    setPage(page - 1)
                                }
                                disabled={page === 0}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>

                            {/* Page Numbers */}
                            {Array.from(
                                { length: totalPages },
                                (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() =>
                                            setPage(index)
                                        }
                                        className={`px-3 py-2 rounded-md text-sm ${
                                            page === index
                                                ? "bg-blue-600 text-white"
                                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                )
                            )}

                            {/* Next */}
                            <button
                                onClick={() =>
                                    setPage(page + 1)
                                }
                                disabled={
                                    page >= totalPages - 1
                                }
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>

                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}

export default Employees;

