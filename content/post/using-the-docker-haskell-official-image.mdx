---
title: "Using the Docker-Haskell Official Image"
date: 2014-11-23
url: "/2014/11/23/using-the-docker-haskell-official-image/"
---


Prerequisites: an [install of Docker](https://docs.docker.com/installation/#installation) (If you don’t want an install, Digital Ocean also has a Docker Droplet).

The Docker-Haskell “Official Images” container is available for download. You can find the source over on [GitHub](https://github.com/darinmorrison/docker-haskell) and the versions currently being built in the [official-images](https://github.com/docker-library/official-images/blob/master/library/haskell) repo.

To start a ghci we can pull and run the image tagged as `7.8`, which contains alex, happy, cabal and ghc-7.8.3:

```
docker pull haskell:7.8
docker run -it haskell:7.8
```

quitting the repl (`:q`) will also kill the container.


# Building a Dockerfile

We can base a new project’s Dockerfile off of the `haskell:7.8` base. As it happens, there is an example Snap project in the [docker-haskell](https://github.com/darinmorrison/docker-haskell) project, in the `/examples/7.8.3/` directory.

If we clone the repo and cd into the example project’s folder we can build the Dockerfile:

```
git clone git@github.com:darinmorrison/docker-haskell.git
cd docker-haskell/examples/7.8.3/snap
docker build -t my-new-project .
```

and run it:

```
docker run -itp 8000:8000 my-new-project
```

We can now see a Snap application running on port 8000 of either `localhost` or our `boot2docker ip`.
