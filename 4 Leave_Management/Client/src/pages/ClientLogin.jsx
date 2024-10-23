import React, { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import { loginLeave } from '../../public';
import { Link } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ClientLogin() {
    const navigate = useNavigate();
    const { url, error, setError, errorMessage, setErrorMessage, errorType, setErrorType } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            email: formData.get("email"),
            password: formData.get("password")
        }
        axios.post(`${url}/login`, data).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorType("success")
                setErrorMessage("Logged in Successfully")
                localStorage.setItem("adminAccessToken", response.data);
                navigate("/")
            }
            else {
                setError(true)
                setErrorMessage(response.data.error)
                setErrorType("warning")
            }
        }).catch((error) => {
            setError(true);
            setErrorMessage(error.response.data.error);
            setErrorType("warning");
        })
        e.target.reset();
    }

    const handleClose = () => {
        setError(false);
        setErrorMessage(null)
        setErrorType(null)
    }

    return (
        <div className='bg-red-800 py-10 min-h-[100vh] w-full flex flex-col justify-center items-center px-5 md:px-10'>
            {error && (
                <div>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        autoHideDuration={6000}
                        key={'top' + 'center'}
                        open={error}
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
            )
            }
            <div className='bg-white w-full md:w-[60%] p-5 md:p-10 rounded-2xl'>
                <p className='text-red-800 font-extrabold text-2xl md:text-4xl text-center'>Admin Login</p>
                <div className='flex flex-col md:flex-row gap-5 md:gap-3 py-5 md:py-10'>
                    <form onSubmit={handleSubmit} action="POST" className='w-full md:w-1/2 flex flex-col gap-5'>
                        <div className='flex flex-col'>
                            <label className='text-red-800 font-bold text-lg md:text-xl' htmlFor="email">Enter Email:</label>
                            <input className='w-full px-5 py-3 md:px-10 md:py-5 rounded-2xl border-2 border-red-800' type="email" id="email" name="email" />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-red-800 font-bold text-lg md:text-xl' htmlFor="password">Enter Password:</label>
                            <input className='w-full px-5 py-3 md:px-10 md:py-5 rounded-2xl border-2 border-red-800' type="password" id="password" name="password" />
                        </div>
                        <button className='bg-red-800 px-5 py-2 md:px-10 md:py-3 text-white font-bold w-full md:w-fit mx-auto'>Login</button>
                        <p>Login as a User ? <span className='text-red-800 font-bold'><Link to="/login/user">Login</Link></span></p>
                    </form>
                    <div className='bg-red-800 rounded-2xl p-1 w-full md:w-1/2 flex items-center justify-center'>
                        <img src={loginLeave} className='rounded-2xl w-full h-full' alt="login pic" />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default ClientLogin;
