package com.employee.employee_management.service;

import com.employee.employee_management.dto.AdminLoginResponseDto;
import com.employee.employee_management.dto.AdminLoginRequestDto;
import com.employee.employee_management.entity.Admin;
import com.employee.employee_management.repository.AdminRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {
    private AdminRepository adminRepository;
    private PasswordEncoder passwordEncoder;
    private jwtService jwtService;

    public AdminService(AdminRepository adminRepository,PasswordEncoder passwordEncoder,jwtService jwtService ){
        this.adminRepository=adminRepository;
        this.passwordEncoder=passwordEncoder;
        this.jwtService=jwtService;

    }

    public AdminLoginResponseDto login(AdminLoginRequestDto request) {
        Admin admin=adminRepository.findByEmail(request.getEmail())
                .orElseThrow(()->
                    new RuntimeException("Invalid Email or password")
                );

        //compare passwords
                                       //raw password, then encoded password
        if(!passwordEncoder.matches(request.getPassword(),admin.getPassword())){

            throw new RuntimeException("Invalid Password or Email");
        }
        String token= jwtService.generateToken(admin.getEmail());
        return new AdminLoginResponseDto(
                "Login successful",
                admin.getId(),
                admin.getEmail(),
                admin.getName(),
                token

        );
    }



}
