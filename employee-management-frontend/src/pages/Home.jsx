
import {
    Users,
    UserPlus,
    BarChart3,
    Search,
    ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Hero Section */}
            <section className="px-8 py-16 lg:px-12">
                <div className="max-w-6xl mx-auto">

                    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">

                            {/* Left Content */}
                            <div className="p-8 lg:p-12 flex flex-col justify-center">

                                <p className="text-blue-600 font-semibold mb-3">
                                    EMPLOYEE MANAGEMENT SYSTEM
                                </p>

                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                                    Manage your workforce
                                    <span className="text-blue-600">
                                        {" "}with ease.
                                    </span>
                                </h1>

                                <p className="text-gray-500 text-lg mt-5 leading-relaxed max-w-xl">
                                    EmployeeHub helps you manage employee
                                    information, track employee status,
                                    organize departments, and keep your
                                    workforce data in one place.
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-4 mt-8">

                                    <button
                                        onClick={() => navigate("/dashboard")}
                                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                                    >
                                        Go to Dashboard
                                        <ArrowRight size={18} />
                                    </button>

                                    <button
                                        onClick={() => navigate("/employees")}
                                        className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-5 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
                                    >
                                        View Employees
                                    </button>

                                </div>
                            </div>

                            {/* Right Visual */}
                            <div className="bg-blue-50 p-8 lg:p-12 flex items-center justify-center">

                                <div className="w-full max-w-md">

                                    {/* Main Card */}
                                    <div className="bg-white rounded-xl border border-blue-100 shadow-sm p-6">

                                        <div className="flex items-center justify-between mb-6">
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Employee Overview
                                                </p>

                                                <p className="text-3xl font-bold text-gray-800 mt-1">
                                                    Manage
                                                </p>
                                            </div>

                                            <div className="p-3 bg-blue-100 rounded-lg">
                                                <Users
                                                    size={28}
                                                    className="text-blue-600"
                                                />
                                            </div>
                                        </div>

                                        {/* Small Stats */}
                                        <div className="grid grid-cols-2 gap-4">

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <Users
                                                    size={20}
                                                    className="text-blue-600"
                                                />

                                                <p className="text-sm text-gray-500 mt-3">
                                                    Employees
                                                </p>

                                                <p className="font-semibold text-gray-800">
                                                    Organized
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <BarChart3
                                                    size={20}
                                                    className="text-green-600"
                                                />

                                                <p className="text-sm text-gray-500 mt-3">
                                                    Analytics
                                                </p>

                                                <p className="font-semibold text-gray-800">
                                                    At a glance
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <Search
                                                    size={20}
                                                    className="text-purple-600"
                                                />

                                                <p className="text-sm text-gray-500 mt-3">
                                                    Search
                                                </p>

                                                <p className="font-semibold text-gray-800">
                                                    Find quickly
                                                </p>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4">
                                                <UserPlus
                                                    size={20}
                                                    className="text-orange-600"
                                                />

                                                <p className="text-sm text-gray-500 mt-3">
                                                    Employees
                                                </p>

                                                <p className="font-semibold text-gray-800">
                                                    Add easily
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </section>


            {/* Features Section */}
            <section className="px-8 pb-16 lg:px-12">

                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-10">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Everything you need to manage employees
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Simple tools for everyday employee management.
                        </p>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Feature 1 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">

                            <div className="w-11 h-11 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Users
                                    size={22}
                                    className="text-blue-600"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 mt-5">
                                Employee Management
                            </h3>

                            <p className="text-gray-500 mt-2 leading-relaxed">
                                Add, update, view, and manage employee
                                information from one centralized system.
                            </p>

                        </div>


                        {/* Feature 2 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">

                            <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center">
                                <BarChart3
                                    size={22}
                                    className="text-green-600"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 mt-5">
                                Dashboard & Analytics
                            </h3>

                            <p className="text-gray-500 mt-2 leading-relaxed">
                                Get a quick overview of employee statistics
                                and workforce status through the dashboard.
                            </p>

                        </div>


                        {/* Feature 3 */}
                        <div className="bg-white border border-gray-200 rounded-xl p-6">

                            <div className="w-11 h-11 bg-purple-100 rounded-lg flex items-center justify-center">
                                <Search
                                    size={22}
                                    className="text-purple-600"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 mt-5">
                                Search & Filter
                            </h3>

                            <p className="text-gray-500 mt-2 leading-relaxed">
                                Quickly find employees using search,
                                department, designation, and status filters.
                            </p>

                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Home;

