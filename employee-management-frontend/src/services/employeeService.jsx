
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
});

// Automatically attach JWT to protected API requests
API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getAllEmployees = () =>
    API.get("/employees");

export const getEmployeeById = (id) =>
    API.get(`/employees/${id}`);

export const updateEmployee = (id, employeeData) =>
    API.put(`/employees/${id}`, employeeData);

export const deleteEmployee = (id) =>
    API.delete(`/employees/${id}`);

export const searchEmployees = (keyword) =>
    API.get("/employees/search", {
        params: { keyword }
    });

export const filterByDepartment = (department) =>
    API.get("/employees/filter/department", {
        params: { department }
    });

export const filterByDesignation = (designation) =>
    API.get("/employees/filter/designation", {
        params: { designation }
    });

export const filterByStatus = (status) =>
    API.get("/employees/filter/status", {
        params: { status }
    });

export const getEmployeesWithPagination = (
    page,
    size,
    sortBy,
    direction
) =>
    API.get("/employees/page", {
        params: {
            page,
            size,
            sort: `${sortBy},${direction}`
        }
    });

export const getEmployeeStats = () =>
    API.get("/employees/stats");

export const searchAndFilterEmployees = ({
    keyword,
    department,
    designation,
    status,
    page,
    size,
    sortBy,
    direction,
}) => {

    return API.get("/employees/filter", {
        params: {
            keyword: keyword || undefined,
            department: department || undefined,
            designation: designation || undefined,
            status: status || undefined,
            page,
            size,
            sort: `${sortBy},${direction}`,
        },
    });
};

export default API;

