---
title: "Emacs in Docker"
date: "2014-10-17"
url: "/2014/10/17/emacs-in-docker/"
---


[![docker-emacs](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611480/docker-emacs_rscg2o.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611480/docker-emacs_rscg2o.png)

Assuming a docker installation (either boot2docker or just docker) and a version
of `1.3` or higher, we can use Volumes to enable a portable emacs installation.


# Using My Image

To use mine, pull the image:

```
docker pull biscarch/emacs
```

set up a function to mount the `pwd` at `/files` inside the container and open
an emacs at `/files`:

NOTE: This is what I have in my `.zshrc`; YMMV.

```
de(){
    docker run -itv `pwd`:/files biscarch/emacs emacs /files
}
```

Now, in the root of a project run:

```
cd my_project_root
de
```

and you’ll be in an emacs. All edits in `/files` will persist to the host:

```
 1  /files:
 2  total used in directory 52 available 21162304
 3  drwxr-xr-x  1 1000 staff  680 Feb  8  2014 .
 4  drwxr-xr-x 44 root root  4096 Oct 18 03:44 ..
 8  -rw-r--r--  1 1000 staff  101 Aug 16  2013 .ghci
 9  drwxr-xr-x  1 1000 staff  442 Oct 18  2014 .git
10  -rw-r--r--  1 1000 staff   23 Nov  2  2013 .gitignore
13  -rw-r--r--  1 1000 staff  125 Nov  2  2013 README.md
14  drwxr-xr-x  1 1000 staff   68 Sep 15  2013 custom-deps
15  drwxr-xr-x  1 1000 staff  170 Feb  8  2014 dist
16  drwxr-xr-x  1 1000 staff  136 Feb  8  2014 log
17  -rw-r--r--  1 1000 staff   96 Aug 31  2013 site_key.txt
18  drwxr-xr-x  1 1000 staff  136 Feb  8  2014 snaplets
19  drwxr-xr-x  1 1000 staff  646 Feb  8  2014 src
20  drwxr-xr-x  1 1000 staff  204 Feb  8  2014 static
21  -rw-r--r--  1 1000 staff 2542 Dec 25  2013 tracker.cabal
22  -rw-r--r--  1 1000 staff  602 Dec 30  2013 users.json
```

### Build Yours

To build your own `docker-emacs`, check out my [Automated
Build](https://registry.hub.docker.com/u/biscarch/emacs/) and the [GitHub
Repo](https://github.com/ChristopherBiscardi/docker-emacs) for `biscarch/emacs`
