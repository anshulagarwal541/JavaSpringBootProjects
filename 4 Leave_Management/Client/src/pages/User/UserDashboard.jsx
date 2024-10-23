import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../helpers/AuthContext';
import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';

function UserDashboard({ children }) {
    const [open, setOpen] = useState(false);
    const { url, error, setError, errorMessage, setErrorMessage, errorType, setErrorType } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isUser, setIsUser]=useState(null)

    useEffect(() => {
        axios.get(`${url}/user/`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("userAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setIsUser(response.data);
            }
        }).catch((e) => {
            setError(true)
            setErrorType("info")
            setErrorMessage(e.response.data.error ? e.response.data.error : e.response.data)
        })
    }, [])

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleClose = () => {
        setError(false);
        setErrorMessage(null)
        setErrorType(null)
    }

    return (
        <AuthContext.Provider value={{
            url,
            open, setOpen,
            toggleDrawer,
            error, setError,
            errorMessage, setErrorMessage,
            errorType, setErrorType,
            isUser, setIsUser,
            isAdmin, setIsAdmin
        }}>
            <div className="flex flex-col min-h-screen">
                {error && (
                    <div>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            autoHideDuration={6000}
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
                )}

                {/* Sidebar */}
                <div className={`h-full`}>
                    <SideBar />
                </div>

                {/* Main content area */}
                <div className="flex-1 flex flex-col w-full min-h-full">
                    {/* NavBar */}
                    <NavBar />

                    {/* Page content */}
                    <main className="flex-1 bg-red-800">
                        {children}
                    </main>
                </div>
            </div>
        </AuthContext.Provider>
    );
}

export default UserDashboard;