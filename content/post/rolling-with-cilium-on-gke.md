---
title: Rolling with Cilium on GKE
date: '2018-04-24T17:30:47-04:00'
tags:
  - confluent
  - docker
  - gke
  - golang
  - kafka
  - kubernetes
  - zookeeper
---
> Cilium will provide connectivity to apps that have been started before Cilium but it will only provide identity based security for apps that have been deployed after Cilium.

> As for GKE. You will need to put your GKE cluster in CNI mode and run a base image with a sufficient kernel version. The standard Ubuntu base image has a kernel package that is recent enough. It will need a one time restart of the worker VMs. This will change with one of the next base image releases in GKE.

> -- [cilium slack]( https://cilium.slack.com/archives/C1MATJ5U5/p1524161956000501)
