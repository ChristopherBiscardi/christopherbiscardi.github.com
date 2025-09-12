---
title "Bevy's 5th birthday"
slug "bevy-5th-birthday"
tags "bevy" "rust"
byline "Bevy gets another year older"
image_url "/opengraph/bevy-5th-birthday.webp"
published "2025-09-11"
---

Another year, another [Bevy Birthday](https://bevy.org/news/bevys-fifth-birthday/).
This year I released [Skein](https://bevyskein.dev/), a Bevy/Blender integration crate + Blender addon, and continued a full year of [This Week in Bevy](https://thisweekinbevy.com/).
I'll start by going over what I was excited about [last year](/bevy-4th-birthday).

## Skein

In last year's birthday post I said I was excited about [blenvy](https://github.com/kaosat-dev/Blenvy), which was an approach to integrating Blender and Bevy.
Unfortunately life happens and a few Bevy releases have gone by without a corresponding Blenvy release.
I still think this is a valuable workflow that deserves a solution, so I started experimenting with the workflow [from scratch](https://youtube.com/live/mUYnvt68vNA) on Saturday's live streams and produced some [educational content](https://youtu.be/HfQatgUyFYc) showing off how Blender's custom properties worked and how you could programatically consume them in Bevy.

As I worked, I kept in mind some aspects of Blenvy that I had seen people have difficulty with, and that I thought could be reworked.
I didn't really intend to replace Blenvy at first, it was originally a knowledge-gathering quest.

One of the issues the community had with maintaining Blenvy was the amount of code involved: approximately 10,000 lines of python and 7k lines of Rust (stats generated from running tokei)
Skein, by comparison, is about 2,000 lines of python and 300 lines of Rust.
That's not to say this won't change over time but it is to say I put a lot of effort into making this project something that was maintainable with the goal of easily being able to port between Bevy versions.
My first test for this was Bevy 0.17, which was a trivial upgrade.
A few Blender releases have also happened without incident.

Looking forward, there's a few things I want to do with Skein.

Firstly I want to make an example game roughly based on Tunic.
It can be hard to imagine a workflow with tools you're unfamiliar with, and Blender is one of those "oh I should learn that someday" tools for many people.
Tunic is a particularly good 3d game target for a demo because of the way it uses features like vertex painting and because the modelling and approach was done by a game developer who was learning modelling as they went.
I think the author of Tunic was in a similar place to the current userbase that will be looking at Skein as a tool, and a "clone-ish" game will show off some nice integration points.

I also want to experiment with a Blender -> BSN exporter.
Bevy's current Asset processing system wants to be able to process a lot of little assets rather than one "pack" asset like a .glb/.gltf can be.
and it seems like a general sentiment that glb/gltf is not the desired delivery format for Scene-level detail in the long-term future.
This exporter might work well with collection exporters, relying on the gltf exporter to handle pieces that are reusable chunks and BSN to render scene configurations.
This would be a decent amount of work and require quite a few tests but is something that is potentially interesting.

Finally, its time for some polish for the Skein workflow this year.
People are using and happy with it, but there could be better UX, migration tools, and more.

There's a lot of conversation about "the Bevy editor" but to be honest, I don't feel that pain point as much because of Skein and Blender.

## Nannou

Last year I said I was excited about [Nannou](https://nannou.cc/).
I still am, and the project [has seen major progress](https://www.charlotte.fyi/posts/bevys-fifth-bday#Nannou).
I'm excited to see high level support for compute shaders and using Nannou APIs in Bevy.
Nannou underwent a major rewrite to align with Bevy and I'm _very_ excited to see it launch this year.

## WESL

[WESL](https://wesl-lang.dev/) is the name for the next generation of wgsl tooling, and it has been progressing quite a bit!
I'm very hopeful that we'll start seeing migrations of Bevy shader code to wesl in the near future and the teams seem to be collaborating well.
I'm very excited that there's the potential for a wider-usage version of wgsl in play.

## What am I excited about?

### The Bevy CLI

The Bevy CLI working group has been hard at work building a wonderful tool for scaffolding, building, linting, and running Bevy applications.
It makes it far easier to run on the web without needing to be a web-configuration-knowledgable person.

## Bevy Audio

bevy_seedling and Firewheel are poised to be the next big thing in Bevy's audio story.
The audio working group has been making steady, fairly quiet, progress for a long time now.

### BSN

BSN seems like it will land in some form in 0.18.
There's a [draft PR](https://github.com/bevyengine/bevy/pull/20158) up with some implementation and its really exciting to see people already figuring out how to use it.
I don't know when the BSN asset format will come into existence, but even seeing a `bsn!` macro merge would be very exciting.

### WESL

Yep, still excited about WESL.
Hoping this also lands in 0.18 but who knows what will happen.
