import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';
import { Ec2Instance } from '../amplify/data/types';


export interface InstanceTableProps {
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

    return (
        <DataGrid
            loading={props.ec2list.length == 0}
            columns={columns}
            rows={props.ec2list}
            pagination={true}
            pageSizeOptions={[5, 10, 25]}
            initialState={initialState}
        />
    )
}
