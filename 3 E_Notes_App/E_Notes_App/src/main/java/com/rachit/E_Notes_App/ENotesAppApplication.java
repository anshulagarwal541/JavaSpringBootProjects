package com.rachit.E_Notes_App;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ENotesAppApplication {

    public static void main(String[] args) {
        try {
            SpringApplication.run(ENotesAppApplication.class, args);
            System.out.println("********************************");
            System.out.println("Successfully connected to port 8080");
            System.out.println("********************************");
        } catch (Exception e) {
            System.out.println("****************************");
            System.out.println("Error occured.." + e);
            System.out.println("****************************");
        }
    }

}
