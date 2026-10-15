
package com.employee.employee_management.specification;

import com.employee.employee_management.entity.Employee;
import com.employee.employee_management.entity.EmployeeStatus;
import org.springframework.data.jpa.domain.Specification;

public class EmployeeSpecification {

    public static Specification<Employee> hasKeyword(String keyword) {

        return (root, query, criteriaBuilder) -> {

            if (keyword == null || keyword.trim().isEmpty()) {
                return null;
            }

            String searchKeyword = "%" + keyword.toLowerCase() + "%";

            return criteriaBuilder.or(

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("firstName")),
                            searchKeyword
                    ),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("lastName")),
                            searchKeyword
                    ),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(root.get("email")),
                            searchKeyword
                    )
            );
        };
    }


    public static Specification<Employee> hasDepartment(
            String department) {

        return (root, query, criteriaBuilder) -> {

            if (department == null || department.trim().isEmpty()) {
                return null;
            }

            return criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("department")),
                    department.toLowerCase()
            );
        };
    }


    public static Specification<Employee> hasDesignation(
            String designation) {

        return (root, query, criteriaBuilder) -> {

            if (designation == null || designation.trim().isEmpty()) {
                return null;
            }

            return criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("designation")),
                    designation.toLowerCase()
            );
        };
    }


    public static Specification<Employee> hasStatus(
            EmployeeStatus status) {

        return (root, query, criteriaBuilder) -> {

            if (status == null) {
                return null;
            }

            return criteriaBuilder.equal(
                    root.get("status"),
                    status
            );
        };
    }
}

