---
title: "Riak Core: myapp:ping()."
date: 2013-01-13
slug: "riak-core-myappping"
url: "/2013/1/13/riak-core-myappping/"
---


As seen in the [quickstart post](http://www.christopherbiscardi.com/2013/01/13/riak-core-quickstart/); the default Riak Core template gives you a `myapp:ping().` method.
 I named my application spades, so my files are named `spades.erl` and `spades_vnode.erl` with the function being called as `spades:ping().`

```
<code class="erlang">
%% File: spades.erl
%% @doc Pings a random vnode to make sure communication is functional
ping() ->
  DocIdx = riak_core_util:chash_key({<<"ping">>, term_to_binary(now())}),
  PrefList = riak_core_apl:get_primary_apl(DocIdx, 1, spades),
  [{IndexNode, _Type}] = PrefList,
  riak_core_vnode_master:sync_spawn_command(IndexNode, ping, spades_vnode_master).
```

```
<code class="erlang">
%% File: spades_vnode.erl
%% Sample command: respond to a ping
handle_command(ping, _Sender, State) ->
  {reply, {pong, State#state.partition}, State};
```

All commands we execute as `myapp:command().` (such as `spades:ping().`) route through the myapp.erl functions.

In this case, when we call `spades:ping().` the ping(). function in spades.erl is what gets called.

Let’s take a look at the first line of code.

```
<code class="erlang">
    DocIdx = riak_core_util:chash_key({<<"ping">>, term_to_binary(now())}),
```

DocIdx is short for Document Index. This appears to be a holdover from before Riak Core was separated from Riak KV.
 We are using the Consistent Hash (chash) function from the riak_core_util module.
 By hashing on the “ping” and the current time, we achieve an acceptable level of randomness to distribute our request to a random vnode.

```
<code class="erlang">
  PrefList = riak_core_apl:get_primary_apl(DocIdx, 1, spades),
```

We then create a PreferenceList (PrefList) by using the hash we just created, an N value and a module name.
