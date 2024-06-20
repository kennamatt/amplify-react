import { DataGrid, GridColDef } from '@mui/x-data-grid';

import type { Schema } from "../amplify/data/resource";
import { GridInitialStateCommunity } from '@mui/x-data-grid/models/gridStateCommunity';

// Use this type to dereference the DAO's array value type from its model
type ArrayDeref<T extends unknown[]> = T[number]

export type Ec2Instance = Exclude<ArrayDeref<Schema["Ec2InstanceListDAO"]["type"]["list"]>, null>

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
            columns={columns}
            rows={props.ec2list}
            pagination={true}
            pageSizeOptions={[5, 10, 25]}
            initialState={initialState}
        />
    )
}
