# Research

This is my research about running appsync under amplify.
The appsync not wrapped on amplify data store, it will wrapped under custom CDK.
The reason is because i don't want to use dynamodb as the data source.
I want to use lambda as customer resolver, then lambda can connect to any database or any API.
I am using amplify for separated client apps like Flutter, React Native, Android, Ios, etc.
That's why in this project just have single html file, this file for fullfill the requirement of amplify.

> WARNING - this process bellow will be create:
>  - AWS Rules
>  - AWS Policies
>  - AWS S3
>  - AWS cloudFormation
>  - AWS Lambda
>  - AWS Amplify
>  - AWS Cloudwatch

## Step 0 - Prerequisite
- Fork this repo

## Step 1 - Create Amplify Project
- open aws console, then go to amplify
- click "Deploy an app" button
  this readme created at 2024-12-30, so the button maybe different
- choose "Github" then connect to your repository
- choose repository and branch
- 
