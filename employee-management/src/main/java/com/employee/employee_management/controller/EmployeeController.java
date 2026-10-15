package com.employee.employee_management.controller;

import com.employee.employee_management.dto.*;
import com.employee.employee_management.entity.Employee;
import com.employee.employee_management.entity.EmployeeStatus;
import com.employee.employee_management.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.employee.employee_management.entity.EmployeeStatus;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

@RestController
@RequestMapping("/api/employees")
@Tag(
        name="Employee Management",
        description="APIs for managing employees"
)
//@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {
 private EmployeeService employeeService;

 public EmployeeController(EmployeeService employeeService){
     this.employeeService=employeeService;
 }


 //create an employee

    @Operation(
            summary="Creates new employees",
            description="Creates a new employee after validating the employee details and checking for duplicate email."
    )
    @ApiResponses(
            {
                    @ApiResponse(
                            responseCode = "201",
                            description="Employee created successfully"

                    ),
                    @ApiResponse(
                            responseCode = "400",
                            description="Validation error"
                    ),
                    @ApiResponse(
                            responseCode = "409",
                            description="Employee with email already exists"
                    )
            }
    )
    @PostMapping
    public ResponseEntity<CreateEmployeeResponseDto> createEmployee( @Valid @RequestBody CreateEmployeeRequestDto createReqDto){

     //get request in the form of createRequestDto object
     //send response as object createResponseDto
     CreateEmployeeResponseDto createdEmployee=employeeService.createEmployee(createReqDto);

       return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }


    //get one employee
    @Operation(
            summary = "Get an employee by Id",
            description = "Retrieves an employee with matching Id."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Employee retrieved successfully"
    )
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDto> getEmployees(@PathVariable Long id){
     EmployeeResponseDto getEmployee=employeeService.getOneEmployee(id);

     return ResponseEntity.ok(getEmployee);

    }

    //get all employees

    @Operation(
            summary = "Get all employees",
            description = "Retrieves a list of all employees."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Employees retrieved successfully"
    )
    @GetMapping
    public ResponseEntity<List<EmployeeResponseDto>> getAllEmployees(){
     List<EmployeeResponseDto> employees=employeeService.getAllEmployees();

     return ResponseEntity.ok(employees);
    }

    //update an employee
    @Operation(
            summary = "Update an employee",
            description = "Updates the details of an existing employee."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Employee updated successfully"
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Validation failed"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Employee not found"
            ),
            @ApiResponse(
                    responseCode = "409",
                    description = "Employee with the email already exists"
            )
    })
    @PutMapping("/{id}")
    public ResponseEntity<UpdateEmployeeResponseDto> updateEmployee(@PathVariable Long id,@Valid @RequestBody UpdateEmployeeRequestDto updateReqDto)
    {

        //get requestbody in the form of updateReqDto
        //send responsebody in the form of updateResDto

       UpdateEmployeeResponseDto updatedEmployee=employeeService.updateEmployee(id, updateReqDto);


       return ResponseEntity.ok(updatedEmployee);
    }


    //delete an employee
    @Operation(
            summary = "Delete an employee",
            description = "Deletes an employee using the employee ID."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "204",
                    description = "Employee deleted successfully"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Employee not found"
            )
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
        try {
            employeeService.deleteEmployee(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Employee deleted successfully");
        } catch (EmptyResultDataAccessException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found with id: " + id);
        }
    }


    //Search with keywords
    @Operation(
            summary = "Search employees",
            description = "Searches employees by first name, last name, email, department, or designation."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Search results retrieved successfully"
    )
    @GetMapping("/search")
    public ResponseEntity<List<EmployeeResponseDto>> searchEmployees(
            @RequestParam String keyword) {

        List<EmployeeResponseDto> employees =
                employeeService.searchEmployees(keyword);

        return ResponseEntity.ok(employees);
    }

 // filtering wrt department
 @Operation(
         summary = "Filter employees by department",
         description = "Returns employees belonging to the specified department."
 )
 @ApiResponse(
         responseCode = "200",
         description = "Employees retrieved successfully"
 )
    @GetMapping("/filter/department")
    public ResponseEntity<List<EmployeeResponseDto>> filterByDepartment(
            @RequestParam String department) {

        List<EmployeeResponseDto> employees =
                employeeService.filterByDepartment(department);

        return ResponseEntity.ok(employees);
    }

    //filtering by status

    @Operation(
            summary = "Filter employees by status",
            description = "Returns employees with the specified employment status."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Employees retrieved successfully"
    )
    @GetMapping("/filter/status")
    public ResponseEntity<List<EmployeeResponseDto>> filterByStatus(
            @RequestParam EmployeeStatus status) {

        List<EmployeeResponseDto> employees =
                employeeService.filterByStatus(status);

        return ResponseEntity.ok(employees);
    }

    // filtering by designation
    @Operation(
            summary = "Filter employees by designation",
            description = "Returns employees with the specified designation."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Employees retrieved successfully"
    )
    @GetMapping("/filter/designation")
    public ResponseEntity<List<EmployeeResponseDto>> filterByDesignation(
            @RequestParam String designation) {

        List<EmployeeResponseDto> employees =
                employeeService.filterByDesignation(designation);

        return ResponseEntity.ok(employees);
    }

    //Pagination implementation
    //note pageable already contains features for pagination and sorting
    // hence we can give request as --> localhost:8080/api/employees/page?page=0&size=5&sort=firstName,asc  directly as well
    @Operation(
            summary = "Get employees with pagination and sorting",
            description = "Retrieves employees using pagination and optional sorting."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Employees retrieved successfully"
    )
    @GetMapping("/page")
    public ResponseEntity<Page<EmployeeResponseDto>> getEmployeesWithPagination(
            Pageable pageable) {

        Page<EmployeeResponseDto> employees =
                employeeService.getEmployeesWithPagination(pageable);

        return ResponseEntity.ok(employees);
    }


    //Employee stats dashboard
    @Operation(
            summary = "Get employee statistics",
            description = "Returns total, active, inactive, and on-leave employee counts."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Employee statistics retrieved successfully"
    )
    @GetMapping("/stats")
    public ResponseEntity<EmployeeStatsDto> getStatus(){
     EmployeeStatsDto status=employeeService.EmployeeStatus();

     return ResponseEntity.ok(status);
    }






// Search +filter Employees

    @Operation(
            summary = "Search and filter employees",
            description = "Searches employees by keyword and filters by department, designation, and status with pagination and sorting."
    )
    @ApiResponse(
            responseCode = "200",
            description = "Employees retrieved successfully"
    )
    @GetMapping("/filter")
    public ResponseEntity<Page<EmployeeResponseDto>> searchAndFilterEmployees(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) String designation,
            @RequestParam(required = false) EmployeeStatus status,
            @PageableDefault(size = 5, sort = "id") Pageable pageable
    ) {

        Page<EmployeeResponseDto> employees =
                employeeService.searchAndFilterEmployees(
                        keyword,
                        department,
                        designation,
                        status,
                        pageable
                );

        return ResponseEntity.ok(employees);
    }






}
