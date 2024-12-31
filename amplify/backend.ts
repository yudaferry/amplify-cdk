import { defineBackend, secret } from '@aws-amplify/backend';
// import * as cdk from "aws-cdk-lib";
import * as nodejs from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
console.log("========== process.argv ==========");
console.log(JSON.stringify(process.env, null, 2));
console.log(process.env.GIT_BRANCH);
console.log(process.env.AWS_BRANCH);
const backend = defineBackend({
});

const backendStack = backend.createStack('researchCDKonAmplify');

new nodejs.NodejsFunction(backendStack, 'research_lambda', {
  runtime: lambda.Runtime.NODEJS_20_X,
  entry: 'amplify/research_lambda.ts',
  handler: 'handler',
  environment: {
    NODE_ENV: secret('NODE_ENV').toString(),
  }
});
