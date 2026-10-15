package com.employee.employee_management.service;

import com.employee.employee_management.dto.*;
import com.employee.employee_management.entity.Employee;
import com.employee.employee_management.entity.EmployeeStatus;
import com.employee.employee_management.exception.EmployeeAlreadyExistsException;
import com.employee.employee_management.exception.EmployeeNotFoundException;
import com.employee.employee_management.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.employee.employee_management.entity.EmployeeStatus;
import com.employee.employee_management.specification.EmployeeSpecification;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import com.employee.employee_management.entity.EmployeeStatus;


import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private EmployeeRepository employeeRepository;
    //constructor
    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository=employeeRepository;
    }



    //create one student
    public CreateEmployeeResponseDto createEmployee(CreateEmployeeRequestDto createReqDto) {

        //mapping requestDto to entity
        //making changes in entity
        // mapping entity back to response dto
        if (employeeRepository.existsByEmail(createReqDto.getEmail())) {
            throw new EmployeeAlreadyExistsException("Employee with this email already exists");
        }
        Employee employee=mapToEntity(createReqDto);
        Employee saveEmployee=employeeRepository.save(employee);

        return mapToDto(saveEmployee);
    }

    //Get one student
    public EmployeeResponseDto getOneEmployee(Long id) {
      Optional<Employee> getEmployee=employeeRepository.findById(id);

      if(getEmployee.isEmpty()){
          throw new EmployeeNotFoundException(
                  "Employee with id " + id + " not found"
          );
      }
      Employee employee=getEmployee.get();
      return mapToEmployeeResponseDto(employee);
    }

    //get all employees
    public List<EmployeeResponseDto> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        return employees.stream()
                .map(this::mapToEmployeeResponseDto)
                .toList();
    }

    //Update an employee
    public UpdateEmployeeResponseDto updateEmployee(Long id, UpdateEmployeeRequestDto updateReqDto) {

        Optional<Employee> existingEmployee=employeeRepository.findById(id);
        if (existingEmployee.isEmpty()) {
            throw new EmployeeNotFoundException(
                    "Employee with id " + id + " not found"
            );
        }
        if (employeeRepository.existsByEmailAndIdNot(
                updateReqDto.getEmail(), id)) {

            throw new EmployeeAlreadyExistsException("Email already belongs to another employee");
        }


        Employee updateEmployee=existingEmployee.get();

        updateEmployee.setFirstName(updateReqDto.getFirstName());
        updateEmployee.setLastName(updateReqDto.getLastName());
        updateEmployee.setEmail(updateReqDto.getEmail());
        updateEmployee.setPhone(updateReqDto.getPhone());
        updateEmployee.setDepartment(updateReqDto.getDepartment());
        updateEmployee.setDesignation(updateReqDto.getDesignation());
        updateEmployee.setSalary(updateReqDto.getSalary());
        updateEmployee.setJoiningDate(updateReqDto.getJoiningDate());
        updateEmployee.setStatus(updateReqDto.getStatus());

        Employee savedEmployee=employeeRepository.save(updateEmployee);

        return updateMapToDto(savedEmployee);

    }

    //Delete an employee
    public void  deleteEmployee(Long id) {
        Optional<Employee> existingEmployee=employeeRepository.findById(id);
        if (existingEmployee.isEmpty()) {
            throw new EmployeeNotFoundException(
                    "Employee with id " + id + " not found"
            );
        }
        Employee employee=existingEmployee.get();
        employeeRepository.delete(employee);

    }

    //search employees
    public List<EmployeeResponseDto> searchEmployees(String keyword) {

        List<Employee> employees = employeeRepository.searchEmployees(keyword);

        return employees.stream()
                .map(this::mapToEmployeeResponseDto)
                .toList();
    }



    //filtering by department
    public List<EmployeeResponseDto> filterByDepartment(String department) {

        List<Employee> employees =
                employeeRepository.findByDepartmentIgnoreCase(department);

        return employees.stream()
                .map(this::mapToEmployeeResponseDto)
                .toList();
    }

    //filtering by status
    public List<EmployeeResponseDto> filterByStatus(EmployeeStatus status) {

        List<Employee> employees =
                employeeRepository.findByStatus(status);

        return employees.stream()
                .map(this::mapToEmployeeResponseDto)
                .toList();
    }
    //filtering by deisgnation
    public List<EmployeeResponseDto> filterByDesignation(String designation) {

        List<Employee> employees =
                employeeRepository.findByDesignationIgnoreCase(designation);

        return employees.stream()
                .map(this::mapToEmployeeResponseDto)
                .toList();
    }


// implementing pagination
    //note pageable already contains features for pagination and sorting
    // hence we can give request as --> localhost:8080/api/employees/page?page=0&size=5&sort=firstName,asc  directly as well
    public Page<EmployeeResponseDto> getEmployeesWithPagination(Pageable pageable) {

        Page<Employee> employees =
                employeeRepository.findAll(pageable);

        return employees.map(this::mapToEmployeeResponseDto);
    }

public EmployeeStatsDto EmployeeStatus(){

        long totalEmployees= employeeRepository.count();
        long activeEmployees= employeeRepository.countByStatus(EmployeeStatus.ACTIVE);
        long inactiveEmployees=employeeRepository.countByStatus(EmployeeStatus.INACTIVE);
        long onLeaveEmployees=employeeRepository.countByStatus(EmployeeStatus.ON_LEAVE);

        EmployeeStatsDto status=new EmployeeStatsDto();
        status.setTotalEmployees(totalEmployees);
        status.setActiveEmployees(activeEmployees);
        status.setInactiveEmployees(inactiveEmployees);
        status.setOnLeaveEmployees(onLeaveEmployees);


        return status;

}


    public Page<EmployeeResponseDto> searchAndFilterEmployees(
            String keyword,
            String department,
            String designation,
            EmployeeStatus status,
            Pageable pageable) {

        Specification<Employee> specification = Specification
                .where(EmployeeSpecification.hasKeyword(keyword))
                .and(EmployeeSpecification.hasDepartment(department))
                .and(EmployeeSpecification.hasDesignation(designation))
                .and(EmployeeSpecification.hasStatus(status));

        return employeeRepository
                .findAll(specification, pageable)
                .map(this::mapToEmployeeResponseDto);
    }




//--------------------------------------------------------------------------------------------------
// DTO methods:

    //map to entity:
    private Employee mapToEntity(CreateEmployeeRequestDto createReqDto){
        Employee employee=new Employee();

        employee.setFirstName(createReqDto.getFirstName());
        employee.setLastName(createReqDto.getLastName());
        employee.setEmail(createReqDto.getEmail());
        employee.setPhone(createReqDto.getPhone());
        employee.setDepartment(createReqDto.getDepartment());
        employee.setDesignation(createReqDto.getDesignation());
        employee.setSalary(createReqDto.getSalary());
        employee.setJoiningDate(createReqDto.getJoiningDate());
        employee.setStatus(createReqDto.getStatus());

        return employee;
    }


    //map to Dto
    private CreateEmployeeResponseDto mapToDto(Employee employee){

        CreateEmployeeResponseDto createResDto=new CreateEmployeeResponseDto();

        createResDto.setId(employee.getId());
        createResDto.setFirstName(employee.getFirstName());
        createResDto.setLastName(employee.getLastName());
        createResDto.setEmail(employee.getEmail());
        createResDto.setPhone(employee.getPhone());
        createResDto.setDepartment(employee.getDepartment());
        createResDto.setDesignation(employee.getDesignation());
        createResDto.setSalary(employee.getSalary());
        createResDto.setJoiningDate(employee.getJoiningDate());
        createResDto.setStatus(employee.getStatus());
        createResDto.setCreatedAt(employee.getCreatedAt());
        createResDto.setUpdatedAt(employee.getUpdatedAt());
        return createResDto;
    }

    //update map to dto

    private UpdateEmployeeResponseDto updateMapToDto(Employee employee){
        UpdateEmployeeResponseDto updateResDto=new UpdateEmployeeResponseDto();

        updateResDto.setId(employee.getId());
        updateResDto.setFirstName(employee.getFirstName());
        updateResDto.setLastName(employee.getLastName());
        updateResDto.setEmail(employee.getEmail());
        updateResDto.setPhone(employee.getPhone());
        updateResDto.setDepartment(employee.getDepartment());
        updateResDto.setDesignation(employee.getDesignation());
        updateResDto.setSalary(employee.getSalary());
        updateResDto.setJoiningDate(employee.getJoiningDate());
        updateResDto.setStatus(employee.getStatus());
        updateResDto.setCreatedAt(employee.getCreatedAt());
        updateResDto.setUpdatedAt(employee.getUpdatedAt());
        return updateResDto;
    }


    //employee response map to dto

    private EmployeeResponseDto mapToEmployeeResponseDto(Employee employee) {

        EmployeeResponseDto dto = new EmployeeResponseDto();

        dto.setId(employee.getId());
        dto.setFirstName(employee.getFirstName());
        dto.setLastName(employee.getLastName());
        dto.setEmail(employee.getEmail());
        dto.setPhone(employee.getPhone());
        dto.setDepartment(employee.getDepartment());
        dto.setDesignation(employee.getDesignation());
        dto.setSalary(employee.getSalary());
        dto.setJoiningDate(employee.getJoiningDate());
        dto.setStatus(employee.getStatus());
        dto.setCreatedAt(employee.getCreatedAt());
        dto.setUpdatedAt(employee.getUpdatedAt());

        return dto;
    }



}
