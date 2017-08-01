---
title: "Riak Core: Unique Identifiers"
date: 2013-01-12
url: "/2013/1/12/riak-core-unique-identifiers/"
---


To generate a unique identifier, Riak Core exposes:

<div><div class="syntaxhighlighter  erlang" id="highlighter_676059"><div class="toolbar"><span>[?](#)</span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2">`<code class="erlang functions">riak_core_util:unique_id_62``<code class="erlang plain">()`</div></div></td></tr></tbody></table></div></div>Which returns a string that looks like this:

[erlang]NWX8ZV4Zn4pfZDh51viJtpyya9v[/erlang]

The full function can be seen below:

<div><div class="syntaxhighlighter  erlang" id="highlighter_202233"><div class="toolbar"><span>[?](#)</span></div><table border="0" cellpadding="0" cellspacing="0"><tbody><tr><td class="gutter"><div class="line number1 index0 alt2">1</div><div class="line number2 index1 alt1">2</div><div class="line number3 index2 alt2">3</div><div class="line number4 index3 alt1">4</div><div class="line number5 index4 alt2">5</div><div class="line number6 index5 alt1">6</div><div class="line number7 index6 alt2">7</div></td><td class="code"><div class="container"><div class="line number1 index0 alt2">`<code class="erlang comments">%% @spec unique_id_62() -> string()`</div><div class="line number2 index1 alt1">`<code class="erlang comments">%% @doc Create a random identifying integer, returning its string`</div><div class="line number3 index2 alt2">`<code class="erlang comments">%%      representation in base 62.`</div><div class="line number4 index3 alt1">`<code class="erlang plain">unique_id_62() ->`</div><div class="line number5 index4 alt2">`<code class="erlang spaces">    ``<code class="erlang constants">Rand``<code class="erlang plain">= ``<code class="erlang functions"><a href="http://erlang.org/doc/man/crypto.html#sha-1">crypto:sha</a>``<code class="erlang plain">(<a href="http://erlang.org/doc/man/erlang.html#term_to_binary-1">term_to_binary</a>({<a href="http://erlang.org/doc/man/erlang.html#make_ref-0">make_ref()</a>, ``<code class="erlang functions"><a href="http://www.erlang.org/doc/man/os.html#timestamp-0">os:timestamp</a>``<code class="erlang plain">()})),`</div><div class="line number6 index5 alt1">`<code class="erlang spaces">    ``<code class="erlang plain"><a href="http://learnyousomeerlang.com/starting-out-for-real#bit-syntax"><<I:160/integer>></a> = ``<code class="erlang constants">Rand``<code class="erlang plain">,`</div><div class="line number7 index6 alt2">`<code class="erlang spaces">    ``<code class="erlang plain"><a href="http://erlang.org/doc/man/erlang.html#integer_to_list-2">integer_to_list(I, 62).</a>`</div></div></td></tr></tbody></table></div></div>