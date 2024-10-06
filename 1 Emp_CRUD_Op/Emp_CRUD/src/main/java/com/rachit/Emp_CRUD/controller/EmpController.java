package com.rachit.Emp_CRUD.controller;

import com.rachit.Emp_CRUD.model.Employee;
import com.rachit.Emp_CRUD.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class EmpController {

    @Autowired
    private EmployeeService service;

    @GetMapping("/")
    public String home() {
        return "Hello World";
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return service.getAllEmployees();
    }

    @PostMapping("/addEmployee")
    public String postEmployee(@RequestBody Employee emp) {
        try {
            System.out.println(emp);
            service.postEmployee(emp);
            return "Added";
        } catch (Exception e) {
            System.out.println("********");
            System.out.println("Cannot able to add employee");
            System.out.println("********");
            return "Error occured";
        }
    }

    @DeleteMapping("/employee/{empId}")
    public Employee deleteEmployee(@PathVariable("empId") int id) {
        Employee emp = null;
        try {
            emp = service.deleteEmployee(id);
        } catch (Exception e) {
            System.out.println("*******************");
            System.out.println("opps error occured..");
            System.out.println("*******************");
        } finally {
            return emp;
        }
    }

    @PutMapping("/employee/{empId}")
    public List<Employee> updateEmployee(@PathVariable("empId") int id, @RequestBody Employee emp) {
        List<Employee> allEmployees = null;
        try {
            allEmployees = service.updateEmployee(id, emp);
        } catch (Exception e) {
            System.out.println("*******************");
            System.out.println("Error occured.." + e);
            System.out.println("*******************");
        } finally {
            return allEmployees;
        }
    }

}
