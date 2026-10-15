package com.employee.employee_management.dto;

public class EmployeeStatsDto {
    private long totalEmployees;
    private long activeEmployees;
    private long inactiveEmployees;
    private long onLeaveEmployees;

    public EmployeeStatsDto() {
    }



    public long getTotalEmployees() {
        return totalEmployees;
    }

    public void setTotalEmployees(long totalEmployees) {
        this.totalEmployees = totalEmployees;
    }

    public long getActiveEmployees() {
        return activeEmployees;
    }

    public void setActiveEmployees(long activeEmployees) {
        this.activeEmployees = activeEmployees;
    }

    public long getInactiveEmployees() {
        return inactiveEmployees;
    }

    public void setInactiveEmployees(long inactiveEmployees) {
        this.inactiveEmployees = inactiveEmployees;
    }

    public long getOnLeaveEmployees() {
        return onLeaveEmployees;
    }

    public void setOnLeaveEmployees(long onLeaveEmployees) {
        this.onLeaveEmployees = onLeaveEmployees;
    }
}
