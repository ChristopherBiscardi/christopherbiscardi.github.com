---
title: "Emotion Patterns Button Group"
date: 2017-08-30
tags: [emotion, css-in-js]
---

#### CSS-in-JS patterns: Emotion Button Groups

How would we build a `Button` that can be set up as part of a larger
`ButtonGroup`? Typically in raw CSS or with preprocessors, this is
accomplished by using sibling selectors, etc. With the `styled` API
and React* ecosystem style approach, we can take a different
approach that separates grouping logic from style rendering.

## Bootstrap

In Bootstrap, the user-side API looks like this:

```html
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
```

and you can find the relevant SCSS [on
GitHub](https://github.com/twbs/bootstrap/blob/cd22eb1da03d5dbc9062ad5c9e75c05429e4bcd0/scss/_button-group.scss#L4-L33)

## Emotion

With emotion we'll try to get an API that looks like this:

```html
<ButtonGroup role="group" aria-label="Basic example">
  <Button variant="secondary">Left</button>
  <Button variant="secondary">Middle</button>
  <Button variant="secondary">Right</button>
</div>
```

Since this isn't about a11y or other abstractions we'll just leave
them there as passthroughs with the note that there are nice ways to
require these properties using PropTypes or Flow or even abstract them
into the component. We are trying to compare directly to the Bootstrap
API here, although we could do better in a couple aspects.

First, we'll need a styled button that uses props to dictate it's
border-radius. We'll be using border-radius as the example attribute
rather than a full exposition of attributes to keep the example code
small.

```js
function btnGrouper({ groupPosition }) {
  if (groupPosition === "first") {
    return "3px 0 0 3px";
  }
  if (groupPosition === "last") {
    return "0 3px 3px 0";
  }
  if (groupPosition) {
    return "0"
  }
  return "3px";
}
const Button = styled("button")`
  border-radius: ${btnGrouper};
`;
```

In this example, we are using the `groupPosition` prop to dictate
whether we alter the `border-radius` values for being first in the
list, last in the list or in the middle of the list. We also set a
final value which is used if the `Button` is not in a list at all.

In the following `ButtonGroup` we use React Children APIs to clone the
child and apply our `groupPosition` prop. (Here is the link for [do
syntax](https://babeljs.io/docs/plugins/transform-do-expressions/) if
you are unfamiliar with it.

```jsx
class ButtonGroup extends React.Component {
  render() {
    const count = React.Children.count(this.props.children);
    return (
      <span>
        {React.Children.map(this.props.children, (child, i) => {
          return React.cloneElement(child, {
            groupPosition: do {
              if(i===0) {
                "first"
              } else if (i === count - 1) {
                "last"
              }
              i
            }
          });
        })}
      </span>
    );
  }
}
```

We can render our new Buttons as such:

```js
render(
  <ButtonGroup>
    <Button>A</Button>
    <Button>B</Button>
    <Button>c</Button>
  </ButtonGroup>,
  mountNode
);
```

#### Conclusion

The core point here is that the `Button` knows how to render itself
stylistically in every situation it would be rendered. There are no
overrides so we can debug more easily and co-locating all of the
styling means we are less likely to forget that the Navigation in that
one app has specific overrides. This means we can evolve our `Button`
API with more confidence since it places global overrides distinctly
in the region of unsupported APIs.

The `ButtonGroup` can control the ordering and grouping of child
`Button`s with it's own props, like `vertical`, if we want more
flexibility. Changing the `Button` so that it can render vertically
will take us right back to the same spot we are defining the logic for
other rendering arrangements so we can take it all into consideration
when evolving our APIs.
