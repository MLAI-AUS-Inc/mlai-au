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
  
    const teamIDs = Array.from({ length: 5 }, (_, i) => i + 1);
    const leaderboardData = [];
  
    for (const teamID of teamIDs) {
      const params = {
        TableName: "leaderboard",
        KeyConditionExpression: "team_id = :team_id",
        ExpressionAttributeValues: {
          ":team_id": teamID,
        },
        ProjectionExpression: "team_id, score, team_name, git_commit_hash, submitted_at, error_traceback, city",
        ScanIndexForward: false,
        Limit: 1,
      };
  
      try {
        const data = await docClient.query(params).promise();
        if (data.Items) {
          console.log('Query successful, items returned:', data.Items.length);
          leaderboardData.push(...data.Items);
        }
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
  
    return new Response(JSON.stringify({ data: leaderboardData }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

