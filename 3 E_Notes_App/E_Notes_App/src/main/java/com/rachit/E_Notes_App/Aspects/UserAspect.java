package com.rachit.E_Notes_App.Aspects;


import com.rachit.E_Notes_App.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class UserAspect {

    @Around("execution(* com.rachit.E_Notes_App.controller.UserController.*(..))")
    public Object checkIsLoggedIn(ProceedingJoinPoint joinPoint) throws Throwable {
        Object[] args = joinPoint.getArgs();
        HttpServletRequest request = null;
        for (Object arg : args) {
            if (arg instanceof HttpServletRequest) {
                request = (HttpServletRequest) arg;
                break;
            }
        }
        if (request != null) {
            HttpSession session = request.getSession();
            User user = (User) session.getAttribute("user");
            if (user == null) {
                session.setAttribute("error", "You have not logged in...!!!");
                return "redirect:/login";
            }
        }
        return joinPoint.proceed();
    }

}
