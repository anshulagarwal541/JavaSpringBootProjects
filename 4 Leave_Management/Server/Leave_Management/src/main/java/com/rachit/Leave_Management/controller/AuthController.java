package com.rachit.Leave_Management.controller;

import com.rachit.Leave_Management.component.ErrorComponent;
import com.rachit.Leave_Management.jwt.JwtService;
import com.rachit.Leave_Management.model.Admin;
import com.rachit.Leave_Management.model.User;
import com.rachit.Leave_Management.service.AdminService;
import com.rachit.Leave_Management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class AuthController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                return new ResponseEntity<>(jwtService.generateToken(user.getEmail(), "ROLE_admin"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ErrorComponent("Username or password is incorrect"), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent(e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login/client")
    public ResponseEntity<?> clientLogin(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if (authentication.isAuthenticated()) {
                return new ResponseEntity<>(jwtService.generateToken(user.getEmail(), "ROLE_user"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ErrorComponent("Username or password is incorrect"), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("Opps"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/loadAdmin")
    public ResponseEntity<?> loadClient(@RequestBody User user) {
        User u = userService.getUser(user.getEmail());
        if (u != null) {
            return new ResponseEntity<>(new ErrorComponent("User has already registered"), HttpStatus.ALREADY_REPORTED);
        }
        userService.postUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
