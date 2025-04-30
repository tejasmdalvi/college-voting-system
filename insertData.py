import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('votingData')  # Use your actual table name here

def lambda_handler(event, context):
    print("=== Lambda triggered ===")
    print("Event received:", event)

    try:
        body = {}
        if 'body' in event and event['body']:
            try:
                body = json.loads(event['body'])
            except Exception as e:
                print("Error parsing event body:", e)
                body = event['body']
        elif 'queryStringParameters' in event and event['queryStringParameters']:
            body = event['queryStringParameters']
        elif isinstance(event, dict):
            body = event

        print("Parsed body:", body)

        student_id = body.get("studentId")
        candidate_name = body.get("candidate_name")

        if not student_id or not candidate_name:
            return {
                'statusCode': 400,
                'headers': {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
                },
                'body': json.dumps({'error': 'Missing studentId or candidate_name'})
            }

        table.put_item(Item={'studentId': student_id, 'candidate_name': candidate_name})

        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
            },
            'body': json.dumps({'message': f'Vote recorded for {candidate_name}'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,GET,POST"
            },
            'body': json.dumps({'error': str(e)})
        }