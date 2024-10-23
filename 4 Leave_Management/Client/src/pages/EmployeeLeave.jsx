import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../helpers/AuthContext';

function EmployeeLeave() {
    const { url, setError, setErrorMessage, setErrorType } = useContext(AuthContext);
    const [employees, setEmployees] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null)

    useEffect(() => {
        axios.get(`${url}/admin/allUsers`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setEmployees(response.data);
            }
            else {
                setError(true)
                setErrorType("info")
                setErrorMessage(response.data.error)
            }
        }).catch((e) => {
            setError(true)
            setErrorType("info")
            setErrorMessage(e.response.data.error);
        })
    }, [])

    const handleLeaveSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const u = formData.get("user");
        if (u == "") {
            setError(true)
            setErrorType("info")
            setErrorMessage("Please select an employee..")
            return;
        }
        const data = {
            userInfo: employees && u != "" ? employees.find((emp) => emp.user.id == u) : "null",
            fromDate: formData.get("from"),
            tillDate: formData.get("till"),
            reason: formData.get("reason")
        }
        axios.post(`${url}/admin/employee/addLeave`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorType("success")
                setErrorMessage(response.data)
            }
            else {
                setError(true)
                setErrorType("info")
                setErrorMessage(response.data.error)
            }
        }).catch((e) => {
            setError(true)
            setErrorType("info")
            setErrorMessage(e.response.data.error ? e.response.data.error : e.response.data)
        })
        e.target.reset();
    }

    return (
        <div className='flex justify-center items-center'>
            <div>
                <p className='text-white font-extrabold text-center text-3xl py-5'>Employee Leave</p>
                <div className="w-full bg-white text-red-800 font-bold p-10 rounded-3xl flex justify-center items-center">
                    <form onSubmit={handleLeaveSubmit} action="POST" className="flex flex-col justify-center items-center w-full">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-wrap gap-5 w-full">
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="designation">Employee ID :</label>
                                    <select className="border border-red-800 px-5 py-3 rounded-2xl w-full" name="user" id="designation">
                                        <option default value="">Select Employee</option>
                                        {employees && employees.map((emp, i) => {
                                            return (
                                                <option key={i} value={emp.user.id}>{emp.user.id} - {emp.firstName} {emp.lastName}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="reason">Leave Reason :</label>
                                    <input type="text" id="reason" name="reason" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-5 w-full">
                                <div className="w-full">
                                    <label htmlFor="fromDate">From Date :</label>
                                    <input required type="date" id="fromDate" name="from" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="toDate">To Date :</label>
                                    <input required type="date" id="toDate" name="till" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                </div>
                            </div>
                        </div>
                        <button className="bg-red-800 text-white font-bold px-5 py-3 w-full mt-5">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EmployeeLeave