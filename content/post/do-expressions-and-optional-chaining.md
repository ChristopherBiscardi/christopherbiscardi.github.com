---
title: "Do Expressions and Optional Chaining"
date: 2017-09-01
tags: [javascript, babel]
---

[Do Expressions][do-babel] and [Optional Chaining][optional-babel]
are two extensions that I am particularly excited about in the ECMA
pipeline.

[update] I've removed the optional chaining syntax plugin as it is
[required by the transform
anyway](https://twitter.com/left_pad/status/903979780374188036).

# Do Expressions

Do Expressions solve a case when you want to declare a variable and
assign it a value with a more complex expression than a single
ternary. Consider the following `render` method which renders a color
component based on props.

```js
render() {
  const { color } = this.props;

  let component = null;
  if(color === 'blue') { component = <BlueComponent/>; }
  if(color === 'red') { component = <RedComponent/>; }
  if(color === 'green') { component = <GreenComponent/>; }

  return <div>{component}</div>
}
```

There are two deficencies in this code. One is that we have to declare
`value` with `let` instead of `const` which signals that it could be
modified anywhere in the rest of the code before we render
`component`.

The second deficiency is related to the first, in that the if
statements aren't grouped except by convention. We could easily put
the if statements anywhere in the render function (perhaps after a
large block of other complicated code) which makes it harder to
debug.

The do expression version solves these issues. We get to declare a
`const` for component, indicating that the value won't change later,
and we also get to group the logic for defining the `component`
value. This makes debugging the value of `component` easier later when
we're searching for all of the places it could be modified.

```js
render() {
  const { color } = this.props;

  const component = do {
    if(color === 'blue') { <BlueComponent/>; }
    if(color === 'red') { <RedComponent/>; }
    if(color === 'green') { <GreenComponent/>; }
  }

  return <div>{component}</div>
}
```


# Optional Chaining

Expanding on the previous example, let's say we're using GraphQL to
fetch our data which is one case where deep object access can
occur. The GraphQL response is passed in as `data`, but attempting to
destructure further is risky if there are nullable values in the
chain.

```js
render() {
  const { color } =
    this.props.data &&
    this.props.data.viewer &&
    this.props.data.viewer.preferences;

  const component = do {
    if(color === 'blue') { <BlueComponent/>; }
    if(color === 'red') { <RedComponent/>; }
    if(color === 'green') { <GreenComponent/>; }
  }

  return <div>{component}</div>
}
```

We can clean this up into something very similar to normal prop access:

```js
render() {
  const color = this.props.data?.viewer?.preferences?.color;

  const component = do {
    if(color === 'blue') { <BlueComponent/>; }
    if(color === 'red') { <RedComponent/>; }
    if(color === 'green') { <GreenComponent/>; }
  }

  return <div>{component}</div>
}
```

Note that you can't destructure on `undefined` so the following can
throw:

```js
const { color } = this.props.data?.viewer?.preferences;
```

# Babel

You'll need a babel config like this to run the above examples, and a
babel version of >= 7 which you can currently install as
`babel-cli@next`, etc.

```js
{
  "presets": [
    ["env", {
      "targets": {
        "node": "current"
      }
    }],
    "stage-0",
    "react"
  ],
  "plugins": [
    "transform-do-expressions",
    "transform-optional-chaining"
  ]
}
```

Also note that these plugins will be in stage-0, but it's still good
practice to list them out if you're using them.

{{< tweet 903956349696057344 >}}

[do-babel]: https://babeljs.io/docs/plugins/transform-do-expressions/
[optional-babel]: https://www.npmjs.com/package/babel-plugin-transform-optional-chaining
