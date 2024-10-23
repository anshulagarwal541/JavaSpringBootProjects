package com.rachit.Leave_Management.service;

import com.rachit.Leave_Management.model.User;
import com.rachit.Leave_Management.model.UserInfo;
import com.rachit.Leave_Management.repo.UserInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserInfoService {

    @Autowired
    private UserInfoRepo userInfoRepo;

    public void createUserInfoByUser(User user) throws Exception {
        UserInfo userInfo = userInfoRepo.findByUser(user);
        if (userInfo != null) {
            throw new Exception("error");
        }
        userInfo = new UserInfo();
        userInfo.setUser(user);
        userInfoRepo.save(userInfo);
    }

    public List<UserInfo> getAllUsersByRole(List<User> allUsers) {

        List<UserInfo> allUserInfo = new ArrayList<>();
        for (User user : allUsers) {
            allUserInfo.add(userInfoRepo.findByUser(user));
        }
        return allUserInfo;
    }

    public void updateUserInfo(UserInfo userInfo) {
        UserInfo user=userInfoRepo.findByUser(userInfo.getUser());
        if(user!=null) {
            user.setFirstName(userInfo.getFirstName());
            user.setLastName(userInfo.getLastName());
            user.setGender(userInfo.getGender());
            user.setPhone(userInfo.getPhone());
            user.setDesignation(userInfo.getDesignation());
            userInfoRepo.save(user);
        }
    }

    public void deleteUserByUser(User user) {
        userInfoRepo.deleteUserInfoByUser(user);
    }

    public UserInfo getUserInfoByUser(User user) {
        return userInfoRepo.findByUser(user);
    }
}
