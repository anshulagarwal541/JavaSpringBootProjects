package com.rachit.Leave_Management.repo;

import com.rachit.Leave_Management.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer> {

    Admin findByEmail(String email);

}
