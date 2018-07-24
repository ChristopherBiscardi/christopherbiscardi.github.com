---
title: "Servant Custom Content Types"
slug: "servant-custom-content-types"
date: 2016-10-03
---

Recently when implementing a Docker Registry I came across the need to
hash the incoming request body in a way that matches the clients
hash. Since the Docker engine is an existing client that speaks a
couple of different `Content-Type`s (such as
`application/vnd.docker.distribution.manifest.v2+json`, we cannot use
Servant's alternate content types to get a ByteString to hash. This
leads us to one possible implementation, which is to create a new
content type that uses
`application/vnd.docker.distribution.manifest.v2+json` as the `Accept`
header, but also hashes the content body with `SHA256`. Our content
type will behave very similarly to `application/json`.

We will use [cryptonite][cryptonite] for hashing and [Aeson][aeson]
for JSON decoding. The full code follows.

```haskell
{-# LANGUAGE FlexibleInstances     #-}
{-# LANGUAGE MultiParamTypeClasses #-}
{-# LANGUAGE OverloadedStrings     #-}
module SR.HashedJSONContentType where

import           Crypto.Hash                (Digest, SHA256)
import           Data.Aeson
import qualified Data.ByteString.Lazy.Char8 as BSC
import           Network.HTTP.Media         hiding (Accept)
import           Servant.API.ContentTypes

import           Utils                      (mkDigest)

data HashedJSON = HashedJSON String

instance Accept HashedJSON where
  contentType _ = "application" // "vnd.docker.distribution.manifest.v2+json"

-- | We don't need MimeRender for this since we are only using 
--   the content-type for receiving data.
-- instance Show a => MimeRender HashedJSON a where
--    mimeRender _ val = pack ("This is MINE! " ++ show val)

instance FromJSON a => MimeUnrender HashedJSON (Digest SHA256, a) where
   mimeUnrender _ bs = case eitherDecodeLenient bs of
     Left err -> Left err
     Right val -> Right (mkDigest $ BSC.toStrict bs, val)
```

The most interesting part is the `MimeUnrender` instance for our
custom content type `HashedJSON`. Servant provides a more lenient
version of Aeson's `decode` called `eitherDecodeLenient`. We use this
for compatibility with the normal `'JSON` content type in Servant.

The instance uses a tuple `(Digest SHA256, a)` so any route types we
write in the future will look similar to the following code which uses
a fake type `OurType`.

```haskell
ReqBody '[HashedJSON] (Digest SHA256, OurType) 
```

An example handler using the above `ReqBody` declaration follows.

```haskell
putManifest :: (CH.Digest CH.SHA256, Manifest) -> App NoContent)
putManifest (digest, manifest) = do
  -- do stuff with digests and manifests
  return NoContent
```

One can envision how changing the type of the hash in the type might
allow us to specify which algorithm we want to use in the same way
that we specify `Manifest`.

[cryptonite]: https://hackage.haskell.org/package/cryptonite
[aeson]: https://hackage.haskell.org/package/aeson
