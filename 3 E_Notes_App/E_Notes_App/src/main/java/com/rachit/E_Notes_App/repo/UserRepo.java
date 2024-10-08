package com.rachit.E_Notes_App.repo;

import com.rachit.E_Notes_App.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    User findByEmailAndPassword(String email, String password);

}
