---
title: "Listeners Without Renders in React"
date: 2018-01-25
tags: [react, javascript]
---

Sometimes you run into a situation where you want to have some logic that isn't
associated with any rendered output but starts/stops when a certain page is
rendered. React can handle this by rendering `null` and using lifecycle events
to deal with listener attachment and cleanup.

The following code creates two components, one representing the App and one to
handle the logic. `App` mounts or unmounts the `KeydownListener` once every
second, forcing `componentDidMount` and `componentWillUnmount` to fire.

```javascript
import React, { Component } from "react";
import { render } from "react-dom";

class KeydownListener extends Component {
  state = {
    id: Math.random().toFixed(4)
  };
  componentDidMount() {
    window.document.addEventListener(
      "keydown",
      this.handleKeyboardNavigation,
      false
    );
  }
  componentWillUnmount() {
    window.document.removeEventListener(
      "keydown",
      this.handleKeyboardNavigation,
      false
    );
  }
  handleKeyboardNavigation = e => {
    console.log(`${this.state.id}: caught key event`);
  };
  render() {
    console.log(this.state.id);
    return null;
  }
}

class App extends Component {
  state = {
    show: false
  };
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(state => ({ ...state, show: !state.show }));
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return <div>{this.state.show && <KeydownListener />}</div>;
  }
}

render(<App />, document.getElementById("root"));
```

The output for the above is the following (which you can test in
[codesandbox](https://codesandbox.io/s/yjz3lpmklx).

```
0.0705
0.3664
0.6017
0.1500
0.8428
0.2668
0.2668: caught key event
0.2668: caught key event
0.2668: caught key event
0.2328
0.8442
0.7064
0.8180
```
