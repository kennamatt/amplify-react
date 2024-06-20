import { Authenticator } from '@aws-amplify/ui-react'
import { InstanceTable, Ec2Instance } from './InstanceTable';

import '@aws-amplify/ui-react/styles.css'
import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";


function App() {
  const [ec2List, setEc2List] = useState<Ec2Instance[]>([]);
  const [errMsg, setErrMsg] = useState<String>("");

  function getEc2Instances() {
    const client = generateClient<Schema>();
    const queries = client.queries;
    return queries.ec2List({ data_type: "fake" })
  }

  // Ec2Instance filter for removing nulls from an array with explicit type predicate
  function notNull(value: Ec2Instance | null): value is Ec2Instance {
    return value !== null;
  }

  useEffect(
    () => {
      const fetchInstances = async () => {
        try {
          const { data, errors } = await getEc2Instances()
          if (data) {
            // The incoming list ahderes to the DAO and we could mostly use that
            // But its probably cleaner to just slide into a better data type now
            let list: Ec2Instance[] = data.list.filter(notNull) ?? []
            setEc2List(list)
            setErrMsg("")
          } else if (errors) {
            setErrMsg(JSON.stringify(errors))
          } else {
            console.error("somethings up...no data no errors")
          }
        } catch (e) {
          // TFW js is still too awful for ts to hide...
          if (e instanceof Error) {
            setErrMsg(e.message)
          }
        }
      }
      // Fire off the promise asynchronously
      fetchInstances()
    }, []
  );

  // The authenticator widgets are going to carry Amplify CSS while the 
  // table will probably be some other less clunky pile of widgets and CSS (probably MUI)
  // Button could go either way at this point
  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <h1>Ec2 Instances</h1>
          <h2>{
            // There's a lot of room for a better error handler than this
            errMsg
          }</h2>
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
