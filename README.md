# Research

This is my research about running appsync under amplify.
The appsync not wrapped on amplify data store, it will wrapped under custom CDK.
The reason is because i don't want to use dynamodb as the data source.
I want to use lambda as customer resolver, then lambda can connect to any database or any API.
I am using amplify for separated client apps like Flutter, React Native, Android, Ios, etc.
That's why in this project just have single html file, this file for fullfill the requirement of amplify.

> WARNING - this process bellow will be create:
>  - AWS Roles
>  - AWS Policies
>  - AWS S3
>  - AWS cloudFormation
>  - AWS Lambda
>  - AWS Amplify
>  - AWS Cloudwatch
> 
> PLEASE BE CAREFULLY WHEN YOU DEPLOY THIS PROJECT MULTIPLE TIMES,
> BECAUSE IT WILL CREATE MULTIPLE Roles, Policies, and Cloudwatch.
> MAKE SURE YOU DELETE IT WHEN YOU DELETE AMPLIFY PROJECT.

# How to use
## - Prerequisite
- Fork this repo

## Create Amplify Project
- open aws console, then go to amplify
- click "Deploy an app" button
  this readme created at 2024-12-30, so the button maybe different
- choose "Github" then connect to your repository
- choose repository and branch, then click "Next"
- if you use this project, you don't need to change anything on "App Settings" page, just click "Next" button
- click "Save and Deploy" button


# Explanation:
- this research code has 2 main parts, all parts writen on `amplify/backend.ts` file.
- first create CDK stack from amplify backend
  ```
    const backend = defineBackend({
    });

    const backendStack = backend.createStack('researchCDKonAmplify');

  ```

  > normally cdk stact created with cdk class
  > but in amplify, the cdk stack created with `defineBackend` function

- create appsync from CDK stack
    ```
    const api = new appsync.GraphqlApi(backendStack, `APS_${branch}`, {
      name: `APS_${branch}`,
      definition: appsync.Definition.fromSchema(
        appsync.SchemaFile.fromAsset("amplify/schema.graphql") // graphql schema
      )
    });
    ```

  > code above to create appsync with name "APS_${branch}"
  > if amplify created multiple times, the appsync name will be different, depend on git branch
  > the graphql schema file located on "amplify/schema.graphql"

- create graphql schema file
  ```
    type Query {
      test(parameter: String): String
    }
  ```

- create lambda function
  ```
    const test = new nodejs.NodejsFunction(backendStack, `lambda_${branch}`, {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: 'amplify/lambda.ts',
      handler: 'handler',
      environment: {
        DB_CONNECTION: process.env.DB_CONNECTION as string | '',
      }
    });
  ```

  > code above to create lambda function with name "lambda_${branch}"
  > the lambda function will be created with nodejs 20.x runtime
  > the handler function is "handler", so later on lambda function should export "handler" function
  > the lambda function should be placed in to "amplify/lambda.ts" 

- create data source for appsync
  ```
    const datasource = api.addLambdaDataSource(`lambda_${branch}`, test);
    datasource.createResolver("APR", {
      typeName: 'Query',
      fieldName: 'test',
    });
  ```
  > code above describe lambda as data source for appsync
  > connect the data source to "Query" and target to "test" field
  > the data source above need lambda function "test" for handling the request

- the code bellow, for handling environment variable
  ```
    const branch = process.env.GIT_BRANCH;
    const envPath = ['.env'];
    if (branch) envPath.push(`.env.${branch}`);
    dotenv.config({ path: envPath });
  ```

# Useful information

- amplify has some useful env variable, you can access it with `process.env`
  > AWS_BRANCH
  
  > AWS_DEFAULT_REGION
  
  > AWS_REGION
  > AWS_APP_ID
  > AWS_COMMIT_ID
  > GIT_BRANCH
