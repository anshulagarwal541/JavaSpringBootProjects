package com.rachit.Leave_Management.repo;

import com.rachit.Leave_Management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    @Query(value = "SELECT * FROM \"user\" u WHERE u.roles @> ARRAY[:role]::varchar[]", nativeQuery = true)
    List<User> findAllByUserRole(String role);

    @Transactional
    void deleteByEmail(String email);
}
