---
title: "AWS APN DevAx Black Belt Day 2"
date: "2022-28-03"
description: "AWS DevAx Black Belt Day 2."
---

## Ployglot Persistence with Multiple Data Storage

In Microservices
Separate Database for each service

If use same database
Then Locked Release Lifecycle
Then not independent scaling
Then not right tech choice

-- DynamoDb
Devs Try Projecting Joins on DDB
Treating like SQL DB
Huge No No

AWS Has many DB Options
One for each
Relational and Non Relational

Most Common Use Cases
Relational -- Aurora, RDS
Key value - DynamoDB

Think Relational DB
Delay Decision Time
Delay Calling Pattern
At Runtime.

"Not All Data is Relational"

When Data Needed by other Microservices,
Share Data using CQRS and Streams.

## Moving to NoSQL w/ DynamoDB

NoSQL = Non Tabular DB
There is an "Arbitrary Schema"

DDB - NoSQL Key Value Store
Fast Throughput, Low Latency
Based on upfront design choices.

Think Traditional Architecture
All data forced into RDBMS
Good at OLAP (Analytics)
But bad at OLTP (Transactions)

In Distributed System
Need single source of truth
But multiple copies of data
Are OK

SQL Optimised for Storage
NOSQL Optimised for Compute
SQL Scales Vertically
NoSQL scales horizontally

In DynamoDB
Important to Understand Physical Constraints

Partition Key determines the Hashing Algorithm (unordered)
Sort Key can be provided
Partition Key + Sort  = Composite Key

In Composite Key
Partition Key can be same
Sort must be unique
Data Hashed based on Composite key

Design for cloud means
Think Differently

Use Indexes instead of Scan
Or when multiple PK Data required
LSI - Local Secondary Indexes
GSI - Global Secondary Indexes

When LSI
Alternate Sort Key Attribute
Index Local to Partition key
Highly consistent by Size Limitation

LSI Defined Upfront
Is like additional Sort key inside Table

10GB Max per PK
LSI Limits Range keys
eg Sort by UserId(PK), Date (SK), Name (Index)

When GSI
Allow you to have Alternate PK &/Or SK
Index across all PKs
No Size limit but is eventual consistent

When GSI Defined
Must Define RCUs and WCUs
More flexibility

GSI Example
Naive Approach = Scan + Filter. (Full Data scan still done)
Pro Approach = Query w/ PK  + Index(Filter) + Limit

Under the covers
GSI Is Additional Table
Up to 5 GSIs
Updated Async

When GSI and less write capacity
DB Throttling Occurs

write and immidiate read
Index may not update

Decision to choose index
LSI Can be modeled as GSI
LSI Is cheaper

If Data Size > 10Gigs
If eventual consistency
Use GSI

### Throughput

RCU - 4kb
WCU - 1kb
TPC = RCU/3000 + WCU/1000 (By Capacity)
TPS  = Total Size /10 Gigs (By Size)
Total partitions = CEIL (Max(Capacity, Size))

Throttling = TP > TP Per Partition
Seen in
Large Items/ Hotkeys
Non uniform workloads

### Read Types

Strong Read - Wait for Partitions to Sync
Eventually Consistent Read - Any partition that responds first. Cheaper, 50% Capacity

## Data Modelling

Think upfront about access patterns. Event Storming shows data flow

Designing for DDB:

- Define ERD
- Identify Access patterns
- Design Indexes aroudn access patterns

When DDB
Multiple Entities in Same DB

Forget RDB Shit:

- Normalization
- Joins
- Single entity in DB

### Example: Ecommerce

#### ERD

Users,          Orders,
UserAddress,    OrderItems

#### Defien Access Patterns

- Get User Profile
- Get orders for user
- Get Single order and see order items
- Get order status
- Get open Orders

#### Design PK and SK

Key
    PK (User#xxxx)       - | For user xxxx,
    SK (#PROFILE#xxxx)   - | Profile hash gets profile by adding decorator `#PROFILE#`
Attributes
    Useranem
    Fullname
    Email
    CreatedAt
    Address

### One To many relationships

- Attribute to list or map
- PK + Query
- Secondary Index + Query

In this case
Store UserAddress Blob
If lookup needed, use JSON

Users to Orders
One to Many
Create Sort Key and Trees with Order Hash
So we can have multiple order hash
with unique order ID

Now two sort keys
Profile and Order

Key
    PK (User#xxxx)
    SK (##ORder##xxxx)
Attributes (Order)
    Useranem
    Fullname
    |OrderId|
    CreatedAt
    Address

Key
    PK (User#xxxx)
    SK (#Profile#xxxx)
Attributes (Order)
    Useranem
    Fullname
    |Email|
    CreatedAt
    Address

### Many To Many relationships

Use Inverted Index
Composite PK But Sort Key and PK Flipped
Then used as GSI

Cannot get orders and order items in one query
But Inverted Index can solve

Consider PK User and SK Order
GSI Order + User
GSI Profile + User
Then Using GSI
Get Order + User Profile

### DDB Features

Local instance available (Blog Topics?)
NoSQL Workbench available (Blog topics?)

## Design Patterns

### DDB Data Streams

Call when CRUD Operation happens and trigger lambda?
CQRS to separate reads and writes

### Sharding write heavy PKs

eg Real Time voting.

Consider Write capacity exhausted
Instead table with adaptive capacity
Use Write Sharding

Shard by adding to PK
Something arbitrary *but deterministic*
Then `Scatter-Gather` to
read aggrefate result

### Read Heavy Partitions

Everyone Reads partitions
Hot partition therefore high throughput
Use Caching instead
but will be managed

or DAX (DDB Accelarator) -- DDB Accelerator (DAX)
for managed caching
DAX write through cache

FOR DAX

Can Write through
cache then write

Can Write around
Write then cache

On Code end
Remove client and add cache.

## Splitting Monolith DB

### Pattern Database Wrapping Service

Introduce service to "wrap" database
Using Strangler Pattern

### Pattern Database as a Service Interface

For Read only queries
Use CQRS
Different path for read
DIfferent path for write
Consumer starts accessing "Direct" API

Pattern changing data ownership
Monolith depends on service API
instead of Database or Direct API

### Pattern Synchronisation

How to sync data

Do CDC (Change Data Capture)
New Service Reads
from monolith DB changes
Handle eventual consistency
But not the best approach

Otherwise have monolith
write to old db
and write to new db
But Dual Write

Do Event Driven Sync
Monolith writes to DB
DB Writes to Queue
Agent Dequeues message
updates new db
New Service Reads from own DB
Which Single Source Truth

Avoiding 2PC in Distributed transactions
Use SAGA Pattern Instead

### SAGA Pattern

SAGA Pattern
Uses eventual consistency
Handles transactions across
multiple data store

Two flavours of SAGA
Orchestration and Choreography
Orchestration inside aggregate
Choreography inside bound context

In SAGA Pattern
No mater service
But rather multiple service
Orchestrated with rollback option

In Choreography
Message goes to Bus/ Message Broker
Multiple Services consume Bus
If problem, side effect will need rollback

In Orchestration
Use orchestrator instead
for single point of control

Difference,
Correography - each components need to be aware of each other
orchestration - Orchestrator need to be aware of everyone's states

Simple workflows need choreography
Therefore less participants
but difficult to test in isolation

Orchestration for complex workflows
Therefore more participants
but single point of failure
Addressed by Step Functions

Sagas not perfect
Consider semantic locking countermeasure (out of order calls)
Beware Dirty Reads
Group transactions fall behind pivot transactions
COunteract lost updates
Consider Conditional writes or atomic transactions in DDB

## Distributed complexity & AWS Step Functions

Step Functions for Key Behaviours
Sequence Fucntions
Parallel processing
Retry
Conditions
Try Catch
Segments

Could try function chaining
but tight coupling

Could try central coordination
Using Database or queues
But still need elements
Know what to do on failure

Instead need orchestrator
with must have
ObservaBLT

-- AWS Step Functions

## App Integration Patterns

Message Exchange
Can one way - no response, fire and forget. Use Queue
Can REquest-Response - Rather than rest, use two message change. Eventual consistency. Will need Correlation Id

Can Point to point - queue with multiple endpoints but only one receiver. Flatten peak loads

Can PubSub - Multiple Subscribers

Can chain topics to queues - Fan out and receiver scale out at same time

Can Scatter-gather
Not sure which subscriber will be right/ first response
or paraller processing
Fan out then fan in
with aggregator at end

Can have timed result
for tight SLAs

Can also add callback
Websockets over MQTT (IoT Message Broker) (Blog Topic)
Or Use AWS AppSync
Or API Gateway
Therefore remove polling
which DDOS yourself

Lab Options

- AwesomePets - SAGA Pattern with callback to handle transactions
- WildRydes - Foundation with bonus labs
