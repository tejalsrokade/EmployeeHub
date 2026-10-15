package com.employee.employee_management.dto;

public class AdminLoginResponseDto {

    private String message;
    private Long adminId;
    private String name;
    private String email;
    private String token;

    public AdminLoginResponseDto(String message, Long adminId, String name, String email, String token) {
        this.message = message;
        this.adminId = adminId;
        this.name = name;
        this.email = email;
        this.token = token;
    }


    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public AdminLoginResponseDto() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }



}
