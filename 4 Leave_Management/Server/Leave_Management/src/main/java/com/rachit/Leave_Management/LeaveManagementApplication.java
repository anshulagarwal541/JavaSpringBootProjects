package com.rachit.Leave_Management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LeaveManagementApplication {

    public static void main(String[] args) {
        try {
            SpringApplication.run(LeaveManagementApplication.class, args);
            System.out.println("****************************");
            System.out.println("Successfully connected to port 8080..!!");
            System.out.println("****************************");
        } catch (Exception e) {
            System.out.println("****************************");
            System.out.println("Error occured... " + e);
            System.out.println("****************************");
        }
    }

}
