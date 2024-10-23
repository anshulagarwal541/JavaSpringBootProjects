package com.rachit.Leave_Management.repo;

import com.rachit.Leave_Management.model.User;
import com.rachit.Leave_Management.model.UserInfo;
import com.rachit.Leave_Management.model.UserLeave;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserLeaveRepo extends JpaRepository<UserLeave, Integer> {

    List<UserLeave> findAllByUserInfo(UserInfo user);

    UserLeave findByUserInfo(UserInfo userInfo);

    @Transactional
    void deleteAllByUserInfo(UserInfo userInfo);
}
