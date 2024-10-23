import React, { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContext';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';

function AddEmployee() {
    const { url, isUser, setIsUser, error, errorMessage, errorType, setError, setErrorMessage, setErrorType } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        axios.post(`${url}/admin/addEmployee`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorType("success")
                setErrorMessage("Successfully added the employee...");
            }
            else {
                setError(true)
                setErrorType("error")
                setErrorMessage(response.data.error);
            }
        }).catch((e) => {
            setError(true)
            setErrorType("info")
            setErrorMessage(e.response.data.error);
        })
        e.target.reset();
    }

    const handleClose = () => {
        setError(false);
        setErrorMessage(null)
        setErrorType(null)
    }

    return (
        <div className="bg-red-800 min-h-[100vh] flex justify-center items-center px-4 py-10">
            {/* {error && (
                <div>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={6000}
                        onClose={handleClose}>
                        <Alert
                            onClose={handleClose}
                            severity={errorType}
                            variant="filled"
                            sx={{ width: '100%' }}
                        >
                            {errorMessage}
                        </Alert>
                    </Snackbar>
                </div>
            )} */}
            <div className="flex justify-center items-center flex-col w-full max-w-4xl">
                <p className="text-white font-extrabold text-2xl text-center py-10">Add Employee</p>
                <div className="w-full bg-white text-red-800 font-bold p-10 rounded-3xl flex justify-center items-center">
                    <form onSubmit={handleSubmit} action="POST" className="flex flex-col justify-center items-center w-full">
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex flex-wrap gap-5 w-full">
                                <div className="w-full flex flex-col gap-2">
                                    <label htmlFor="email">Enter Email:</label>
                                    <input type="email" id="email" name="email" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                </div>
                            </div>
                            <div className="w-full flex flex-col gap-2">
                                <label htmlFor="password">Enter password:</label>
                                <input type="password" id="password" name="password" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                            </div>
                        </div>
                        <button className="bg-red-800 text-white font-bold px-5 py-3 w-full mt-5">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddEmployee;
