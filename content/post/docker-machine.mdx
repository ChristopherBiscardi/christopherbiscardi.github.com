---
title: "Docker Machine"
date: 2014-12-21
featuredImage: 'https://images.unsplash.com/photo-1437651025703-2858c944e3eb?q=80&fm=jpg&s=0dcc93030e0301f03e423419c0d6a8f9'
url: "/2014/12/21/docker-machine/"
---


In this post, I will record the process through which I attempt to use
Docker Machine to deploy a simple Haskell application on Digital
Ocean.


## Zero to Docker

To get an OSX docker machine running, I had to download
[two binaries](https://github.com/docker/machine#try-it-out):
`machine` and a version of docker with Identity Authentication. I will
refer to these as `machine-docker` and
`machine-docker-1.3.1-dev-identity-auth`
respectively. `machine-docker` is a new binary while
`machine-docker-1.3.1-dev-identity-auth` is the usual `docker` binary
with some additional commits.
1. Create an OSX machine using virtualbox. Name it `test-machine`:
```bash
> machine-docker create -d virtualbox test-machine
INFO[0000] Downloading boot2docker...
INFO[0021] Creating SSH key...
INFO[0021] Creating VirtualBox VM...
INFO[0029] Starting VirtualBox VM...
INFO[0029] Waiting for VM to start...
INFO[0061] "test-machine" has been created and is now the active
           machine. To point Docker at this machine, run: export
           DOCKER_HOST=$(machine url) DOCKER_AUTH=identity
```
2. Create a function to export the desired env vars. I put this in my `~/.zshrc`
```bash
to-machine(){
    export DOCKER_HOST=$(machine-docker url) DOCKER_AUTH=identity
}
```
3. Test with `docker ps` in a new shell:
```bash
> to-machine
> machine-docker-1.3.1-dev-identity-auth ps
CONTAINER ID  IMAGE  COMMAND  CREATED  STATUS  PORTS  NAMES
```


## Docker to Digital Ocean

1. Create a [Personal Access Token](https://cloud.digitalocean.com/settings/applications)

[![digital ocean application settings](http://res.cloudinary.com/diqzbm8lz/image/upload/h_181,w_660/v1428611477/Screenshot-2014-12-20-14.58.25_hvbvt6.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611477/Screenshot-2014-12-20-14.58.25_hvbvt6.png)
2. Name and Generate the token

![Screenshot 2014-12-20 14.58.47](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611476/Screenshot-2014-12-20-14.58.47_kcvvzv.png)

3. After getting a token, I set it to `DO_TOKEN`:
```bash
export DO_TOKEN=mytokenhere235bhn2b23j5k
```
4. Create a machine on Digital Ocean
```bash
> machine-docker create -d digitalocean --digitalocean-access-token=$DO_TOKEN biscarch/bot
INFO[0000] Creating SSH key...
INFO[0000] Creating Digital Ocean droplet...
INFO[0002] Waiting for SSH...
INFO[0103] "biscarch/bot" has been created and is now the active
           machine. To point Docker at this machine, run: export
           DOCKER_HOST=$(machine url) DOCKER_AUTH=identity
```
5. Point Docker at the Digital Ocean Machine `biscarch/bot`
```bash
> to-machine
```
6. `docker ps` on Digital Ocean
```bash
> machine-docker-1.3.1-dev-identity-auth ps
The authenticity of host "$ip:$port" can't be established.
Remote key ID XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX:XXXX
Are you sure you want to continue connecting (yes/no)? yes
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```


## `docker run` on Digital Ocean

1. We can run an image using the
   [barebones image](https://github.com/snapforbeginners/barebones)
   from [Snap for Beginners](http://snapforbeginners.com/)
   interactively with a pseduo-tty:
```bash
> machine-docker-1.3.1-dev-identity-auth run -itp 8000:8000 snapforbeginners/barebones
no port specified, defaulting to port 8000
Listening on http://0.0.0.0:8000/
```
2. We can curl our Digital Ocean machine’s IP to see if the container
   is running:
```bash
> curl $DO_IP:8000
hello world
```


## Fin

That’s it. We have a Docker Engine and a container running on Digital
Ocean. We can also run multiple containers as Daemons and all of the
normal goodness of the Docker CLI.
