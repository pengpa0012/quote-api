import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk";

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "Quotes";

export const getQuote = async (event: APIGatewayProxyEvent) => {

  const params = {
    TableName: tableName
  };
  
  try {
    const data = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ quotes: data.Items }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Cannot get quotes" }),
    };
  }
}; 