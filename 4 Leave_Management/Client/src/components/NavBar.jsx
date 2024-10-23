import React, { useContext, useEffect, useState } from 'react';
import { logo } from '../../public';
import { AuthContext } from '../helpers/AuthContext';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { deepPurple, yellow } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NavBar() {
    const navigate = useNavigate();
    const { url, toggleDrawer, error, setError, errorMessage, setErrorMessage, errorType, setErrorType, isUser, isAdmin } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        localStorage.removeItem("adminAccessToken")
        localStorage.removeItem("userAccessToken")
        setAnchorEl(null);
        navigate("/login")
    };



    return (
        <nav className="bg-red-800 text-white flex justify-between items-center py-2 px-4 md:px-10 border-b-2 border-b-white">
            {/* Left Side (Hamburger Menu) */}
            <Button style={{ color: "white" }} onClick={toggleDrawer(true)} className="md:hidden">
                <MenuIcon />
            </Button>

            {/* Logo */}
            <img src={logo} alt="logo" className="w-8 h-8 md:w-12 md:h-12 rounded-full" />

            {/* Right Side (Avatar + Menu) */}
            {(isUser || isAdmin) && (
                <div className="flex items-center">
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <Avatar sx={{ bgcolor: 'yellow', color: "black" }}>R</Avatar>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
