package com.employee.employee_management.repository;

import com.employee.employee_management.entity.Employee;
import com.employee.employee_management.entity.EmployeeStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long>, JpaSpecificationExecutor<Employee> {
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, Long id);


    //for searching-----query
    @Query("""
    SELECT e FROM Employee e
    WHERE LOWER(e.firstName) LIKE LOWER(CONCAT('%', :keyword, '%'))
       OR LOWER(e.lastName) LIKE LOWER(CONCAT('%', :keyword, '%'))
       OR LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%'))
       OR LOWER(e.department) LIKE LOWER(CONCAT('%', :keyword, '%'))
       OR LOWER(e.designation) LIKE LOWER(CONCAT('%', :keyword, '%'))
""")
    List<Employee> searchEmployees(@Param("keyword") String keyword);
    List<Employee> findByDepartmentIgnoreCase(String department);

    List<Employee> findByStatus(EmployeeStatus status);
    List<Employee> findByDesignationIgnoreCase(String designation);


    long countByStatus(EmployeeStatus status);

}
