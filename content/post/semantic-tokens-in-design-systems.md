---
title: Semantic Tokens in Design Systems
date: '2018-07-18T13:12:14-07:00'
tags:
  - api
  - css-in-js
  - design-systems
  - emotion
  - react
---
Lately I've been building an [mdx](https://github.com/mdx-js/mdx) plugin for [gatsby](https://www.gatsbyjs.org/) 2.0 so I can use [styled-system](https://github.com/jxnblk/styled-system) derived [typography components](https://twitter.com/chrisbiscardi/status/1017497477094596608). Between this and recent product work I've been thinking a lot about the last stage in a token transformation pipeline and how we can build components that are more flexible and don't tie themselves to dependencies they don't need to.

## What's in a Token?

The lifecycle of learning component driven development roughly follows the following path:

* hardcoded one-off values
* imported values
* themable tokenized values
* solid defaults with flexibility inside of design system token landscape

### Hardcoded Values

When we look at a component with hardcoded values, we tend to see duplication and variation of values. To make it do something else for a different context, we either need to override the CSS rules via another class or make a new component. Usually overrides are easier, so they happen more often and you end up with multiple dependent components in a stack.

```js
import React from 'react';

const P = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #000000;
  & + & {
    text-indent: 1.5em
  }
`

// oh but we need it to be blue in that one area
const PBlue = styled(P)`
  color: blue;
`

// and sometimes we want the line height to be shorter
const PSmallLineHeight = styled(P)`
  line-height: 1.4;
`

const PBlueSmallLineHeight = styled(P)`
  // 1.3 is better here
  line-height: 1.3;
`

// etc
```

## Imported Values

So then we try to solve some of these problems by importing consistent values (maybe from a JSON or SASS file), but that doesn't really solve the line-height variance problem; It just makes it easier to tie similar line-heights together.

```js
import React from 'react';
import { colors, lineHeight } from 'primitive-values';

const P = styled.p`
  font-size: 16px;
  line-height: ${lineHeight};
  color: ${colors.black};
  & + & {
    text-indent: ${lineHeight}em
  }
`

// oh but we need it to be blue in that one area
const PBlue = styled(P)`
  color: ${colors.blue};
`

// and sometimes we want the line height to be shorter
const PSmallLineHeight = styled(P)`
  line-height: ${lineHeight};
`

const PBlueSmallLineHeight = styled(P)`
  // 1.3 is better here
  line-height: 1.3;
`

// etc
```

### Tokenizing

So now the values are coming "from somewhere" but we still have problems. We decide to make use of those nice CSS-in-JS features and run into a new problem: Consistency vs Flexibility. Do we hard code our values in for people to use or do we trust them to use the right values and "know what they're doing"? So we end up maybe hardcoding defaults instead:

```js
import React from 'react';
import values from 'primitive-values';

const P = styled.p`
  font-size: 16px;
  line-height: ${({lineHeight}) => lineHeight ? lineHeight : values.lineHeight};
  color: ${({ color }) => color ? color : values.colors.black};
  & + & {
    text-indent: ${({ lineHeight }) => lineHeight ? lineHeight : values.lineHeight}em
  }
`

// oh but we need it to be blue in that one area
<P color={values.colors.blue}>{children}</P>

// and sometimes we want the line height to be shorter
<P lineHeight={1.4}>{children}</P>

<P color={values.colors.blue} lineHeight={1.3}>{children}</P>

// etc
```

### Theming

## What's in a Theme?

The word "theme" scares a lot of people. It conjures up images of excessive work for little product gain. In reality, not using themes could be costing you in maintenance and new development time as you rewrite components to be used in different areas of an application.


