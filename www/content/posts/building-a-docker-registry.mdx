---
title: "Building a Docker Registry"
slug: "building-a-docker-registry"
date: 2016-10-03
---

Containers are surging right now. This series of blog posts will
explore a small corner of that universe by building a Docker Registry
that adheres to the [Docker Registry HTTP V2 API][v2-api]. The
information contained in these posts will take a conceptual approach
rather than a step-by-step approach. The code will be available in
full on GitHub, as the [Superhuman Registry][superhuman-registry].

# Intro

For this project we'll use Haskell as the implementation language so
that we can use Servant.

> Servant is a set of packages for declaring web APIs at the
> type-level and then using those API specifications to:

* write servers (this part of servant can be considered a web
  framework), 
* obtain client functions (in Haskell),
* generate client functions for other programming languages,
* generate documentation

Servant allows us to specify everything from request bodies to Headers
at the type level, which will help us be explicit as we explore
Manifests, Tags and Digests. Since the purpose of this set of articles
is informative, the types will help ground our conversations.

# Getting Started

Firstly, we'll need a new Haskell project. [Stack][stack] provides
nice templating functionality, so we'll use that to scaffold a new
project.

```haskell
stack new servant sr --resolver nightly-2016-07-31
```

Since we aren't focusing on Servant itself for this series, we'll
skip a bunch of the boilerplate and backing code to focus in on the
handlers and business logic. The code for this section *is*
[on GitHub][lib.hs-1] for those that want to investigate further.

## Routes

One of the benefits of working from a spec is that there are a full
set of routes already penned out for us to implement so we can achieve
compatibility with the wider ecosystem of tools, such as the Docker
Engine.

To start, we'll translate the routes pretty loosely. Then we'll go
back and fill in the return types as we write each of the route
handlers. Translating the [V2 API][v2-api] into types looks like the
following.

```haskell
type Head = Verb 'HEAD 200

type V2Base = "v2" :> Get '[JSON] (Headers '[
  Header "Docker-Distribution-API-Version" String
  ] NoContent)

-- | Main API Type
type API = V2Base :<|> "v2" :> V2API

-- | V2 API Definition
type V2API = Metadata
  :<|> "_catalog" :> Get '[JSON] NoContent

type Tags = "tags" :> "list" :> Get '[JSON] NoContent 

type Metadata = Capture "name" Name :> (
  Tags :<|>
  "manifests" :> Manifests :<|>
  "blobs" :> Blobs
  )

type Blobs = Digests :<|> Upload

type Manifests = Capture "reference" Ref :> (
  Get '[JSON] NoContent :<|>
  Put '[JSON] NoContent :<|>
  Delete '[JSON] NoContent :<|>
  Head '[JSON] NoContent
  ) 

type Digests = Capture "digest" Digest :> (
  Head '[JSON] NoContent :<|>
  Get '[JSON] NoContent :<|>
  Delete '[JSON] NoContent
  )

type Upload = "uploads" :> (
  Post '[JSON] NoContent :<|>
  Capture "uuid" UUID :> (
    Get '[JSON] NoContent :<|>
    Patch '[JSON] NoContent :<|>
    Put '[JSON] NoContent :<|>
    Delete '[JSON] NoContent
    )
  )
```

This produces a set of routes that lay out as follows:

```
/
└─ v2/
   ├─•
   ┆
   ┆
   ├─ <capture>/
   │  ├─ blobs/
   │  │  ├─ <capture>/
   │  │  │  ├─•
   │  │  │  ┆
   │  │  │  ├─•
   │  │  │  ┆
   │  │  │  └─•
   │  │  ┆
   │  │  └─ uploads/
   │  │     ├─•
   │  │     ┆
   │  │     ┆
   │  │     └─ <capture>/
   │  │        ├─•
   │  │        ┆
   │  │        ├─•
   │  │        ┆
   │  │        ├─•
   │  │        ┆
   │  │        └─•
   │  ├─ manifests/
   │  │  └─ <capture>/
   │  │     ├─•
   │  │     ┆
   │  │     ├─•
   │  │     ┆
   │  │     ├─•
   │  │     ┆
   │  │     └─•
   │  └─ tags/
   │     └─ list/
   │        └─•
   ┆
   └─ _catalog/
      └─•
```

This matches up with the spec quite well and gives us a nice base to
start writing more specific code without worrying about whether we'll
miss a route.

## The Types

If we take a closer look at the types we just wrote out we see a bunch
of concepts including `Name`, `Tags`, `Manifests`, `Blobs`, and
`Digests`. Interestingly, we don't see an `Image` or `Container`
anywhere.

### Name

We use `Name` to represent an repository name. `Name`s must adhere to
a specific regex (`[a-z0-9]+(?:[._-][a-z0-9]+)*`) and be less than 256
characters. In plain english from the spec:

> A repository name is broken up into path components. A component of
> a repository name must be at least one lowercase, alpha-numeric
> characters, optionally separated by periods, dashes or
> underscores.

### Tags

`Tags` are strings that reference images. For example, if we were
using `debian` and wanted to only use the tag `jessie`, we could pull
using the format `debian:jessie`.

### Manifests

An image manifest provides a configuration and a set of
layers for a container image. It looks like the following JSON:

```javascript
{
    "schemaVersion": 2,
    "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
    "config": {
        "mediaType": "application/vnd.docker.container.image.v1+json",
        "size": 7023,
        "digest": "sha256:b5b2b2c507a0944348e0303114d8d93aaaa081732b86451d9bce1f432a537bc7"
    },
    "layers": [
        {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "size": 32654,
            "digest": "sha256:e692418e4cbaf90ca69d05a66403747baa33ee08806650b51fab815ad7fc331f"
        },
        {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "size": 16724,
            "digest": "sha256:3c3a4604a545cdc127456d94e421cd355bca5b528f4a9c1905b15da2eb4a4c6b"
        },
        {
            "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
            "size": 73109,
            "digest": "sha256:ec4b8955958665577945c89419d1af06b5f7636b4ac3da7f12184802ad867736"
        }
    ],
}
```

### Blobs & Digests

Layers are stored in the blob portion of the registry, keyed by
digest.

## Our First Handler

The first route we'll look at implementing is also the most
simple. It's the route that lets clients know that this registry
implements the V2 APIs.

The type of the `/v2` route is

```haskell
type V2Base = "v2" :> Get '[JSON] (Headers '[
  Header "Docker-Distribution-API-Version" String
  ] NoContent)
```

Which breaks down to a `GET` request with an `application/json`
content type. The response has a single header,
`Docker-Distribution-API-Version`, which is what lets a client know
which API version our registry implements. We also send back no body
content. Finally, we can dig a bit deeper into `Get`, which is a type
alias for `Verb 'GET 200`. This tells us that a successful response
will have a 200 code.

The only other valid codes for this route `401 Unauthorized` and `429
Too Many Requests` but since we haven't implemented authorization or
rate-limiting, we'll skip that for now.

```haskell
v2 :: App (Headers '[Header "Docker-Distribution-API-Version" String] NoContent)
v2 = do
  $(logTM) InfoS "registry/2.0"
  return $ addHeader "registry/2.0" NoContent
```

Our logging is pretty basic right now. We'll worry about bulking it up
later. For now, we're going to leave the default Katip stdout which
leaves us with time, loglevel, hostname (container id), thread id and
source location:

```
[2016-08-08 21:47:50][superhuman-registry][Info][85f79bec070f][33][ThreadId 11][sr-0.1.0.0-61fGnb6tOFbKD5fzBNSxKr:Lib src/Lib.hs:63:5] registry/2.0
```

# Dealing with Layers

The primary purpose of a Registry is to store layers and manifests so
a client (such as a Docker Engine) can pull images. We'll avoid
supporting legacy versions of the registry for security and simplicity
reasons, which means our registry will only work for docker 1.10 and
above. Benefits of this include not having to rewrite v2 manifests
into the v1 format.

## Docker Client

We need to figure out what the docker is doing on a push. Since I'm
running Docker for Mac, booting a server to act as a registry is
pretty simple. We'll use `nc` for a first attempt.

```shell
docker run -itp 9000:9000 alpine nc -l 9000
```

Now that we have a server acting as a "registry", we need to tag and
push an image to it.

```shell
> docker tag hello-world localhost:9000/hello-world
> docker push localhost:9000/hello-world
The push refers to a repository [localhost:9000/hello-world]
Put http://localhost:9000/v1/repositories/hello-world/: EOF
```

Great! Our server is listening and the engine is pushing to the right
place. If it wasn't, we could've seen something like this:

```shell
Put http://localhost:9000/v1/repositories/hello-world/: read tcp
[::1]:56492->[::1]:9000: read: connection reset by peer
```

There's a problem though, `nc` doesn't implement the `/v2/` endpoint,
so the docker client falls back to v1 of the api. Luckily, we've
implemented the v2 endpoint already so we'll skip netcat and jump back
into Haskell.

We can use `Wai.Middleware.RequestLogger` to log out everything docker
tries to do to our registry. Using docker-compose to boot up our
registry and re-attempting the push yields:

```
api_1  | GET /v2/
api_1  |   Accept:
api_1  |   Status: 200 OK 0.000190373s
api_1  | Prelude.undefined
api_1  | CallStack (from HasCallStack):
api_1  |   error, called at libraries/base/GHC/Err.hs:79:14 in base:GHC.Err
api_1  |   undefined, called at src/SR/Blobs.hs:26:14 in sr-0.1.0.0-5isXdkrmBvbJTFdJY734op:SR.Blobs
api_1  | Prelude.undefined
api_1  | CallStack (from HasCallStack):
api_1  |   error, called at libraries/base/GHC/Err.hs:79:14 in base:GHC.Err
api_1  |   undefined, called at src/SR/Blobs.hs:26:14 in sr-0.1.0.0-5isXdkrmBvbJTFdJY734op:SR.Blobs
```

From the information, we see that the `/v2/` route is working as
expected, but we hit `undefined` at `src/SR/Blobs.hs:26:14`, which is
totally expected because we haven't implemented `uploadBlob`
yet. Notice that the engine retries the upload request.

If the route didn't exist, we would have seen a 404 in the logs.

```
api_1  | GET /v2/
api_1  |   Accept:
api_1  |   Status: 200 OK 0.011277359s
api_1  | POST /v2/hello-world/blobs/uploads/
api_1  |   Accept:
api_1  |   Status: 404 Not Found 0.000028066s
```

This matches with what we know about the
[upload process](https://github.com/docker/distribution/blob/dea554fc7cce2f2e7af5b1e1d38e28c5e96e1d9e/docs/spec/api.md#starting-an-upload).

## uploadBlob

We can throw a couple print statements in to replace the undefined as
such:

```haskell
uploadBlob :: Namespace -> Name -> App NoContent
uploadBlob namespace' name' = do
  liftIO $ print namespace'
  liftIO $ print name'
  return NoContent
```

Which will yield us some progress when trying to push.

```
api_1  | GET /v2/
api_1  |   Accept:
api_1  |   Status: 200 OK 0.004299263s
api_1  | Namespace "lib"
api_1  | Name "hello-world"
api_1  | POST /v2/lib/hello-world/blobs/uploads/
api_1  |   Accept:
api_1  |   Status: 200 OK 0.000105174s
```

This is good progress, but we clearly have some issues since the
docker engine is still retrying the endpoint.

There are two approaches to blob upload
[monolithic][v2-monolithic-upload] and
[resumeable][v2-resumeable-upload]. The docs for
`/v2/<name>/blobs/uploads` detail that the digest query param is the
differentiator between monolithic and resumable upload.

> Initiate a resumable blob upload. If successful, an upload location
> will be provided to complete the upload. Optionally, if the digest
> parameter is present, the request body will be used to complete the
> upload in a single request.

Let's take a look at an implementation for the `uploadBlob`
(`<>/blobs/uploads`) route. We modifiy the type to reflect the various
headers and response codes (docker engine is a picky client). All of
the relevant information is communicated through headers, so we return
`NoContent` as well. `PostAccepted` is a shortcut for `202` responses.

```haskell
PostAccepted '[JSON] (Headers '[
  Header "Location" URI,
  Header "Range" String,
  Header "Docker-Upload-UUID" UUID
] NoContent)
```

Now the handler code. We generate a new uuid to send back in the
response. Our first go is just trying to get the docker client to
continue to the next request but in the future we should do something
with the uuid so we can respond to status requests. `uploadAPI` might
look scary, but it's just specifying the route we want to generate for
the `Location` header. We do this so that Servant will automatically
check that the route is valid for the `api` we are serving and we get
a compile error if it doesn't typecheck.

We add 3 headers, setting the Range to `"0-0"` because we are only
responding to resumable upload requests for now. (Otherwise we'd have
to handle the case of an extra query string parameter). Once we
generate the `Location` and the `Docker-Upload-UUID`, we send them
back so the docker engine can start uploading blobs at the specified
`Location`.

```haskell
uploadBlob :: Namespace -> Name -> App (Headers '[
    Header "Location" URI,
    Header "Range" String,
    Header "Docker-Upload-UUID" UUID
  ] NoContent)
uploadBlob namespace' name' = do
  uuid <- liftIO $ nextRandom
  let uploadAPI = Proxy :: Proxy ("v2" :> Capture "namespace" Namespace :> Capture "name" Name :> "blobs" :> "uploads" :> Capture "uuid" UUID :> Put '[JSON] NoContent)
      mkURI = safeLink api uploadAPI
      uri = mkURI namespace' name' uuid
      response = addHeader uri
        $ addHeader "0-0"
        $ addHeader uuid NoContent
  $(logTM) InfoS (logStr $ show $ getHeaders response)
  return response
```

We also need a couple instances which allow us to render types like
`UUID` into path components and headers. (note: these are orphan
instances, but we could fix that by using a newtype and declaring the
instances for the newtypes instead).

```haskell
instance FromHttpApiData UUID where
  parseUrlPiece text = case (fromText text) of
    Nothing -> Left $ T.append "Invalid UUID" text
    Just uuid -> Right uuid
instance ToByteString URI where
  builder = lazyByteString . pack . show
instance ToHttpApiData UUID where
  toUrlPiece = toText
  toHeader = toASCIIBytes
instance ToByteString UUID where
  builder = lazyByteString . toLazyASCIIBytes
```

We push again to test the route

```
docker push localhost:9000/lib/hello-world
```

And voilà, we get the desired effect. The docker engine accepts the
UUID and tries to upload blobs to `PATCH
/v2/lib/hello-world/blobs/uploads/v2/lib/hello-world/blobs/uploads/aeab6f5e-4b80-4c7b-9027-616b1cbe6a55`. That's
totally not the right URI though. We've accidentally used a relative
URI in our `Location` header. We'll fix that though :)

```
GET /v2/
  Accept:
  Status: 200 OK 0.000458567s
[2016-08-30 18:12:49][superhuman-registry][Info][b4fa86e02706][6258][ThreadId 15][sr-0.1.0.0-4uXdy03mbpG98AEB4xHfiO:SR.Blobs src/SR/Blobs.hs:47:5] [("Location","v2/lib/hello-world/blobs/uploads/aeab6f5e-4b80-4c7b-9027-616b1cbe6a55"),("Range","0-0"),("Docker-Upload-UUID","aeab6f5e-4b80-4c7b-9027-616b1cbe6a55")]
POST /v2/lib/hello-world/blobs/uploads/
  Accept:
  Status: 202 Accepted 0.000303745s
PATCH /v2/lib/hello-world/blobs/uploads/v2/lib/hello-world/blobs/uploads/aeab6f5e-4b80-4c7b-9027-616b1cbe6a55
  Accept:
  Status: 404 Not Found 0.000041239s
```

## patchBlob

The [next route][patch-blob-upload], as shown in the logs above, is
the `PATCH` to the `Location` header we sent back down. The type for
the `PATCH` route changes to:

```haskell
ReqBody '[OctetStream] ByteString :>
  Header "range" String :>
  PatchNoContent '[JSON] (Headers '[
    Header "Location" URI,
    Header "Range" String,
    Header "Docker-Upload-UUID" UUID
  ] NoContent)
```

We need to accept and echo back the `Range` header, while the request
body comes in as an `OctetStream`. We take this information and just
write out the `OctetStream` to a file for now.

```haskell
patchBlob :: Namespace
          -> Name
          -> UUID
          -> ByteString
          -> Maybe String
          -> App (Headers '[
    Header "Location" URI,
    Header "Range" String,
    Header "Docker-Upload-UUID" UUID
  ] NoContent)
patchBlob namespace' name' uuid' blob range' = do
  liftIO $ Data.ByteString.writeFile ("./tmp/" ++ toString uuid') blob
  response <- mkHeaders range' uuid' namespace' name'
  return response
```

With this code (and another upload attempt from the engine), we can
see that the next request is a `PUT`, which indicates the last request
for this layer.

```
GET /v2/
  Accept:
  Status: 200 OK 0.005978465s
[2016-09-03 20:21:39][superhuman-registry][Info][b4fa86e02706][130][ThreadId 14][sr-0.1.0.0-7Q5s7SCyVcbA5o0UAD7J0W:SR.Blobs src/SR/Blobs.hs:74:5] [("Location","http://localhost:9000/v2/lib/hello-world/blobs/uploads/f525cc29-b588-417b-aac2-85c5752ce07b"),("Range","0-0"),("Docker-Upload-UUID","f525cc29-b588-417b-aac2-85c5752ce07b")]
POST /v2/lib/hello-world/blobs/uploads/
  Accept:
  Status: 202 Accepted 0.000442272s
PATCH /v2/lib/hello-world/blobs/uploads/f525cc29-b588-417b-aac2-85c5752ce07b
  Accept:
  Status: 204 No Content 0.012519558s
PUT /v2/lib/hello-world/blobs/uploads/f525cc29-b588-417b-aac2-85c5752ce07b
  Params: [("digest","sha256:a9d36faac0fe2a855f798346f33bd48917bf3af9b6e4b77870ef8862fee8a8a3")]
  Accept:
  Status: 200 OK 0.000077408s
```

## putBlob

After `PATCH`s finish flowing in, the client sends a `PUT` request
with the digest and potentially any final layer content. Note that at
this point, we have not implemented any append functionality so our
`PATCH` endpoint will only work for small layers. Likewise, our `PUT`
and the `HEAD` that comes after it will be very minimal, omitting
critical functionality. This is so that we can get through all of the
requests and confirm a full upload flow.

The `Digest` for a layer is a sha256 hash as such:

```
sha256:6c3c624b58dbbcd3c0dd82b4c53f04194d1247c6eebdaab7c610cf7d66709b3b
```

Our handler will just emit `NoContent` so we can skip the validation
code and get on with groking the entire request flow.

```haskell
putBlob :: Namespace
        -> Name
        -> UUID
        -> Maybe Digest
        -> App NoContent
putBlob namespace' name' uuid' digest' = do
  case digest' of
    Nothing -> return NoContent
    Just a -> return NoContent
```

## headDigest

This is getting familiar, so we will move on to a minimal `HEAD` which
is a request to check to see if a particular layer (identified by
`Digest`) has been uploaded. Our version responds "yes" to every
single `HEAD` request, indicating that the layer exists in the
registry already. Luckily for us the Docker client doesn't seem to
validate the `Content-Length` header which means we can just echo the
`Digest` back in a header and call it done.

```haskell
headDigest :: Namespace
           -> Name
           -> Digest
           -> App (Headers '[
    Header "Content-Length" Int,
    Header "Docker-Content-Digest" Digest
    ] NoContent)
headDigest namespace' name' digest' = do
  return $ addHeader 0
         $ addHeader digest' NoContent
```

## putManifest

With the rest of the pieces in place, we receive a `PUT` to upload the
`Manifest` for an image. When uploading the `Manifest` for an image,
it is interesting to note that this is the first reference to a `Tag`
that we have seen so far. In this case, it is `latest`.

```
PUT /v2/lib/hello-world/manifests/latest
```

It is also interesting to remind ourselves that `docker pull` works if
we use the sha256 hash of the `Manifest`. To see this in action let's
grab the sha for `hello-world`, which we've been using to test our
registry.

```bash
> docker inspect -f "{{ .RepoDigests}}" hello-world
[hello-world@sha256:0256e8a36e2070f7bf2d0b0763dbabdd67798512411de4cdcf9431a1feb60fd9]
> docker pull hello-world@sha256:0256e8a36e2070f7bf2d0b0763dbabdd67798512411de4cdcf9431a1feb60fd9
sha256:0256e8a36e2070f7bf2d0b0763dbabdd67798512411de4cdcf9431a1feb60fd9: Pulling from library/hello-world
Digest: sha256:0256e8a36e2070f7bf2d0b0763dbabdd67798512411de4cdcf9431a1feb60fd9
Status: Image is up to date for hello-world@sha256:0256e8a36e2070f7bf2d0b0763dbabdd67798512411de4cdcf9431a1feb60fd9
```

This is useful because a `Reference`, which is the final path segment
in the `PUT` URL, can be a `Digest` OR a `Tag`. We need to know this
because the response headers need the `Digest`.

```
201 Created
Location: <url>
Content-Length: 0
Docker-Content-Digest: <digest>
```

### Manifests

The `Manifest` for `hello-world` is a
[v2+json](https://github.com/docker/distribution/blob/master/docs/spec/manifest-v2-2.md#image-manifest-field-descriptions)
style manifest. The other major option for us is going to be a
Manifest List, aka a Fat Manifest. Our `Manifest` looks as the
following, with a single layer.

```javascript
{
   "schemaVersion": 2,
   "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
   "config": {
      "mediaType": "application/vnd.docker.container.image.v1+json",
      "digest": "sha256:c54a2cc56cbb2f04003c1cd4507e118af7c0d340fe7e2720f70976c4b75237dc"
   },
   "layers": [
      {
         "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
         "size": 1,
         "digest": "sha256:c04b14da8d1441880ed3fe6106fb2cc6fa1c9661846ac0266b8a5ec8edf37b7c"
      }
   ]
}
```

We can parse the above `Manifest` JSON into the following Haskell
datatype. In the future we can also do digest validation for each
digest in the manifest.

```haskell
V2_2 {
  schemaVersion = 2,
  mediaType = Manifest_V2_JSON,
  config = Config {
      cMediaType = V1_JSON,
      cSize = 7023,
      cDigest = "sha256:b5b2b2c507a0944348e0303114d8d93aaaa081732b86451d9bce1f432a537bc7"
      },
  layers = [
      Layer {
          lMediaType = Diff,
          lSize = 32654,
          lDigest = "sha256:e692418e4cbaf90ca69d05a66403747baa33ee08806650b51fab815ad7fc331f",
          lUrls = Nothing
          },
      Layer {
          lMediaType = Diff,
          lSize = 16724,
          lDigest = "sha256:3c3a4604a545cdc127456d94e421cd355bca5b528f4a9c1905b15da2eb4a4c6b",
          lUrls = Nothing
          },
      Layer {
          lMediaType = Diff,
          lSize = 73109,
          lDigest = "sha256:ec4b8955958665577945c89419d1af06b5f7636b4ac3da7f12184802ad867736",
          lUrls = Nothing
          }
      ]
  }
```

For us, it is important to note how the mechanics behind backward
compatibility work. 

> When pushing images, clients which support the new manifest format
> should first construct a manifest in the new format.

Which is great for us because that means we only have to code support
for v2 manifests and compatible clients will behave appropriately.

### Implementing the Handler

At this point, it's useful to set up a proxy. After doing that, we can
log out arbitrary parts of the requests/responses to find the
following headers coming from the docker engine request to `putManifest`.

```javascript
{
  "connection": "close",
  "accept-encoding": "gzip",
  "content-type": "application/vnd.docker.distribution.manifest.v2+json",
  "content-length": "482",
  "user-agent": "docker/1.12.1 go/go1.6.3 git-commit/23cf638 kernel/4.4.20-moby os/linux arch/amd64 UpstreamClient(Docker-Client/1.12.1 \\(darwin\\))",
  "host": "localhost:8000"
}
```

The one we *really* care about is the `Content-Type` header. The
request identifies the type of `Manifest` based on the `Content-Type`,
so we can easily handle different `Manifest` content. To add support
for the `vnd.docker.distribution.manifest.v2+json` `Content-Type`, we
can write the implementation for a new Servant `Content-Type`.

[Read More on Custom Content-Types](/servant-custom-content-types/)

```haskell
data HashedJSON = HashedJSON String

instance Accept HashedJSON where
  contentType _ = "application" // "vnd.docker.distribution.manifest.v2+json"

instance FromJSON a => MimeUnrender HashedJSON (Digest SHA256, a) where
   mimeUnrender _ bs = case eitherDecodeLenient bs of
     Left err -> Left err
     Right val -> Right (mkLazyDigest bs, val)
```

Note that we have also included the ability to hash the incoming
content with this `Content-Type`. This means our handlers don't have
to worry about dealing with hashing.

Our route with the new `Content-Type` looks like the following, where
`CH` comes from the [cryptonite][cryptonite] package. The request body
is specified as a tuple of `(Digest, Manfiest)` which comes from the
`HashedJSON` `Content-Type`.

```haskell
  ReqBody '[HashedJSON] (CH.Digest CH.SHA256, Manifest) :>
    PutCreated '[JSON] (Headers '[
      Header "Content-Length" Int,
      Header "Docker-Content-Digest" CDigest
      ] NoContent)
```

We are still doing as little work as possible in the handler.

```haskell
putManifest :: Namespace
            -> Name
            -> Ref
            -> (CH.Digest CH.SHA256, Manifest)
            -> App (Headers '[
    Header "Content-Length" Int,
    Header "Docker-Content-Digest" CDigest
    ] NoContent)
putManifest namespace' name ref' (digest, manifest) = do
  liftIO $ print "putManifest"
  liftIO $ print digest
  return $ addHeader 0
         $ addHeader (CDigest digest) NoContent
```

Success!

```
"putManifest"
6741f4d4187d8b5bcdf338c6a8dbbef12604e31211b3f57e4873f623f64dba80
PUT /v2/biscarch/hello-world/manifests/latest
  Request Body: {
   "schemaVersion": 2,
   "mediaType": "application/vnd.docker.distribution.manifest.v2+json",
   "config": {
      "mediaType": "application/vnd.docker.container.image.v1+json",
      "digest": "sha256:c54a2cc56cbb2f04003c1cd4507e118af7c0d340fe7e2720f70976c4b75237dc"
   },
   "layers": [
      {
         "mediaType": "application/vnd.docker.image.rootfs.diff.tar.gzip",
         "digest": "sha256:c04b14da8d1441880ed3fe6106fb2cc6fa1c9661846ac0266b8a5ec8edf37b7c"
      }
   ]
}
  Accept:
  Status: 201 Created 0.000758785s
```

---

# A GADT Rises

Now that we have a fully "working" image upload (at least, the docker
engine is convinced we handled everything correctly), we have two ways
forward.

1. Truly implement `push` compatibility complete with resumable
   upload, etc.
2. Execute the same "as little as possible" process to complete a
   `docker pull`.

Since we eventually we want to support multiple backends, Option 1
will have to happen in the future. To do this, we would start off with
a GADT that defines the various operations that need to be implemented
for a new backend.

To refresh, here is the list of handlers we need to implement for
`push` compatibility.

* uploadBlob
* patchBlob
* putBlob
* headDigest
* putManifest

What we want in the end is a Generalized Algebraic Data Type that
defines what it means to be a `RegistryBackend`. An example
declaration for the `uploadBlob` functionality shows that a compliant
backend would need to declare a function which too a `RepoName`,
`UUID`, `Maybe Digest` and returned an `Either UploadError
NoContent`. We would use `UploadError` to restrict the types of errors
which come back so we can communicate with exists clients such as the
Docker engine.

```haskell
class RegistryBackend b where
  uploadBlob :: b
             -> RepoName
             -> UUID
             -> Maybe Digest
             -> Either UploadError NoContent
  ...
```

This involves a couple of pieces including changing our handler types
from the following (which uses `App` directly).

```haskell
putBlob :: Namespace
        -> Name
        -> UUID
        -> Maybe Digest
        -> App NoContent
```

to something more general. Possibly just a `HasRegistryBackend`
constraint on the monad (`App` is also a monad).

```haskell
putBlob :: ( KatipContext m, RegistryBackend m )
        => Namespace
        -> Name
        -> UUID
        -> Maybe Digest
        -> m NoContent
```

This would allow us to move configuration of the server into the
executables while still allowing the library to provide guarentees
about what it needs to be able to function. In effect, allowing us to
build binaries that target Postgres, File Systems, and other
interesting data stores.

We will keep this in mind as we move forward with a concrete
implementation based on Postgres. This concrete implementation will
inform us as to which abstractions make sense. An interesting choice
for the second store implementation would be something without
transactions and different consistency guarentees such as S3 or a KV
store.

# Postgres uploadBlob

Since we now need a "real" backend, we'll spin up Postgres using
[sqitch][sqitch] for migrations. The official Postgres image allows us
to use a shell script to initialize the db so all we need to do in
addition is install sqitch:

```
FROM postgres

RUN apt-get update && apt-get install sqitch -y

COPY . /opt/sqitch
WORKDIR /opt/sqitch

COPY ./initdb.sh /docker-entrypoint-initdb.d/initdb.sh
```

[initdb.sh](https://github.com/ChristopherBiscardi/superhuman-registry/blob/9508e1b1b6887c8d4e412fad0ddd8f89676f8192/sqitch/initdb.sh)
is the following script to execute sqitch:

```
#!/bin/bash
set -e

cd /opt/sqitch && sqitch -u "$POSTGRES_USER" deploy --verify
```

The migrations (in order) are the following three. The first sets up
our SR schema.

```sql
-- Deploy sr:appschema to pg

BEGIN;

CREATE SCHEMA sr;

COMMIT;
```

The second registers uuid-ossp, which we will use when tracking upload
requests.

```sql
-- Deploy sr:uuid-ossp to pg
-- requires: appschema

BEGIN;

CREATE EXTENSION "uuid-ossp";

COMMIT;
```

Finally, we implement a table with automatic `created_at` and
`modified_at` timestamps. These timestamps will help us implement
garbage collection for abandoned uploads. We let Postgres handle
generation of unique UUIDs on `INSERT` and leave the creation of a
Large Object for the future.

```sql
-- Deploy sr:blob-uploads to pg
-- requires: uuid-ossp

BEGIN;

-- Table
CREATE TABLE sr.blob_uploads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lo_id OID,
  repo_name VARCHAR(256) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  modified_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Automatically update modified_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = now();
    -- Force created_at to never change
    NEW.created_at = OLD.created_at;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blob_upload_modtime
BEFORE UPDATE ON sr.blob_uploads
FOR EACH ROW EXECUTE PROCEDURE update_modified_column();

-- | Automatically populate created_at
-- Use a trigger so it's impossible to override on insert
CREATE OR REPLACE FUNCTION populate_create_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = now();
    NEW.modified_at = now();
    RETURN NEW;	
END;
$$ language 'plpgsql';

CREATE TRIGGER insert_blob_upload_createtime
BEFORE INSERT ON sr.blob_uploads
FOR EACH ROW EXECUTE PROCEDURE populate_create_column();

COMMIT;
```

To handle the initialization of new uploads, we use the following
query which grabs a connection from the pool, executes the statement
and returns the UUID of the new upload.

```haskell
-- | Insert a new upload for a Repos
startNewUpload :: Reponame -> App UUID
startNewUpload repo = runPG (query repo insertNewUpload)

-- | PG automatically creates uuid, created_at and modified_at
insertNewUpload :: Query Text UUID
insertNewUpload =
  statement sql encoder decoder True
  where
    sql =
      "INSERT INTO sr.blob_uploads (repo_name) VALUES ($1) RETURNING id"
    encoder =
      E.value E.text
    decoder =
      D.singleRow (D.value D.uuid)
```

`runPG` is a utility function which handles any connection
errors.

```haskell
runPG :: Session a -> App a
runPG action = do
  pool <- asks acPGPool
  res <- liftIO $ P.use pool action
  case res of
    Left usageError -> do
    ...
```

# Postgres headBlob

At this point I figured out that Docker will ask to mount if you push
an image, then retag it and push the retagged image.

```shell
docker tag hello-world localhost:9000/biscarch/hello-worlds
docker push localhost:9000/biscarch/hello-worlds
docker tag hello-world localhost:9000/biscarch/hello-world-2
docker push localhost:9000/biscarch/hello-world-2
```

The last push produces the following request to blob upload:

```
GET /v2/
  Accept:
  Status: 200 OK 0.002441185s
POST /v2/biscarch/hello-world-2/blobs/uploads/
  Params: [("from","biscarch/hello-worlds"),("mount","sha256:c04b14da8d1441880ed3fe6106fb2cc6fa1c9661846ac0266b8a5ec8edf37b7c")]
  Accept:
```

To implement `putBlob` we'll need to make our hacky `headBlob` return
404s. This gives us a nice spot to implement a `blobs` table which
will form the basis of our `catalog`.

TODO: implement CREATE TABLE `blobs` here.

```sql
-- Table
CREATE TABLE sr.blobs (
  -- id is a sha256 hash
  -- TODO: limit this to sha256 length?
  id TEXT PRIMARY KEY,
  -- id of the hashed blob
  lo_id OID,
  -- maybe remove repo_name?
  repo_name VARCHAR(256) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  modified_at TIMESTAMP WITH TIME ZONE NOT NULL
);
```

Our `HEAD` handler will check to see if the blob exists in our
`catalog`. If it does, we need to get the `Content-Length` of the blob
to return. If it does not exist we just 404.

```haskell
headDigest :: Namespace
           -> Name
           -> Digest
           -> App (Headers '[
    Header "Content-Length" Int,
    Header "Docker-Content-Digest" Digest
    ] NoContent)
headDigest namespace' name' digest' = do
  blobExists <- headBlob digest'
  case blobExists of
    BLOB_EXISTS d' -> return addHeader 0
                    $ addHeader digest' NoContent
    UNKNOWN_BLOB -> throwError err404
```

# Fixing patchBlob


# Postgres putBlob


[patch-blob-upload]: https://github.com/docker/distribution/blob/41f383fb9a3b4e3ff428a92db4f7836f8053058b/docs/spec/api.md#patch-blob-upload
[v2-api]: https://github.com/docker/distribution/blob/bfa0a9c0973b5026d2e942dec29115c120e7f731/docs/spec/api.md
[v2-monolithic-upload]: https://github.com/docker/distribution/blob/b1b100cf011b037b8821e8d0ae4f5ab3e2222c48/docs/spec/api.md#initiate-monolithic-blob-upload
[v2-resumeable-upload]: https://github.com/docker/distribution/blob/b1b100cf011b037b8821e8d0ae4f5ab3e2222c48/docs/spec/api.md#initiate-resumable-blob-upload
[superhuman-registry]: https://github.com/ChristopherBiscardi/superhuman-registry
[stack]: https://www.haskellstack.org/
[lib.hs-1]: https://github.com/ChristopherBiscardi/superhuman-registry/blob/861b20d317132d3ea43dc05cc03d507ca325d3e0/src/Lib.hs
[cryptonite]: https://hackage.haskell.org/package/cryptonite
[sqitch]: http://sqitch.org/
