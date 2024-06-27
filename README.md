# Amplify-React
Is a simple POC that meets the following requirements:

- Application has a web interface
- Users must login with the correct credentials
- Users see a table of all active EC2 instances
- For each EC2 instance, at least the following attributes are displayed: name, id (e.g. a-123456abcd), type (e.g. t2.medium), state (e.g. running), az (e.g. “us-east-1b”), public IP (e.g. “54.210.167.204"), private IPs (e.g. “10.20.30.40”).
- Results are sortable by attribute (e.g. by name, type, etc.)
- Results are paged (no requirements are given about exactly how paging should work)
- If you need to generate fake data consider using faker.js (https://github.com/faker-js/faker 

## Steps to recreate/duplicate:
1. Follow https://docs.amplify.aws/react/start/quickstart/ for a suitable framework--in this case, a React App for AWS Amplify V2.
1. Create or duplicate a new repo to host an amplify app (there are a number of steps here)
https://github.com/new?template_name=amplify-vite-react-template&template_owner=aws-samples&name=amplify-vite-react-template&description=My%20Amplify%20Gen%202%20starter%20application (Create)
https://github.com/kennamatt/amplify-react (Duplicate this)
1. Add Amplify repo to Amplify at:
https://us-east-1.console.aws.amazon.com/amplify/create/add-repo (requires AWS account with appropriate permission)
1. Map appropriate EC2 visibility permissions (the duplicated repo requires ec2:DescribeInstances and ec2:DescribeRegions)
    - From AWS, Go to IAM -> Roles
    - Find the role responsible for lambda execution (Search for "Lambda" and select the entity with "AWS Service: lambda")
    - Open the Role, select "Add permission"; 
    - from here you want to attach a policy that enables "ec2:DescribeInstances" for all resources and "ec2:DescribeRegions", inline is simpler for demo purposes--but having a prebuilt policy for everything the lambda might do has value
1. Wait for deployment to finish (about 5 mins) (was: https://us-east-1.console.aws.amazon.com/amplify/apps)
    - Amplify will self-deploy commits according to how it was set up earlier.
1. Check app was deployed... (in this case https://main.d3fw8k9qk4e2l7.amplifyapp.com/ )
1. To run a local copy of the Amplify app, it needs to know what the corresponding AWS output are...Download `amplify_outputs.json` from "deployments" => "deployed backend resources" and copy the downloaded file to the root of the to local repo.

## Question and Answers assumed around expediency:
Q. Is the app expected to handle "large" datasets?

A. No.  Expedient because allowing UIs to paginate and sort data instead of backends 
is generally more convenient than mapping out sorted pagination contracts.  
Assume 10s of ec2 instances and that a larger dataset would warrant a differnt backend approach. 
---
Q. Is the app expected to be running in the same AWS cloud as the ec2 servers?

A. Yes.  Expediant as it doesn't require additional credentials or configuration
---
Q. Is Amplify's authN/Z layering sufficient for "correct credentials"?

A. Yes.  Expedient because its on par with a lot of auth tooling in terms of 
features--and highly simple/convenient to set up.
Assume the real world will definitely look like something else--but the specifics are 
not substantially more complicated than most real world Auth--just less convenient.
---
Q. Are we expecting specs or high spec coverage?

A. No.  As a POC, assume specs are mostly just duplicating effort
---
Q. Are we expecting linting?

A. Yes.  As a POC, its probably reasonable to assume things be clear and 
clean--at least some cursory linting, even if not completly configured and integrated probably has value

## License

This library is licensed under the MIT-0 License. See the LICENSE file.