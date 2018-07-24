---
title: "In Search of a Riak Solr Client for Haskell"
date: 2014-02-01
url: "/2014/2/1/in-search-of-a-riak-solr-client-for-haskell/"
---


In this post are the beginnings of riak-solr-client.

First, we need to take a look at the response from Solr/Yokozuna/Riak-Search-2 for a single query. In this case, the database only holds two records and we are doing a query that matches all results (`*:*`).

```javascript
{
   "responseHeader":{
      "status":0,
      "QTime":11,
      "params":{
         "shards":"127.0.0.1:8093/solr/my_index",
         "q":"*:*",
         "127.0.0.1:8093":"_yz_pn:64 OR (_yz_pn:61 AND (_yz_fpn:61)) OR _yz_pn:60 OR _yz_pn:57 OR _yz_pn:54 OR _yz_pn:51 OR _yz_pn:48 OR _yz_pn:45 OR _yz_pn:42 OR _yz_pn:39 OR _yz_pn:36 OR _yz_pn:33 OR _yz_pn:30 OR _yz_pn:27 OR _yz_pn:24 OR _yz_pn:21 OR _yz_pn:18 OR _yz_pn:15 OR _yz_pn:12 OR _yz_pn:9 OR _yz_pn:6 OR _yz_pn:3",
         "wt":"json"
      }
   },
   "response":{
      "numFound":2,
      "start":0,
      "maxScore":1.0,
      "docs":[
         {
            "_yz_id":"data_my_bucket_name_12",
            "_yz_rk":"name",
            "_yz_rt":"data",
            "_yz_rb":"my_bucket"
         },
         {
            "_yz_id":"data_my_bucket_second_15",
            "_yz_rk":"second",
            "_yz_rt":"data",
            "_yz_rb":"my_bucket"
         }
      ]
   }
}
```

As you can see, I’ve decided to retrieve JSON because of my familiarity with
Data.Aeson. There is no set schema for Solr responses, so we’re going to have to
test this fairly well to make a generic library that will be updated over time
as Solr updates.

With the sample response in mind, we can start to create the datatypes:

```haskell
newtype Params = Params (Map String String) deriving (Show)

data ResponseHeader = ResponseHeader {
  status :: Int,
  qTime  :: Int,
  params :: Params
} deriving (Show)

data Docs = Docs {
  _yz_id :: String,
  _yz_rk :: String,
  _yz_rt :: String,
  _yz_rb :: String
} deriving (Show)

data Results = Results {
  numFound :: Int,
  start :: Int,
  maxScore :: Float,
  docs :: [Docs]
} deriving (Show)

data SolrResponse = SolrResponse {
  responseHeader :: ResponseHeader,
  response :: Results
} deriving (Show)
```

The most interesting part of this is `Params`. We’ve defined `Params` as a
`newtype` for a `Data.Map` because, making an educated guess, the keys for
params won’t always be the same. We can reach this conclusion by seeing that one
of the keys is an IP address (with a port number).

Another interesting piece of the response is the `Docs`. Solr seems to return
the id in Solr (`_yz` is presumably for _yokozuna), the Riak Key (`_yz_rk`), the
Riak Bucket Type `_yz_rt` and the Riak Bucket (`_yz_rb`). This is useful
information because we will need to use riak-haskell-client (or more likely an
updated fork for Riak 2.0) to retrieve the actual data.

We can now write some JSON instances and basic http code to test. Here is the
full file:

```haskell
{-# LANGUAGE OverloadedStrings #-}
import Data.Aeson
import Data.Map
import Control.Applicative
import Control.Monad (mzero)

import Network.HTTP.Conduit -- the main module

-- The streaming interface uses conduits
import Data.Conduit
import Data.Conduit.Binary (sinkFile)

import qualified Data.ByteString.Lazy.Char8 as L
import Control.Monad.IO.Class (liftIO)

newtype Params = Params (Map String String) deriving (Show)
instance FromJSON Params where
  parseJSON val = Params  parseJSON val

data ResponseHeader = ResponseHeader {
  status :: Int,
  qTime  :: Int,
  params :: Params
} deriving (Show)
instance FromJSON ResponseHeader where
  parseJSON (Object o) = ResponseHeader  o .: "status"
                                         o .: "QTime"
                                         o .: "params"
  parseJSON _ = mzero

data Docs = Docs {
  _yz_id :: String,
  _yz_rk :: String,
  _yz_rt :: String,
  _yz_rb :: String
} deriving (Show)
instance FromJSON Docs where
  parseJSON (Object o) = Docs  o .: "_yz_id"
                               o .: "_yz_rk"
                               o .: "_yz_rt"
                               o .: "_yz_rb"
  parseJSON _ = mzero

data Results = Results {
  numFound :: Int,
  start :: Int,
  maxScore :: Float,
  docs :: [Docs]
} deriving (Show)
instance FromJSON Results where
  parseJSON (Object o) = Results  o .: "numFound"
                                  o .: "start"
                                  o .: "maxScore"
                                  o .: "docs"
  parseJSON _ = mzero

data SolrResponse = SolrResponse {
  responseHeader :: ResponseHeader,
  response :: Results
} deriving (Show)
instance FromJSON SolrResponse where
  parseJSON (Object o) = SolrResponse  o .: "responseHeader"
                                       o .: "response"
  parseJSON _ = mzero

main :: IO ()
main = do
```

and running `main` in ghci gives us:

```haskell
Just (SolrResponse {responseHeader = ResponseHeader {status = 0, qTime = 8, params = Params (fromList [("127.0.0.1:8093","_yz_pn:63 OR (_yz_pn:60 AND (_yz_fpn:60)) OR _yz_pn:59 OR _yz_pn:56 OR _yz_pn:53 OR _yz_pn:50 OR _yz_pn:47 OR _yz_pn:44 OR _yz_pn:41 OR _yz_pn:38 OR _yz_pn:35 OR _yz_pn:32 OR _yz_pn:29 OR _yz_pn:26 OR _yz_pn:23 OR _yz_pn:20 OR _yz_pn:17 OR _yz_pn:14 OR _yz_pn:11 OR _yz_pn:8 OR _yz_pn:5 OR _yz_pn:2"),("q","*:*"),("shards","127.0.0.1:8093/solr/my_index"),("wt","json")])}, response = Results {numFound = 2, start = 0, maxScore = 1.0, docs = [Docs {_yz_id = "data_my_bucket_name_11", _yz_rk = "name", _yz_rt = "data", _yz_rb = "my_bucket"},Docs {_yz_id = "data_my_bucket_second_14", _yz_rk = "second", _yz_rt = "data", _yz_rb = "my_bucket"}]}})
```

Success!

This is just a small start. Hopefully I'll be able to build this out a bit more
(two changes of note will be usage of `http-streams` and `Lens`) and write a
snaplet that integrates well with [this Riak
Snaplet](https://github.com/ChristopherBiscardi/snaplet-riak-2) in a more
generic fashion.
