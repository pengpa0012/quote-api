import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import AWS from "aws-sdk"

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "Quotes";

export const updateQuote = async (event: APIGatewayProxyEvent) => {
  const id = event.pathParameters?.id;
  const { author, quote } = JSON.parse(event.body || "{}");

  const params = {
    TableName: tableName,
    Key: {
      id: id
    },
    UpdateExpression: "set author = :a, quote = :q",
    ExpressionAttributeValues: {
      ":a": author,
      ":q": quote
    },
    ReturnValues: "UPDATED_NEW"
  };

  try {
    const data = await dynamoDB.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Quote updated successfully",
          updatedItem: data.Attributes
        },
        null,
        2
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: "Cannot update Quote"
        },
        null,
        2
      ),
    };
  }
};