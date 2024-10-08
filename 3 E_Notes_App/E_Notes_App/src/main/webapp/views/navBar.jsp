<!-- Tailwind Navbar -->
<%@ page import="com.rachit.E_Notes_App.model.User" %>
<nav class="bg-red-700">
  <div class="container mx-auto px-4 py-2 flex items-center justify-between">
    <a class="text-white font-bold text-xl" href="/">ENotes</a>
    <button class="text-white block lg:hidden focus:outline-none">
      <!-- Hamburger Menu Icon -->
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
    <div class="hidden lg:flex items-center space-x-6">
      <a class="text-white hover:bg-black py-2 px-4 rounded" href="/">Home</a>
      <a class="text-white hover:bg-black py-2 px-4 rounded" href="/user/addNote">Add Note</a>
      <a class="text-white hover:bg-black py-2 px-4 rounded" href="/user/notes">All Notes</a>
    </div>
    <%
        User user = (User) session.getAttribute("user");
        if(user != null) {
    %>
        <div class="hidden lg:flex items-center space-x-4">
          <p class="text-white font-bold text-xl">Welcome <%=user.getName()%></p>
          <a href="/user/logout" class="bg-yellow-400 text-black font-bold px-4 py-2 rounded hover:bg-black hover:text-white ">Logout</a>
        </div>
    <% } else { %>
        <div class="hidden lg:flex items-center space-x-4">
          <a href="/register" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Register</a>
          <a href="/login" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-black">Login</a>
        </div>
    <% } %>
  </div>
  <div class="lg:hidden">
    <div class="flex flex-col items-center space-y-2 py-2">
      <a class="text-white hover:bg-black py-2 px-4 rounded" href="/">Home</a>
      <a class="text-white hover:bg-black py-2 px-4 rounded" href="/addNote">Add Note</a>
      <a class="text-white hover:bg-black py-2 px-4 rounded" href="/notes">All Notes</a>
      <%
        user= (User) session.getAttribute("user");
        if(user != null) {
      %>
         <p class="text-white font-bold text-xl">Welcome <%=user.getName()%></p>
      <% } else { %>
        <div>
            <a href="/register" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Register</a>
            <a href="/login" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-black">Login</a>
        </div>
      <% } %>
    </div>
  </div>
</nav>
