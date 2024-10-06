package com.rachit.Emp_CRUD.service;

import com.rachit.Emp_CRUD.model.Employee;
import com.rachit.Emp_CRUD.repo.EmployeeRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo repo;

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public void postEmployee(Employee emp) throws Exception {
        repo.save(emp);
    }

    public Employee deleteEmployee(int id) throws Exception {
        Employee emp = repo.findById(id).orElse(new Employee());
        repo.deleteById(id);
        return emp;
    }

    public List<Employee> updateEmployee(int id, Employee emp) throws Exception {
        Employee e = repo.findById(id).orElse(new Employee());
        if (e.getName() == null) {
            throw new Exception();
        } else {
            e.setName(emp.getName());
            e.setDesignation(emp.getDesignation());
            e.setSalary(emp.getSalary());
            repo.save(e);
            return repo.findAll();
        }
    }

}
