import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../helpers/AuthContext'
import axios from 'axios';

function UserChangePassword() {
    const { url, setError, setErrorMessage, setErrorType, isUser } = useContext(AuthContext);
    const [user, setUser] = useState(isUser)

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (formData.get("password") != formData.get("retypePassword")) {
            setError(true)
            setErrorType("error")
            setErrorMessage("Password validity failed")
            return
        }
        const data = user;
        data.password = formData.get("password")
        axios.post(`${url}/user/changePassword`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("userAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorMessage("Successfully changed the passowrd")
                setUser(response.data)
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
                                <div className="w-full py-2">
                                    <label htmlFor="firstName">Enter Email:</label>
                                    <input
                                        value={user.email ? user.email : "NULL"}
                                        onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                                        type="email"
                                        id="firstName"
                                        name="email"
                                        className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                </div>
                                <div className="w-full py-2">
                                    <label htmlFor="lastName">Enter new password:</label>
                                    <input
                                        type="text" id="lastName" name="password" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-5 w-full">
                                <div className="w-full">
                                    <label htmlFor="phone">Retype new password</label>
                                    <input type="password" id="phone" name="retypePassword" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
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

export default UserChangePassword