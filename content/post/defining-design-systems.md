---
title: Defining Design Systems
date: 2018-02-19T03:34:21.878Z
tags:
  - css-in-js
  - design-systems
  - emotion
  - gatsby
  - graphql
  - javascript
  - preact
  - react
  - tooling
---
What is a design system?

I am going to convince you that everyone has a design system already. When
starting a new project you can choose a number of different places on a scale to
think about the people and processes used to deliver the final application.
Thinking less about a system or choosing a pre-built component library like
Bootstrap leads you to a place where the design tokens are sprinkled around as
literals through the application. This is often how you end up with 5 different
border radii or 20+ different buttons.

# Non-Goals

non-goals of this post include talking about the history of design systems.

Design systems are often thought of as a Problem of Scale; That is, you need a
design system when you have so many people working on so many projects that it
becomes hard to have a cohesive story around interactions, a11y, animations,
visuals, etc.

> Sketch libraries and component libraries by themselves do not make a design
> system. Design systems are about people, processes, and automation.

# Evolutionary Levels

As briefly mentioned previously, There are many ways to think about systems.

Not consciously choosing to build and maintain one means you implicitly chose to
have one that doesn't function well (or maybe you get really lucky and yours
works).

# Distributed Systems

Design systems become distributed systems.

Once you start taking multiple targets into account (Design tools, component
frameworks, etc)

# Render Targets

A design system that nobody uses is a waste of time, effort, and money. It is a
worse outcome than not trying to maintain the system in the first place. With
this in mind, we must be able to translate design tokens to immediately usable
representations. In essence we have to think about all of the different places
we will need to communicate about the system and how to use it. This list is
long and context-dependent. Common places include documentation sites (html),
framework-specific (React, etc) component libraries, design tools (Sketch), and
native platforms (ios/android). Some more targets include command line TUIs,
various types of CSS utility library ([tailwind][tailwind]), presentations
(keynote; [spectacle][spectacle]), and multi-target charting
([victory][victory])

When talking about design systems as processes, we eventually come upon the need
to support many different ways of interacting with the system itself and also
the artifacts of the system. For this example, we'll use React as a core tool
for rendering design tokens to different "targets". Note that targets such as an
atomic CSS library are not included here as they aren't applicable when using
React as the transformational tool and require additional processes.

##

* Windows: https://github.com/Microsoft/react-native-windows
* Macos: https://github.com/ptmt/react-native-macos
* Linux (Qt): https://github.com/status-im/react-native-desktop
* AR: https://github.com/HippoAR/react-native-arkit
* VR: https://facebook.github.io/react-vr/
* TV: https://github.com/react-tv/react-tv
* Shell consoles: https://github.com/Yomguithereal/react-blessed
* Word: https://github.com/nitin42/redocx
* Pdf: https://github.com/diegomura/react-pdf
* 3d: https://github.com/Izzimach/react-three
* Sketchapp: http://airbnb.io/react-sketchapp/
* Keynote: https://twitter.com/nishb1/status/913744410537537536
* Hardware: https://github.com/iamdustan/react-hardware
* Samplers: https://twitter.com/GabeRicard/status/911989894267973633

> credit to [mlsarecmg](https://news.ycombinator.com/item?id=16198843) for
> pulling this list together originally

It should be as trivial to take the mental model of components in a library such
as React and apply it to multiple packages published to npm. We should then be
able to theme these components that can be used in "Real Products", prototypes,
and playthings.

# Structuring Teams

Often in pre-existing companies a new team will need to be formed to handle the
scale of processes for a centralized system.

[spectacle]: http://formidable.com/open-source/spectacle/
[tailwind]: https://tailwindcss.com/docs/what-is-tailwind/#component-friendly
[victory]: http://formidable.com/open-source/victory/
