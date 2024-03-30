import { DynamoDB } from 'aws-sdk';

const awsConfig = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'ap-southeast-2',
};

// Pass the configuration to DynamoDB client
const docClient = new DynamoDB.DocumentClient(awsConfig);

export async function GET(req: any, res: any) {
    // Extract 'team_id' from the query string
    const team_id = req.nextUrl.searchParams.get('team_id');
    console.log('Handling GET request on /api/getTeamScores', team_id);

    // Ensure team_id is a string and convert to number
    const numericTeamId = Number(team_id);
    // Early return if numericTeamId is NaN
    if (isNaN(numericTeamId)) {
        return res.status(400).json({ error: "Invalid team_id" });
    }

    const params = {
        TableName: 'leaderboard',
        IndexName: 'team_id-submitted_at-index',
        KeyConditionExpression: "team_id = :teamValue",
        ExpressionAttributeValues: {
            ":teamValue": numericTeamId,
        },
        ProjectionExpression: "main_trial, class_name, mean_profit, seconds_elapsed, std_profit, score, team_name, git_commit_hash, submitted_at, error_traceback",
        ScanIndexForward: false,
        Limit: 4,
    };

    // console.log('Querying DynamoDB with params:', params);

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