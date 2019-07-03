---
title: "Deploy Haskell's Snap on Heroku"
date: 2014-02-02
url: "/2014/2/2/deploy-haskells-snap-on-heroku/"
---


In this post we will deploy our Snap app to Heroku.

[part 1](http://www.christopherbiscardi.com/2014/01/07/getting-started-with-snap-and-user-authentication-part-1/)
[part 2](http://www.christopherbiscardi.com/2014/01/10/getting-started-with-snap-and-user-authentication-part-2/)
[part 3](http://www.christopherbiscardi.com/2014/01/11/getting-started-with-snap-and-user-authentication-part-3/)

First, we need to put a `Procfile` in the root of our project; Save this as
`Procfile`

```
web: cabal run -- -p $PORT
```

If you’ve been following along and haven’t yet put the code into version
control, now is the time to do that by running `git init`, `git add` and `git
commit -m "message"`.

This command will create a new Heroku app with a Haskell buildpack. You can find
more information on the buildpack
[here](https://github.com/begriffs/heroku-buildpack-ghc)

```
heroku create --stack=cedar --buildpack https://github.com/begriffs/heroku-buildpack-ghc.git
```

> note: You can now deploy the app to Heroku, but you will get an error about connecting to PostgreSQL

At this point we have two basic choices: We can run PostgreSQL as a Heroku
extension or we can host PostgreSQL somewhere else. For this example, we'll
hosting elsewhere. `devel.cfg` looks like this:

```yaml
host = "localhost"
port = 5432
user = "postgres"
pass = ""
db = "testdb"

# Nmuber of distinct connection pools to maintain.  The smallest acceptable
# value is 1.
numStripes = 1

# Number of seconds an unused resource is kept open.  The smallest acceptable
# value is 0.5 seconds.
idleTime = 5

# Maximum number of resources to keep open per stripe.  The smallest
# acceptable value is 1.
maxResourcesPerStripe = 20
```

The final option is to just host PostgreSQL somewhere other than Heroku and
modify the config file to point there.

[![CBLogo_2014_transparent](http://res.cloudinary.com/diqzbm8lz/image/upload/h_300,w_300/v1428611521/CBLogo_2014_transparent_swcmig.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611521/CBLogo_2014_transparent_swcmig.png)
