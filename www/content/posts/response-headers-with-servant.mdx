---
title: "Response Headers with Servant"
slug: "response-headers-with-servant"
date: 2016-08-08
---

It can be hard to figure out how to deal with all of the type
machinery in Servant. This post details adding headers to the response
of a Servant API.

Given the following API, which returns NoContent for a GET request.

```haskell
type V2 = "v2" :> Get '[JSON] NoContent
```

and the following handler, which assumes we've set up a custom Monad
stack called `App` (note that we've skipped the "server" boilerplate
for brevity, since it is covered in the Servant docs).

```haskell
v2 :: App NoContent
v2 = return NoContent
```

We can add a response header using [addHeader][addHeader], which is
detailed in the docs on Hackage. What may be less obvious is that
addHeader changes the response type of the route. Our simple API
changes it's type to represent the new return value:

```haskell
type V2Base = "v2" :> Get '[JSON] (Headers '[Header "X-Awesome" String] NoContent)
```

and our handler now can return the appropriate type as well:

```haskell
v2 :: App (Headers '[Header "X-Awesome" String] NoContent)
v2 = return $ addHeader "very/awesome" NoContent
```

## Multiple Headers

If we inspect the type we added to be able to return our first header,
we can notice that it is a list of `Header`s. We can use this to add
multiple new headers to our route as follows:

```haskell
type V2Base = "v2" :> Get '[JSON] (Headers '[
  Header "X-Awesome" String,
  Header "Content-Type" String
  ] NoContent)
```

[addHeader]: http://hackage.haskell.org/package/servant-0.8/docs/Servant-API-ResponseHeaders.html#v:addHeader
