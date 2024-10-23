package com.rachit.Leave_Management.service;

import com.rachit.Leave_Management.model.User;
import com.rachit.Leave_Management.model.UserInfo;
import com.rachit.Leave_Management.model.UserLeave;
import com.rachit.Leave_Management.repo.UserLeaveRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserLeaveService {
    @Autowired
    private UserLeaveRepo userLeaveRepo;

    public void saveLeave(UserLeave leave) {
        userLeaveRepo.save(leave);
    }

    public List<UserLeave> findAllLeavesByUserInfoList(List<UserInfo> allUsers) {
        List<UserLeave> ans = new ArrayList<>();
        for (UserInfo user : allUsers) {
            List<UserLeave> userLeaves = userLeaveRepo.findAllByUserInfo(user);
            ans.addAll(userLeaves);
        }
        return ans;
    }

    public void updateLeave(UserLeave leave) {
        UserLeave userLeave = userLeaveRepo.findByUserInfo(leave.getUserInfo());
        userLeave.setFromDate(leave.getFromDate());
        userLeave.setTillDate(leave.getTillDate());
        userLeave.setStatus(leave.getStatus());
        userLeave.setReason(leave.getReason());
        userLeaveRepo.save(userLeave);
    }

    public void deleteLeaveByUserInfo(UserInfo userInfo) {
        userLeaveRepo.deleteAllByUserInfo(userInfo);
    }

    public List<UserLeave> findAllLeavesByUserInfo(UserInfo userInfo) {
        List<UserLeave> userLeaves = userLeaveRepo.findAllByUserInfo(userInfo);
        return userLeaves;
    }
}
