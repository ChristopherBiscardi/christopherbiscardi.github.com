---
title: Getting Started with Skaffold on Docker for Mac
date: '2018-03-31T19:30:18-07:00'
tags:
  - digitalocean
  - docker
  - golang
  - tooling
---
# Dependencies

* Install skaffold
* git clone skaffold
* Docker for Mac "Enable Kubernetes" Button

# Running an Example

```
cd skaffold/examples/getting-started
```

```shell
skaffold/examples/getting-started on  master via 🐹 v1.9 on 🐳 v18.03.0-ce at ☸️ docker-for-desktop
➜ skaffold dev
Starting build...
Found [docker-for-desktop] context, using local docker daemon.
Sending build context to Docker daemon  6.144kB
Step 1/5 : FROM golang:1.9.4-alpine3.7
1.9.4-alpine3.7: Pulling from library/golang
ff3a5c916c92: Pulling fs layer
f32d2ea73378: Pulling fs layer
7e338747c3ca: Pulling fs layer
3a75aa9cb0c3: Pulling fs layer
7a7cfbabfc25: Pulling fs layer
43b7df8cdce7: Pulling fs layer
3a75aa9cb0c3: Waiting
7a7cfbabfc25: Waiting
43b7df8cdce7: Waiting
7e338747c3ca: Verifying Checksum
7e338747c3ca: Download complete
f32d2ea73378: Verifying Checksum
f32d2ea73378: Download complete
ff3a5c916c92: Verifying Checksum
ff3a5c916c92: Download complete
ff3a5c916c92: Pull complete
f32d2ea73378: Pull complete
7e338747c3ca: Pull complete
43b7df8cdce7: Verifying Checksum
43b7df8cdce7: Download complete
7a7cfbabfc25: Verifying Checksum
7a7cfbabfc25: Download complete
3a75aa9cb0c3: Verifying Checksum
3a75aa9cb0c3: Download complete
3a75aa9cb0c3: Pull complete
7a7cfbabfc25: Pull complete
43b7df8cdce7: Pull complete
Digest: sha256:566ec2d92f3f2ac0a83b941bacff33a2d3a7d98eddcbc288ada912be969cd5aa
Status: Downloaded newer image for golang:1.9.4-alpine3.7
 ---> fb6e10bf973b
Step 2/5 : WORKDIR /go/src/github.com/GoogleCloudPlatform/skaffold/examples/getting-started
 ---> 122d44c3c5e6
Step 3/5 : CMD ["./app"]
 ---> Running in 0b3d36b3d80a
 ---> 25fec8e3d0c1
Step 4/5 : COPY main.go .
 ---> 5f6d1f7358ed
Step 5/5 : RUN go build -o app main.go
 ---> Running in 93a30ffadc3f
 ---> 3a8f12a60268
Successfully built 3a8f12a60268
Successfully tagged d0b0a18210af30450a60e7c180604be0:latest
Successfully tagged gcr.io/k8s-skaffold/skaffold-example:3a8f12a60268a9a4511413a3fdff29fe3e9e5527b776dcdf9716028141549cc3
Build complete in 18.71081243s
Starting deploy...
Deploying k8s-pod.yaml...
Deploy complete in 362.30127ms
Watching for changes...
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
[getting-started] Hello world!
```

## Shipping Changes

So next we'll modify main.go to change the output from `Hello world!` to `Hello chris!` (because... my name is chris. Use your own :P)

```
[getting-started] Hello world!
Starting build...
Found [docker-for-desktop] context, using local docker daemon.
Sending build context to Docker daemon  6.144kB
Step 1/5 : FROM golang:1.9.4-alpine3.7
 ---> fb6e10bf973b
Step 2/5 : WORKDIR /go/src/github.com/GoogleCloudPlatform/skaffold/examples/getting-started
 ---> Using cache
 ---> 122d44c3c5e6
Step 3/5 : CMD ["./app"]
 ---> Using cache
 ---> 25fec8e3d0c1
Step 4/5 : COPY main.go .
 ---> 06798183b11a
Step 5/5 : RUN go build -o app main.go
 ---> Running in 2ed87b7554eb
 ---> a302d8e3cfb2
Successfully built a302d8e3cfb2
Successfully tagged e67149814c3613256f066208371b0c21:latest
Successfully tagged gcr.io/k8s-skaffold/skaffold-example:a302d8e3cfb2888d9e60cfd6c2e13b52d4f6557cfe50ce65ceb17b6855cf31b1
Build complete in 2.163268206s
Starting deploy...
Deploying k8s-pod.yaml...
Deploy complete in 434.098218ms
Watching for changes...
[getting-started] Hello chris!
[getting-started] Hello chris!
```

This took a few seconds total to rebuild and redeploy locally. It's actually very promising for local development.

Note that even after we kill skaffold, the pods are still running

```shell
➜ kubectl get pods
NAME              READY     STATUS    RESTARTS   AGE
getting-started   1/1       Running   1          11m
```
