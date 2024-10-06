package com.rachit.SpringBoot_authentication_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootAuthenticationProjectApplication {

    public static void main(String[] args) {
        try {
            SpringApplication.run(SpringBootAuthenticationProjectApplication.class, args);
            System.out.println("************************");
            System.out.println("Successfully connecteed to port 8080");
            System.out.println("************************");
        } catch (Exception e) {
            System.out.println("*******************************");
            System.out.println("Error occured " + e);
            System.out.println("*******************************");
        }
    }

}
