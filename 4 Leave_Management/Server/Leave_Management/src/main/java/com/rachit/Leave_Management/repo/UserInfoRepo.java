package com.rachit.Leave_Management.repo;

import com.rachit.Leave_Management.model.User;
import com.rachit.Leave_Management.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserInfoRepo extends JpaRepository<UserInfo, Integer> {
    UserInfo findByUser(User user);

    @Transactional
    void deleteUserInfoByUser(User user);
}
