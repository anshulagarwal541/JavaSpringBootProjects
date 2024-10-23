package com.rachit.Leave_Management.controller;

import com.rachit.Leave_Management.component.ErrorComponent;
import com.rachit.Leave_Management.jwt.JwtService;
import com.rachit.Leave_Management.model.User;
import com.rachit.Leave_Management.model.UserInfo;
import com.rachit.Leave_Management.model.UserLeave;
import com.rachit.Leave_Management.service.UserInfoService;
import com.rachit.Leave_Management.service.UserLeaveService;
import com.rachit.Leave_Management.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private UserLeaveService userLeaveService;

    // GET REQUESTS
    @GetMapping({"/", ""})
    public ResponseEntity<?> getUser(HttpServletRequest req, HttpServletRequest res) {
        String authHeader = req.getHeader("Authorization");
        String userName = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            userName = jwtService.extractUsername(token);
        }

        if (userName != null) {
            User user = userService.getUser(userName);
            if (user != null) {
                return new ResponseEntity<>(user, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ErrorComponent("Can't find user in database"), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/userInfo")
    public ResponseEntity<?> getUserInfo(HttpServletRequest req, HttpServletResponse res) {
        String authHeader = req.getHeader("Authorization");
        String userName = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            userName = jwtService.extractUsername(token);
        }

        if (userName != null) {
            User user = userService.getUser(userName);
            if (user != null) {
                UserInfo userInfo = userInfoService.getUserInfoByUser(user);
                return new ResponseEntity<>(userInfo, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ErrorComponent("Can't find user in database"), HttpStatus.NOT_FOUND);
    }

    @GetMapping("/leaves")
    public ResponseEntity<?> getAllLeaves(HttpServletRequest req, HttpServletResponse res) {
        String authHeader = req.getHeader("Authorization");
        String userName = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            userName = jwtService.extractUsername(token);
        }

        if (userName != null) {
            User user = userService.getUser(userName);
            if (user != null) {
                UserInfo userInfo = userInfoService.getUserInfoByUser(user);
                List<UserLeave> allLeaves = userLeaveService.findAllLeavesByUserInfo(userInfo);
                return new ResponseEntity<>(allLeaves, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ErrorComponent("Can't find user in database"), HttpStatus.NOT_FOUND);
    }

    // POST REQUESTS
    @PostMapping("/addLeave")
    public ResponseEntity<?> submitLeave(@RequestBody UserLeave leave) {
        try {
            userLeaveService.saveLeave(leave);
            return new ResponseEntity<>("Successfully submitted the leave", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("error occured : " + e), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody User user) {
        try {
            if(user.getEmail()==null || user.getPassword()==null){
                return new ResponseEntity<>(new ErrorComponent("email and password must be submitted"), HttpStatus.BAD_REQUEST);
            }
            userService.postUser(user);
            return new ResponseEntity<>(userService.getUser(user.getEmail()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("error occured : " + e), HttpStatus.BAD_REQUEST);
        }
    }

    // PUT REQUESTS
    @PutMapping("/employee/leave")
    public ResponseEntity<?> updateLeave(@RequestBody UserLeave leave, HttpServletRequest req, HttpServletResponse res) {
        try {
            if (leave.getUserInfo() == null) {
                return new ResponseEntity<>(new ErrorComponent("Please select an employee first..!!"), HttpStatus.BAD_REQUEST);
            }
            if (leave.getFromDate() == null || leave.getTillDate() == null) {
                return new ResponseEntity<>(new ErrorComponent("Please select from and till dates,!!"), HttpStatus.BAD_REQUEST);
            }
            LocalDate fromDate = LocalDate.parse(leave.getFromDate());
            LocalDate tillDate = LocalDate.parse(leave.getTillDate());
            long diff = ChronoUnit.DAYS.between(fromDate, tillDate);

            if (diff < 0) {
                return new ResponseEntity<>(new ErrorComponent("From date should come before till date."), HttpStatus.BAD_REQUEST);
            }
            userLeaveService.updateLeave(leave);
            String authHeader = req.getHeader("Authorization");
            String userName = null;
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                userName = jwtService.extractUsername(token);
            }

            if (userName != null) {
                User user = userService.getUser(userName);
                if (user != null) {
                    UserInfo userInfo = userInfoService.getUserInfoByUser(user);
                    List<UserLeave> allLeaves = userLeaveService.findAllLeavesByUserInfo(userInfo);
                    return new ResponseEntity<>(allLeaves, HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(new ErrorComponent("Can't find user in database"), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("error occured : " + e), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/updateUser")
    public ResponseEntity<?> updateUserInfo(@RequestBody UserInfo userInfo) {
        try {
            userInfoService.updateUserInfo(userInfo);
            return new ResponseEntity<>("Successfully updated the details..!!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("error occured : " + e), HttpStatus.BAD_REQUEST);
        }
    }

}
