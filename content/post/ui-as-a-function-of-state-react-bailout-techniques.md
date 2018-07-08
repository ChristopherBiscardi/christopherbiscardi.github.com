---
title: 'UI as a Function of State: React Bailout Techniques'
date: '2018-07-08T12:39:51-07:00'
tags:
  - api
  - javascript
  - react
---
```
ui = fn(state)
```

The UI you build which appears to end-users is built up from transformations of state. In it's simplest form, we can render application data using a pure function (where pure means no side effects).

```js
const UI = ({ name }) => <h1>Hello {name}!</h1>
```

When we call this function pure we specifically mean that the output of the function is determined by the input. There are no `Math.random` calls, HTTP calls to another service, global variable accesses, etc. Phrased differently, the outside world doesn't affect our function and our function affect (mutate) the outside world. Every time we render `UI` with a specific `name` we get a deterministic result.

This is a really great way to think about User Interfaces because it means we can abstract sub-sections of it into re-usable components. Consider the following

```js
const UI = ({ name, biography }) => (
  <ProfileCard>
    <UserName>{name}</UserName>
    <Bio {...biography}/>
  </ProfileCard>
)
```

# Bailout Techniques

## Refs
## Setting State from Props
## Lifecycle Methods
