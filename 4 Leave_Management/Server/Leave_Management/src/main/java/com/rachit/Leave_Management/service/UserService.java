package com.rachit.Leave_Management.service;

import com.rachit.Leave_Management.model.User;
import com.rachit.Leave_Management.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public void postUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
    }

    public User getUser(String email) {
        return repo.findByEmail(email);
    }

    public List<User> getAllUsersByRole(String role) {
        return repo.findAllByUserRole(role);
    }

    public void deleteUserByUser(User user) {
        repo.deleteByEmail(user.getEmail());
    }
}
