import { type ClientSchema, a, defineData, defineFunction } from "@aws-amplify/backend";

export const ec2_list = defineFunction({
  entry: './ec2_list/handler.ts'
});

// Huge opportunity here to create DAO types that can build this from annotation, reflection and inheritence
// Let's be honest, this is clunky AF and even worse to duck-type from the UI
const schema = a.schema({
  Ec2Instance: a.customType({
    name: a.string().required(), // e.g. "server 10" 
    id: a.string().required(), // e.g. a-123456abcd
    type: a.string().required(), // e.g. t2.medium
    state: a.string().required(), // e.g. running
    az: a.string().required(), // e.g. “us-east-1b”
    public_ip: a.string().required(), // e.g. “54.210.167.204"
    private_ip: a.string().required(),
  }),
  
  // This Model isn't really what we want, but Amplify doesn't export custom types
  // This leaves us strapped with a backing DB for this and convenience methonds on it
  // as well as "required DB fields" like id, createdAt, updatedAt, but whatever.  POC/prototype
  Ec2InstanceListDAO: a.model({
    list: a.ref('Ec2Instance').array().required(),
    debug: a.string(),
  }).authorization(allow => [allow.authenticated()]),

  ec2List: a.query()
    .returns(a.ref('Ec2InstanceListDAO'))
    .handler(a.handler.function(ec2_list))
    .arguments( { data_type: a.string() } )
    .authorization(allow => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
});