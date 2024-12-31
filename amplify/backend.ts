import * as dotenv from "dotenv";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { defineBackend } from '@aws-amplify/backend';
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";

const branch = process.env.GIT_BRANCH;
const envPath = ['.env'];
if (branch) envPath.push(`.env.${branch}`);
dotenv.config({ path: envPath });

const backend = defineBackend({
});

const backendStack = backend.createStack('research');

const test = new nodejs.NodejsFunction(backendStack, `lambda_${branch}`, {
  runtime: lambda.Runtime.NODEJS_20_X,
  entry: 'amplify/lambda.ts',
  handler: 'handler',
  environment: {
    DB_CONNECTION: process.env.DB_CONNECTION as string | '',
  }
});

const api = new appsync.GraphqlApi(backendStack, `APS_${branch}`, {
  name: `APS_${branch}`,
  definition: appsync.Definition.fromSchema(
    appsync.SchemaFile.fromAsset("amplify/schema.graphql") // graphql schema
  )
});

const datasource = api.addLambdaDataSource(`lambda_${branch}`, test);
datasource.createResolver("APR", {
  typeName: 'Query',
  fieldName: 'test',
});
