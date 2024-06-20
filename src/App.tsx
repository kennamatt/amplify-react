import { Authenticator } from '@aws-amplify/ui-react'
import { InstanceTable } from './InstanceTable';

import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

// Use this types to dereference the Schema's Nonsense type
type ArrayDeref<T extends unknown[]> = T[number]

type Ec2Instance = Exclude<ArrayDeref<Schema["Ec2InstanceListDAO"]["type"]["list"]>, null>

function App() {
  const [ec2List, setEc2List] = useState<Ec2Instance[]>([]);
  const [errMsg, setErrMsg] = useState<String>("");

  function getEc2Instances() {
    const client = generateClient<Schema>();
    const queries = client.queries;
    return queries.ec2List({})
  }

  function notEmpty<T>(value: T | null ): value is T {
    return value !== null;
}

  useEffect(
    () => {
      const fetchInstances = async () => {
        const { data, errors } = await getEc2Instances()
        if (data) {
          // Assuming there really are nulls, make them disappear
          let list : Ec2Instance[] = data.list.filter(notEmpty) ?? []
          setEc2List(list)
        } else if (errors) {
          setErrMsg(JSON.stringify(errors))
        } else {
          console.error("somethings up")
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
          <InstanceTable ec2list={ec2List} />
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
