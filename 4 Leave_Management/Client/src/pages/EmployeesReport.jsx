import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';


function EmployeesReport() {
    const { url, setError, setErrorMessage, setErrorType } = useContext(AuthContext);
    const [edit, setEdit] = useState(false);
    const [editClick, setEditClick] = useState(null);
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        axios.get(`${url}/admin/employees/leaves`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                getRows(response.data)
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
    }, [])

    const getRows = (response) => {
        let ans = [];
        response.map((row, i) => {
            ans.push({
                id: row.id,
                name: row.userInfo.firstName + row.userInfo.lastName,
                status: row.status,
                reason: row.reason ? row.reason : "Not defined",
                from: row.fromDate,
                till: row.tillDate,
                userInfo: row.userInfo
            })
        })
        setLeaves(ans);
    }

    const columns = [
        { field: 'id', headerName: 'Leave ID', width: 150 },
        {
            field: 'name',
            headerName: 'Employee Name',
            width: 200,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 150,
            renderCell: (param) => (
                <div>
                    <select value={param.row.status} onChange={(e) => handleStatus(param.row, e.target.value)} name="status" id="status">
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approved</option>
                        <option value="REJECTED">Rejected</option>
                    </select>
                </div>
            )
        },
        {
            field: 'reason',
            headerName: 'Reason',
            width: 150,
        },
        {
            field: 'from',
            headerName: 'From',
            width: 150,
        },
        {
            field: 'till',
            headerName: 'Till',
            width: 150,
        },
        {
            field: 'actions',
            headerName: 'Edit',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton color="primary" onClick={() => { handleEdit(params.row) }}>
                        <EditIcon />
                    </IconButton>
                </div>
            ),
        }
    ];

    const handleEdit = (row) => {
        setEdit(true)
        //console.log(row)
        const data={
            fromDate:row.from,
            tillDate:row.till,
            userInfo:row.userInfo,
            reason:row.reason,
            status:row.status
        }
        setEditClick(data)
    }

    const handleStatus = (row, value) => {
        const updatedLeaves = row
        updatedLeaves.status = value;
        const data = {
            fromDate: updatedLeaves.from,
            tillDate: updatedLeaves.till,
            userInfo: updatedLeaves.userInfo,
            reason: updatedLeaves.reason,
            status: updatedLeaves.status
        }
        axios.put(`${url}/admin/employee/leave/status`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                getRows(response.data);
                setError(true)
                setErrorType("success")
                setErrorMessage("Successfully updated the status")
            }
        }).catch((e) => {
            setError(true)
            setErrorType("info")
            setErrorMessage(e.response.data.error ? e.response.data.error : e.response.data)
        })

    }

    const handleDateChange = (e) => {
        e.preventDefault();
        let data = editClick;
        console.log(data)
        axios.put(`${url}/admin/employee/leave`, data, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("adminAccessToken")}`
            }
        }).then((response) => {
            if (!response.data.error) {
                setError(true)
                setErrorMessage("Successfully updated the dates..")
                setErrorType("success")
                getRows(response.data)
            }
        }).catch((e) => {
            setError(true)
            setErrorType("info")
            setErrorMessage(e.response.data.error ? e.response.data.error : e.response.data)
        })
    }


    return (
        <div className={`${edit ? "relative" : ""} bg-red-800 min-h-[100vh] flex justify-center items-center`}>
            <div className='relative flex justify-center items-center flex-col'>
                <p className='relative text-white text-3xl py-5 font-extrabold text-center'>Employees Leave</p>
                <div className='relative bg-white rounded-2xl w-[90%]'>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={leaves}
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
                <div className='absolute z-20 top-0 left-0 flex justify-center items-center min-h-full w-full backdrop-blur-2xl'>
                    <div className='bg-white border-2 border-yellow-400 rounded-2xl text-red-800 font-bold p-10 flex justify-center items-center'>
                        <form action="POST" onSubmit={handleDateChange} className="flex flex-col justify-center items-center w-full">
                            <div className="flex flex-col gap-5 w-full">
                                <div className="flex flex-wrap gap-5 w-full">
                                    <div className="w-full">
                                        <label htmlFor="fromDate">From Date :</label>
                                        <input onChange={(e)=>{setEditClick({...editClick, fromDate:e.target.value})}} required type="date" value={editClick.fromDate} id="fromDate" name="fromDate" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="toDate">To Date :</label>
                                        <input onChange={(e)=>{setEditClick({...editClick, tillDate:e.target.value})}} required type="date" id="toDate" value={editClick.tillDate} name="tillDate" className="border border-red-800 rounded-2xl px-5 py-3 w-full" />
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className="bg-red-800 text-white font-bold px-5 py-3 w-full mt-5">Submit</button>
                            <button onClick={() => { setEdit(false) }} className="bg-red-800 text-white font-bold px-5 py-3 w-full mt-5">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EmployeesReport