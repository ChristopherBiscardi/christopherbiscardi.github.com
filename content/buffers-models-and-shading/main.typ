#import "/lib.typ": highlight, note, template

#let commit(children) = [
  #children
]

#set document(
  title: [Buffers, models, and shading],
)

#metadata((
  "title": "Buffers, models, and shading",
  "slug": "buffers-models-and-shading",
  "tags": ("rust", "vulkan"),
  "byline": "Vulkan vertex buffers, attributes, and rendering actual models",
  "image_url": "/opengraph/typst-with-ferris.webp",
  "published": "2026-10-17",
)) <frontmatter>

#show: doc => template(
  "Buffers, models, and shading",
  [#doc],
)

Starting with an application that can run Slang shaders and render some triangles, I want to move on to rendering 3d models quickly.

#figure(
  image("/assets/posts/buffers-models-and-shading/rectangle.png", width: 80%),
  caption: [
    Two triangles
  ],
)

It took just #link("/its-one-triangle-michael-what-could-it-cost")[under 1000 lines of code] to get the program to this point, and it was mostly done without a working program until the end.
So moving forward I want to work with active demos.

I don't have an asset system, transform hierarchy, or anything fancy yet, so we'll be working with buffers rather than higher level constructs for the time being.

The format I have the most experience with is glTF, although I'd love to also work with OpenUSD, OpenPBR, MaterialX, and more in the future.
The easiest way to get a glTF file is Blender, but #link("https://kenney.nl/assets/category:3D")[Kenney] has a ton of free 3d assets to play with as well.

I can toss the default Blender cube...

#figure(
  image("/assets/posts/buffers-models-and-shading/blender-cube.png", width: 80%),
  caption: [
    The Blender Cube
  ],
)

and replace it with Suzanne.

#figure(
  image("/assets/posts/buffers-models-and-shading/blender-suzanne.png", width: 80%),
  caption: [
    Suzanne
  ],
)

Exporting that to a `.gltf` file instead of a `.glb` file gives some JSON and a blob of vertex data.
I haven't attached any textures yet, so we don't need to worry about loading them.

There's a glTF crate that makes it fairly easy to pull attribute data out.
It also hard-codes some support for a number of extensions and allows access to extension data more generally.
`KHR_lights_punctual` is the extension I can see enabling the soonest, as that allows exporting lights from Blender.

#figure(
  image("/assets/posts/buffers-models-and-shading/gltf-features.png", width: 80%),
  caption: [
    glTF Features
  ],
)

For now, I'll really just be pulling the vertex data in... materials and bones can come later.
glTF 2.0's upcoming spec restricts the file to having a single scene, so that's all I'll support from the outset.
In this particular case, we also only have one node.

Which means for the moment, I'll throw together some glTF code that will work for Suzanne specifically.
Looking to the future I intend to take advantage of non-interleaved vertex buffers, which means I can scoop up the attribute data from the glTF accessors directly.

The reason behind that is to be able to bind specific sets of attributes for different passes in the future.
For example a depth pass would only need the vertex position data, not the normals.

Learning how to set this up required reading #link("https://docs.vulkan.org/guide/latest/vertex_input_data_processing.html")[vertex input data processing].
Other than that it was *surprisingly* straightforward.

- create a gpu buffer for each attribute and fill it with the relevant data
- pass multiple vertex buffers in instead of the singular buffer

and that gives me a first suzanne render!

#figure(
  image("/assets/posts/buffers-models-and-shading/first-de-interleaved-buffers.png", width: 80%),
  caption: [
    The first, non-perspective suzanne
  ],
)

Note that there's no matrices here yet, so it's the raw vertex data which makes suzanne upside-down and squished, but visible on screen.
I immediately started building some matrices up using glam, which is a column-oriented matrix crate (that won't come up later!).
We've got a "game world", a model, and ideally a perspective (or orthographic) camera view.

In terms of spaces, that means a vertex position needs to move from model space, where the origin for a cube would be the center of the cube, through world space, into camera/view space, and at the end of our vertex shader the positions need to be in clip space.

We need to be in clip space at the end of the vertex shader because that is then used by the gpu to drop anything that is outside of that space.

So a few matrix multiplications later... I've got a blank screen!

== Validation Layers

Up until this point I hadn't really checked my work in any real way.
So for a next step I decided to enable the vulkan validation layers.
You can enable validation layers through the configurator with no changes to a vulkan application, which is pretty cool

#figure(
  image("/assets/posts/buffers-models-and-shading/validation-layers-configurator.png", width: 80%),
  caption: [
    vulkan configurator
  ],
)

This... pointed out allll of the mistakes I made... which was a lot.

Luckily the messages are pretty straightforward, so while I had put some `push_next` calls in the wrong place, the validation layers told me the features I had intended to enable were missing.

I worked through the messages one by one and got through most of them

#figure(
  image("/assets/posts/buffers-models-and-shading/validation-layers-horizontal.png", width: 80%),
  caption: [
    an example of some validation logs
  ],
)

== Matrices

and then it was back to figuring out why suzanne wasn't rendering.
XCode's ability to capture a gpu workload saves the day again, and it turns out suzanne... was having some problems behind the camera.

#figure(
  image("/assets/posts/buffers-models-and-shading/xcode-debug.png", width: 80%),
  caption: [
    xcode geometry view, zoomed out
  ],
)

Remember that glam is column-major, so I swapped the matrix representation in slang to column-major instead of row-major and I got a real view of suzanne.

#figure(
  image("/assets/posts/buffers-models-and-shading/suzanne-perspective.png", width: 80%),
  caption: [
    suzanne in perspective, with bad offsets
  ],
)

Of course, there's still multiple major problems here.

First is because in this session I switched from a single interleaved vertex buffer to multiple separate buffers for each attribute.
...but I left the original offsets for the interleaved attribute representation.


#figure(
  image("/assets/posts/buffers-models-and-shading/suzanne-fixed-offsets@2x.png", width: 80%),
  caption: [
    suzanne in perspective, with normal colors
  ],
)

That fixed one issue, but I'm still left with the problem that the first of three instances I'm trying to render, renders properly, while the second and third instances are completely borked.

but that's actually because I set up my data incorrectly!
I'm really not used to reading slang yet, so wasn't sure how the indexing into the buffer device address data worked.
So I re-read some of my shader code and don't really find the arrows as readable as dots.
These two pieces of code, as far as I can tell from the documentation, do the exact same thing!

#figure(
  image("/assets/posts/buffers-models-and-shading/arrows@2x.png", width: 80%),
  caption: [
    arrows for dereferencing
  ],
)

#figure(
  image("/assets/posts/buffers-models-and-shading/arrows-removed@2x.png", width: 80%),
  caption: [
    not using arrows
  ],
)

Now this isn't terribly important from a syntax perspective.
I could get used to arrows, but I use languages like Rust, so I'm used to using dots and this project is a Rust project.
If you're more familiar with C you might be more used to using arrows.

With the data set up correctly, three suzannes can now be rendered.

#figure(
  image("/assets/posts/buffers-models-and-shading/suzanne-three@2x.png", width: 80%),
  caption: [
    suzanne three models
  ],
)

== Shading

Suzanne is currently rendering the normal colors, so we're basically just visualizing vertex data.
This is fine, but it does not a game make.

A very common path forward is realistic rendering.
This is somewhat nice because, as opposed to non-physically based rendering, physically based rendering has clear outputs you can compare against.
If your thing doesn't look like the reference thing, then you made a mistake...
or vanishingly less common, the reference has a mistake.

There's a few paths to go down, but I think the most interesting is the path that gets us to OpenPBR compatibility.

After all, I have no real need for a unique realistic renderer, so implementing something on my own, from scratch, would be fun... but integrating with standards that Blender and Substance Painter have adopted is interesting.

OpenPBR is #link("https://academysoftwarefoundation.github.io/OpenPBR/")[a spec] that defines an uber-shader surface model that layers and mixes slabs.

#figure(
  image("/assets/posts/buffers-models-and-shading/openpbr_layer_graph.png", width: 80%),
  caption: [
    OpenPBR mix graph
  ],
)


#figure(
  image("/assets/posts/buffers-models-and-shading/openpbr_model_schematic2.svg", width: 80%),
  caption: [
    OpenPBR model schematic
  ],
)


Adobe has generously open sourced an #link("https://github.com/adobe/openpbr-bsdf/tree/main")[OpenPBR implementation]
...and a production implementation at that!
It is the implementation of OpenPBR used in Adobe's proprietary Eclair renderer, extracted and licensed under Apache 2.
And it has a Slang implementation... or rather... the codebase is written in some wild portable subset that works across C, Slang, and more languages.

Going from 0 to "portable, rich PBR implementation" would be an incredible days work.
Let's try that.
I can always implement this sort of thing from scratch later, which honestly might make a good video, but let's try to get something working as fast as possible.

This will provide a good reference for comparison to any future custom work.

== Adobe OpenPBR

Getting Adobe's OpenPBR running took a bit of time, but not too much.
Without the LUTs it was actually pretty straightforward following the instructions in the README.
And that integration work left me with...
Some pretty dull suzannes.
Physically based rendering without lights and fog volumes and such is pretty boring.

#figure(
  image("/assets/posts/buffers-models-and-shading/adobe-openpbr@2x.png", width: 80%),
  caption: [
    first working openpbr render
  ],
)

This is running through the OpenPBR code but there's one hitch left to fix, which is that I've hardcoded some LUT lookups to unrealistic numbers.
I did this because while there are two options: LUT texture lookup and embedded data, the embedded version didn't compile.
The LUT data is stored as comma separated values in some files, and comma separated `vec3`s in another.

== Image LUTs

Handling images is more involved than other steps in vulkan because each image has to be transferred through an intermediary buffer.
So we not only need the gpu image, but also the intermediary buffer as well as the machinery around synchronising copies from the buffer to the image.

For each image, we need to:

1. create_image
2. allocate_image
3. create_buffer
4. allocate_buffer
5. bind_buffer_memory
6. memcpy data to buffer

then:

1. begin command buffer
2. pipeline barrier
  - image layout transitions
3. copy buffers to images
4. pipeline barrier
  - image layout transitions
5. end command buffer recording
6. submit to queue
7. wait for fence

== Fake lighting

Of course that was quite a bit of code to write to parse, process, and upload the LUTs so I got bored and wanted to make some visual progress.
I really need some abstractions here for image uploading or find a nice library or extension to make that a bit less code.

My shader data buffer, the same one I'm using for the model translations, already has some data for a light position.

Given a light position, the normal vector of the fragment, and the view vector from the fragment to the camera, we can calculate some very basic lighting.
I'm sort of using a horribly slapdash implementation of Phong but it's enough to have some effect and satisfy my own side quest until I do something more sophisticated.

#figure(
  image("/assets/posts/buffers-models-and-shading/suzanne-normals@2x.png", width: 80%),
  caption: [
    suzanne normals and fake lighting
  ],
)

It's also worth noting that if we change the clear color we can see a bit more of what is actually happening to the model shading.

#figure(
  image("/assets/posts/buffers-models-and-shading/suzanne-different-clearcolor@2x.png", width: 80%),
  caption: [
    suzannes with non-black clear color
  ],
)

== Back to images

Of course, then it's back to images and luts.
I went through the process of setting up a descriptor set for images combined with samplers, since this seemed to be the most straightforward first implementation.
However I quickly ran into `Vulkan(ERROR_OUT_OF_POOL_MEMORY)`.
I think this turns out to be because MoltenVK has some pretty serious restrictions on `maxCombinedImageSamplerDescriptorCount`.
That number being 3.
Also-Also, I was even more surprised to learn my 5060 has a limit of 1.
I'm truly not sure how this is supposed to be used in practice, since it seems like all tutorials on the internet use this combined image/sampler feature.

That means I need to split samplers out from images which is fine.
It's a bit more advanced and thus requires a bit more tracking, but means far fewer samplers overall.



== Validation Layers

At this point I've worked through a bunch of code relating to loading, uploading, and sampling textures.
The biggest comment I have in this whole process is: If you have not enabled the Vulkan validation layers, go enable the Vulkan validation layers.
You can do this in the vulkan configurator and the number of problems I've fixed just by reading the validation issues is *extremely high*.

== Next up

- lights!
- OpenPBR textures from Substance Painter
- egui
- hot-reloading
- assets? ecs?
