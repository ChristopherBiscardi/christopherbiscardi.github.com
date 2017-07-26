---
title: "A Foray Into Haxl: PostgreSQL Simple"
date: 2014-07-04
url: "/2014/7/4/a-foray-into-haxl-postgresql-simple/"
---


I wrote a simple Haxl DataSource and I thought it would be good to share. If you
don’t know what Haxl is you can find out more
[here](https://github.com/facebook/Haxl).

The gist with the relevant .cabal and DataSource is
[here](https://gist.github.com/ChristopherBiscardi/45c765eb292d96ab4549)


## Table

We will need a people table to store our people:

```sql
CREATE TABLE people (
    _id bigserial primary key,
    first_name text NOT NULL,
    last_name text NOT NULL,
    age int NOT NULL
);
```

And some data to query:

```sql
INSERT INTO people ("first_name", "last_name", "age") VALUES ('Bob','Seger',69);
INSERT INTO people ("first_name", "last_name", "age") VALUES ('Billy','Idol',58);
```

which gives us a table that looks like:

```
peopledb=# select * from people;
 _id | first_name | last_name | age
-----+------------+-----------+-----
   1 | Bob        | Seger     |  69
   2 | Billy      | Idol      |  58
(2 rows)
```

We can then head into ghci and check out the Haxl DataSource.

```haskell
ghci DataSource.hs
let cinfo = defaultConnectInfo {
    connectUser = "pgsuper"
  , connectPassword = "password"
  , connectDatabase = "peopledb"
  }
pgstate
```

If we check out the value of `r` we see a `Just Person`.

```haskell
Just (Person {_id = PersonId 1, first_name = "Bob", last_name = "Seger", age = 69})
```


## The Code

First, we need a datatype to be querying. Of note is that we've `newtype`'d
`PersonId`, so we'll use `GeneralizedNewtypeDeriving` to get the `FromField`
instance from `Int`

```haskell
newtype PersonId = PersonId Int deriving (Show, Eq, FromField)

data Person = Person { _id        :: PersonId
                     , first_name :: Text
                     , last_name  :: Text
                     , age        :: Int } deriving (Show, Typeable)
```

Next we'll define our requests as a GADT. In this case we only have a single
request type: "GetPerson", which takes a `PersonId` and looks up that user.

```haskell
data PGReq a where
  GetPerson :: PersonId -> PGReq (Maybe Person)
  deriving Typeable
```

Now we need some simple boilerplate. The Hashable instance defines the hash of our request types for the cache. In this case a `GetPerson` request is as a tuple of `(0,PersonId)`.

```haskell
deriving instance Eq (PGReq a)
deriving instance Show (PGReq a)

instance Show1 PGReq where show1 = show

instance Hashable (PGReq a) where
  hashWithSalt s (GetPerson (PersonId pid)) = hashWithSalt s (0::Int, pid)
```

Following the boilerplate we'll create a `StateKey` instance. Since this is a simple implementation, we'll put the connection information in our state so we can create connections later. We'll also define a function to initialize said state.

```haskell
instance StateKey PGReq where
  data State PGReq =
    PGState
      { connInfo :: ConnectInfo }

initHaxlState
  :: ConnectInfo
  -> IO (State PGReq)
initHaxlState cInfo = do
  return PGState
    { connInfo = cInfo }
```

Haxl needs us to name our DataSource and tell it which function to use for
fetching data.

```haskell
instance DataSourceName PGReq where
  dataSourceName _ = "Postgres"

instance DataSource u PGReq where
  fetch = pgFetch
```

Then we can define our asynchronous fetch functions which will process our
`BlockedFetch`es. We put a failure on exceptions and pass the data through on a
success.

```haskell
pgFetch
 :: State PGReq
 -> Flags
 -> u
 -> [BlockedFetch PGReq]
 -> PerformFetch
pgFetch PGState {..} _flags _user bfs =
  AsyncFetch $ \inner -> do
    asyncs  BlockedFetch PGReq
  -> IO (Async ())
fetchAsync creds (BlockedFetch req rvar) =
  async $ do
    bracket (connect creds) (close) $ \conn -> do
      e  putFailure rvar (ex :: SomeException)
        Right val -> putSuccess rvar val
```

Finally, we can define our application logic. In this case our only request type
is `GetPerson`, so we need to get a single `Person` by `PersonId`. We could also
write more `fetchReq` patterns if we had more request types.

`getPerson` is the function we'll actually call to get a person by id; As seen
in the intro to this post.

```haskell
fetchReq
  :: Connection
  -> PGReq a
  -> IO a
fetchReq conn (GetPerson (PersonId pid)) = do
  people  GenHaxl u (Maybe Person)
getPerson pid = dataFetch (GetPerson pid)
```
