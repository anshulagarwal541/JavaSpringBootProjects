import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthContext } from '../../helpers/AuthContext';
import UserDashboard from './UserDashboard.jsx';

function UserMainLayout() {
    const { url, error, setError, errorMessage, setErrorMessage, errorType, setErrorType } = useContext(AuthContext);
    return (
        <AuthContext.Provider value={{ url, error, setError, errorMessage, setErrorMessage, errorType, setErrorType }}>
            <UserDashboard>
                <Outlet />
            </UserDashboard>
        </AuthContext.Provider>
    )
}

export default UserMainLayout