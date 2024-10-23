package com.rachit.Leave_Management.component;

import lombok.Data;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Data
@Scope("prototype")
public class ErrorComponent {
    private String error;
    public ErrorComponent(String error){
        this.error=error;
    }
}
