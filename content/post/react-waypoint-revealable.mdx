---
title: "React Waypoint Revealable"
date: 2017-11-08
tags: [react, emotion]
---

[react-waypoint](https://github.com/brigade/react-waypoint) is a useful tool in
the React ecosystem for triggering a function when an element enters or leaves
the viewport. [waypoint demo page](http://brigade.github.io/react-waypoint/).

We can use this lib to trivially implement a `Reveal` Component which will
reveal its children using opacity and a slight upward movement.

First we build the raw `Revealable` Component. We could implement this by
mapping over children instead, but using a `div` (or `section`, etc) gives us
the ability to just use it without caring about what the children are doing with
their classname props. The raw `Revealable` component uses the `show` prop to
determine if the element should show itself (and thus its children).

```js
import styled from "react-emotion";

const Revealable = styled("div")`
  opacity: ${({ show }) => (show ? "100" : "0")};
  margin-top: ${({ show }) => (show ? "0" : "100px")};
  transition: opacity ease-out 0.5s, margin-top cubic-bezier(0, 0, 0.58, 1) 1s;
`;
```

Then we can use `Revealable` in combination with `Waypoint` to trigger the
showing of children when `Revealable` becomes visible.

```js
import React, { Component } from "react";
import Waypoint from "react-waypoint";

class Reveal extends Component {
  state = {
    revealed: false
  };
  reveal = () => {
    this.setState({ revealed: true });
  };
  render() {
    return (
      <Waypoint onEnter={this.reveal}>
        <Revealable show={this.state.revealed}>
          {this.props.children}
        </Revealable>
      </Waypoint>
    );
  }
}
```

## fin

This is a great example of how encapsulating logic in React components (such as
`Waypoint` and `Revealable` can lead to simple, composed components that combine
logic (like `Reveal`).

We can then use our `Reveal` component as such:

```js
class MyPage extends Component {
  render() {
    return (
      <div>
        <h1>Some Stuff</h1>
        <Reveal>
          <h2>subtitle comes in when visible</h2>
        </Reveal>
      </div>
    );
  }
}
```
