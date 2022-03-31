---
title: "AWS APN DevAx Black Belt Day 3"
date: "2022-03-30"
description: "AWS DevAx Black Belt Day 3."
---

## Building Event Driven Systems

Journey to event driven arch
Understand domain (Event storming)
Pick event router (Managing events)
Pick event store (Durability Model)
Structure events

Event is
Single from one part of system
telling that the state changed
to another part of system

Event already happened
and is not happening now.

Map events to business domains
using attributes

Orchestrate a business process (multi step process)
within a domain.

Choreograph events between domain
If Pub doesnt care about approach use buses

Events are Observable
And Not directed
Dumb Pipes
Intelligent Endpoints

### Event Arch Messaging Patterns

Removing dependency of systems when not required
consider insurance company
with customer management system
with quote generator
with comms system

#### Pattern Event Notification

Command happens present tense
Command adds coupling if neccesary.
event happened past tense
therefore more decoupled.

When action happens,
system takes message (event)
and updates bus.

When Bus updated,
multiple subscribers can read.

In this approach
we do decouple
but lose overall statement of behaviour
(Traceability, Reachability)

-- SQS or SNS

#### Pattern Event Carried State Transfer

Consider system drops message
on bus
downstream observers aware
but have no context of change
and will call back original system
Creating hotspot

Instead use Dependency Injection (IoC)
Meaning Put data in message
Event Carried State Transfer.

Problem becomes
Bus may have old data (milliseconds old)
Bus may have too much data

Removes load on supplier
but have replicated data
with eventual consistency

Problems with approach
State is ephemeral, transient
Once message is consumed state is gone
Difficult to obtain history
Difficult to debug

#### Pattern Event Sourcing

Goes hand in hand with event sourcing

Consider user changes address
General approach - update db and etc immidiately.
In event sourcing,
event dropped into bus,
immutable append only log
and then send to db.

"write to log and replay log into system"

Change not made directly
Also source of truth reads from bus
App State separated

Log does not store final state
just changes

good replayability and auditing
therefore easy debug.
And alternative state

But Unfamimiliar approach
difficult integration
and difficult storage/snapshots.

#### CQRS Command Query Responsibility Segregation

Same data replicated into multiple data stores

User uses different
path or model
for reading and writing

Scale reads and maybe
have different read schemas

Uses command for write
query for read
Both different schema
Could be separate DBs

Microservices could have
multiple databases

CQRS Works well
with event sourcing

Service querying will have shadow data

CQRS + Sourcing
Benefit Audit, debugging, alternate State
Memory Image, Performance, Microservices

Problems Unfamiliar
Integration
Storage/Snapshots

-- Lambda, Elasticache, Dynamo, Kafka

## CQRS

One model to udpate info
another to read

Allows horizontal scaling of read model
Take advantage of eventual consistency
flexible read and write
promotes polyglot persistence

Day 2 problems?
A. Operationalization side - good ops management needed.
When data being shared, need to get buses correct.

Old Tech Stack, new to devOps. Hard to add CQRS.
A. CQRS is from a paper in 1980s so concepts is quite old.
You need to liberate data from a monolith and make multiple copies for microservices

Problems with vertical scaling DB
A. Decide whether DB needs read or write access. Can write helper for it.
Over time - decide what kind of read or write. Additional confidence. Initial step is hard, easier after that.

## Decoupoling arch with messaging and streaming

Picking an event router

Event router
Async Events - buffering
Event stores - durable logs

### Option Sync Decoupling

Using load balancer to push downstream

### Solution Async Decoupling

Using queues
Buffer spike load
scale based on resource availability
rather than blindly reacting to spikes

-- SQS

## Message Channels // SQS, SNS, Event Bridge and IoT

Point to point (Queue)
A consumer will pick up the message based on availability
All messages received by consumers
but not all consumers get all messages

Solution: Fan out using SNS for multiple subscribers
Publish Subscribe (topic)

SQS FIFO Queue - Deterministric Ordering

Problem - mapping/routing events to topics (Coupling)
Solution - Attribute filtering (De-coupling) -- SNS Message Filters

### Non Deterministric consumer scale

Use IoT Message Broker
could also consider using APIGW or AppSync

Is Faster w/ MQTT

### EventBridge

Serverless event bus service

As requirements grow,
Decoupling grows and services increase

EventBridge makes it nicer to add downstream observers
Abstract producers and consumers

Producers talk to bus,
consumers bind to eventbridge
and not arbitraty queue

Can have sources
AWS Services
Custom Events
SaaS apps

Event Bus
Default, custom SaaS

No callback into event bridge

Loose coupling,
Scalable,
Extensible,
Can deal with complex shit
Reliable

## Capstone Project

Oral defence/panel. Not a dev. Will be issued a black belt badge. Will send some registration with up to 2 people per team and mock panel with team.
