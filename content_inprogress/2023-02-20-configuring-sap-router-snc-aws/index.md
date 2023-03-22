---
title: "Configuring SAP Router on SNC on AWS. - Part 1"
date: "2022-02-20"
description: "Configuring SAP Router with SNC on AWS (linux)"
---

Earlier today I was looking back on the projects I worked on last year and stumbled upon something that seems like an interesting solution for SAP on AWS workloads.
In this case, my client was looking to set up SAPRouter in their production environment so that they could communicate with SAP Private cloud and set up additonal SAP services on AWS.

## What is SAP Router?

From the AWS docs; "When setting up SAP on AWS, you will need to set up SAP Solution Manager and SAProuter with a connection to the SAP support network."

From the SAP documentation, "SAProuter is a standalone program that protects your SAP network against unauthorized access."

SAProuter is a way to securely connect private SAP instances across the internet. It acts as a proxy between network connections in SAP systems and an extra firewall. For SAP on AWS, this software would be used to control and log incoming connections from other SAP services like SAP Private Cloud or allow SAP Services to access to other external networks.

## Configuring SAP Router to run on a linux system

To configure/install SAP Router on the system we will use the following AWS Services:

- S3 to store and pull the required files such as the SAPCRYPTOLIBP, the SNC certs, the start scripts and etc.
- EC2 Auto Scaling group to launch the SAP Router service in a highly available state, along with a custom AMI for SAPRouter that's built using packer.

The architecture looks something like this:

