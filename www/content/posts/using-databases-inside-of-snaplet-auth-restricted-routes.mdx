---
title: "Using Databases inside of Snaplet Auth Restricted Routes"
date: 2014-01-09
url: "/2014/1/9/using-databases-inside-of-snaplet-auth-restricted-routes/"
---

[![CBLogo_2014_transparent](http://res.cloudinary.com/diqzbm8lz/image/upload/h_300,w_300/v1428611521/CBLogo_2014_transparent_swcmig.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611521/CBLogo_2014_transparent_swcmig.png)
The github repo for this code is at
[here](https://github.com/ChristopherBiscardi/Snap-Databased-within-Auth-Snaplet-Example).

tldr; use this instance:

```haskell
instance HasPostgres (Handler App (AuthManager App)) where
    getPostgresState = withTop pg get
```

The app we’re using was built by running `snap init` and adding the following
code:

##### src/Application.hs

In `src/Application.hs` we’ve added the following imports:

```haskell
import Snap.Snaplet.PostgresqlSimple
```

and the following definition to our `App` datatype:

```haskell
,_pg :: Snaplet Postgres
```

##### src/Site.hs

In `src/Site.hs` we’ve added the following language extensions:

```haskell
{-# LANGUAGE FlexibleInstances #-}
```

Imports:

```haskell
-- for "get"
import Control.Monad.State.Class
-- for "liftIO"
import           Control.Monad.IO.Class
--for "writeJSON"
import           Snap.Extras.JSON
-- for Non Snaplet-Auth related database queries
import           Snap.Snaplet.PostgresqlSimple
-- for Snaplet-Auth backed
import           Snap.Snaplet.Auth.Backends.PostgresqlSimple
```

Instances:

```haskell
instance HasPostgres (Handler b App) where
getPostgresState = with pg get

instance HasPostgres (Handler App (AuthManager App)) where getPostgresState =
withTop pg get
```

and Snaplet Init code:

## What's Going On

We've also defined a convenience function `needsAuth` to restrict our
`"/postgres"` route to only logged in users.

```haskell
needsAuth :: Handler App (AuthManager App) () -> Handler
App App () needsAuth x = with auth $ requireUser auth (redirect "/") x
```

`getFromPostgres` does the dirty work for us by querying a table that was
created as part of the Snaplet-Auth backend. It will return a list of all users.

```haskell
getFromPostgres :: Handler App (AuthManager App) ()
getFromPostgres = do --get the results results
```

`"/postgres"` is the url to hit to check to see if it's working.

`, ("/postgres", needsAuth getFromPostgres)`

## The Instance

What's really doing the heavy lifting of using the postgres snaplet inside of
the auth snaplet's route is this instance:

```haskell
instance HasPostgres (Handler App (AuthManager App)) where
getPostgresState = withTop pg get
```

The important difference from the instance above it is `withTop` which can be
found
[here](http://hackage.haskell.org/package/snap-0.6.0.2/docs/Snap-Snaplet.html).

From the docs:

> -- | Like 'with' but doesn't impose the requirement that the action -- being
> run be a descendant of the current snaplet.

Essentially, the auth snaplet doesn't know anything about the postgres snaplet
as we've instantiated it (it doesn't keep around a reference from the Backend
module), so we have to ask the parent context (using `withTop`).
