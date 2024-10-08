<%@page import="com.rachit.E_Notes_App.model.Notes" %>
<%@ page import="java.util.List" %>
<%@ page language="java" contentType="text/html; charset=US-ASCII"
    pageEncoding="US-ASCII"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "https://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=US-ASCII">
        <title>
            First JSP
        </title>
        <script>
            tailwind.config = {
              important:false,
              theme: {
                extend: {
                  colors: {
                    clifford: '#da373d',
                  }
                }
              }
            }
         </script>
        <%@include file="/views/AllLinks.jsp" %>
    </head>
    <%@ page import="java.util.Date" %>
    <body>
        <%@include file="/views/navBar.jsp"%>
        <div class="flex justify-center items-center w-[100%] min-h-100vh bg-red-700 py-10">
            <div class="flex flex-col w-[90%]">
                <p class="text-white font-bold text-4xl text-center w-[100%] my-5">All Notes</p>
                <div class="text-red-700 font-bold flex flex-col gap-5">
                    <%
                        String success = (String) session.getAttribute("success"); // Retrieve error message from session
                        if (success != null) {
                    %>
                             <div class="min-w-[90%] my-3">
                                <div class="alert alert-success" role="alert">
                                  <%=success%>
                                </div>
                             </div>
                             <%
                                 session.removeAttribute("success");
                             %>
                    <% } %>
                    <%
                        List<Notes> allNotes= (List<Notes>) session.getAttribute("notes");
                        for (int i = 0; i < allNotes.size(); i++) {
                    %>
                        <div class="min-w-[90%] text-red-800 bg-white px-5 py-2 flex- flex-col rounded-2xl border-2 border-red-800">
                            <p class="flex flex-col justify-center items-center">
                                <p class="font-bold text-3xl text-center text-red-800 border-b-2 border-red-800">
                                    Title
                                </p>
                                <p class="py-2">
                                    <%= allNotes.get(i).getTitle() %>
                                </p>
                            </p>
                            <p class="flex flex-col justify-center items-center">
                                <p class="font-bold text-3xl text-center text-red-800 border-b-2 border-red-800">
                                    Description
                                </p>
                                <p class="py-2">
                                    <%= allNotes.get(i).getDescription() %>
                                </p>
                            </p>
                            <div class="flex flex-row gap-4 justify-center items-center">
                                <button class="w-fit h-fit px-5 py-2 bg-yellow-600 text-black"><a href="/user/editNote/<%= allNotes.get(i).getId() %>" class="text-decoration-none">Edit</a></button>
                                <button class="w-fit h-fit px-5 py-2 bg-red-600 text-white"><a href="/user/deleteNote/<%= allNotes.get(i).getId() %>" class="text-decoration-none">Delete</a></button>
                            </div>
                        </div>
                    <% } %>
                </div>
            </div>
        </div>
    </body>
</html>