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
public class UserInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String firstName;
    private String lastName;
    private long phone;
    private String gender;
    private String designation;
    @OneToOne
    @JoinColumn(name = "user_id") // Specify the foreign key column
    private User user;
}
