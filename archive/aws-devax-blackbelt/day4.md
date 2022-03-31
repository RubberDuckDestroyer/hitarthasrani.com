---
title: "AWS APN DevAx Black Belt Day 4"
date: "2022-30-03"
description: "AWS DevAx Black Belt Day 4."
---

## Authentication and authorization w/ Cognito

User Management
hard to implement by itself

--Cognito
Handles Authentication, Authorization, Data Sync

### Cognito User Pools - User Database

Managed user directory
hosted ui
jwt and oauth tokens
federate with userpools

Simplify Security, integrates with IAM roles
Supports multiple logins
supports "guest" users.

### Cognito Identity Pools/Federated Identities

Token Vending machine
federation and aws creds

### Use Cases/Scenarios

B2C - 3rd party
B2B - SAML
B2E
IoT

### Security Architecture

OIDC Login for token -> Exchanged for STS Token -> Cognito assigns uuid for user's app request

Federate using

- User Pools; priceed per user
- Identity Pools; free

User flows can be customized
Admin Capabilities

Cogniro User Pool Tokens:

Identity Token
JWR, can be used for auth
1hr expiry

Access token - used for access
1hr expiry

Refresh Token

JWT Dissection:

Header - Key ID, Algo (RS256?)
Payload -
Identity Payload:Cognito Groups, user pool, custom claim, app client id, expiration, identity info
Access token payload: - have scope for fine grain access control
Signature - Proof for decrypt

## API Auth with APIGW

Native intefration for AuthN
Using Userpools, IAM Authorizors and Lambda
3 options for AuthN

User Pool validates token, invokes lambda for backend logic,
Lambda gives response

W/ API GW
Use UserPool supplied creds in API GW

Lambda - Response either allow or deny
based on JWT Request to API GW

IAM Integration with lambda - invoke lambda with caller's creds
`context.getIdentity().getIdentityId()` to get ID and Identity Pool ID

## ObservaBLT

Understand failure modes - what's broken and slow.
Knowing and understanding problems in system.

Monitoring tells you whether a system is working
ObservaBLT let's you understand why it isn't working

Detect, Investigate, Remediate
Most time spent in Investigation.
Reduce MTTR

### Monitoring needs to evolve

UX, Short Lived resources, More Devices/Data, Faster release velocity

Monitoring is more than failures
Knowing if app performs correctly/ Is it behaving correctly?
What is the usage
What is the business impact.

Issue Timeline consists of:

Stage 1 - Detect.
MTTD - Mean time to detect.

Stage 2 - Identification
MTTI - Mean Time to Identify.
Total MTTI = MTTI + MTTD

Stage 3.1 - Fix Stage 3.2 - Verify (Remidiate)
MTTR = Mean Time to remediate
MTTR = MTTD + MTTI + Fix Time +  Verify Time

### Consistent Mechanism - OODA Loop

Observe
Orient
Decide
Act

Favours agility over power.

Proactive ops - catch issue before the system goes into a completely failed state.
ex - latency.

### Tools and Challenges

Key Tools:

AWS XRay - Collect traces from distributed systems
XRay Analytics
Cloudwatch Logs, Logs Insights. Can also use cloudwatch agent on on-prem resources.
Cloudwatch Metrics, Metric Math expressions, Dashboards

3 pillars of observaBLT

Metrics - Numeric data
Logs - Timestamped records of events. May have metrics
Traces - Single user journey through parts of an app.

Pillars need to correlate together to bring full ObservaBLT

Tools can be classified into

Infra Monitoring,App Monitoring,Synthetic monitoring

Tools

- CW Container insights.(ECS, EKS, Forgate, K8 on EC2). Prometheus metrics supports.
- CW lambda insights. Undertsnd compute, mem alloc and function duration. Linked to logs insights and analytics
- CW Contributor Insights. Top N Contributiors + usage. Filter, aggregate and visualise operational health. Can be used with DynamoDB
- CW Synthetics. Check canary monitoring/ haertbeat monitoring. Puppeteer or selenium. COnfigurable scripts. Blueprints for API Testing, check for broken links, check against baseline.
- CW Metrics Explorer - Tag based dashboard builders.
- CW ServiceLens. Correlate logs, metrics and traces. Identify bottlenecks, performance issues and pinpoint impacted users.
- XRay Insights. See a service map. analyse and filter traces. Create filter groups.

## AWS XRay

Prod ready, can use with non aws services.

XRay Components:

Trace - ennd to end. user to data layer and back
Segment - Groups of services
Subsegments - individual service levels
Can also add metadata/tags

## New Troubleshooting Workflow

Synthetic Alerts, Insight notification. Detect and indentify.

## IaC with AWS CDK

CDK - Cloud Development Kit

App that can contain one or more stacks.
Apps have constructs which have one or more resources. ex: Elasticache redis config

Main components:
Core Framework
Construct Library
AWS CDK CLI

AWS Construct Library has many examples.
eg: 6 lines of code for ALB Balanced Fargate service

Construct levels 

- L1; CFN Resources (Automatically generateed)
- L2 - aws constructs (High level constrycts)
- L3; Purpose built constructs (Opiniated abstractions)
