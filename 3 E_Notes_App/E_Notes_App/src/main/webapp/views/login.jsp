<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "https://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
        <title>
            Login
        </title>
        <%@include file="/views/AllLinks.jsp" %>
    </head>
    <%@ page import="java.util.Date" %>
    <body class="bg-red-700">
        <%@include file="/views/navBar.jsp"%>
            <div class="containe mt-5">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="card">
                             <%
                                String error = (String) session.getAttribute("error"); // Retrieve error message from session
                                if (error != null) {
                             %>
                                     <div class="card-header text-center">
                                        <div class="alert alert-danger" role="alert">
                                          <%=error%>
                                        </div>
                                     </div>
                            <% } %>
                            <%
                                session.removeAttribute("error");
                            %>
                            <div class="card-header text-center">
                                <h3 class="text-2xl font-bold text-red-700">
                                    Login Page
                                </h3>
                            </div>
                            <div class="card-body">
                                <form action="/login" method="POST">
                                    <div class="mb-3">
                                        <label>
                                            Enter email address
                                        </label>
                                        <input type="email" class="form-control" name="email">
                                    </div>
                                     <div class="mb-3">
                                        <label>
                                            Enter password
                                        </label>
                                        <input type="password" class="form-control" name="password">
                                    </div>
                                    <button class="btn btn-primary col-md-12">Login</button>
                                </form>
                            </div>
                            <div class="card-footer text-center">
                                dont have an account ? <a href="/register" class="text-decoration-none">Create Account</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </body>
</html>