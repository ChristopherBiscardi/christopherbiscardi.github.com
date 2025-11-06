#import "/lib.typ": template, highlight, note

#metadata((
  "title": "A Typst Syntax Test project",
  "slug": "typst-test-post",
  "tags": ("bevy", "shaders", "other-tag"),
  "byline": "a test post that enumerates a bunch of typst syntax for review in a document",
  "image_url": "/opengraph/main-opengraph-image.png",
  // "published": "2025-11-01"
)) <frontmatter>

#show: doc => template(
  "A Typst Syntax Test project",
  [#doc]
)

#outline()

= A Heading


== Code Blocks

=== Language tests

==== Rust

```rust
fn main() {
  println!("Here is some Rust");
}
```

==== Toml

```toml
[package]
name = "a-test-project"
version = "0.1.0"
edition = "2024"

[dependencies]
bevy = "0.17"
```

==== WESL

```wesl
import package::colors::chartreuse;    // 1. modularize shaders in separate files
import random_wgsl::pcg_2u_3f;         // 2. use shader libraries from npm/cargo

fn random_color(uv: vec2u) -> vec3f {
  var color = pcg_2u_3f(uv);

  @if(DEBUG) color = chartreuse;       // 3. set conditions at runtime or build time

  return color;
}
```

==== WGSL

```wgsl
@binding(0) @group(0) var<uniform> frame : u32;
@vertex
fn vtx_main(@builtin(vertex_index) vertex_index : u32) -> @builtin(position) vec4f {
  const pos = array(
    vec2( 0.0,  0.5),
    vec2(-0.5, -0.5),
    vec2( 0.5, -0.5)
  );

  return vec4f(pos[vertex_index], 0, 1);
}

@fragment
fn frag_main() -> @location(0) vec4f {
  return vec4(1, sin(f32(frame) / 128), 0, 1);
}
```

=== Highlight function

a raw code block, using the `highlight` function, powered by #link("https://typst.app/universe/package/zebraw/")[zebraw]

#highlight(
```rust
use bevy::prelude::*;

fn main() -> AppExit {
    App::new().add_plugins(DefaultPlugins).run()
}
```
)

A highlighted line of code

#highlight(
highlight-lines: 3,
```rust
use bevy::prelude::*;

fn main() -> AppExit {
    App::new().add_plugins(DefaultPlugins).run()
}
```
)

== Lists

=== Unordered

- one
- two
  + one
  + two
  + three
- three

=== Ordered

+ one
+ two
+ three
10. more stuff
  - with some nested
  - content here
15. skip some
+ and plus one

#link("https://wesl-lang.dev/")["WESL"] is a super exciting extension to WGSL (the WebGPU shading language) that #link("https://bevy.org/")["Bevy"] has support for!


#figure(
  image(
    "/assets/opengraph/main-opengraph-image.png",
    width: 20%,
    alt: "An image description for screen readers"
  ),
  caption: [
    A mid-post image
  ],
)


#table(
  columns: 4,
  [], [Exam 1], [Exam 2], [Exam 3],

  [John], [], "A", [],
  [Mary], [], "A", "A",
  [Robert], "B", "A", "B",
)

== Footnote

Check the docs for more details.
#footnote[https://typst.app/docs]

== Term List

/ Ligature: A merged glyph.
/ Kerning: A spacing adjustment
  between two adjacent letters.

== Quotes


#quote(block: true)[
  I'm only quoting myself by writing this, so it doesn't need attribution I guess. idk, now that I have attribution when would I *not* attribute?
]

#quote(attribution: [
  austinparrish5255 #cite(<bib:thewickedwitchoftheeast>)
], block: true)[
  HOLD ON HOLD ON HOLD ON...HER SISTER WAS A WITCH RIGHT? AND WHAT WAS HER SISTER? A PRINCESS, THE WICKED WITCH OF THE EAST BRO. YOU'RE GONNA LOOK AT ME AND YOU'RE GONNA TELL ME THAT I'M WRONG? AM I WRONG? SHE WORE A CROWN AND SHE CAME DOWN IN A BUBBLE, DOUG.
]

== Notes

#note[
  The default note

  with two paragraphs
]

#note(level: "tip")[
  I'd use a shovel for this, since a fork isn't as effective.
]

#note(level: "important")[
  This is really important
]

#note(level: "warning")[
  danger is near!
]

#note(level: "caution")[
  be careful!
]