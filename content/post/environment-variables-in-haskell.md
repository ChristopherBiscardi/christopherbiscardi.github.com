---
title: "Environment Variables in Haskell"
date: 2014-02-06
url: "/2014/2/6/environment-variables-in-haskell/"
---


In this post we will go over how to accept environmental variables in Haskell.

```haskell
import System.Environment

main :: IO ()
main = do
```

We can compile this if we put it in a file called `env.hs`.

```bash
ghc env.hs
```

and run it with an ad-hoc ENV variable:

```bash
myvariable="what" ./env
```

Which will print out:

```
"what"
```

but this will throw an error if the ENV var doesn't exist:

```bash
λ ./env
env: myvariable: getEnv: does not exist (no environment variable)
```

To solve that issue we can use `lookupEnv` with `fromMaybe`

```haskell
import System.Environment (lookupEnv)
import Data.Maybe (fromMaybe)

main :: IO ()
main = do
```

which will give us a default value when the ENV variable doesn't exist:

```bash
λ ./env
"mydefaultvalue"
λ myvariable="what" ./env
"what"
```
