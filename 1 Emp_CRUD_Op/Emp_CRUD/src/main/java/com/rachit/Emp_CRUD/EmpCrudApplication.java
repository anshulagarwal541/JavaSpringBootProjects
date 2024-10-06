package com.rachit.Emp_CRUD;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmpCrudApplication {

    public static void main(String[] args) {
        try {
            SpringApplication.run(EmpCrudApplication.class, args);
            System.out.println("*************************");
            System.out.println("Successfully connected to port 8080..");
            System.out.println("*************************");
        } catch (Exception e) {
            System.out.println("*****************************");
            System.out.println("Error occured.. " + e);
            System.out.println("******************************");
        }
    }

}
