package com.employee.employee_management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeManagementApplication.class, args);
		System.out.println("----------------------------");
		System.out.println("Server running at port 8080");
		System.out.println("----------------------------");
	}

}
