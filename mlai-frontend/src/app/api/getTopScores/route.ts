import { DynamoDB } from 'aws-sdk';

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, 
    region: 'ap-southeast-2',
  };
  
  // Pass the configuration to DynamoDB client
  const docClient = new DynamoDB.DocumentClient(awsConfig);

  export async function GET()  {
    
    console.log('Handling GET request on /api/getTopScores');
  
  const params = {
    TableName: "leaderboard",
    FilterExpression: "team_id BETWEEN :start_id AND :end_id",
    ExpressionAttributeValues: {
      ":start_id": 1,
      ":end_id":50,
    },
    ProjectionExpression: "team_id, score, team_name, git_commit_hash, submitted_at, error_traceback, city",
  };

  try {
    const data = await docClient.scan(params).promise();
    // Note that scan does not sort the results. You'll need to sort them after retrieval if needed.
    if (data.Items) {
        // Group items by team_id
        const groupedByTeamId = data.Items.reduce((acc, item) => {
            (acc[item.team_id] = acc[item.team_id] || []).push(item);
            console.log('acc: ', acc);
            return acc;
        }, {});

        // For each group, find the item with the latest submitted_at
        const latestSubmissions = Object.values(groupedByTeamId).map(group => {
            return group.reduce((prev: any, current: any) => {
                return (prev.submitted_at > current.submitted_at) ? prev : current;
            });
        });


        console.log('latestSubmissions: ', latestSubmissions);
      const sortedItems = latestSubmissions.sort((a, b) => b.score - a.score); // Sort by score in descending order
      console.log('sortedItems: ', sortedItems);
      return new Response(JSON.stringify({ data: sortedItems }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=1, stale-while-revalidate'
        },
      });
    } else {
      // If Items is undefined, return an empty array or handle as appropriate
      return new Response(JSON.stringify({ data: [] }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 's-maxage=1, stale-while-revalidate'
        },
      });
    }
  } catch (err: any) {
    console.error("Unable to scan DynamoDB. Error:", JSON.stringify(err, null, 2));
    return new Response(JSON.stringify({ error: "Unable to scan data", details: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=1, stale-while-revalidate'
      },
    });
  }
}
