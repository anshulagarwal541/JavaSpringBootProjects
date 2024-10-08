package com.rachit.E_Notes_App.controller;

import com.rachit.E_Notes_App.model.User;
import com.rachit.E_Notes_App.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
public class ENotesController {

    @Autowired
    private UserService service;

    @RequestMapping("/")
    public String home(HttpSession session) {
        return "home";
    }

    @RequestMapping("/register")
    public String register() {
        return "register";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, HttpSession session) {
        User alreadyRegisteredUser = (User) session.getAttribute("user");
        if (alreadyRegisteredUser == null) {
            alreadyRegisteredUser = service.getUser(user);
            if (alreadyRegisteredUser == null) {
                service.setUser(user);
                session.setAttribute("user", user);
                session.setAttribute("success", "You have successfully registered..!!!");
                return "redirect:/"; // Redirect to home after successful registration
            } else {
                session.setAttribute("error", "You have already registered. Please log-in.");
                return "redirect:/login"; // Stay on register page
            }
        } else {
            session.setAttribute("error", "Can't register while you are logged in.");
            return "redirect:/"; // Redirect to home if already logged in
        }
    }

    @PostMapping("/login")
    public String loginUser(@RequestParam String email, @RequestParam String password, HttpSession session) {
        User alreadyLogged = (User) session.getAttribute("user");
        if (alreadyLogged != null) {
            session.setAttribute("error", "You have logged in and can't log in again.");
            return "redirect:/"; // Redirect to home if already logged in
        } else {
            User registeredUser = service.getUserByEmailAndPassword(email, password);
            if (registeredUser != null) {
                session.setAttribute("user", registeredUser);
                session.setAttribute("success", "You have successfully logged in..!!");
                return "redirect:/"; // Redirect to home after successful login
            } else {
                session.setAttribute("error", "Invalid email or password.");
                return "redirect:/login"; // Stay on login page if authentication fails
            }
        }
    }

    @RequestMapping("/getSession")
    public void getSession(HttpSession session) {
        System.out.println("********************");
        System.out.println(((User) session.getAttribute("user")));
        System.out.println("********************");
    }
}
