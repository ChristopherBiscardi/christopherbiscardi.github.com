---
title: "Deploying Snap with Docker"
date: 2014-10-15
url: "/2014/10/15/deploying-snap-with-docker/"
---


[![snap-framework](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611482/snap_sks60m.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611482/snap_sks60m.png)

[Previous Post – Working With Snap 1.0](http://www.christopherbiscardi.com/2014/10/05/working-with-snap-1-0/)

In our previous post we built out a scaffold project with Snap 1.0. In this post
we’ll go over building a simple Dockerfile to deploy the project.

Make sure you’ve [installed docker](https://docs.docker.com/installation/#installation)


## Building the Haskell Base

There is an effort to make a [docker official haskell
image](https://github.com/darinmorrison/docker-haskell/tree/docker-library) so
we’ll use that. Once it’s merged into `docker-library`, we can simply skip
building the `docker-haskell` from scratch.

Clone docker-haskell and switch to the docker-library branch. (It doesn’t matter
where on the computer we do this)

```
git clone git@github.com:darinmorrison/docker-haskell.git
cd docker-haskell
git checkout docker-library
```

Once in the appropriate directory, we can build the image with [`docker
build`](https://docs.docker.com/reference/commandline/cli/#build). `-t` is short
for `--tag`, which lets us tag an image. We’ll use `haskell` for the base name
and tag it as `7.8`. Finally, the `.` tells docker where to find the dockerfile
we’re building.

```
cd 7.8
docker build -t haskell:7.8 .
```

We can test that it worked by using [`docker
run`](https://docs.docker.com/reference/commandline/cli/#run) to spawn `ghci` as
an interactive pseudo-tty.

```
docker run -i -t haskell:7.8 ghci
```

Use `:q` to quit `ghci` as usual.


# Building our Project

We’ll base our project on the docker image we just built.

> NOTE: We can push this base image [to the docker
hub](https://docs.docker.com/userguide/dockerrepos/#pushing-a-repository-to-docker-hub)
but interestingly enough, we don’t have to (if we’re using “normal” repos;
Automated Builds are a different story). We can push the final image without
pushing the base image.

### Dockerfile

Our `Dockerfile` goes in the root of the `auth-server/` folder. If you’ve built
a haskell project before and are familiar with cabal sandboxes, this will be
similar:

```
# https://github.com/darinmorrison/docker-haskell/tree/docker-library
FROM haskell:7.8

RUN cabal update

# Add Cabal File and deps/ folder
ADD ./auth-server.cabal /opt/auth-server/auth-server.cabal
ADD ./deps /opt/auth-server/deps

# Create Sandbox and Add Source Deps
RUN cd /opt/auth-server &&
        cabal sandbox init &&
        cabal sandbox add-source deps/io-streams-haproxy &&
        cabal sandbox add-source deps/snap &&
        cabal sandbox add-source deps/snap-core &&
        cabal sandbox add-source deps/snap-server &&
        cabal sandbox add-source deps/snap-loader-static &&
        cabal sandbox add-source deps/heist

RUN cd /opt/auth-server && cabal install --only-dependencies

# Explicitly add relevant folders
ADD ./src /opt/auth-server/src
ADD ./snaplets /opt/auth-server/snaplets
ADD ./static /opt/auth-server/static

# Init logging directories
RUN mkdir /opt/auth-server/log

# Build the Project
RUN cd /opt/auth-server && cabal build

# The directory CMD works from
WORKDIR /opt/auth-server
CMD ["./dist/build/auth-server/auth-server"]
```

With the above dockerfile in the root of `auth-server/` we can build with:

```
cd auth-server
docker build -t auth-server .
```

> NOTE: `-t auth-server` could be any name, such as `-t myawesomething` but if
you plan to push it to the docker hub do `username/image-name:tag-name`

After building, run it with:

```
docker run -i -t -p 8000:8000 auth-server
```

and we should have a running instance of our application on port `8000` (or at
`boot2docker ip` on port `8000`).

### To The Hub!

We can push the image we just built to a registry (such as the docker hub) by
building it with our username (so it gets filed under our user on the hub):

```
docker build -t biscarch/auth-server
docker push biscarch/auth-server
```

and on some other computer (such as AWS, a Digital Ocean instance or another dev
computer) pull and run the image:

```
docker pull biscarch/auth-server
docker run -d -p 8000:8000 biscarch/auth-server
```

after running, we can check that it’s up with `docker ps`:

[![Screenshot 2014-10-14 20.26.19](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611480/Screenshot-2014-10-14-20.26.19_ms5prn.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611480/Screenshot-2014-10-14-20.26.19_ms5prn.png)


# FIN

The completed docker image is on the hub as
[biscarch/auth-server:0.0.0.2](https://registry.hub.docker.com/u/biscarch/auth-server/),
so you can run a `pull`, then a `run` anywhere you like:

```
docker pull biscarch/auth-server:0.0.0.2
docker run -i -t -p 8000:8000 biscarch/auth-server:0.0.0.2
```
