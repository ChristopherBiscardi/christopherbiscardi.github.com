---
title: "Towards Kubernetes"
date: 2017-09-30
tags: [kubernetes, docker]
draft: true
---

# Resources

[TGI K8s][tgik8s] has been really useful for finding good jump off points. The
first video is an overview while successive videos show networking,
[RBAC][rbac], and other tools like [Istio][istio].

# Getting Started

There is a LOT of yaml.

## Pods vs Containers

Pods in Kubernetes are one or more containers that should be run as a single
unit. This is often a single container but can take advantage of multiple
containers when using projects like [Istio][istio].

# Developing

with or without Kube? Development GKE clusters vs local host/VMs/Docker4Mac

# Deploying Kube

Talk about GKE

# Cool things you can do with Kube

RBAC Istio/Envoy Honeycomb ksonnet

[tgik8s]: https://www.youtube.com/watch?v=9YYeE-bMWv8&list=PLvmPtYZtoXOENHJiAQc6HmV2jmuexKfrJ
[k8s-honeycomb]: https://github.com/honeycombio/honeycomb-kubernetes-agent
[istio]: https://istio.io/
[rbac]: https://kubernetes.io/docs/admin/authorization/rbac/
