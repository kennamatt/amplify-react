import { type Schema } from '../resource'
import { faker } from '@faker-js/faker';
import { DescribeInstancesCommand } from "@aws-sdk/client-ec2";


import { EC2Client } from "@aws-sdk/client-ec2";
import { Ec2Instance } from '../types';
// TODO ask something like ENV for this
export const REGION = "us-east-1";
export const client = new EC2Client({ region: REGION });

// Use this type to dereference the DAO's array value type from its model
type ArrayDeref<T extends unknown[]> = T[number]

type FunctionHandler = Schema["ec2List"]['functionHandler']
type FunctionHandlerReturn = Schema["ec2List"]['returnType']


enum States {
    Pending = "pending",
    Running = "running",
    ShuttingDown = "shutting-down",
    Stopping = "stopping",
    Stopped = "stopped",
    Terminated = "terminated",
}

enum AssortedSampleOfTypes {
    AType = "t3a.nano",
    BType = "c7i-flex.large",
    CType = "m7gd.16xlarge",
    DType = "is4gen.medium",
    EType = "mac2.metal",
    FType = "vt1.3xlarge",
    GType = "hpc7g.8xlarge",
    HType = "u-9tb1.112xlarge",
    IType = "m7g.metal",
    JType = "m5zn.3xlarge",
    KType = "p5.48xlarge",
    LType = "c5n.4xlarge",
}

enum AZsForUSEast1 {
    A = "us-east-1a",
    B = "us-east-1b",
    C = "us-east-1c",
    D = "us-east-1d",
    E = "us-east-1e",
    F = "us-east-1f",
}

// lambda syntax
export const handler: FunctionHandler = async (event, _context): Promise<FunctionHandlerReturn> => {
    if (event.arguments.data_type === "fake") {
        return fakeHandler()
    }
    return realHandler()
}

// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_ec2_code_examples.html
const realHandler = async (): Promise<FunctionHandlerReturn> => {
    let list: Ec2Instance[] = []

    const command = new DescribeInstancesCommand({
        // No filters.  It wouldn't be hard to add a DAO that populates one
        // But this exercise is abusing the UI for features, not the backend 
        Filters: [],
    });

    try {
        const { Reservations } = await client.send(command);
        if (Reservations) {
            Reservations.every((reservation) => {
                reservation.Instances?.every((instance) => {
                    let ec2Inst: Ec2Instance = {
                        name: instance.KeyName ?? "",
                        id: instance.InstanceId ?? "",
                        state: instance.State?.Name ?? "",
                        public_ip: instance.PublicIpAddress ?? "",
                        private_ip: instance.PrivateIpAddress ?? "",
                        type: instance.InstanceType ?? "",
                        az: instance.Placement?.AvailabilityZone ?? "",
                    }
                    list = list.concat(ec2Inst)
                })
            })
        }
    } catch (err) {
        console.error(err);
    }

    return {
        id: "real",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        list
    }

}

const fakeHandler = async (): Promise<FunctionHandlerReturn> => {

    let list: Ec2Instance[] = []

    for (let i = 0; i < 20; i++) {

        let ec2Inst: Ec2Instance = {
            name: faker.word.noun() + ' ' + 'server',
            id: faker.string.alpha(1) + '-' + faker.string.alphanumeric(10),
            state: faker.helpers.enumValue(States).toString(),
            public_ip: faker.internet.ipv4(),
            private_ip: faker.internet.ipv4(),
            type: faker.helpers.enumValue(AssortedSampleOfTypes).toString(),
            az: faker.helpers.enumValue(AZsForUSEast1).toString(),
        }
        list = list.concat(ec2Inst)
    }

    return {
        id: "fake",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        list
    }
}