---
title: "Amazon Linux 2023 just dropped"
date: "2023-03-21"
description: "Amazon Linux 2023 is out. Here's what you should know about it"
---

If you're running workloads on the cloud, chances are you're machines are running linux. RedHat, Fedora, Ubuntu, etc. There's many flavours to choose from, but then again if you're on AWS you're probably familiar with Amazon Linux (AL). As part of their release schedule, AWS releases a new major version every 2 years and Amazon Linux 2023 (AL2023) just dropped in General availability on the 15th of March 2023.

Amazon Linux is AWS's rpm based linux distro for general purpose workloads and integrates with AWS services. It is designed for scale and LTS. From AL2023 onwards, AWS will release a new version of Amazon Linux every 2 years.

## The Benefits

* Long Term Support
* Predictable Release Cycle - plan your upgrades and migrations
* Versioned repositories for AL2023 = more consistent OS updates.
* Security Upgrades and Compliance - SELinux is enabled by default on permissive mode (permission denials are logged but not enforced). You can also set security policies at boot time.
* OS Level Optimisations.
* Kernal Hardening and Live Patching.
* Use AL2023 at no additional cost as part of your EC2 package (Please check EC2 pricing).

## What should engineers know about AL2023?

* Standard support - 2023 & 2024.
* Maintenance - 2025 - 2027.
* Package manager: dnf.
* Uses the XFS Filesystem on the root filesystem.
* Networking interfaces are managed by the `systemd-networkd` system service. Amazon Linux 2 used `dhclient` previously.
* OpenSSL 3 - The Open Secure Socket Layer v3 (OpenSSL) cryptography toolkit is available. It uses the SSL v2/vv3 and TLS v1 network protocols and the required cryptography standards.
* IMDSv2 - Any instances launched with AL2023 will require the use of IMDS v2 and the default hop limit will be set to 2 to help with containerised workloads. This can be manually overridden if needed.
* Check support info on a specific package: `sudo dnf supportinfo --packagename`
* Check support info on all installed packages: `sudo dnf supportinfo --show installed`
* Customise cloud-init to configure them dynamically: Create your cloud-init action files in `/etc/cloud/cloud.cfg.d`
* Networking configurations generated in: `/run/systemd/network`. You can add custom config files to `/run/systemd/network` and `/etc/systemd/network`
* Python 3.9 (System Python) has security support until March 2028
* Amazon rolls their own kernel for Amazon Linux. AL2023 isnt just a tweaked copy of another linux distro.
* **AWS Integration is still a work in progress for some services (CodeDeploy,Inspector as of writing this), check the GitHub pages for known issues**

There's a lot to take in for this new OS which will most likely be the default OS you use for general purpose workloads on AWS. As with anything else in technology, there will always be bugs. Check the known issues, plan and prepare yourself before committing to any different tech, especially when it comes to Operating Systems.

## References

* Discussion forum: [https://forums.aws.amazon.com/forum.jspa?forumID=228](https://forums.aws.amazon.com/forum.jspa?forumID=228)
* Github Issues Page: [https://github.com/amazonlinux/amazon-linux-2023/issues](https://github.com/amazonlinux/amazon-linux-2023/issues)
* Known Issues: [https://docs.aws.amazon.com/linux/al2023/release-notes/relnotes-20230315.html](https://docs.aws.amazon.com/linux/al2023/release-notes/relnotes-20230315.html)
* Roadmap: [https://github.com/amazonlinux/amazon-linux-2023/projects/1](https://github.com/amazonlinux/amazon-linux-2023/projects/1)
* Amazon Linux 2023 home page: [https://aws.amazon.com/linux/amazon-linux-2023/](https://aws.amazon.com/linux/amazon-linux-2023/)
* AL2023 packages: [https://docs.aws.amazon.com/linux/al2023/release-notes/all-packages.html](https://docs.aws.amazon.com/linux/al2023/release-notes/all-packages.html)
