---
title: "React: Communicating With Children"
date: 2016-11-22
---

How do custom React Components communicate with their children?

# A Simple Case

Given two components, `A` and `B`, where `A` renders arbitrary
children and `B` renders a `display` prop.

```javascript
import React, { Component } from 'react';

class A extends Component {
  render() {
    return <div>
      { this.props.children }
    </div>
  }
}

class B extends Component {
  render() {
    return <span>{this.props.display}</span>
  }
}
```

They can be rendered with React DOM as such:

```javscript
ReactDOM.render(<A>
  <B display='thing-one'/>
  <B display='thing-two'/>
  </A>,
  document.body)
```

which yields a simple `thing-onething-two` result.

# Controlling Props

So far, nothing special. Let's say we want A to control the display
property of all `B`s or wrap every child in an element with a specific
CSS class. We can simply alter the `A` component to map over any
children, replacing the display prop using `cloneElement`.

```javascript
class A extends Component {
  render() {
    const { children } = this.props;
    return <div>
      {
        children && React.Children.map(children, (child, i) => React.cloneElement(child, {
          display: `thing-${i}`
        }))
      }
    </div>
  }
}
```

Note that the same render:

```javascript
ReactDOM.render(<A>
  <B display='thing-one'/>
  <B display='thing-two'/>
  </A>,
  document.body)
```

returns a new result `thing-0thing-1`. This is because we have
successfully overridden the `display` prop of all children rendered by
`A`.

# Handlers and State

Let's say that every time the user clicks on `B`, we want to update
the state of `A` with a counter. We can simply add some inital state
to `A` and pass in an additional handler prop which is defined on
`A`. We use fat-arrow autobinding shorthand syntax so that `this` int
he `onChildClick` handler refers to `A`'s `this`. Then we make sure
that `B` can accept an `onClick` handler.

```javascript
class A extends Component {
  state = {
    counter: 0
  };
  onChildClick = e => {
    this.setState({
      counter: this.state.counter + 1
    })
  };
  render() {
    const { children } = this.props;
    return <div>
      <h1>{this.state.counter}</h1>
      {
        children && React.Children.map(children, (child, i) => React.cloneElement(child, {
          display: `thing-${i}`,
          onClick: this.onChildClick
        }))
      }
    </div>
  }
}

class B extends Component {
  render() {
    return <span onClick={this.props.onClick}>{this.props.display}</span>
  }
}
```

Now, rendering the same way as before, we get a new output:

```
0

thing-0thing-1
```

and every time `thing-0` or `thing-1` is clicked, the counter in `A`
is updated.
