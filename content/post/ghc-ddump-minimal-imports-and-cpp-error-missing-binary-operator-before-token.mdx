---
title: "GHC -ddump-minimal-imports and CPP error: missing binary operator before token \"(\""
date: 2014-03-05
url: "/2014/3/5/ghc-ddump-minimal-imports-and-cpp-error-missing-binary-operator-before-token/"
---


Today I was trying to extract the minimal imports for a module using `ghc
-ddump-minimal-imports` but I was getting this error on some files:

```bash
error: missing binary operator before token "("
#if MIN_VERSION_base(4,4,0)
^
```

Which is related to the fact that `cabal` expands `MIN_VERSION_base` macros when
running `cabal build`, so we don’t have them when running `ghc` or `ghci`.
Luckily it’s an easy fix.

Cabal generates a macros file relative to the root of the project at
`dist/build/autogen/cabal_macros.h`. We can include this file to gain access to
the macros:

```bash
ghc -ddump-minimal-imports -optP-include -optPdist/build/autogen/cabal_macros.h src/Types.hs
```

Which will now spit out our imports into a file called `Types.imports` and may
look something like this:

```haskell
import Blaze.ByteString.Builder
    ( Builder, fromLazyByteString, fromByteString )
import Blaze.ByteString.Builder.Char.Utf8
    ( fromText, fromLazyText )
import Control.Applicative
    ( Applicative((), pure), Alternative((), empty), () )
import Control.Exception.Lifted
    ( ErrorCall(..),
      Exception,
      Handler(..),
      SomeException(..),
      catch,
      catches,
      mask,
      onException,
      throwIO )
```
