import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ClientLogin from "./pages/ClientLogin";
import UserLogin from "./pages/UserLogin";
import { AuthContext } from "./helpers/AuthContext";
import AdminMainLayout from "./pages/AdminMainLayout";
import EmployeesReport from "./pages/EmployeesReport";
import AddEmployee from "./pages/AddEmployee";
import EmployeeLeave from "./pages/EmployeeLeave";
import AllEmployees from "./pages/AllEmployees";
import UserAddLeave from "./pages/User/UserAddLeave";
import UserAllLeaves from "./pages/User/UserAllLeaves";
import UserPendingLeaves from "./pages/User/UserPendingLeaves";
import ApprovedLeaves from "./pages/User/ApprovedLeaves";
import Profile from "./pages/User/Profile";
import UserMainLayout from "./pages/User/UserMainLayout";
import UserChangePassword from "./pages/User/UserChangePassword";

function App() {
  const url = import.meta.env.VITE_URL;
  const [count, setCount] = useState(0)
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState(null);

  return (
    <AuthContext.Provider value={{ url, error, setError, errorMessage, setErrorMessage, errorType, setErrorType }}>

      <Router>

        <Routes>

          <Route path="/" element={<AdminMainLayout />}>
            <Route path="" element={<Home />} />
          </Route>

          <Route path="/admin" element={<AdminMainLayout />}>
            <Route path="employees" element={<AllEmployees />} />
            <Route path="reports" element={<EmployeesReport />} />
            <Route path="addEmployee" element={<AddEmployee />} />
            <Route path="employee/leave" element={<EmployeeLeave />} />
          </Route>


          <Route path="/user" element={<UserMainLayout />}>
            <Route path="addLeave" element={<UserAddLeave />} />
            <Route path="allLeaves" element={<UserAllLeaves />} />
            <Route path="leave/pending" element={<UserPendingLeaves />} />
            <Route path="leave/approved" element={<ApprovedLeaves />} />
            <Route path="details" element={<Profile />} />
            <Route path="employee/password/change" element={<UserChangePassword />} />
          </Route>

          <Route path="/login" element={<ClientLogin />} />

          <Route path="/login/user" element={<UserLogin />} />

        </Routes>

      </Router>

    </AuthContext.Provider>

  )
}

export default App
