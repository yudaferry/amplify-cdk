import * as dotenv from "dotenv";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { defineBackend } from '@aws-amplify/backend';

const branch = process.env.GIT_BRANCH;
const envPath = ['.env'];
if (branch) envPath.push(`.env.${branch}`);
dotenv.config({ path: envPath });

import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";

const backend = defineBackend({
});

const backendStack = backend.createStack('researchCDKonAmplify');

const normalAPI = new appsync.GraphqlApi(backendStack, `APS_RXDB_NORMAL_${branch}`, {
  name: `NORMAL_APS_RXDB_${branch}`,
  definition: appsync.Definition.fromSchema(
    appsync.SchemaFile.fromAsset("amplify/normal-schema.graphql") // graphql schema
  )
});

const test = new nodejs.NodejsFunction(backendStack, `research_lambda_${branch}`, {
  runtime: lambda.Runtime.NODEJS_20_X,
  entry: 'amplify/research_lambda.ts',
  handler: 'handler',
  environment: {
    DB_CONNECTION: process.env.DB_CONNECTION as string | '',
  }
});

const datasource = normalAPI.addLambdaDataSource(`APD_RXDBLambda_${branch}`, test);
datasource.createResolver("APR_RXDBLogin", {
  typeName: 'Query',
  fieldName: 'test',
});
