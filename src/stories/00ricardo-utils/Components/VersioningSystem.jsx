import React, { useState, useEffect } from 'react'
import { Button, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios'
import rutils from '00ricardo-utils'

export const VersioningSystem = () => {
    const [localChanges, setLocalChanges] = useState({})
    const [remoteData, setRemoteData] = useState({})
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])

    const saveChanges = () => {

    }
    const handleProcessRowUpdate = (newRow, oldRow) => {
        console.log(oldRow)
        console.log(newRow)
        console.log(rows)
        console.log(rows.indexOf(oldRow))

        if (rows.includes(oldRow)) {
            let _rows_ = rutils.removeElement(rows, rows.indexOf(oldRow))
            setRows([..._rows_, newRow])
        }

    }
    useEffect(() => {
        axios.get('http://localhost:5000/projects').then((res) => {
            let columns = []
            let headers = Object.keys(res.data.data[0])
            headers.forEach(header => {
                let _h_ = {
                    field: header,
                    headerName: header,
                    width: 150,
                    editable: true,
                }
                columns.push(_h_)
            });
            setRemoteData(res.data.data)
            setRows(res.data.data)
            setColumns(columns)
        })
    }, [])
    return (
        <div>
            <Button variant="contained" onClick={() => saveChanges()}>Save</Button>
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    id="XD"
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    processRowUpdate={handleProcessRowUpdate}
                    onProcessRowUpdateError={(e) => console.log(e)}
                    editMode="row"
                />
            </Box>
        </div>
    )
}
