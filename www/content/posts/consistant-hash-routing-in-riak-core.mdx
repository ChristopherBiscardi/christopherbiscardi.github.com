---
title: "Consistant Hash Routing in Riak Core"
date: 2013-01-16
url: "/2013/1/16/consistant-hash-routing-in-riak-core/"
---

## Prerequisites

<dl><dt>[Rebar](https://github.com/basho/rebar)</dt><dd>To build the project</dd></dl>
##  Relevant Files

<dl><dt>Project on Github</dt><dd>[https://github.com/ChristopherBiscardi/Riak-Core-Consistent-Hash-Routing-Example](https://github.com/ChristopherBiscardi/Riak-Core-Consistent-Hash-Routing-Example)</dd><dt>[chapp.erl](https://github.com/ChristopherBiscardi/Riak-Core-Consistent-Hash-Routing-Example/blob/master/a    pps/chapp/src/chapp.erl)</dt><dd>Holds the different routing code</dd><dt>[chapp_vnode.erl](https://github.com/ChristopherBiscardi/Riak-Core-Consistent-Hash-Routing-Example/blob/master/apps/chapp/src    /chapp_vnode.erl)</dt><dd>The ping function on the vnodes. This function is the same on every vnode, the difference is which vnode is processing the request.</dd></dl>

## The Code

```erlang
%% @doc Pings a random vnode
ping() ->
    DocIdx = riak_core_util:chash_key({>, term_to_binary(now())}),
    PrefList = riak_core_apl:get_primary_apl(DocIdx, 1, chapp),
    [{IndexNode, _Type}] = PrefList,
    riak_core_vnode_master:sync_spawn_command(IndexNode, ping, chapp_vnode_master).
```

The first function, shown above, pings a random (random enough for our purposes)
vnode and returns the partition identifier. The code we’re interested in is in
the first line of the function – specifically the chash_key() function.

The
[chash_key](https://github.com/basho/riak_core/blob/master/src/riak_core_util.erl#L187-192)
function takes a two-tuple and returns a binary identifier we can use to get a
PrefList. Much of the terminology in the Riak Core source refers to Riak KV. In
this case, the variables are named Bucket and Key in the chash_key function.

Each function in
[chapp.erl](https://github.com/ChristopherBiscardi/Riak-Core-Consistent-Hash-Routing-Example/blob/master/a
pps/chapp/src/chapp.erl) has different tuples which affect which vnode gets
called.

```erlang
% ping()
{>, term_to_binary(now())}

% pingsame()
{>, >}

% pinginput(X)
{>, term_to_binary(X)}
```

so if we build the project.

```bash
cd path/to/project
make rel
```

and run the console

```bash
./rel/chapp/bin/chapp console
```

we can then execute the various ping() functions as such:

```erlang
chapp:ping().
```

which gives us a tuple that contains `pong` and the partition id that processed
the request.

We can see the results from running the ping() function a couple times below.
Notice that each time we run ping(), a different partition handles the call.

```erlang
{pong,1004782375664995756265033322492444576013453623296}
{pong,1050454301831586472458898473514828420377701515264}
{pong,1027618338748291114361965898003636498195577569280}
{pong,1118962191081472546749696200048404186924073353216}
```

Looking at the next function `pingsame` which we call as such:

```erlang
chapp:pingsame().
```

we can see that by calling this function multiple times, we get the same
partition handling the call, because the hash of the tuple is always the same.

```erlang
{pong,936274486415109681974235595958868809467081785344}
{pong,936274486415109681974235595958868809467081785344}
{pong,936274486415109681974235595958868809467081785344}
{pong,936274486415109681974235595958868809467081785344}
```

The pinginput function allows us to take a more interactive look at where our
requests go. pinginput uses the input we give it as the second element in the
chash_key function tuple.

```erlang
chapp:pinginput(someinput).
```

we can see that by calling this function multiple times with the same input, the
same vnode processes the request.

```erlang
chapp:pinginput(someinput).
{pong,959110449498405040071168171470060731649205731328}
chapp:pinginput(someinput).
{pong,959110449498405040071168171470060731649205731328}
chapp:pinginput(someinput).
{pong,959110449498405040071168171470060731649205731328}
```

We can also see that by calling pinginput with a different input results in a
different vnode handling the request.

```erlang
chapp:pinginput(otherinput).
{pong,342539446249430371453988632667878832731859189760}
chapp:pinginput(otherinput).
{pong,342539446249430371453988632667878832731859189760}
chapp:pinginput(otherinput).
{pong,342539446249430371453988632667878832731859189760}
```
