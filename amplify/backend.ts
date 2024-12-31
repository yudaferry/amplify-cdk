import * as dotenv from "dotenv";
import { defineBackend, secret } from '@aws-amplify/backend';

const branch = process.env.GIT_BRANCH;
const envPath = ['.env'];
if (branch) envPath.push(`.env.${branch}`);
dotenv.config({ path: envPath });

// import * as cdk from "aws-cdk-lib";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
console.log("========== process.argv ==========");
console.log(JSON.stringify(process.env, null, 2));
console.log(process.env.GIT_BRANCH);
console.log(process.env.AWS_BRANCH);
console.log(process.env.DB_CONNECTION);
const backend = defineBackend({
});

const backendStack = backend.createStack('researchCDKonAmplify');

new nodejs.NodejsFunction(backendStack, 'research_lambda', {
  runtime: lambda.Runtime.NODEJS_20_X,
  entry: 'amplify/research_lambda.ts',
  handler: 'handler',
  environment: {
    DB_CONNECTION: process.env.DB_CONNECTION as string | '',
  }
});
