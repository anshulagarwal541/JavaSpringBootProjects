package com.rachit.Leave_Management.service;

import com.rachit.Leave_Management.model.Admin;
import com.rachit.Leave_Management.repo.AdminRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepo repo;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    public Admin getAdmin(String email){
        return repo.findByEmail(email);
    }

    public void postAdmin(Admin admin){
        admin.setPassword(encoder.encode(admin.getPassword()));
        repo.save(admin);
    }
}
