package com.rachit.SpringBoot_authentication_project.service;

import com.rachit.SpringBoot_authentication_project.model.Users;
import com.rachit.SpringBoot_authentication_project.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public void postUser(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
    }

}
