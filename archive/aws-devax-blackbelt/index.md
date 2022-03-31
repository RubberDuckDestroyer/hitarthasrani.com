---
title: "AWS APN DevAx Black Belt Day 1"
date: "2022-28-03"
description: "AWS DevAx Black Belt Day 1."
---

BlackBelt is a program to build specialised capabilities in AWS Partners

APJ - Dev Accelerator. 1st cohort (AUNZ)
If the pilot is successful this will be launched at reinvent 2022
Let them know about other specialised capabilities.

The program will:

- Help partners in mdoern app dev
- Build partner network
- Hands on experience with pre sales capabilities. Present an oral defence, against a customer panel.

AWS DevAx Intro - Adam Larter (Head of DevAx APJ).

## Intros

- Andrew Cowan
- Bojan Zivic
- Praveen Kumar Patidar

### The Course

Modernization - patterns and architectures, Containerization, distributed systems.

- Moderinzation of monoliths to microservices with hands on labs

- Eventstorming workshop on friday
- When dealing with customers use situational awareness
- Better articulate to customer

What do modern devs need to know?
Cloud dev concepts, Async and decoupled apps, moving from mono to micro methodologies,
distributed systems, Messaging and event, ObservaBLT, CICD, Decoupling, CQRS, Event Sourcing AuthN & AuthZ

Customers can be Day 0 (ie what is cloud)
Cloud is generally an infra team thing, generaly not a dev thing.
run a discovery session with customers.

Success Factors for Moderinizing dev teams.
Telling customer to do ABC is not going to work. We need DevOps but without business understanding and business change required, adoption does not go through.

(LZ = foundational architecture.)
Consumers have a great stall after moving a couple of workloads -  becuase generally devs are not taken through journey. Ie Infra Lead instead of Dev laed approach.

Devs need to think in terms of distributed systems.
35% apps cloud native. Partners and help needed.

### Architectureal Patterns

- Shrink the scope (MVP) Dev thinking - treat infra as object oriented.

- When change impact is small, release velocity can increase. Reduced cognitive load. Small infra to do small tasks.

- APIs are front services of Microservices (Encapsulation, Isolation
- Event Driven = Decoupling. Sync to Async. Devs need to know about costs as well
- Devs need to understand microservices patterns.

- Team topologies make a difference. This is different for a monolithic architecture. Customers need to rethink team structure. Devs need to have ownership and should be able to go forward. **READ MORE ABOUT THIS**
eg - Service Team, enabling team (allows Just In Time/ DevOps), Subsystem team; Specialist team (Subject Matter Experts), Platform Team (Devs can reducr cognitive load when new infra is needed while following "What good looks like", following the scaffolding and not starting from scratch).
- Discourage silos in the organization. Team manages all aspects including testing. Devs have full ownership.

Event carried state transfer -  read. ie do not throw 10 Mb of data around.

### When dealing with customer enablement

Customer Discovery - Find current, to be architecture and where the holes lie.

- general cloud concepts
- Implement Async and decouplled shit
- Automation (CICD)
- Authentication

assumptions - condensed version. ie you know CDK and infra.
Skip Lift and Shift.
Recommended Reading - Monolith to Microservices, Building Microservices, Domain Driven Design.

## Module 1

eventbox.dev/survey/FGSKVOF

### Distributed Systems

People Say the following -
Decentralise componenets
Removing memory call, using multiple languages.
Resilience
Polyglot - tech stack and data model
harder to test from system perspective.

most important - **Deal with independent fault domains**
When breaking monolith to micro, since there is no machine call, you need to keep an eye on network. This is not deterministic and assuming that this is deterministic is heading towards failure.

Multiple failure modes are introduced. it may fail in bizzare ways. ie call fails to send request/ A sends request but B does not receive it.

Fuzzy situation to deal with. You have to think differently. Handle exceptions, meaningful messages. Patterns need to think about this.

Difference-

- Independent/ Isolated fault domains
- Latency and reliability
- State management
- Ownership and diversity
- Eventual consistency
- Transaction handling

Fallacies:

- Network is reliable, homogeneous and secure
- 0 latency
- Bandwidth is infinite
- Topology does not change
- Single Admin
- Everyone trusts each other.

Exmaple Monolith

- Single vertically scaled server
- One change means an entire app needs to be tested.

Monolith: UI, Middle tier and data all happens in one box. DB might be in a separate box but everything is self contained and shared.

Travel Buddy Example - JSP App (HTML with embedded tags)

- JSP app with two data fields (XML) and an single HTTP page. REST interface.
- On a code level - html data shown during render time.
- Image makes single call with message in query string. Not really an API Call.
- NOTE: data is fairly well separated. Data access objects are also well separated. This could be worse in older monoliths w/ spaghetti code.

First Step - Lift and Shift 

using elastic beanstalk.
Can setup CICD pipeline.

using ECS
Can also conver the mono to an ECS Cluster taking docker task defn and pushed it to cluster with load balancer and listeners hidden behind an endpoint.

Using EC2 - deploy on EC2.

This only makes it managed and easy to scale horizontally. Regardless of how it is running you can think about modernization.

Fundamental Outcomes for modernization - take from customer.

- Move away from vertical scaling
- Technically, we need to move away from large blast radius as well.
- Monolithic tech stack.
- make independent changes for velocity.

Use 7R's (Put link)

We want high cohesion and decoupling.
Sometimes, there is nothing wrong with a monolith. It could be a "Modular monolith".
When it was made, it followed best practices. 

We must also follow SOLID Principles
"you call the contract and do not worry about what is behind the scenes"

Single vs Modular monolith
If it is a single monlith - move it towards a modular monolith. Low risk and no major change.
On the data layer, split it out if you can. Modular monolith is a valid arch pattern.

When microservices are not valid

- Unclear Domain; Wrong service boundaries can be expensive
- Startups; they need scale and experimentation on a market fit.
- COTS Software: No access to codebase to make real changes
- Not having a good reason: Accepting because "they did it"

Scenarios for moving to microservices

Business Case to

- Go Faster and get enw features
- Be more stable
- better quality
- Cheaper, reduced Total Cost of ownership.

### Coupling Types

### Microservices

"There is no precise defination of the arch style"
But they must have characteristics around business capability, automation and decentralisation, intelligence endpoints, compensation via services.

ONE COMPONENT MUST DO ONE THING
Think about reusability. Tech stack for two actions may be completely different.
MicoServices must be broken down to as granular as possible.
Not 5000 lines of code. how much is it doing? Few lines of code for quick engineering
Own tehir statae and do not share
Managed by the team who built them
Independent release cycles
Freedom to use the right tech stack

Microservices is an approach for a collection of small isolated services

Serverless is a compute choice. these choices are made when we chop the monolith down. Talk to customer about data flow and other fracture points.

Key Takeaways

- Independently deployable, work together modelled around a business domain.
- Communicate via networks
- DBs are hidden

FAQ:

- Just Service Oriented Architecture? -  NO
- How is it micro? How many is too many? - It comes down to the cognitive load.
- Just like Object Oriented Code?
- not just a tech change!

### Identifying fracture planes

### Tools for Domain modelling

### Team structure and conways law

Constrained design systems = constrained communication
Monolith = 3 tier architecture. Changes cannot be isolated.
Micro = Changes are behind an API and do not affect it.

### Decomposing the monolith

Find natural seams or fracture points.

Book -  The art of scalability. Scalability

- On X Axis (Elastic Beanstalk or ECS Cluster)
- On Z Axis - Run multiple copies with intelligence on LB. Data partitioning.
- On Y Axis, Functional Decomposition. Scale by splitting different things. THIS IS THE BENEFIT. Each component is implemented separately.

Identifying fracture planes:

- Change to single service
- Deploy changes separately
- Right Sizing
- Scaling under load
{CHECK AGAIN FOR MISSING POINT}

Domain Driven Design:

- Identify bounded contexts. ie Customer in a Sales context is different when compared to Customer in Support context.
Boundary = Specific responsibility enforced by explicit boundaries.

DDD and Bounded Context.

- Encapsulate single domain ie Sales or support
- Defines integration points with other domains.
- Align well with microservices
- Microservices must be well defined bounded context.

Look for seams, natural divisions that "peel easily". CRUD Services are a goof candidates. Look for classes w/ no dependencies apart from scaffolding

Look at compliance and risk. Release and change cadence. Team location, performance isolation
Look at tech choices and cognitive load.

- Identify Explicit boundaries

### Patterns for moderinization using the strangling pattern

### Event Storming

Event modelling = think about system behaviour and not the system structure

Event is an indicator that the system state has changed. It is immutable and has happened in the past. It has semantic intent that means something.
It should be lightweight.
Events are observed and not directed. Event publisher does not need to worry about subscribers.
Commands are blocking calls.

Event Storming is discussing the flow of events in your org and modelling that flow in an easy to understand way. Also think about future changes that could be possible.

Event flow -  understand what happens to the system over time.
Policy - When A happens do B. (Business Rules)
Commands - Imperatives/ Create or Update X.
Aggregates - Bunch of Flows, policies and commands built around a domain. One microservice = one or more aggregates.

Think of objects in system with bound lifecycle.
Blocking calls =  REST API. Non Blocking = Queues.

Bounded Contexts - One or more aggregates made by a lifecycle policies. Tight coupling inside adregates and loose between aggregates.

Approaches to decoupling:

Options: Change the model, OR upload v2 of same interface.

WE WANT HIGH COHESION
WE WANT LOW COUPLING. (ie one change affects another)

Types of coupling

Implementation

Temporal

Deployment: You might need to Update module A when Module B is updated

Domain Coupling: Only get info needed by domain/business process and remove improper use of payload.

When Coupled:
Consider Merging
Consider bounded contexts.
Consider orchestration (of changes; using step functions)

Consider Shared Database
Database per service instead.

Consider Sync vs Async

When Sync
Think Reliability
Think Temporal Coupling
Use Service Discovery (Registery) Service -- AWS Cloud Map.
Circuit Breaker
    - When error; use default response for downstream -- AppMesh
Use Mssage / Event Driven Architecture
Help Use Async Architecture instead. (Choreography Pattern)

-- SQS SNS EventBridge Kinesis Kafka

Think ACID
Think Async and DB/service
Compensate w/ SAGA Pattern

## Patterns in moving to a distributed system architecture

Look, Patterns!
Strangler Fig, Anti Corruptuin Layer (ACL)
Facade Pattern

"If you do a rewrite of 'x' you will guarantee only 'x'"

Is Facade
Front Facing masking
Complex Underlying/Structural Code

Is Adapter
Similar to ACL
Adding Adapter, changing model
using wrapper, without modifying source code.

## Strangling the monolith

Strangler Pattern
Like Parasite, will kill old infrastructure
Take monolith parts bit by bit
And Break Off!
Reduce Risk

Pattern Example
Create New Microservice
Add New Feature

Create Microservice with ACL
Into Old Service
Corrupt Old Data Model
Call Microservice Instead
Sync using Queue/Agent

Add More Microservice
Until No one calls
The Backend

## Migration Hub Refactor Spaces

Implememting new feed

-- Migration Hub Refactor Spaces
Launch new feaure fast (Leave and Layer)
Refactor incrementally (Strangler Fig [Pig lol])

Refactor Spaces
Manages Heavy Lifting
Can still manage layers

Create Space, Share Environment, Create App, Create Services, Add Routes

Create Space, Share Environment
Make Transit Gateway

Why Shared?
One Account Monolith
One Account MicroService
One Account Refactor Spaces Owner

Create App Means
Create API gateway, connect Transit Gateway
Can connect any HTTP Enpoint
Any account or on prem
provided routing

Using Routing Endpoint,
Can have root to Monolith
Can have custom route to Microservice

Monolith Isolated
New Functionality Added
Is Microservices

## Recommendations

Start with Simplest
Avoid Dependencies - Monolith may depend on the microservice but not the other way around.
Order and prioritise migration - Hot Spots, Business Priority
Decouple across all lyers
Break tight coupling
Extract functionality not code
Macro then micro not nano
Respect rules
Automate and Observe
