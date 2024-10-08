package com.rachit.E_Notes_App.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Entity
@Data
@Component
@Scope("prototype")
@NoArgsConstructor
@AllArgsConstructor
public class Notes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(length = 2000)
    private String title;
    @Column(length = 10000)
    private String description;
    @ManyToOne
    private User user;

}
