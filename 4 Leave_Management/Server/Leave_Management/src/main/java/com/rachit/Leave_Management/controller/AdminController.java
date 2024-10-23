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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private UserLeaveService userLeaveService;

    // GET REQUESTS

    @GetMapping({"/", ""})
    public ResponseEntity<?> getAdminDetails(HttpServletRequest req, HttpServletResponse res) {
        String authHeader = req.getHeader("Authorization");
        String token = null;
        String userName = null;
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            userName = jwtService.extractUsername(token);
        }

        if (userName != null) {
            User admin = userService.getUser(userName);
            if (admin != null) {
                return new ResponseEntity<>(admin, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(new ErrorComponent("Cant't find admin details in the database"), HttpStatus.NOT_FOUND);
    }


    @GetMapping("/allUsers")
    public ResponseEntity<?> getAllUsers(HttpServletRequest req, HttpServletResponse res) throws IOException {
        try {
            List<User> allUsers = userService.getAllUsersByRole("USER");
            List<UserInfo> users = userInfoService.getAllUsersByRole(allUsers);
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            res.setContentType("application/json");
            res.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
            res.getWriter().write(" \"error\" : \"Unable to fetch the users..!!\" ");
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }

    @GetMapping("/employees/leaves")
    public ResponseEntity<?> getAllEmployeeLeaves() {
        try {
            List<User> allUsers = userService.getAllUsersByRole("USER");
            List<UserInfo> allUserInfo = userInfoService.getAllUsersByRole(allUsers);
            List<UserLeave> allUserLeaves = userLeaveService.findAllLeavesByUserInfoList(allUserInfo);
            return new ResponseEntity<>(allUserLeaves, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("Unable to fetch leaves"), HttpStatus.NOT_FOUND);
        }
    }

    // POST REQUESTS

    @PostMapping("/addEmployee")
    public ResponseEntity<?> addEmployee(@RequestBody User user, HttpServletRequest req, HttpServletResponse res) {
        try {
            User findUser = userService.getUser(user.getEmail());
            if (findUser != null) {
                return new ResponseEntity<>(new ErrorComponent("User with entered email is already present in database.."), HttpStatus.CONFLICT);
            }
            user.setRoles(List.of("USER"));
            userService.postUser(user);
            userInfoService.createUserInfoByUser(userService.getUser(user.getEmail()));
            return new ResponseEntity<>("OK", HttpStatus.OK);
        } catch (Exception e) {
            res.setContentType("application/json");
            res.setStatus(HttpServletResponse.SC_BAD_GATEWAY);
            try {
                res.getWriter().write(" \"error\" : \"Unable to add employee details...\"");
            } catch (IOException io) {
                System.out.println("**********");
                System.out.println(io);
                System.out.println("**********");
            }
        }
        return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
    }

    @PostMapping("/updateUser")
    public ResponseEntity<?> updateUser(@RequestBody UserInfo userInfo, HttpServletRequest req, HttpServletResponse res) {
        try {
            userInfoService.updateUserInfo(userInfo);
            return new ResponseEntity<>("Successfully updated the details..!!", HttpStatus.OK);
        } catch (Exception e) {
            res.setContentType("application/json");
            res.setStatus(HttpServletResponse.SC_FORBIDDEN);
            try {
                res.getWriter().write(" \"error\" : \"Unable to update the code..!!\" ");
            } catch (IOException io) {
                System.out.println(io);
            }
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @PostMapping("/employee/delete")
    public ResponseEntity<?> deleteEmployee(@RequestBody UserInfo userInfo, HttpServletRequest req, HttpServletResponse res) {
        try {
            UserInfo info = userInfoService.getUserInfoByUser(userInfo.getUser());
            userLeaveService.deleteLeaveByUserInfo(info);
            userInfoService.deleteUserByUser(info.getUser());
            userService.deleteUserByUser(info.getUser());
            List<User> allUsers = userService.getAllUsersByRole("USER");
            List<UserInfo> allUserInfo = userInfoService.getAllUsersByRole(allUsers);
            return new ResponseEntity<>(allUserInfo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("Error occured"), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/employee/addLeave")
    public ResponseEntity<?> addLeave(@RequestBody UserLeave leave, HttpServletRequest req, HttpServletResponse res) {
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
            User user = userService.getUser(leave.getUserInfo().getUser().getEmail());
            UserInfo userInfo = userInfoService.getUserInfoByUser(user);
            leave.setUserInfo(userInfo);
            if (userInfo == null) {
                return new ResponseEntity<>(new ErrorComponent("Please select the employee"), HttpStatus.BAD_REQUEST);
            }
            userLeaveService.saveLeave(leave);
            return new ResponseEntity<>("Successfully added leave", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("error : " + e), HttpStatus.NOT_ACCEPTABLE);
        }
    }


    // PUT REQUESTS

    @PutMapping("/employee/leave")
    public ResponseEntity<?> updateLeave(@RequestBody UserLeave leave) {
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
            List<User> allUsers = userService.getAllUsersByRole("USER");
            List<UserInfo> allInfos = userInfoService.getAllUsersByRole(allUsers);
            List<UserLeave> allLeaves = userLeaveService.findAllLeavesByUserInfoList(allInfos);
            return new ResponseEntity<>(allLeaves, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent("error occured : " + e), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/employee/leave/status")
    public ResponseEntity<?> updateLeaveStatus(@RequestBody UserLeave leave) {
        try {
            userLeaveService.updateLeave(leave);
            List<User> allUsers = userService.getAllUsersByRole("USER");
            List<UserInfo> allUserInfo = userInfoService.getAllUsersByRole(allUsers);
            List<UserLeave> allUserLeaves = userLeaveService.findAllLeavesByUserInfoList(allUserInfo);
            return new ResponseEntity<>(allUserLeaves, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ErrorComponent(e.toString()), HttpStatus.BAD_REQUEST);
        }
    }

}






