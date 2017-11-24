---
title: "Speaking a Ui Language"
date: 2017-08-10
tags: [javascript, design-systems, css-in-js]
draft: true
---

The Component paradigm allows a single UI vocabulary across an organization.
React is probably the best-known example of this paradigm currently.

```
import DropdownMenu, {
  Heading,
  Item,
  Separator,
  SubMenu,
} from 'dropdown-menu';

<DropdownMenu>
  <Item>Profile</Item>
  <Item>Billing</Item>
  <Separator/>
  <Heading>Settings</Heading>
  <SubMenu>
    <Item>Changeable Things</Item>
    <Item>Options</Item>
    <Item>Debug</Item>
  </SubMenu>
</DropdownMenu>
```

When you say "we should use a dropdown menu" it means that specific thing. Not
what someone called a dropdown menu at their last company, not what someone
doing a google search found, and not what the outdated wiki says.

Reframing the act of documenting these components into defining the vocabulary
that your company or project uses to talk about UI is a powerful concept.

The single source of truth can be used to render these components into Sketch

# Ergonomics

The "styled" API makes using this kind of paradigm much lighter weight.
styled-components, emotion, glamorous and other all implement this paradigm.
