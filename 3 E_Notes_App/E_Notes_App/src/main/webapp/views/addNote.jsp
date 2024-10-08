<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "https://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
        <title>
            Add Notes
        </title>
        <%@include file="/views/AllLinks.jsp" %>
    </head>
    <%@ page import="java.util.Date" %>
    <body class="bg-red-700">
        <%@include file="/views/navBar.jsp"%>
            <div class="container mt-5">
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="card">
                             <%
                                    String success = (String) session.getAttribute("success"); // Retrieve error message from session
                                    if (success != null) {
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
                            <div class="card-header text-center">
                                <h3>
                                    Add Note
                                </h3>
                            </div>
                            <div class="card-body">
                                <form action="/user/addNote" method="POST">
                                    <div class="mb-3">
                                        <label>
                                            Enter Title
                                        </label>
                                        <input type="text" class="form-control" name="title">
                                    </div>
                                    <div class="mb-3">
                                        <label>
                                            Enter Description
                                        </label>
                                        <input type="text" class="form-control" name="description">
                                    </div>
                                    <button class="btn btn-primary col-md-12">Add Note</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </body>
</html>