
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Dashboard from "../pages/Dashboard";
import Employees from "../pages/Employees";
import AddEmployee from "../pages/AddEmployee";
import EditEmployee from "../pages/EditEmployee";
import EmployeeProfile from "../pages/EmployeeProfile";
import Login from "../pages/Login";
import Home from "../pages/Home";

function AppRoutes() {
    return (
        <Routes>
            {/* Public route */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/employees"
                        element={<Employees />}
                    />

                    <Route
                        path="/employees/add"
                        element={<AddEmployee />}
                    />

                    <Route
                        path="/employees/:id/edit"
                        element={<EditEmployee />}
                    />

                    <Route
                        path="/employees/:id"
                        element={<EmployeeProfile />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}

export default AppRoutes;

