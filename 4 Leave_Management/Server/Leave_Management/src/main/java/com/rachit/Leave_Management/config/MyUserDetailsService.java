package com.rachit.Leave_Management.config;

import com.rachit.Leave_Management.model.Admin;
import com.rachit.Leave_Management.model.User;
import com.rachit.Leave_Management.repo.AdminRepo;
import com.rachit.Leave_Management.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email);
        if (user == null) {
            try {
                throw new Exception();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        // return new UserPrincipal(user);
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRoles().toArray(new String[0]))
                .build();
    }

}
