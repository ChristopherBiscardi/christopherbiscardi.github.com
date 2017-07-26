---
title: "Getting Started With Snap (and User Authentication): Part 2"
date: 2014-01-10
url: "/2014/1/9/getting-started-with-snap-and-user-authentication-part-2/"
---


[![CBLogo_2014_transparent](http://res.cloudinary.com/diqzbm8lz/image/upload/h_300,w_300/v1428611521/CBLogo_2014_transparent_swcmig.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611521/CBLogo_2014_transparent_swcmig.png)

[Git Repo](https://github.com/ChristopherBiscardi/Getting-Started-with-Snap-and-User-Authentication)
[part 1](http://www.christopherbiscardi.com/2014/01/07/getting-started-with-snap-and-user-authentication-part-1/)

The file structure now looks like this:

```
  - abc.cabal
  - log/
     - access.log
     - error.log
  - snaplets/
     - heist/
        - templates/
           - _login.tpl
           - _new_user.tpl
           - base.tpl
           - index.tpl
           - login.tpl
           - new_user.tpl
           - userform.tpl
  - src/
     - Application.hs
     - Main.hs
     - Site.hs
  - static/
     - screen.css
```

`abc.cabal` includes our dependencies and build information. This file is read
when we run `cabal install`

`log` includes two files that log out what browsers `access` the site and what
`error`s occur.

`snaplets` is where our snaplets store their files. In this case we only have
`heist` there, which contains a `templates` folder that includes the templates
we use to render the site.

`static` includes a simple stylesheet that is served when we visit the site.

`src` is the folder we’re currently concerned with. It includes three files:

##### Main.hs

This file contains some boilerplate for dynamic recompilation of a snap site.
We’ll be leaving this file alone.

##### Application.hs

Here we define our App datatype with the snaplets we will be using.

```haskell
data App = App
    { _heist :: Snaplet (Heist App)
    , _sess :: Snaplet SessionManager
    , _auth :: Snaplet (AuthManager App)
    }
```

In this case we are using `heist`, `sessions` and `authentication`.

Then we make a call to `makeLenses`

```
makeLenses ''App
```

`makeLenses` does some things under the hood like creating getters/setters and
changing the names for the snaplets in our app to remove the underscore. This
means that `_auth` will be referred to as `auth` in the rest of our app,
including in `src/Site.hs`.

We then define an instance for the Heist Snaplet so we don’t have to use `with
heist` every time we want to render a template (More about this later).

```haskell
instance HasHeist App where
    heistLens = subSnaplet heist
```

and finally we declare a type alias so that we can use `AppHandler` instead of
the longer `Handler App App` in the type signatures for our routes.

```
type AppHandler = Handler App App
```

##### Site.hs

This is where the meat of our site lives. The routing code, handlers and
initialization for the entire app.

The first route is `"/login"` which uses `handleLoginSubmit`.

```
("/login",    with auth handleLoginSubmit)
```

`with auth` lets us work in the auth Snaplet for `handleLoginSubmit`.

```haskell
handleLoginSubmit :: Handler App (AuthManager App) ()
handleLoginSubmit =
    loginUser "login" "password" Nothing
              (_ -> handleLogin err) (redirect "/")
  where
    err = Just "Unknown user or password"
```

Since we’re working in the auth Snaplet our type signature for the handler has
the type `Handler App (AuthManager App) ()`, which is slightly different from
the type we aliased in `Application.hs`.

`loginUser` is a function from the auth snaplet. It takes the `username` field
and the `password` field from a form submission, a “remember” field, a failure
function and a success function, in that order. The type signature looks like
this:

```haskell
loginUser
  :: ByteString -- name of username field
     -> ByteString -- name of password field
     -> Maybe ByteString -- name of remember field (`Nothing` means there isn't one)
     -> (AuthFailure -> Handler b (AuthManager b) ()) -- failure function
     -> Handler b (AuthManager b) () -- success function
     -> Handler b (AuthManager b) () -- return value is a handler
```

So going back to `handleLoginSubmit` we use:
`"login"` as the username field
`"password"` as the password field
`Nothing` as the remember field
`_ -> handleLogin err` as our error function
 and `redirect "/"` as our success function.

`err` is defined as `Just "Unknown user or password"` which matches up with the
type from `handleLogin`.

The `handleLogin` code will be covered in a Heist tutorial at another time, but
suffice it to say that `handleLogin` is rendering the login form with the error
that we’ve supplied it (which is “Unknown user or password”).

Our `"/logout"` route is pretty simple. Just call the snaplet-auth supplied
function `logout` and redirect to `"/"`

`"/new_user"` does a similar thing, except it displays the empty form on `GET`
request and handles a form submit on `POST`.

Next we’ll replace the backend, currently a json file, with postgres.
