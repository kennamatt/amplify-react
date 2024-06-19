import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

type Ec2Instance = Schema["Ec2InstanceModel"]["type"] | null

function App() {
  const [ec2List, setEc2List] = useState<Array<Ec2Instance>>([]);
  const [errMsg, setErrMsg] = useState<String>("");


  function getEc2Instances() {
    const client = generateClient<Schema>();
    const queries = client.queries; 
    setErrMsg( JSON.stringify(queries) )
    return queries.ec2_list({})
  }

  useEffect(
    () => {
      const fetchInstances = async () => {
        const { data, errors } = await getEc2Instances()
        if (data) {
          setEc2List(data)
        } else if (errors){
          setErrMsg(errors.toString())
        } else {
          console.info("something up")
        }
      }
      // Fire off the call asynchronously
      fetchInstances()
    }, []
  );

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <h1>Ec2 Instances</h1>
          <h2>{errMsg}</h2>
          <ul>
            {ec2List.map((ec2Inst) => {
              if (!ec2Inst) return null
              return (<li key={ec2Inst.id}>{ec2Inst.name}</li>)
            })}
          </ul>
          <div>
            <br />
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>

      )}
    </Authenticator>
  );
}

export default App;
