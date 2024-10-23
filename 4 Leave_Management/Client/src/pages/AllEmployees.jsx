import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';


function AllEmployees() {
    const { url, setError, setErrorMessage, setErrorType } = useContext(AuthContext);
    const [edit, setEdit] = useState(false);
    const [editClick, setEditClick] = useState(null);
    const [allEmployees, setAllEmployees] = useState([]);

    useEffect(() => {
        axios.get(`${url}/admin/allUsers`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                getRows(response.data);
            }
            else {
                setError(true)
                setErrorMessage(response.data.error);
                setErrorType("info");
            }
        })
    }, [])

    const columns = [
        { field: 'id', headerName: 'Employee ID', width: 150 },
        {
            field: 'firstName',
            headerName: 'First name',
            width: 150,
        },
        {
            field: 'lastName',
            headerName: 'Last name',
            width: 150,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 150,
            // valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            width: 150,
        },
        {
            field: 'designation',
            headerName: 'Designation',
            width: 150,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton color="primary" onClick={() => { setEditClick(params.row), setEdit(true) }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteClick(params.row)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        }
    ];

    const handleEdit = (row) => {
        edit(true);
        editClick(row)
    }

    const getRows = (responseRows) => {
        let allRows = [];
        responseRows.map((row, i) => {
            allRows.push({
                id: row.user.id,
                firstName: row.firstName ? row.firstName : "NULL",
                lastName: row.lastName ? row.lastName : "NULL",
                phone: row.phone ? row.phone : 0,
                gender: row.gender ? row.gender : "NULL",
                designation: row.designation ? row.designation : "NULL",
                user: row.user
            });
        })
        setAllEmployees(allRows);
    }

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.post(`${url}/admin/updateUser`, editClick, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorMessage(response.data)
                setErrorType("success");
                setAllEmployees((prevEmployees) =>
                    prevEmployees.map((emp) =>
                        emp.id === editClick.id ? editClick : emp
                    )
                );
            }
            else {
                setError(false);
                setErrorType("error")
                setErrorMessage(response.data.error);
            }
        })
    }

    const handleDeleteClick = (row) => {
        axios.post(`${url}/admin/employee/delete`, row, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorType("success")
                setErrorMessage("Successfully deleted the user..!!!");
                getRows(response.data);
            }
            else {
                setError(true)
                setErrorType("info")
                setErrorMessage(response.data.error);
            }
        }).catch((e) => {
            setError(true)
            setErrorType("info")
            setErrorMessage(e.response.data.error);
        })
    }


    return (
        <div className={`${edit ? "relative min-h-[120vh]" : "min-h-lvh"} bg-red-800 flex justify-center py-10 items-center`}>
            <div className='relative flex justify-center items-center flex-col'>
                <p className='relative text-white text-3xl py-5 font-extrabold text-center'>All Employees Details</p>
                <div className='relative bg-white rounded-2xl w-[70%]'>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={allEmployees}
                            columns={columns}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 5,
                                    },
                                },
                            }}
                            sx={{ borderRadius: "1rem" }}
                            className='p-5 rounded-3xl'
                            pageSizeOptions={[5]}
                            checkboxSelection={false}
                            disableRowSelectionOnClick
                        />
                    </Box>
                </div>
            </div>
            {edit && (
                <div className='absolute z-20 top-0 left-0 flex justify-center items-center py-10 min-h-lvh w-full backdrop-blur-2xl'>
                    <div className='bg-white border-2 border-yellow-400 text-red-800 font-bold p-10 rounded-3xl flex justify-center items-center'>
                        <form action="POST" onSubmit={handleEditSubmit} className="flex flex-col justify-center items-center w-full">
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-wrap w-full">
                                    <div className="w-full">
                                        <label htmlFor="firstName">Enter First Name:</label>
                                        <input
                                            value={editClick.firstName}
                                            onChange={(e) => setEditClick(prev => ({ ...prev, firstName: e.target.value }))}
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="lastName">Enter Last Name:</label>
                                        <input value={editClick.lastName}
                                            onChange={(e) => setEditClick(prev => ({ ...prev, lastName: e.target.value }))} type="text" id="lastName" name="lastName" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-5 w-full">
                                    <div className="w-full">
                                        <label htmlFor="phone">Enter Phone:</label>
                                        <input value={editClick.phone}
                                            onChange={(e) => setEditClick(prev => ({ ...prev, phone: e.target.value }))} type="text" id="phone" name="phone" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                    </div>
                                    <div className="w-full flex flex-col gap-2">
                                        <label htmlFor="gender">Select Gender</label>
                                        <select value={editClick.gender}
                                            onChange={(e) => setEditClick(prev => ({ ...prev, gender: e.target.value }))} className="border border-red-800 px-5 py-3 rounded-2xl w-full" name="gender" id="gender">
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
                                        <select value={editClick.designation}
                                            onChange={(e) => setEditClick(prev => ({ ...prev, designation: e.target.value }))} className="border border-red-800 px-5 py-3 rounded-2xl w-full" name="designation" id="designation">
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
                            <button className="bg-red-800 text-white font-bold px-5 py-3 w-full mt-5">Submit</button>
                            <button onClick={() => setEdit(false)} className="bg-red-800 text-white font-bold px-5 py-3 w-full mt-5">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllEmployees