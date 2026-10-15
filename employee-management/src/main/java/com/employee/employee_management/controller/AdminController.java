package com.employee.employee_management.controller;


import com.employee.employee_management.dto.AdminLoginResponseDto;
import com.employee.employee_management.dto.AdminLoginRequestDto;
import com.employee.employee_management.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AdminController {

    private AdminService adminService;

 private AdminController(AdminService adminService){
     this.adminService=adminService;
 }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponseDto> login(@RequestBody AdminLoginRequestDto request){


        AdminLoginResponseDto response=adminService.login(request);

        return ResponseEntity.ok(response);

    }


}
