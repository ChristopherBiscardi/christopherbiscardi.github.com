#import "/lib.typ": highlight, note, template

#let commit(children) = [
  #children
]

#set document(
  title: [It's one triangle, Michael. What could it cost?],
)

#metadata((
  "title": "It's one triangle, Michael. What could it cost?",
  "slug": "its-one-triangle-michael-what-could-it-cost",
  "tags": ("rust", "vulkan"),
  "byline": "Rendering a triangle with Ash, Vulkan, and Rust",
  "image_url": "/opengraph/its-one-triangle-michael-what-could-it-cost.webp",
  "published": "2026-09-16",
)) <frontmatter>

#show: doc => template(
  "It's one triangle, Michael. What could it cost?",
  [#doc],
)

There are a lot of fantastic, open source game engines out there and while I have decades of programming experience, my knowledge of what goes into game engine has greatly expanded over the last 5ish years.
I've learned a lot more about graphics programming, for example, from working extensively with the Bevy game engine to working with clients using Rust to build graphics applications in the browser.

A lot of my experience is with Bevy, and the project makes specific choices that make sense for what they're trying to do.
This includes using a multi-platform graphics API based on WebGPU and a Rust windowing crate.

I want to explore more deeply past this boundary, which often helps when coming back to within that boundary later.
For this work, I'm going to pick drastically different options than Bevy does.

Of course this means that I need to make some sacrifices.
After all, rebuilding a fully generic game engine that tries to play on the same stage as Unreal, Unity, or Godot is a multi-decade long project.
So my goal here is just rendering... and rendering basically nothing at that.

An empty window is a precursor to triangles and meshes and fancy procedural terrain experiments... and things.

So there are two steps here:

1. Become familiar with a set of new technologies that are outside the scope of Bevy's choices (or other choices that I've used before, like WebGL APIs)
2. Pick a specific game, with a specific art style, and build graphics *specifically for that game*, leaving out any other features.

== Picking Tech

So it's time to pick some technology I'm unfamiliar with and get... familiar... with it.
I'm going to use the Rust programming language which is a fairly arbitrary choice; I like the language and have been using it for years at this point.

For me rendering is heavily associated with game development, so a question this makes me consider is: what is the absolute minimum needed to make a game?

I think the *most* critical pieces for this project are:

- platform support
  - some kind of windowing integration
- input support
  - a keyboard works for me, but I also want to support gamepads or alternative input devices if possible
- A graphics API
  - technically speaking we could render to image pixels, but realistically games use the GPU these days. The graphics API will help us manage data and pipelines for the GPU.
  - With a graphics API we'll also likely need a shader language of some kind

For a more serious attempt at a game engine, I'd also want plenty more, from a bare-essentials perspective.

- profiling and logging capabilities
- audio
- file loading abstractions

Of course, these are the most foundational pieces and they are the base on which physics, gizmos, lighting systems, and all of the things we typically associate with "games" are built on.
and I'm not actually building a game engine!
Especially not a general purpose one.
What I'm doing is coming up with some constraints to drive my little educational project.

== Choices

Constraints drive choices, so it's useful to note that I want to support Windows, Linux, and MacOS.
It is fun to hand people programs and have them run!
Web and mobile support are not important to me right now, especially since I don't want to endure the extra constraints of the web platform.
In the future if I want to support web, I could see using the WebGPU APIs more directly, or wgpu if I wanted cross platform support.

Bevy also uses winit, so I'm looking for a different windowing library to get acquainted with.

As a result, I'm going to start with Vulkan and SDL.
Vulkan is a widely used graphics API that can target Windows and Linux but requires a compatibility layer for MacOS.

HOWEVER. Recently Tiny Glade released MacOS support, and I believe they use Vulkan... or at least it says so when you boot the game.
So MoltenVK on a Mac will define my hardest constraints.

That means using

- sdl3
- vulkan

== SDL3

sdl is relatively easy to get running compared to Vulkan.

Rust has an `sdl3` crate and a small example program which...
promptly fails!

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/CleanShot 2026-09-02 at 2.57.03 AM@2x.png",
    width: 80%,
  ),
  caption: [
    SDL compile fail
  ],
)

One of the really nice parts of Bevy's approach that we immediately miss out on is the ability to `cargo run` and have everything work.
Now, we need the SDL3 library available and will likely run into similar issues when we tackle Vulkan.

Of course, getting SDL running *did* turn out to be as easy as installing the library from homebrew.
We'll see what happens when trying to make a release build for someone else to run later.

and with that it's on to Vulkan, which I'm anticipating will take *much* more effort.

:forboding  music:

== Vulkan

I'm playing with fire and using MoltenVK on MacOS because I saw Tiny Glade shipped a MacOS build recently.
It's probably a better idea to do initial development on Linux.
Either way, the Vulkan SDK is a requirement here which I can grab from the downloads page.

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/CleanShot 2026-09-02 at 3.57.21 AM@2x.png",
    width: 80%,
  ),
  caption: [
    Vulkan SDK page
  ],
)

I ended up with `1.4.357.1`, which is a whole mouthful of a version.

I don't know if the versions need to match *exactly* as is the case sometimes with other similarly versioned software, so I'll pull the ash git repo and try to run something and see if it works.

and of course, without the SDK we get what we expect.

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/CleanShot 2026-09-02 at 4.13.57 AM@2x.png",
    width: 80%,
  ),
  caption: [
    Vulkan SDK page
  ],
)

That means it's time to run the installer

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/vulkan-sdk-install/CleanShot 2026-09-02 at 4.15.09 AM@2x.png",
    width: 80%,
  ),
  caption: [
    Vulkan installer
  ],
)

and then we see the glorious Vulkan Configurator!

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/vulkan-sdk-install/CleanShot 2026-09-02 at 4.19.11 AM@2x.png",
    width: 80%,
  ),
  caption: [
    Vulkan configurator
  ],
)

Unfortunately mesh shaders don't show up in my configurator on MacOS so RIP that idea for now.
I just did the work to get them merged into Bevy, so I can always go over to Bevy land to play with them.

There's a bunch of extra *stuff* to request for Vulkan to run on a Mac via MoltenVK, but luckily everyone seems vaguely aware of that.
Not only do the MoltenVK docs make it obvious, but the Ash examples also include some similar logic.

#quote(
  block: true,
)[
  Because MoltenVK supports the VK_KHR_portability_subset extension, when using the Vulkan Loader from the Vulkan SDK to run MoltenVK on macOS, the Vulkan Loader will only include MoltenVK VkPhysicalDevices in the list returned by vkEnumeratePhysicalDevices() if the VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR flag is enabled in vkCreateInstance(). See the description of the VK_KHR_portability_enumeration extension in the Vulkan specification for more information about the use of the VK_INSTANCE_CREATE_ENUMERATE_PORTABILITY_BIT_KHR flag.
]

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/CleanShot 2026-09-02 at 4.30.16 AM@2x.png",
    width: 80%,
  ),
  caption: [
    ash example running
  ],
)

== A Vulkan Surface

Technically speaking, all I need at this point is `ash` and `sdl3`.

```toml
[dependencies]
ash = { version = "0.38.0", features = ["linked"] }
sdl3 = { version = "0.18.4", features = ["ash"] }
```

but I what I ended up with at the *end* of this experiment is a decent amount more dependencies.
Some of which I intend to explore in the future,some of which replace C libraries, like Vulkan Memory Allocator, as well as some dependencies for handling errors in Rust projects a bit nicer or packing data.

```toml
[dependencies]
ash = { version = "0.38.0", features = ["linked"] }
glam = { version = "0.33.6", features = ["zerocopy"] }
gpu-allocator = "0.28.0"
miette = { version = "7.6.0", features = ["fancy"] }
sdl3 = { version = "0.18.4", features = ["ash"] }
slang = { package = "shader-slang", git = "https://github.com/ChristopherBiscardi/slang-rs", branch = "main" }
thiserror = "2.0.20"
tracing = "0.1.44"
tracing-subscriber = { version = "0.3.23", features = ["fmt"] }
vk-sync = { package = "vk-sync-fork", version = "0.5.2" }
zerocopy = { version = "0.8.56", features = ["alloc", "derive", "std"] }
```

Like I said before, the big hangup to creating a vulkan surface on MacOS is that MoltenVK has some extra requirements, but that information is mentioned in the MoltenVK docs and exists in the `ash` examples so with a bit of stumbling I was able to create a surface using Vulkan on MacOS, using the SDL3 window.

TK: color about reading ash examples, etc.

With a bit of a fumbly surface it was time to make a decision.

- continue reading source code
- read how to vulkan for more context

I chose to start reading how to vulkan, which immediately proved to be a good decision.

I learned that SDL can yield the instance extensions required to create the surface, and a bit more about the vulkan api style.

ash seems to rely heavily on a builder pattern, which is fine enough with me although after writing 600 lines of builder APIs I've had multiple opinions on it.

#commit [
1baebec
]

I just need to remember to not construct the structs by default, which is how I normally like doing things.
There are some functions that do extra calculations and some that don't.

That brings me into finding a queue family that can *do graphics*, as opposed to doing compute or transfer, since I'm concerned with rendering at the moment.

and oh I forgot to eat. shit.

Ok back from getting food and we're into setting up devices.
Vulkan differentiates between the physical gpu device and the logical "implementation" device that we can use to interact with the physical device.

The how-to-vulkan tutorial is not one that I would suggest using... However.
I also don't know of a better tutorial!
The issues that I'm running into are centered around the tutorial including a bunch of extra "stuff" that would fit better in followups.
This is fine, because the how-to-vulkan tutorial is acutally just a step-by-step explanation of a source code file with some explanations, not actually a tutorial.

In that sense, I think the best way to use how-to-vulkan is in combination with other code examples.
For me, that meant digging into the ash examples and cross referencing that with the how-to-vulkan explanations.

This takes much longer to do, and all the extra research between how-to-vulkan, ash apis, and vulkan docs took days, but results in a deeper understanding of what's going on, which is my goal here.

For example, since I'm using MoltenVK I'm cross referencing, ash, how-to-vulkan, and MoltenVK's user guide, which leads me to be aware of the fact that MacOS silicon targets get the best performance by using 3 swapchain images.
how-to-vulkan uses 2 but explains and shows how to manage the resources for multiple swapchain images when it comes to command buffers, fences, and semaphores.
Combine this with the concrete ash code and I've got a fairly solid hold on what's going on.

sidebar: There are some *WEIRD* formats that Vulkan supports.
Real multi-planar monstrosities that are effectively two images in one image.
Such monstrosities that the KTX spec just... doesn't support them.

== Slang

As I got further it came time to choose a shader language.
It's notable that Vulkan has decoupled the human-authored shader languages from the intermediate representation Vulkan actually uses.
So you can use any shader language that can compile to SPIR-V.
This brings options like GLSL, HLSL, WGSL (or WESL), and Slang.

I chose to go with Slang.
WGSL and WESL I'm already familiar with, and GLSL is an older shader language.
Slang extends HLSL and has language features that I really want, like modules, as well as features that I think would be fun to play with, like reflection.

Slang is also distributed with the Vulkan SDK.

However.

My first approach was to try to use the Slang CLI to compile to SPIR-V instead of trying to find bindings for Rust and `slangc` just didn't work for me.
I later figured out that the issue wasn't necessarily the CLI so much as there's something that doesn't work about including multiple entrypoints in the same slang file.

Luckily, the Tiny Glade devs have an open source Rust fork of some Slang bindings, and I'm very comfortable using unpublished git dependencies, so let's go with that.

I often don't fork libraries on GitHub unless I plan to contribute, but in this case it seems useful since I'll be relying on some code that is at a higher risk of having something happen to it and who knows maybe I'll use it enough to have a problem worth solving and submit a PR.

https://github.com/ChristopherBiscardi/slang-rs

Armed with a very minimal amount of slang compilation code, I continued to push through the rest of the large number of description objects I need to write to end up with...

An empty window!


#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/first-clear-color-window/CleanShot 2026-09-07 at 2.07.43 AM@2x.png",
    width: 80%,
  ),
  caption: [
    first blank window render
  ],
)

No really, I swear, this is from the GPU.
Look it's red now.


#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/first-clear-color-window/CleanShot 2026-09-07 at 2.07.18 AM@2x.png",
    width: 80%,
  ),
  caption: [
    red blank window render (clear color)
  ],
)


I also hooked up the sdl event loop which means... I can exit the app. :windows beep sound:

== A Triangle?

Now I've skipped some things.
Specifically I've skipped setting up any actual vertex data buffers.

With a pipeline up and running, it's time to try to actually get it to do something.
how-to-vulkan was loading .objs, but I think I'll start with some trianges.

I put a rectangle together in a similar way to the way bevy does and only really ran into one stumbling block: howtovulkan puts the vertex and index buffer into the same gpu buffer, which means I spent some time forgetting that I had done the same on a previous work session!

whoops. That wasn't an alignment issue, it was just user error.

TK:

I was able to get XCode configured properly to grab a frame capture to debug, which is really, really helpful when doing graphics programming.
On other platforms I'd use RenderDoc, but I was on a plane and only had a Mac with me.

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/CleanShot 2026-09-11 at 8.39.04 PM@2x.png",
    width: 80%,
  ),
  caption: [
    xcode graphics capture
  ],
)

A bit of debugging led me to the fact that the index buffer was actually sharing an index between two triangles and I guess the vulkan default is not sharing indices.

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/CleanShot 2026-09-11 at 8.52.52 PM@2x.png",
    width: 80%,
  ),
  caption: [
    geometry view
  ],
)

After a bit more fiddling, I figured out that I had accidentally set the write mask to the alpha channel... which doesn't WORK very well for rgba color output.

And with that not one, but two, count em, two... triangles.

#figure(
  image(
    "/assets/posts/its-one-triangle-michael-what-could-it-cost/CleanShot 2026-09-11 at 9.20.57 PM@2x.png",
    width: 80%,
  ),
  caption: [
    A RECTANGLE
  ],
)
