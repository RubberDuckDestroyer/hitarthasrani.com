---
title: "Configuring SAP Router with SNC on AWS. - Part 2"
date: "2022-02-21"
description: "Configuring SAP Router with SNC on AWS (linux)"
---

## Part 2 - Configuring SNC

The second part of the blog showcases how to configure and automate configuring SNC with your SAP Router deployment on AWS.

## What is SNC?

```{}
In out current scenario, since we're using SAP Private cloud, and support connections from SAP to customers uses a proprietary protocol to transfer information from SAP systems to our systems.
```

SNC -> Secure Network Communications

SNC is used to make network connections using the internet and protect the data communication paths between various clients and servers on the SAP system.
SNC also allows us to recieve app-level E2E security.
All comms that take place between two SNC protected components is secured.
