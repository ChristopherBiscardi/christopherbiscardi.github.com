#import "/lib.typ": template, highlight

#metadata((
  "title": "An Introduction to Shaders",
  "slug": "an-introduction-to-shaders",
  "tags": ("bevy", "shaders"),
  "byline": "Languages like Rust are CPU programs. Shaders are GPU programs.",
  "image_url": "/posts/an-introduction-to-shaders/minecraft-shaders.webp",
  // "published": "2025-11-01"
)) <frontmatter>

#show: doc => template(
  "An Introduction to Shaders",
  [#doc]
)

If you search for shaders right now, the first result is probably going to be Minecraft shaders.
and with that comes what most people think of as shaders: the things that make a game look pretty.

#figure(
  image("/assets/posts/an-introduction-to-shaders/minecraft-shaders.webp", alt:"A Minecraft shader example"),
  caption: [
    "Minecraft Shaders" @complementary-shaders
  ]
)

Obviously this has some truth to it, but why?

== What are Shaders

Similar to the way Rust, Python, JavaScript, etc are langugages that run on the CPU; A "Shader" is a program that is compiled to run on the GPU.
Historically these GPU programs were used for very specific things, like figuring out what color a pixel should be on screen, but more recently its common to have general compute capabilities for shader programs.
Now, the GPU runs programs quite a bit differently than the CPU, so there are interesting differences in how a program is written, but they are both fundamentally programs that run on specific hardware (CPU or GPU).

Saying that can be a bit tough to understand though, after all imagine trying to figure out what "general purpose" meant for the first programming language you learned.
