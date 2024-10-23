import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helpers/AuthContext';

function UserAddLeave() {
  const { url, setError, setErrorMessage, setErrorType, isUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
      axios.get(`${url}/user/userInfo`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("userAccessToken")}`
        }
      }).then((response) => {
        if (!response.data.error) {
          setUserInfo(response.data);
          console.log(response.data)
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
    const data = {
      userInfo: userInfo ? userInfo : "null",
      fromDate: formData.get("from"),
      tillDate: formData.get("till"),
      reason: formData.get("reason")
    }
    axios.post(`${url}/user/addLeave`, data, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("userAccessToken")}`
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
                  <input type="text" value={isUser && isUser.id ? isUser.id : "N.A"} />
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

export default UserAddLeave