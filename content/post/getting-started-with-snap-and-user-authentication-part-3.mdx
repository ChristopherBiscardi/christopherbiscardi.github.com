---
title: "Getting Started With Snap (and User Authentication): Part 3"
date: 2014-01-11
url: "/2014/1/11/getting-started-with-snap-and-user-authentication-part-3/"
---


In this post we will be replacing the JSON file (for user authentication) with a
Postgres database.

[Git Diff and Repo](https://github.com/ChristopherBiscardi/Getting-Started-with-Snap-and-User-Authentication/commit/72a77abac5d46554e659ddeef0a1abf7074a5c6f)
[part 1](http://www.christopherbiscardi.com/2014/01/07/getting-started-with-snap-and-user-authentication-part-1/)
[part 2](http://www.christopherbiscardi.com/2014/01/10/getting-started-with-snap-and-user-authentication-part-2/)

In `abc.cabal` add `snaplet-postgresql-simple` to `Build-depends`:

```haskell
Build-depends:
    bytestring                >= 0.9.1   && = 0.12    && = 0.2.1   && = 2       && = 0.11    && = 0.9     && = 0.9     && = 0.9     && = 0.11    && = 1.1     && = 0.1,
    snaplet-postgresql-simple == 0.4.1```

Then, In `src/Site.hs` we’re going to add the following imports:

```haskell
import Snap.Snaplet.PostgresqlSimple
import Snap.Snaplet.Auth.Backends.PostgresqlSimple
```

add this line to initialize the database in our Application Initialization code
below session and about auth:

```
d
```

and replace this line:

```
initJsonFileAuthManager defAuthSettings sess "users.json"
```

with this line, which does the dirty work of using Postgres instead of a JSON
file.

```
initPostgresAuth sess d
```

We'll also add the initialized database snaplet to our returned App:

```
return $ App h s d a
```

We're almost done, but first we'll need to add `_db` to our App definition in
`src/Application.hs`:

```haskell
data App = App
    { _heist :: Snaplet (Heist App)
    , _sess :: Snaplet SessionManager
    , _db :: Snaplet Postgres
    , _auth :: Snaplet (AuthManager App)
    }
```

and don't forget the import for postgres in the same file.

```
import Snap.Snaplet.PostgresqlSimple
```

We are now using Postgres as a database for our authentication! `cabal install`
and run `abc` to make sure it works. You may need to run the following in
`psql`:

```psql
CREATE ROLE postgres LOGIN;
CREATE DATABASE testdb;
```

also of note is that the git repo has bumped the version of abc to `0.2`

[Part 1 - Beginnings](http://www.christopherbiscardi.com/2014/01/07/getting-started-with-snap-and-user-authentication-part-1/)
[Part 2 - Auth](http://www.christopherbiscardi.com/2014/01/10/getting-started-with-snap-and-user-authentication-part-2/)

[![CBLogo_2014_transparent](http://res.cloudinary.com/diqzbm8lz/image/upload/h_300,w_300/v1428611521/CBLogo_2014_transparent_swcmig.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611521/CBLogo_2014_transparent_swcmig.png)
