package com.rachit.Leave_Management.config;


import com.rachit.Leave_Management.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UserPrincipal implements UserDetails {

    @Autowired
    private User user;

    public UserPrincipal(com.rachit.Leave_Management.model.User user) {
        this.user=user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String role : user.getRoles()) {
            authorities.add(new SimpleGrantedAuthority(role));
        }
        System.out.println("*************************");
        System.out.println(authorities);
        System.out.println("*************************");
        return authorities;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }
}
