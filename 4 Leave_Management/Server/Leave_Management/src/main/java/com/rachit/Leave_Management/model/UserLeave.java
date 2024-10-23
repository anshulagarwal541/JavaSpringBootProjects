package com.rachit.Leave_Management.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Component
@Scope("prototype")
public class UserLeave {

    public enum LeaveStatus {
        PENDING, APPROVED, REJECTED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String reason;

    private String fromDate;

    private String tillDate;

    @Enumerated(EnumType.STRING)
    private LeaveStatus status = LeaveStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserInfo userInfo;

}
