---
title: "Deploying a Minecraft Server with Docker Machine"
date: 2014-12-27
url: "/2014/12/27/deploying-a-minecraft-server-with-docker-machine/"
---

The
[previous post](http://www.christopherbiscardi.com/2014/12/21/docker-machine/)
explains how to get up and running with Docker machine. This one will
be a quick tutorial on setting up a Minecraft server using Machine.

## Digital Ocean

Create a new Digital Ocean Machine. We need a `1gb` server due to
Java’s requirements, so we’ll specify the 1gb DO variant: 
```
> machine-docker create -d digitalocean --digitalocean-access-token=$DO_TOKEN --digitalocean-size=1gb
biscarch-minecraft INFO[0000] Creating SSH key...  INFO[0000] Creating
Digital Ocean droplet...  INFO[0003] Waiting for SSH...  INFO[0155]
"biscarch-minecraft" has been created and is now the active
machine. To point Docker at this machine, run: export
DOCKER_HOST=$(machine url) DOCKER_AUTH=identity 
```

## Activate

Run the command suggested to activate the Digital Ocean
machine. Remember that we re-named our binaries, so our command will
look slightly different:

```
export DOCKER_HOST=$(machine-docker url) DOCKER_AUTH=identity
```

## Run the Server

After creating the machine, we can run a Minecraft server. Notice
that we’ve accepted the EULA using an environment variable.

```
> machine-docker-1.3.1-dev-identity-auth run -itp 25565:25565 -e EULA=true itzg/minecraft-server
The authenticity of host "$ip:2376" can't be established.
Remote key ID XXXX
Are you sure you want to continue connecting (yes/no)? yes
Unable to find image 'itzg/minecraft-server:latest' locally
Pulling repository itzg/minecraft-server
cf3280236048: Download complete
511136ea3c5a: Download complete
97fd97495e49: Download complete
2dcbbf65536c: Download complete
6a459d727ebb: Download complete
8f321fc43180: Download complete
03db2b23cf03: Download complete
9cbaf023786c: Download complete
c40e36cb3ec9: Download complete
894f65ff66bd: Download complete
e82301eb9615: Download complete
1dbf91539513: Download complete
e545342bf796: Download complete
59bc57df4d1e: Download complete
553afa5133d9: Download complete
75c3ad818b79: Download complete
0b0acc66bc64: Download complete
978ce1e3b993: Download complete
54fead2b8d41: Download complete
2bb3b9314ae2: Download complete
af46a2317b29: Download complete
0b1b3214a72a: Download complete
c68e5b97cc3f: Download complete
f08ca66bb473: Download complete
36a596d541f4: Download complete
5c1156fb886b: Download complete
59349c103e38: Download complete
1d5073dd8949: Download complete
250469004d09: Download complete
78a77d27bdfa: Download complete
Status: Downloaded newer image for itzg/minecraft-server:latest
--2014-12-27 06:06:21--  https://s3.amazonaws.com/Minecraft.Download/versions/versions.json
Resolving s3.amazonaws.com (s3.amazonaws.com)... 54.231.244.4
Connecting to s3.amazonaws.com (s3.amazonaws.com)|54.231.244.4|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 20681 (20K) [application/octet-stream]
Saving to: 'STDOUT'

100%[====================================================================================>] 20,681      --.-K/s   in 0.1s

2014-12-27 06:06:22 (149 KB/s) - written to stdout [20681/20681]

Downloading minecraft_server.1.8.1.jar ...
[06:06:33] [Server thread/INFO]: Starting minecraft server version 1.8.1
[06:06:33] [Server thread/INFO]: Loading properties
[06:06:33] [Server thread/INFO]: Default game type: SURVIVAL
[06:06:33] [Server thread/INFO]: Generating keypair
[06:06:33] [Server thread/INFO]: Starting Minecraft server on *:25565
[06:06:33] [Server thread/INFO]: Using epoll channel type
[06:06:34] [Server thread/WARN]: Failed to load user banlist:
java.io.FileNotFoundException: banned-players.json (No such file or directory)
    at java.io.FileInputStream.open(Native Method) ~[?:1.7.0_65]
    at java.io.FileInputStream.<init>(FileInputStream.java:146) ~[?:1.7.0_65]
    at com.google.common.io.Files.newReader(Files.java:86) ~[minecraft_server.1.8.1.jar:?]
    at su.g(SourceFile:124) ~[minecraft_server.1.8.1.jar:?]
    at po.z(SourceFile:99) [minecraft_server.1.8.1.jar:?]
    at po.<init>(SourceFile:25) [minecraft_server.1.8.1.jar:?]
    at pp.i(SourceFile:172) [minecraft_server.1.8.1.jar:?]
    at net.minecraft.server.MinecraftServer.run(SourceFile:418) [minecraft_server.1.8.1.jar:?]
    at java.lang.Thread.run(Thread.java:745) [?:1.7.0_65]
[06:06:34] [Server thread/WARN]: Failed to load ip banlist:
java.io.FileNotFoundException: banned-ips.json (No such file or directory)
    at java.io.FileInputStream.open(Native Method) ~[?:1.7.0_65]
    at java.io.FileInputStream.<init>(FileInputStream.java:146) ~[?:1.7.0_65]
    at com.google.common.io.Files.newReader(Files.java:86) ~[minecraft_server.1.8.1.jar:?]
    at su.g(SourceFile:124) ~[minecraft_server.1.8.1.jar:?]
    at po.y(SourceFile:91) [minecraft_server.1.8.1.jar:?]
    at po.<init>(SourceFile:27) [minecraft_server.1.8.1.jar:?]
    at pp.i(SourceFile:172) [minecraft_server.1.8.1.jar:?]
    at net.minecraft.server.MinecraftServer.run(SourceFile:418) [minecraft_server.1.8.1.jar:?]
    at java.lang.Thread.run(Thread.java:745) [?:1.7.0_65]
[06:06:34] [Server thread/WARN]: Failed to load operators list:
java.io.FileNotFoundException: ops.json (No such file or directory)
    at java.io.FileInputStream.open(Native Method) ~[?:1.7.0_65]
    at java.io.FileInputStream.<init>(FileInputStream.java:146) ~[?:1.7.0_65]
    at com.google.common.io.Files.newReader(Files.java:86) ~[minecraft_server.1.8.1.jar:?]
    at su.g(SourceFile:124) ~[minecraft_server.1.8.1.jar:?]
    at po.A(SourceFile:107) [minecraft_server.1.8.1.jar:?]
    at po.<init>(SourceFile:29) [minecraft_server.1.8.1.jar:?]
    at pp.i(SourceFile:172) [minecraft_server.1.8.1.jar:?]
    at net.minecraft.server.MinecraftServer.run(SourceFile:418) [minecraft_server.1.8.1.jar:?]
    at java.lang.Thread.run(Thread.java:745) [?:1.7.0_65]
[06:06:34] [Server thread/WARN]: Failed to load white-list:
java.io.FileNotFoundException: whitelist.json (No such file or directory)
    at java.io.FileInputStream.open(Native Method) ~[?:1.7.0_65]
    at java.io.FileInputStream.<init>(FileInputStream.java:146) ~[?:1.7.0_65]
    at com.google.common.io.Files.newReader(Files.java:86) ~[minecraft_server.1.8.1.jar:?]
    at su.g(SourceFile:124) ~[minecraft_server.1.8.1.jar:?]
    at po.C(SourceFile:123) [minecraft_server.1.8.1.jar:?]
    at po.<init>(SourceFile:30) [minecraft_server.1.8.1.jar:?]
    at pp.i(SourceFile:172) [minecraft_server.1.8.1.jar:?]
    at net.minecraft.server.MinecraftServer.run(SourceFile:418) [minecraft_server.1.8.1.jar:?]
    at java.lang.Thread.run(Thread.java:745) [?:1.7.0_65]
[06:06:34] [Server thread/INFO]: Preparing level "world"
[06:06:34] [Server thread/INFO]: Preparing start region for level 0
[06:06:35] [Server thread/INFO]: Preparing spawn area: 4%
[06:06:36] [Server thread/INFO]: Preparing spawn area: 7%
[06:06:37] [Server thread/INFO]: Preparing spawn area: 9%
[06:06:38] [Server thread/INFO]: Preparing spawn area: 11%
[06:06:39] [Server thread/INFO]: Preparing spawn area: 15%
[06:06:40] [Server thread/INFO]: Preparing spawn area: 17%
[06:06:41] [Server thread/INFO]: Preparing spawn area: 20%
[06:06:42] [Server thread/INFO]: Preparing spawn area: 29%
[06:06:43] [Server thread/INFO]: Preparing spawn area: 40%
[06:06:44] [Server thread/INFO]: Preparing spawn area: 55%
[06:06:46] [Server thread/INFO]: Preparing spawn area: 70%
[06:06:47] [Server thread/INFO]: Preparing spawn area: 82%
[06:06:48] [Server thread/INFO]: Preparing spawn area: 95%
[06:06:48] [Server thread/INFO]: Done (14.248s)! For help, type "help" or "?"
```

## Launch Minecraft

If we ignore the files that we didn’t create for things like the
banned players list, that’s all we have to do to run the server!
Launch Minecraft and select Multiplayer:
[![Minecraft Multiplayer](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611476/Screenshot-2014-12-27-00.41.05_xnigfr.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611476/Screenshot-2014-12-27-00.41.05_xnigfr.png)

Select “Add Server”
[![Minecraft Add Server](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611474/Screenshot-2014-12-27-00.43.07_mje3vg.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611474/Screenshot-2014-12-27-00.43.07_mje3vg.png)

## Get the URL

To get the server address, run `machine-docker url`.

```
> machine-docker url
tcp://nnn.nnn.nn.nn:2376
```

[![Mining and Crafting!](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611474/Screenshot-2014-12-27-00.46.13_dna5kf.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611474/Screenshot-2014-12-27-00.46.13_dna5kf.png)

After clicking `done`, we should see our server:

[![Available Server!](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611473/Screenshot-2014-12-27-00.48.40_oxnmuv.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611473/Screenshot-2014-12-27-00.48.40_oxnmuv.png)

After clicking play the server, we get a nice new world!
[![A New World!](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611472/Screenshot-2014-12-27-00.50.45_xcr7h9.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611472/Screenshot-2014-12-27-00.50.45_xcr7h9.png)


## What’s next?

### Keeping the data around

Spawning servers is cool, but how do we keep the data around after the
container is killed?

Let’s take a look inside a running Minecraft container.

```
> machine-docker-1.3.1-dev-identity-auth ps
CONTAINER ID        IMAGE                          COMMAND              CREATED              STATUS              PORTS                      NAMES
94cf3f854fd8        itzg/minecraft-server:latest   "/start-minecraft"   About a minute ago   Up About a minute   0.0.0.0:25565->25565/tcp   sad_pare
> machine-docker-1.3.1-dev-identity-auth exec -it 94c bash
>> minecraft@94cf3f854fd8:/data$ ls
banned-ips.json  banned-players.json  eula.txt  logs  minecraft_server.1.8.1.jar  ops.json  server.properties  usercache.json  whitelist.json  world
```

`kill` the old server (we ran it using `-it` so `Control-C` should
kill it. If you chose to run it with `-d`, just use
`machine-docker-1.3.1-dev-identity-auth ps` and
`machine-docker-1.3.1-dev-identity-auth kill $container_id`

After killing the server, we will get kicked from the game:
[![Screenshot 2014-12-27 00.55.45](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611471/Screenshot-2014-12-27-00.55.45_hsjzmu.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611471/Screenshot-2014-12-27-00.55.45_hsjzmu.png)

We can see that there were quite a few files in the `/data`
directory. We’re going to mount a volume there using `/opt/craft` on
the host.

Notice that we’ve also set the Message of the Day (MOTD).

```
machine-docker-1.3.1-dev-identity-auth run -dp 25565:25565 -e EULA=true -e 'MOTD=Crafty Crafting!' -v /opt/craft:/data itzg/minecraft-server
```

Let’s ssh in to the Digital Ocean host and see if we have any files:

```
> machine-docker ssh
root@docker:~# ls /opt/craft/
banned-ips.json  banned-players.json  eula.txt  logs  minecraft_server.1.8.1.jar  ops.json  server.properties  usercache.json  whitelist.json  world
```

Voila! We have a bunch of files. Now we reconnect to the server (using
the Minecraft app) and spend some time doing something (say, chopping
down a tree). After that, kill the server as before. The files will
stay on the Digital Ocean machine, so we can just restart the server
using the same volume mount:

```
machine-docker-1.3.1-dev-identity-auth run -dp 25565:25565 -e EULA=true -e 'MOTD=Crafty Crafting!' -v /opt/craft:/data itzg/minecraft-server
```

And look at that, we’ve still cutting down our tree! The server was
saved!
[![Chopping Wood](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611468/Screenshot-2014-12-27-01.21.57_ldyqeq.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611468/Screenshot-2014-12-27-01.21.57_ldyqeq.png)

### A new Seed:

Now we’ll re-run our server with a level seed. It should be added to `/opt/craft/server.properties` and we can do that through ssh and vi:

```
> machine-docker ssh biscarch/minecraft
root@docker:~# vi /opt/craft/server.properties
```

server.properties looks something like this (we’ve just changed the `level-seed`)

```
root@docker:~# cat /opt/craft/server.properties
#Minecraft server properties
#Sat Dec 27 10:00:14 UTC 2014
spawn-protection=16
max-tick-time=60000
generator-settings=
force-gamemode=false
allow-nether=true
gamemode=0
enable-query=false
player-idle-timeout=0
difficulty=1
spawn-monsters=true
op-permission-level=4
resource-pack-hash=
announce-player-achievements=true
pvp=true
snooper-enabled=true
level-type=DEFAULT
hardcore=false
enable-command-block=false
max-players=20
network-compression-threshold=256
max-world-size=29999984
server-port=25565
texture-pack=
server-ip=
spawn-npcs=true
allow-flight=false
level-name=world
view-distance=10
resource-pack=
spawn-animals=true
white-list=false
generate-structures=true
online-mode=true
max-build-height=256
level-seed=1785852800490497919
use-native-transport=true
enable-rcon=false
motd=Crafty Crafting!
```

Now we should be able to blow away `/opt/craft/world` (if it exists in
the container) and our world will get rebuilt:

```
rm -rf /opt/craft/world
```

run the server with the volume attached:

```
machine-docker-1.3.1-dev-identity-auth run -dp 25565:25565 -e EULA=true -e 'MOTD=Crafty Crafting!' -v /opt/craft:/data itzg/minecraft-server
```

After starting the server with the new seed, just play the server as
before (it should still be listed).
[![Screenshot 2014-12-27 01.01.20](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611470/Screenshot-2014-12-27-01.01.20_moh5jl.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611470/Screenshot-2014-12-27-01.01.20_moh5jl.png)
Turn around and you should see:
[![Screenshot 2014-12-27 02.00.51](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611466/Screenshot-2014-12-27-02.00.51_disq4c.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611466/Screenshot-2014-12-27-02.00.51_disq4c.png)

# Fin

We can use docker machine to ssh into the server and edit
`/opt/craft/server.properties`, which holds [a bunch of
data](http://minecraft.gamepedia.com/Server.properties) we may want to edit.
Then just restart the container :)

Happy Crafting!
