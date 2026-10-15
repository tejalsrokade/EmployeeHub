
package com.employee.employee_management.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class ErrorResponseDto {

    private LocalDateTime timestamp;
    private int status;
    private String message;
    private String path;
    private Map<String, String> errors;

    public ErrorResponseDto() {
    }

    // Existing constructor: preserves compatibility with other handlers
    public ErrorResponseDto(
            LocalDateTime timestamp,
            int status,
            String message,
            String path) {

        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.path = path;
    }

    // New constructor: used for validation errors
    public ErrorResponseDto(
            LocalDateTime timestamp,
            int status,
            String message,
            String path,
            Map<String, String> errors) {

        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.path = path;
        this.errors = errors;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
