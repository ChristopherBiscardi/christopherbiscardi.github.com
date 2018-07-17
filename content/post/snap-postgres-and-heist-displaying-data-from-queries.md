---
title: "Snap, Postgres and Heist: Displaying Data from Queries"
date: 2014-04-08
url: "/2014/4/8/snap-postgres-and-heist-displaying-data-from-queries/"
---

The github repo for this post is
[here](https://github.com/ChristopherBiscardi/snap-postgres-heist).

## Single AuthUser Splice

Assuming we have instances and initializations for the Postgres Auth backend and
Postgresql-Simple Snaplet, we can do a few things. First, we need to write a
Splice for the AuthUser data type. We will only use a couple fields to show how
it works.

```haskell
authUserSplice :: Monad m =>
                  AuthUser ->
                  Splices (HeistT n m Template)
authUserSplice authUser = do
  "userLogin" ## I.textSplice (userLogin authUser)
  "userLoginCount" ## I.textSplice (T.pack $ show $ userLoginCount authUser)
```

Using `##`, we are binding the strings `"userLogin"` and `"userLoginCount"` to
their respective values from the `authUser` object. `userLogin authUser` gives
us a `Text` result, so `"userLogin"` is bound to a text splice. We also bind
`"userLoginCount"` as a text splice by converting the `int` we get from using
`userLoginCount` on `authUser`.

Now that we have our Splice written, let’s write our template.

```html
<apply template="base">
<h1><userLogin/></h1>
<p>Number of Times Logged In: <userLoginCount/></p>
</apply>
```

Nothing major here. We have used the strings we bound before as tags to display
the text from the `authUser` object.

Finally, we can write a Handler to make the database request and render the
template using our splice.

```haskell
getFromPostgres :: Handler App
(AuthManager App) () getFromPostgres = do result
```

Using a simple query to store the data from Postgres in `result`, we then render
using our template (`auth_user_splice.tpl`) and apply the splice to the data in
our result.

## List of AuthUsers

To display a list of data, the process is very similar.

We can reuse the `authUserSplice` we just wrote and map it across the list of
data we plan on passing in using `mapSplices` and `runChildrenWith`.

```haskell
authUsersSplice :: [AuthUser] ->
I.Splice AppHandler authUsersSplice = I.mapSplices (I.runChildrenWith .
authUserSplice)
```

We will also write a new template to display the information. Included in this
is the `authUsers` tag, which we are going to bind in our Handler.

```html
<apply template="base">

<dl>
<authUsers>
<dt><userLogin/></dt>
<dd>Number of Times Logged In: <userLoginCount/></dd>
</authUsers>
</dl>
</apply>
```

We can then write our handler as such:

```haskell
getManyFromPostgres :: Handler App
(AuthManager App) () getManyFromPostgres = do results
```

We are rendering our new template `auth_users_splice.tpl` with our mapped
splices bound to `"authUsers"`. The code inside of `<authUsers>` will be run for
each result in our list.

## End

That's it. Feel free to pull the code from
[github](https://github.com/ChristopherBiscardi/snap-postgres-heist) and leave
any questions you have below.
