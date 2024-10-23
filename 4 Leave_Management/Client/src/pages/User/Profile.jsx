import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helpers/AuthContext'
import axios from 'axios';

function Profile() {
  const { url, setError, setErrorMessage, setErrorType } = useContext(AuthContext);
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(`${url}/user/userInfo`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userAccessToken")}`
      }
    }).then((response) => {
      if (!response.data.error) {
        setUser(response.data);
      }
    }).catch((e) => {
      setError(true)
      setErrorType("info")
      setErrorMessae(e.response.data.error ? e.response.data.error : e.response.data)
    })
  }, [])

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`${url}/user/updateUser`, user, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userAccessToken")}`
      }
    }).then((response) => {
      if (!response.data.error) {
        setError(true)
        setErrorMessage(response.data)
        setErrorType("success");
      }
      else {
        setError(false);
        setErrorType("error")
        setErrorMessage(response.data.error);
      }
    })
  }

  return (
    <div className='min-h-full flex justify-center items-center py-10'>
      {user && (
        <div className='bg-white border-2 w-[70%] mx-auto border-yellow-400 text-red-800 font-bold p-10 rounded-3xl flex justify-center items-center'>
          <form action="POST" onSubmit={handleEditSubmit} className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-5 w-full">
              <div className="flex flex-wrap w-full">
                <div className="w-full">
                  <label htmlFor="firstName">Enter First Name:</label>
                  <input
                    value={user.firstName ? user.firstName : "NULL"}
                    onChange={(e) => setUser(prev => ({ ...prev, firstName: e.target.value }))}
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                </div>
                <div className="w-full">
                  <label htmlFor="lastName">Enter Last Name:</label>
                  <input value={user.lastName ? user.lastName : "NULL"}
                    onChange={(e) => setUser(prev => ({ ...prev, lastName: e.target.value }))} type="text" id="lastName" name="lastName" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                </div>
              </div>
              <div className="flex flex-wrap gap-5 w-full">
                <div className="w-full">
                  <label htmlFor="phone">Enter Phone:</label>
                  <input value={user.phone ? user.phone : 0}
                    onChange={(e) => setUser(prev => ({ ...prev, phone: e.target.value }))} type="text" id="phone" name="phone" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="gender">Select Gender</label>
                  <select value={user.gender}
                    onChange={(e) => setUser(prev => ({ ...prev, gender: e.target.value }))} className="border border-red-800 px-5 py-3 rounded-2xl w-full" name="gender" id="gender">
                    <option default value="null">Select Gender</option>
                    <option default value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap gap-5 w-full">
                <div className="w-full flex flex-col gap-2">
                  <label htmlFor="designation">Select Designation</label>
                  <select value={user.designation}
                    onChange={(e) => setUser(prev => ({ ...prev, designation: e.target.value }))} className="border border-red-800 px-5 py-3 rounded-2xl w-full" name="designation" id="designation">
                    <option default value="">Select Design.</option>
                    <option value="softwareEng">Software Eng</option>
                    <option value="cloudEng">Cloud Eng</option>
                    <option value="testEng">Tester Eng</option>
                    <option value="iotEng">IOT Eng</option>
                    <option value="cyberSecurityEng">Cyber Security Eng</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="bg-red-800 text-white font-bold px-5 py-3 w-full mt-5">Edit</button>
            <button onClick={() => setEdit(false)} className="bg-red-800 text-white font-bold px-5 py-3 w-full mt-5">Cancel</button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Profile