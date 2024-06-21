import type { Schema } from "./resource";

// TS enums suck, extracting a type as keys from a dict is the most
// practical/terse version of "set of strings" for a predicate type
//--which in a world of strings is mostly what you want anyhow
const REQUEST_DATA_TYPES = {
    fake: "fake", 
    real: "real"
};

// An indicator of what kind of data is being requested 
export type RequestDataType = keyof typeof REQUEST_DATA_TYPES;
export const isRequestDataType = (value: any): value is RequestDataType => value in REQUEST_DATA_TYPES

// Use this type to dereference the DAO's array value type from its model
type ArrayDeref<T extends unknown[]> = T[number]

export type Ec2Instance = Exclude<ArrayDeref<Schema["Ec2InstanceListDAO"]["type"]["list"]>, null>
