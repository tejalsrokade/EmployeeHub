
package com.employee.employee_management.dto;

import com.employee.employee_management.entity.EmployeeStatus;
import io.swagger.v3.oas.annotations.media.Schema;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
@Schema(description = "Response containing employee details")
public class EmployeeResponseDto {

    @Schema(
            description = "Unique identifier of the employee",
            example = "1"
    )
    private Long id;

    @Schema(
            description = "First name of the employee",
            example = "John"
    )
    private String firstName;

    @Schema(
            description = "Last name of the employee",
            example="Doe"
    )
    private String lastName;

    @Schema(
            description = "Email ID of the employee",
            example ="johndoe@gmail.com"
    )
    private String email;

    @Schema(
            description="Phone number of Employee",
            example="9187654321"
    )
    private String phone;

    @Schema(
            description="Department of the Employee",
            example="HR"
    )
    private String department;

    @Schema(
            description="Designation of the Employee",
            example="HR Executive"
    )
    private String designation;

    @Schema(
            description="Salary of the Employee",
            example="65000"
    )
    private BigDecimal salary;

    @Schema(
            description="Joining Date of the Employee",
            example = "2026-01-15"
    )
    private LocalDate joiningDate;

    @Schema(
            description = "Current employment status of the employee",
            example = "ACTIVE"
    )
    private EmployeeStatus status;

    @Schema(
            description = "Date and time when the employee record was created",
            example = "2026-10-02T10:30:00"
    )
    private LocalDateTime createdAt;

    @Schema(
            description = "Date and time when the employee record was last updated",
            example = "2026-10-02T11:45:00"
    )
    private LocalDateTime updatedAt;

    public EmployeeResponseDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public BigDecimal getSalary() {
        return salary;
    }

    public void setSalary(BigDecimal salary) {
        this.salary = salary;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public EmployeeStatus getStatus() {
        return status;
    }

    public void setStatus(EmployeeStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

