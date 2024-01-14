---
title: "Using ChatOps to streamline operational activites on AWS"
date: "2023-12-01"
description: "An introduction to AWS Chatbot and how to use it to streamline operations on AWS"
---

Today I'd like to introduce you to *ChatOps*, the practice of centralising operational activites to chat applications with an interactive ChatBot. In this use case, the Chatbot allows you to get information from your AWS Account and query for information from your aws account.

Traditionally, setting this up includes setting up integrations with Slack or Teams and setting up your own chatbot that will respond to commands or alert you about anything you program it to do. This process can be lengthy, technically challenging or costly. Luckily for us, AWS has a solution that makes this super quick (just make sure you have admin access for your chat client or know someone with the right permissions).

AWS ChatBot allows us to quickly set up an integration with AWS Chime, Slack or Teams and get a chatbot up and running in no time. Some of the useful things AWS ChatBot can do for you:

## Notify

AWS Chatbot can notify you about events happening on your AWS account.

* Alert you on findings from SecurityHub, CloudWatch Alarms and anything via SNS.
* Alert you on Budget alerts
* Alert you on events from Cloudformation Stacks or AWS Dev tools from CodeBuild, CodePipeline and CodeDeploy.
* Other services include AWS Config, Amazon GuardDuty, Amazon EventBridge, the AWS Health dashboard.

## Command

This allows you to command AWS ChatBot for information or allow ChatBot to trigger AWS Services

* Invoke a lambda function to start a workflow
* Get diagnostic information from certain AWS Services like EC2, CloudWatch alerts
* Run ReadOnly or mutative commands supported by AWS CLI in your Chat Application
* Restart EC2 instances and use AWS Systems Manager to resolve incidents

## Customise

You can customise command aliases which look something like:
`@aws alias create alias_name mapped_action` - to create an alias for a mapped action;
`@aws alias list` - to list out aliases created;
`@aws run alias_name` or `@aws alias run alias_name` - to run a specific alias

You can also customise notifications sent by AWS Chatbot using a JSON syntax. Here's an example

```{json}
{
"version": "1.0",
"source": "custom",
"id": "c-weihfjdsf",
"content": {
    "textType": "client-markdown",
    "title": ":warning: Banana Order processing is down!",
    "description": "Banana Order processor application is no longer processing orders. OnCall team has beeen paged.",
    "nextSteps": [
    "Refer to <http://www.example.com|*diagnosis* runbook>",
    "@googlie: Page Jane if error persists over 30 minutes",
    "Check if instance i-04d231f25c18592ea needs to receive an AMI rehydration"
    ],
    "keywords": [
    "BananaOrderIntake",
    "Critical",
    "SRE"
    ]
},
"metadata": {
    "threadId": "OrderProcessing-1",
    "summary": "Order Processing Update",
    "eventType": "BananaOrderAppEvent",
    "relatedResources": [
    "i-04d231f25c18592ea",
    "i-0c8c31affab6078fb"
    ],
    "additionalContext": {
    "priority": "critical"
    }
}
}
```
Please note that the `metadata` section will be supported in a future release.

## Caveats, Security and other stuff people dont think about

Like with any service, there's some caveats when you use this AWS service. Please keep this in mind when using a service to make sure it works with your use case. Alternatively, design around these caveats when building your chatbot.

**Unsupported services** - The following services are unsupported commands that are not available to use with AWS ChatBot.

```{text}
"appsync:ListApiKeys",
"chatbot:*",
"codecommit:GetFile",
"codecommit:GetCommit",
"codecommit:GetDifferences",
"cognito-idp:*",
"cognito-identity:*",
"connect:GetFederationToken",
"dynamodb:BatchGetItem",
"dynamodb:GetItem",
"ec2:GetPasswordData",
"ecr:GetAuthorizationToken",
"ecr:GetLogin",
"gamelift:RequestUploadCredentials",
"gamelift:GetInstanceAccess",
"identitystore:*",
"lightsail:DownloadDefaultKeyPair",
"lightsail:GetInstanceAccessDetail",
"lightsail:GetKeyPair",
"lightsail:GetKeyPairs",
"lightsail:UpdateRelationalDatabase",
"iam:*",
"kms:*",
"redshift:GetClusterCredentials",
"sdb:*",
"secretsmanager:*",
"sso:*",
"sso-admin:*",
"sso-oidc:*",
"storagegateway:DescribeChapCredentials",
"sts:*",
"s3:GetObject",
"s3:HeadObject",
"s3:PutObject",
"s3:GetBucketPolicy",
"snowball:GetJobUnlockCode"
```

**Teams/Slack/Chime integration** - This is a quick solution to integrate *provided you have the right permissions on AWS and your Chat Application*. If you ar eplannig to set this up for a teams channel in a large organization, please have someone from your Internal IT team or your Teams/Slack channel admin help you out with accepting and setting up AWS Chatbot on the chat client.

**Security and Permissions** - Now, the ability to read and modify your cloud resources from your teams channel is something that can be very powerful but also very damaging in the wrong hands. AWS Provides some predefined permission templates such as "ReadOnly" permissions. AWS also allows you to have GuardRails for users so that they cannot run certain commands. Additionally Audit logs are enabled by default, and log the commands, workspace ID, Channel ID, and the Channel user ID. Lastly, CloudWatch can log all errors or all commands that are run by aws chatbot.

**Pricing** - You pay only for any underlying services used such as SNS, CloudWatch, GuardDuty or SecurityHub.

**Others** -

* If you have thousands of alerts in a specific region you must make sure you have the correct Disaster Recovery process and channel design to combat the thousands of alerts you may get if a region goes down.

* Check the SLA's with AWS as I could not find anything on this and AWS Chatbot in the end is an AWS Managed service. With any integation, all parts must work together to provide a coherent solution.
