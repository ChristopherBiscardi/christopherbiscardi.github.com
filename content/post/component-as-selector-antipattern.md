---
title: "Component as Selector Antipattern"
date: 2017-10-16
tags: [emotion, css-in-js]
draft: true
---

```js
const Box = styled.div`
  border: 1px dashed #ccc;
  ${BoxInner} {
    filter: opacity(50%) grayscale(50%);
  }
  &:hover {
    border-color: blue;
    ${BoxInner} {
      filter: opacity(100%) grayscale(0%);
      ${Prompt} {
        opacity: 1;
        height: 1.25rem;
        transition: all 0.2s ease-in-out;
      }
    }
  }
`;
```

## Table with Hover Row Content
