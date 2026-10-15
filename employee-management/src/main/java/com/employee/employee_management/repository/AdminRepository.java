package com.employee.employee_management.repository;

import com.employee.employee_management.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin,Long> {

Optional<Admin> findByEmail(String email);
Boolean existsByEmail(String email);

}
