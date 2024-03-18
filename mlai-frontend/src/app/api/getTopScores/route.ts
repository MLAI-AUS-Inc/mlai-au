import { DynamoDB } from 'aws-sdk';

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
    region: 'ap-southeast-2',
  };
  
  // Pass the configuration to DynamoDB client
  const docClient = new DynamoDB.DocumentClient(awsConfig);

export async function GET() {
  console.log('Handling GET request on /api/getTopScores');

  const params = {
    TableName: 'green-battery-hack',
    IndexName: 'team-commit_hash-index',
    KeyConditionExpression: 'team = :teamValue AND commit_hash = :commitHashValue',
    ExpressionAttributeValues: {
        ':teamValue': 'scream-team',
        ':commitHashValue': '098fffa0-bf29-45ef-81c8-b10d72aa62e2',
    },
    ScanIndexForward: false,
    Limit: 1,
  };

  console.log('Querying DynamoDB with params:', params);

  try {
    const data: any = await docClient.query(params).promise();
    console.log('Query successful, items returned:', data.Items.length);
    return new Response(JSON.stringify({ data: data.Items }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err: any) {
    console.error("Unable to query DynamoDB. Error:", JSON.stringify(err, null, 2));
    return new Response(JSON.stringify({ error: "Unable to query data", details: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
