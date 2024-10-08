package com.rachit.E_Notes_App.service;

import com.rachit.E_Notes_App.model.Notes;
import com.rachit.E_Notes_App.model.User;
import com.rachit.E_Notes_App.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;

    public void setUser(User user) {
        repo.save(user);
    }

    public User getUserByEmailAndPassword(String email, String password) {
        return repo.findByEmailAndPassword(email, password);
    }

    public User getUser(User user) {
        return repo.findByEmailAndPassword(user.getEmail(), user.getPassword());
    }

}
