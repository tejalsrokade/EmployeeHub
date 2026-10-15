package com.employee.employee_management.exception;

public class EmployeeAlreadyExistsException extends RuntimeException{
    public EmployeeAlreadyExistsException(String message){
        super(message);
    }
}
