import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { Ec2Instance } from '../amplify/data/types';
import { GlobalStyles } from '@mui/material';
import React from 'react';


export interface InstanceTableProps {
    loading: boolean
    ec2list: Ec2Instance[]
}

export function InstanceTable(props: InstanceTableProps): JSX.Element {
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'id', headerName: 'ID', width: 140 },
        { field: 'type', headerName: 'Type', width: 140 },
        { field: 'state', headerName: 'State', width: 140 },
        { field: 'az', headerName: 'Availability Zone', width: 150 },
        { field: 'public_ip', headerName: 'Public IP', width: 150 },
        { field: 'private_ip', headerName: 'Private IP', width: 150 },
    ];

    const initialState: GridInitialStateCommunity = {
        pagination: {
            paginationModel: {
                pageSize: 5
            }
        },
        sorting: {
            sortModel: [
                { field: 'name', sort: 'asc' }
            ]
        }
    };


    return (<>
        <GlobalStyles styles={{
            // Fix visibility conflicts between MUI popups (spawned by, but not children of; the DataGrid component)
            // and amplify--using a MUI component as other CSS will be overridden (yes, its hacky)
            '.MuiList-root': {
                'backgroundColor': 'whitesmoke',
                'color': 'darkviolet',
                'padding': '6px',
            }
        }} />
        <DataGrid
            loading={props.loading}
            columns={columns}
            rows={props.ec2list}
            pagination={true}
            pageSizeOptions={[5, 10, 25]}
            initialState={initialState}

        />
    </>
    )
}
