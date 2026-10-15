# EmployeeHub — Employee Management System
A full-stack Employee Management System built using React, Spring Boot, and MySQL. The application helps administrators manage employee records through a web-based dashboard.

## Features

- Admin Authentication: Admin login with password hashing and JWT-based authentication.
- Employee Management: Add, view, update, and delete employee records.
- Employee Profiles: View individual employee details.
- Search and Filtering: Search employees and filter by department, designation, and status.
- Pagination and Sorting: Navigate through employee records and sort results.
- Dashboard: View statistics and summary information.
- Input Validation: Validate request data and handle API errors.
- REST API Documentation: Explore backend endpoints through Swagger/OpenAPI.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS
- Lucide React

### Backend
- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Hibernate
- Spring Security
- JWT Authentication
- Bean Validation
- Maven
- Swagger/OpenAPI

### Database
- MySQL

## Application Architecture

React Frontend
      |
      | HTTP / REST API
      v
Spring Boot Backend
      |
      v
Service Layer
      |
      v
Repository Layer
      |
      v
MySQL Database


## Project Structure
EmployeeHub/
├── employee-management/           # Spring Boot backend
│   ├── src/
│   └── pom.xml
├── employee-management-frontend/  # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md


## Prerequisites

Install the following before running the project:

- Java JDK
- Maven
- Node.js and npm
- MySQL Server
- Git

## Getting Started

### 1. Clone the repository
git clone https://github.com/tejalsrokade/EmployeeHub.git
cd EmployeeHub

### 2. Configure the database

Create a MySQL database for the application.

Configure your database connection in the backend using environment variables or a local configuration file that is not committed to Git.

Required configuration may include:

- Database URL
- Database username
- Database password
- JWT signing secret


### 3. Run the Spring Boot backend

Open a terminal in the backend directory:

cd employee-management


Run the application using Maven:
mvn spring-boot:run


The backend typically runs at:
http://localhost:8080

### 4. Run the React frontend

Open a second terminal:
cd employee-management-frontend
npm install
npm run dev


Open the local URL displayed by Vite, typically:
http://localhost:5173

## API Documentation

If Swagger/OpenAPI is enabled, access the Swagger UI locally at:
http://localhost:8080/swagger-ui/index.html



## Security

- Admin passwords are stored using password hashing.
- JWT is used for authentication.
- Protected backend endpoints require authentication.
- Database credentials and JWT secrets should be configured outside committed source code.

## Future Improvements

- Automated backend and frontend tests.
- Role-based access control.
- Deployment to cloud hosting.
- Improved reporting and employee management features.

## Author

**TEJAL ROKADE**

Java Full-Stack Developer | React | Spring Boot | MySQL

