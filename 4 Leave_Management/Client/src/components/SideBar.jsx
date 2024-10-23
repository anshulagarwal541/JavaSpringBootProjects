import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../helpers/AuthContext';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { logo } from '../../public';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SideBar() {
  const { open, setOpen, toggleDrawer, url, error, setError, errorType, setErrorType, errorMessage, setErrorMessage, isUser, isAdmin, setIsUser, setIsAdmin } = useContext(AuthContext);

  const DrawerList = (
    <Box className="bg-red-800 h-full" sx={{ width: 250, color: "white" }} role="presentation" onClick={toggleDrawer(false)}>
      <ListItem style={{ display: "flex", flexDirection: "column" }}>
        <img src={logo} className='w-[3rem] h-[3rem] rounded-full' alt="" />
        <p className='text-2xl font-bold'>Employees Report</p>
      </ListItem>
      <Divider style={{ color: "white" }} />
      <Link to="/">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon style={{ color: "white" }}>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider style={{ color: "white" }} />
      {isAdmin && (
        <>
          <List>
            <Link to="/admin/addEmployee">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Employee"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider style={{ color: "white" }} />
            <Link to="/admin/reports">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Leave Report"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider style={{ color: "white" }} />
          <List>
            <Link to="/admin/employee/leave">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Leaves"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider style={{ color: "white" }} />
          <List>
            <Link to="/admin/employees">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"All Employees"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </>
      )}
      {!isAdmin && !isUser && (
        <>
          <List>
            <Link to="/login">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Login"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider style={{ color: "white" }} />
          </List>
        </>
      )}
      {isUser && (
        <>
          <List>
            <Link to="/user/addLeave">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Add Leave"} />
                </ListItemButton>
              </ListItem>
            </Link>
            <Divider style={{ color: "white" }} />
            <Link to="/user/allLeaves">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"All Leaves"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider style={{ color: "white" }} />
          <List>
            <Link to="/user/leave/pending">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Pending Leaves"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider style={{ color: "white" }} />
          <List>
            <Link to="/user/leave/approved">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Approved Leaves"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider style={{ color: "white" }} />
          <List>
            <Link to="/user/details">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Profile"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
          <Divider style={{ color: "white" }} />
          <List>
            <Link to="/user/employee/password/change">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon style={{ color: "white" }}>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Change Password"} />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </>
      )}
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  )
}

export default SideBar