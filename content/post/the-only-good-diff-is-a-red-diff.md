---
title: The Only Good Diff is a Red Diff
date: '2018-05-24T12:39:50-07:00'
tags:
  - api
  - css-in-js
  - design-systems
  - emotion
  - graphql
  - prettier
---
I don't want your code in the codebase.

To be fair, I don't want my code in the codebase either. Let me explain.

Code is amazing for building new tools, new experiences, and increasing leverage for the people that use our products. This is true even though even line of code that gets merged [is a liability, not an asset](https://blogs.msdn.microsoft.com/elee/2009/03/11/source-code-is-a-liability-not-an-asset/). Startups, the area I spend most of my time in, are particularly prone to acquiring technical debt. In fact, if you haven't acquired any technical debt as a startup, you're probably not moving fast enough.

If we accept the premises that

1. code is a liability 
2. startups should produce technical debt when operating optimally

Then we must come to the conclusion that deleting code is more important than writing it.

## Startups as rewrite machines

A startup, from the technical perspective, is a perpetual rewrite machine. What works at the beginning won't work in a year. What works with 10s of users often doesn't scale to 100s or 1000s. A/B testing, Feature Flagging, and 

## What makes code deletable?

* Tests that are isolated from each other
* restricting scope pollution
