<%@ page import="com.rachit.E_Notes_App.model.User" %>
<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "https://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
        <title>
            First JSP
        </title>
         <style>
            /* CSS for the background image */
            .bg-image {
                background-image: url('/images/notes.jpg'); /* Set your image URL here */
                background-size: cover; /* Cover the entire div */
                background-position: center; /* Center the image */
                background-repeat: no-repeat; /* Prevent image repetition */
                height: 100vh; /* Full viewport height */
                width: 100%; /* Full viewport width */
            }
        </style>
        <%@include file="/views/AllLinks.jsp" %>
    </head>
    <%@ page import="java.util.Date" %>
    <body>
        <%@include file="/views/navBar.jsp"%>

        <div class="bg-image">
            <%
                String error=(String) session.getAttribute("error");
                if(error!=null){
            %>
                <div class="card-header text-center">
                    <div class="alert alert-danger" role="alert">
                      <%=error%>
                    </div>
                </div>
                 <%
                     session.removeAttribute("error");
                 %>
            <% } %>
            <%
                String success=(String) session.getAttribute("success");
                if(success!=null){
            %>
                <div class="card-header text-center">
                    <div class="alert alert-success" role="alert">
                      <%=success%>
                    </div>
                </div>
                 <%
                     session.removeAttribute("success");
                 %>
            <% } %>
        </div>
    </body>
</html>