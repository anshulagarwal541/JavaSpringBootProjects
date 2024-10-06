package com.rachit.SpringBoot_authentication_project.repo;

import com.rachit.SpringBoot_authentication_project.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    Users findByUsername(String username);
}
