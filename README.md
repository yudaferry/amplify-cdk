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
- second, create appsync from CDK stack




