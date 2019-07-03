---
title: "Emotion Configurable Imports"
date: 2017-09-05
tags: [css-in-js, babel]
---

tldr: [pull request](https://github.com/emotion-js/emotion/pull/290)

As part of some client work I recently had to port an application from
[next.js][next.js] to [CRA][create-react-app]. Part of this port included using
[emotion][emotion] to replace [styled-jsx][styled-jsx]. It just so happens that
there are conflicts between the two babel plugins because of how things are
named. [@tkh44][@tkh44] pointed me to a [related issue][#267] and I got to work.

# styled-jsx and emotion

The core conflict between the two plugins is that they both use the same import
names to refer to different things. Take the following file which uses
`styled-jsx` and `emotion` in the same file.

```jsx
import styled, { css } from "emotion";

export default () => (
  <div>
    <p>only this paragraph will get the style :)</p>
    {/* you can include <Component />s here that include
         other <p>s that don't get unexpected styles! */}
    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
);

export const classStyles = css`
  border: 3px solid black;
`;
export const myDiv = styled.div`
  background: blue;
`;
```

If we first compile it with just `styled-jsx`, we see that `styled-jsx` adds an
import to the top of the file. That import is then used as a normal element with
a `css` prop. Emotion styles are untouched.

```js
import _JSXStyle from "styled-jsx/style";
import styled, { css } from "emotion";

    <p data-jsx={2648947580}>only this paragraph will get the style :)</p>
    {}
    <_JSXStyle styleId={2648947580} css={"p[data-jsx=\"2648947580\"]{color:red}"} />
  </div>);

export const classStyles = css`border: 3px solid black;`;
export const myDiv = styled.div`background: blue;`;
```

If we compile with just `emotion`, we get a similar effect on the opposite
usage.

```js
import styled, { css } from "emotion";

export default () => (
  <div>
    <p>only this paragraph will get the style :)</p>
    {}
    <style jsx>{`
      p {
        color: red;
      }
    `}</style>
  </div>
);

export const classStyles = /*#__PURE__*/ css(
  [],
  [],
  function createEmotionStyledRules() {
    return [
      {
        border: "3px solid black"
      }
    ];
  }
);
export const myDiv = /*#__PURE__*/ styled(
  "div",
  "css-myDiv-18esvut0",
  [],
  [],
  function createEmotionStyledRules() {
    return {
      background: "blue"
    };
  }
);
```

Up until this point neither plugin has touched the other's raw source, so what's
going on?

It turn out that `emotion` has a feature which enables it to use a [`css`
prop][css-prop] instead of calling `css` on it's own. When `styled-jsx`
transforms it's code it creates a semi-compatible version of this `css` prop
which gets picked up and transformed as expected by `emotion`. See the following
output which uses both plugins:

```js
import _JSXStyle from "styled-jsx/style";
import { css as _css } from "emotion";
import styled, { css } from "emotion";

export default () => (
  <div data-jsx={2648947580}>
    <p data-jsx={2648947580}>only this paragraph will get the style :)</p>
    {}
    <_JSXStyle
      styleId={2648947580}
      className={
        /*#__PURE__*/ _css([], [], function createEmotionStyledRules() {
          return [
            {
              'p[data-jsx="2648947580"]': {
                color: "red"
              }
            }
          ];
        })
      }
    />
  </div>
);

export const classStyles = /*#__PURE__*/ css(
  [],
  [],
  function createEmotionStyledRules() {
    return [
      {
        border: "3px solid black"
      }
    ];
  }
);
export const myDiv = /*#__PURE__*/ styled(
  "div",
  "css-myDiv-18esvut0",
  [],
  [],
  function createEmotionStyledRules() {
    return {
      background: "blue"
    };
  }
);
```

# The Fix

Now that we know what's going on, our approach is twofold. The first is to
autodetect if the import is named something other than `styled` such as:

```js
import whatever from "emotion";
```

The second is to allow the import and `css` prop key to be defined via babel
configuration.

```js
[
  "emotion",
  {
    importedNames: {
      css: "c",
      styled: "emotion"
    }
  }
];
```

The first use case enables flexibility for general use and the second enables
use cases such as those [on the emotion website](https://emotion.sh/) where
there is no import declared but we'd still like to perform the transformations.
The second approach also enables migration from tools like `styled-jsx` which
have their own features that might conflict with `emotion` features.

## Babel Plugins

We first need a way to detect the names of the imported references. To do this
we'll create an `importedNames` map that holds all of the default import names.
When we enter the `Program`, we set the default names in `state`.

```js
const defaultImportedNames = {
  default: 'styled',
  css: 'css',
  keyframes: 'keyframes',
  injectGlobal: 'injectGlobal'
}
...
visitor: {
  Program: {
    enter(path, state) {
      state.importedNames = defaultImportedNames
...
```

Then we will add a visitor for `ImportDeclaration`, which allows us to hook into
reading the names that are imported from `emotion` packages. We parse the names
out and combine them all using object-rest spread. This allows us to set a
precedence order starting with defaults, then dynamic import names and finally
babel plugin options.

```js
visitor: {
...
  ImportDeclaration: {
    enter({ node }, state) {
      if (node.source.value.indexOf('emotion') !== -1) {
        state.importedNames = {
          ...defaultImportedNames, // defaults
          ...parseImports(node), // dynamic imports
          ...state.opts.importedNames // babel opts
        }
      }
    }
  }
...
}
```

Between this small bit of code and replacing any references to the hardcoded
string `'styled'` with `state.importedNamed.default`, we can already use dynamic
import names as such:

```js
import lol from "emotion";

lol`
  background: blue;
`;
```

To finish this off, we basically just need to replace references to any
hardcoded values like `'css'` with references to `importedNames`. A quick `ack`
shows us where most of the work will be.

```
css-prop.js
13:    if (name === 'css') {
94:        state.cssPropIdentifier = path.scope.generateUidIdentifier('css')
98:      return t.identifier('css')

index.js
36:      'css'
138:const getComponentId = (state, prefix: string = 'css') => {
165:  const { src, name } = inline(path.node.quasi, identifierName, 'css')
197:      getComponentId(state, getName(getIdentifierName(path, t), 'css'))
254:  css: 'css',
284:            filenameArr.push('emotion', 'css')
308:                    t.identifier('css')
351:            path.node.callee.name === 'css' &&
355:            replaceCssObjectCallExpression(path, t.identifier('css'), t)
393:          if (path.node.tag.name === 'css') {
394:            replaceCssWithCallExpression(path, t.identifier('css'), state, t)

macro.js
50:    } else if (referenceKey === 'css') {
53:        const runtimeNode = buildMacroRuntimeNode(cssReference, state, 'css', t)
```

# Fin

and now we write a bunch of tests for all the runtimes :)

[emotion]: https://github.com/tkh44/emotion
[styled-jsx]: https://github.com/zeit/styled-jsx
[create-react-app]: https://github.com/facebookincubator/create-react-app
[next.js]: https://github.com/zeit/next.js
[#267]: https://github.com/emotion-js/emotion/issues/267
[@tkh44]: https://twitter.com/tkh44
[css-prop]: https://github.com/emotion-js/emotion/blob/aba1262be259b4de939d5c33768e053cc0e80733/docs/css-prop.md
