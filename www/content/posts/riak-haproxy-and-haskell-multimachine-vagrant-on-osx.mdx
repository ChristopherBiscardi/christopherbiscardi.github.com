---
title: "Riak, HAProxy and Haskell: MultiMachine Vagrant on OSX"
date: 2014-02-12
url: "/2014/2/12/riak-haproxy-and-haskell-multimachine-vagrant-on-osx/"
---

[![vagrantriak](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611515/vagrantriak_qhwv7l.gif)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611515/vagrantriak_qhwv7l.gif)

In this post we will go over how to set up five Riak nodes, cluster them, setup
HAProxy on a sixth machine and run a Haskell environment in a seventh machine.
This will allow us to query from our Haskell vm to our HAProxy vm and distribute
the queries among a Riak cluster.

If you haven’t installed Vagrant, do that now:
[Vagrant](http://www.vagrantup.com/)

I used VirtualBox as a backing for Vagrant.
[VirtualBox](https://www.virtualbox.org/)

# tldr: Running the Code

## The Base Box

We will need Ubuntu 13.10 (Saucy Salamander), as this is the base box in our
`Vagrantfile`s.

`vagrant box add saucy-amd http://cloud-images.ubuntu.com/vagrant/saucy/current/saucy-server-cloudimg-amd64-vagrant-disk1.box`

## Cloning the Repo

The code is contained in a git repo [here]()

`git clone git@github.com:ChristopherBiscardi/Riak-HAProxy-Haskell-Vagrant.git`

## Getting Them Up

The simplest way to get everything up and running is:

```shell
cd riak-haproxy-haskell-vagrant
vagrant up
```

I personally like to bring up my databases first, then proxy, then webserver.

```shell
cd riak-haproxy-haskell-vagrant
vagrant up /riak[0-9]/
vagrant up haproxy
vagrant up web
```

A gif of running `vagrant up haproxy` is availible
[here](http://www.christopherbiscardi.com/wp-content/uploads/2014/02/vagrantuphaproxy.gif)

## Testing

We can be assured that everything has worked by running:

```shell
vagrant ssh web
curl 192.168.50.3:8098
```

Which is curling the IP of our load balancer. This should return something like
this from a Riak node:

```html
    <ul>
    <li><a href="/types">riak_kv_wm_bucket_type</a></li>
    <li><a href="/buckets">riak_kv_wm_buckets</a></li>
    <li><a href="/riak">riak_kv_wm_buckets</a></li>
    <li><a href="/types">riak_kv_wm_buckets</a></li>
    <li><a href="/buckets">riak_kv_wm_counter</a></li>
    <li><a href="/types">riak_kv_wm_crdt</a></li>
    <li><a href="/buckets">riak_kv_wm_index</a></li>
    <li><a href="/types">riak_kv_wm_index</a></li>
    <li><a href="/buckets">riak_kv_wm_keylist</a></li>
    <li><a href="/types">riak_kv_wm_keylist</a></li>
    <li><a href="/buckets">riak_kv_wm_link_walker</a></li>
    <li><a href="/riak">riak_kv_wm_link_walker</a></li>
    <li><a href="/types">riak_kv_wm_link_walker</a></li>
    <li><a href="/mapred">riak_kv_wm_mapred</a></li>
    <li><a href="/buckets">riak_kv_wm_object</a></li>
    <li><a href="/riak">riak_kv_wm_object</a></li>
    <li><a href="/types">riak_kv_wm_object</a></li>
    <li><a href="/ping">riak_kv_wm_ping</a></li>
    <li><a href="/buckets">riak_kv_wm_props</a></li>
    <li><a href="/types">riak_kv_wm_props</a></li>
    <li><a href="/stats">riak_kv_wm_stats</a></li>
    <li><a href="/search">yz_wm_extract</a></li>
    </ul>
```

## What’s Going On

Our Vagrantfile looks like this:

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"
NUM_RIAK_NODES = 5

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "saucy-amd"

  config.vm.define "web" do |web|
    web.vm.network "private_network",
      ip: "192.168.50.2", virtualbox__intnet: "riakhaskellnetwork"
    web.vm.provision "shell", path: "vagrant-files/haskell-build.sh"
    web.vm.provider "virtualbox" do |v|
      v.memory = 1024
    end
  end

  config.vm.define "haproxy" do |ha|
    ha.vm.network "private_network",
      ip: "192.168.50.3", virtualbox__intnet: "riakhaskellnetwork"
    ha.vm.provision "shell", path: "vagrant-files/haproxy-build.sh"
  end

# Base node is 192.168.50.10
# Subsequent nodes are .11/.12/etc
  (1..NUM_RIAK_NODES).each do |i|
    config.vm.define "riak#{i}" do |riakx|
      riakx.vm.network "private_network",
        ip: "192.168.50.#{i+9}", virtualbox__intnet: "riakhaskellnetwork"
      riakx.vm.provision "shell", path: "vagrant-files/riak-build.sh", args: "192.168.50.#{i+9} 192.168.50.10"
    end
  end
end
```

Each of our vm types is defined in a `config.vm.define` block. We have `web`,
`haproxy` and some `riak` nodes.

### Global

In each block we define a `private_network` named `riakhaskellnetwork` and
define the IP addresses for each vm. `web` is `x.x.x.2`, `haproxy` is `x.x.x.3`
and the `riak` nodes autoincrement from `x.x.x.10`. (riak1 is x.x.x.10, riak2 is
x.x.x.11, etc)

### web

Our web vm is provisioned using the shell script located in
`vagrant-files/haskell-build.sh`. It’s fairly basic and just installs the
`haskell-platform` and updates `cabal`.

```shell
echo "Haskell 7.6.3" apt-get update
apt-get install build-essential haskell-platform -y cabal update cabal install
cabal-install
```

After `vagrant up web` we can `vagrant ssh web` and run `ghci` to start a
Haskell interpreter.

### haproxy

Our HAProxy vm is a little more interesting. We install `haproxy`, set the open
files limit to > 256000 (in this case 266000) and then we start `haproxy` with
the config file `vagrant-files/haproxy.config`. Note that there are no startup
scripts, so this won’t to be able to withstand `vagrant reload` without running
`vagrant provision` after it.

```
echo "Building HAProxy" apt-get
update apt-get install haproxy -y ulimit -n 266000 haproxy -V -f
/vagrant/vagrant-files/haproxy.config
```

If we check out `vagrant-files/haproxy.config` we can see a little about what
we’re doing with our load balancer:

```
global log 192.168.50.3 local0 log
192.168.50.3 local1 notice maxconn 256000 chroot /var/lib/haproxy user haproxy
group haproxy spread-checks 5 daemon quiet

defaults log global option dontlognull option redispatch option allbackups
maxconn 256000 timeout connect 5000

backend riak_rest_backend mode http balance roundrobin option httpchk GET /ping
option httplog server riak1 192.168.50.10:8098 weight 1 maxconn 1024 check
server riak2 192.168.50.11:8098 weight 1 maxconn 1024 check server riak3
192.168.50.12:8098 weight 1 maxconn 1024 check server riak4 192.168.50.13:8098
weight 1 maxconn 1024 check server riak5 192.168.50.14:8098 weight 1 maxconn
1024 check

frontend riak_rest bind 192.168.50.3:8098 mode http option contstats
default_backend riak_rest_backend

backend riak_protocol_buffer_backend balance leastconn mode tcp option tcpka
option srvtcpka server riak1 192.168.50.10:8087 weight 1 maxconn 1024 check
server riak2 192.168.50.11:8087 weight 1 maxconn 1024 check server riak3
192.168.50.12:8087 weight 1 maxconn 1024 check server riak4 192.168.50.13:8087
weight 1 maxconn 1024 check server riak5 192.168.50.14:8087 weight 1 maxconn
1024 check

frontend riak_protocol_buffer bind 192.168.50.3:8087 mode tcp option tcplog
option contstats mode tcp option tcpka option srvtcpka default_backend
riak_protocol_buffer_backend
```

We are binding to the IP address of our vm, `192.168.50.3` and we’ve hardcoded
the five node Riak cluster into our backends. We have a backend (the Riak nodes)
and a frontend (webserver side) for Riak’s HTTP and Protobuf APIs.

### riakx

The Riak nodes are provisioned by `vagrant-files/riak-build`. We cycle through a
list from 1 to `NUM_RIAK_NODES` (in this case, 5), and create a node for each.
We pass two arguments to our shell script for each node. One is the base node IP
(always x.x.x.10) and the other is the current node’s IP.

```shell
#!/bin/bash

# $2 is base riak node IP

# $1 is current node's IP

echo "Building Riak Vagrant Node" echo $2 echo $1 sudo apt-get update sudo
apt-get install libssl0.9.8 default-jre -y wget
http://s3.amazonaws.com/downloads.basho.com/riak/2.0/2.0.0pre11/ubuntu/precise/riak_2.0.0pre11-1_amd64.deb
sudo dpkg -i riak_2.0.0pre11-1_amd64.deb sed -i "s/127.0.0.1/$1/g"
/etc/riak/riak.conf sed -i 's/search = off/search = on/g' /etc/riak/riak.conf
ulimit -n 8192 riak start if [[ "$2" != "$1" ]] then echo "Joining Base Riak
Node $2" riak-admin cluster join riak@$2 riak-admin cluster plan riak-admin
cluster commit else echo "Starting Base Riak Node" fi echo $(riak-admin status |
grep ring_members)
```

1.  We install libssl and a JRE (because we want to run Riak Search)
2.  wget the `amd64.deb` for Riak2.0.0-pre11
3.  install the .deb
4.  Replace 127.0.0.1 with our node’s IP address
5.  Replace `search = off` with `search = on` to turn on Riak Search
6.  Set the file limit to 8192
7.  Start Riak
8.  then, if we have the base node, do nothing
9.  If we have the non-base node, we commit a cluster plan to join with the base
    node
10. Finally, echo the result of `riak-admin status | grep ring_members`

Note that, just like the HAProxy vm, the Riak nodes don’t have init scripts and
will need a `vagrant provision` after a `vagrant reload`

# Future Work

In the future I might include Riak CS in this configuration. In addition, it
would be nice to have some init scripts to make for a more stable cluster. As it
stands now, we have a pseudo-production configuration and we can examine the
results of doing insane things like randomly `vagrant destroy`ing Riak nodes.

Now that I think about it, a chaos monkey would be a cool addition to this
setup.
