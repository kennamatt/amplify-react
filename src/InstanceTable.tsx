import type { Schema } from "../amplify/data/resource";

type Ec2InstanceListDAO = Schema["Ec2InstanceListDAO"]["type"]["list"]

export interface InstanceTableProps {
    ec2list: Ec2InstanceListDAO
}

export function InstanceTable(props: InstanceTableProps): JSX.Element {
    return (
        <ul>
            {
                props.ec2list.map((ec2Inst) =>
                    ec2Inst ?
                        (<li key={ec2Inst.id}>{ec2Inst.name}</li>) :
                        null
                )
            }
        </ul>
    )
}
