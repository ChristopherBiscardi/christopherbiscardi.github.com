---
title: "Working with Snap 1.0"
date: 2014-10-05
slug: "working-with-snap-1-0"
url: "/2014/10/5/working-with-snap-1-0/"
---


[![snap-framework](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611482/snap_sks60m.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611482/snap_sks60m.png)

Snap 1.0 isn’t on Hackage yet, but here’s how you can play with it now.

NOTE: This was written using ghc-7.8.3. The repo is [on GitHub](https://github.com/ChristopherBiscardi/snap-micro-services)

First we’ll make a new directory for the project and one for the dependencies, then clone the dependencies for 1.0 that aren’t on Hackage:

```
<code class="bash" style="overflow-x:auto">mkdir auth_server
cd auth_server
mkdir deps
git clone git@github.com:snapframework/io-streams-haproxy.git deps/io-streams-haproxy
git clone git@github.com:snapframework/snap.git deps/snap
git clone git@github.com:snapframework/snap-core.git deps/snap-core
git clone git@github.com:snapframework/snap-server.git deps/snap-server
git clone git@github.com:snapframework/snap-loader-static.git deps/snap-loader-static
git clone git@github.com:snapframework/heist.git deps/heist
git clone git@github.com:snapframework/snap-templates.git deps/snap-templates
```

We should have a file structure that looks like this:

- auth_server/ - deps/ - io-streams-haproxy/
- snap/
- snap-core/
- snap-server/
- snap-loader-static/
- heist/

We can now get a scaffolded app using `snap-templates`.

```
<code class="bash">cd auth_server/deps/snap-templates
cabal build
```

Building `snap-templates` gives us the `snap` executable that we used to use from the `snap` project. In the project root, let’s init a new scaffold:

```
<code class="bash">cd auth_server
./deps/snap-templates/dist/build/snap/snap init
```

Which leaves us with this structure at the top level:

- auth_server/ - auth-server.cabal
- deps/
- snaplets/
- src/
- static/

If you haven’t created a new sandbox for this project, do that now and install the dependencies for the scaffold into the sandbox.

```
<code class="bash">cd auth_server
cabal sandbox init
cabal install --only-dependencies
```

We can’t build the app yet, since the scaffold is missing two things. We need to add `map-syntax` as a dependency to `auth-server.cabal` and we need to replace `noSplices` with `mempty` in `Site.hs` since `noSplices` has been deprecated.

First, in `auth-server.cabal`, under `Build-depends` add `map-syntax`:

```
    xmlhtml                   >= 0.1,
    map-syntax                >= 0.1
```

Next, we need to add two imports to `src/Site.hs`:

```
<code class="haskell">import           Data.Map.Syntax
import           Data.Monoid        (mempty)
```

as well as replace `noSplices` with `mempty`:

Before:

```
errs = maybe noSplices splice authError
```

After:

```
 errs = maybe mempty splice authError
```

We can now build and run the project:

```
cd auth_server
cabal build
./dist/build/auth-server/auth-server
```

We now have a working Snap 1.0 app to play with. In a future blog post, we’ll explore the creation of a Users service.
