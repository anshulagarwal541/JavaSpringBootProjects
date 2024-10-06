package com.rachit.SpringBoot_authentication_project.controller;

import com.rachit.SpringBoot_authentication_project.model.Users;
import com.rachit.SpringBoot_authentication_project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class Controller {

    @Autowired
    private UserService service;

    @GetMapping("/")
    public String home() {
        return "hello world";
    }

    @PostMapping("/addUser")
    public String addUser(@RequestBody Users user) {
        service.postUser(user);
        return "added";
    }

    @PostMapping("/post")
    public int postNumber(@RequestParam int num) {
        return num;
    }

}
