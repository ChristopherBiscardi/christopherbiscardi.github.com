#import "/lib.typ": template, highlight, note

#metadata((
  "title": "Substance Designer and KTX2",
  "slug": "substance-designer-and-ktx2",
  "tags": ("graphics",),
  "byline": "Outputting textures from Substance Designer and converting with ktx2",
  "image_url": "/opengraph/substance-designer-and-ktx2.webp",
  "published": "2025-10-14",
)) <frontmatter>

#show: doc => template(
  "If you can't delete code then you're stuck with it",
  [#doc]
)

Using #link("https://www.khronos.org/ktx/")[ktx] files is an improvement over png and other formats because we can store data in a GPU-ready way.
The most clear-cut examples include storing mipmaps, cubemaps, texture array 2d, and other "GPU-style" textures in a ktx container, while png basically only allows a single image.
But even with a single image, using ktx allows us to use GPU-focused compression algorithms like BCn and so-called "universal" codecs like #link("https://github.com/BinomialLLC/basis_universal")[basis universal].

Programs like #link("https://www.materialmaker.org/")[#strong[Material Maker]] (open source) and #strong[Substance Designer] (Adobe) are useful for creating color, normal map, height map, and other textures for complex materials.

Substance Designer does not make what kind of data you're dealing with obvious when exporting, and Material Maker tries to export to "engine-specific" formats.

Both will hand you pngs (or .exr, or a couple of other formats, but not .ktx), so what do we do with them?

= Kram
<kram>

There are a number of tools that can take you from .png to .ktx, including #link("https://github.khronos.org/KTX-Software/ktxtools/index.html")[ktx tools], #link("https://github.com/BinomialLLC/basis_universal")[basisu], GUI applications like #link("https://developer.nvidia.com/texture-tools-exporter")[NVidia Texture Tools], and more. Sometimes you'll even have to use multiple tools, like `ktx create` to pack some pngs into a ktx, then another tool to compress.

We're going to use #link("https://github.com/alecazam/kram")[kram] because it is both the easiest to get right and produces good results.
You will likely have to download kram from GitHub. Let's start off with a description of the end-state of our files.

== kram info
<kram-info>

`kram info` gives us some insight into what we're about to do. Here's
the output of `kram info` run on a ktx2 file that happens to be:

- A 2d texture array (`2DA`)
- with dimensions `2048x2048`
- with `3` images in the array
- with `12` mips per texture (square resolutions: 2048, 1024, 512, 256,
  128, 64, 32, 16, 8, 4, 2, 1).
- compressed with `BC7`
- super-compressed with Zstandard (`Zstd`)

```
❯ kram info -i base_color.ktx2
file: base_color.ktx2
size: 12464592
sizm: 11.887 MB
sizc: 16.000,11.887 MB 74%
comp: Zstd
type: 2DA
dims: 2048x2048
dimm: 16.777 MP
mips: 12
arry: 3
fmtk: BC7s
prop: KramVulkanFormat 146
prop: KramMetalFormat 153
prop: KramChannels Alb.r,Alb.g,Alb.b,Alb.a
prop: KramAddress Rep,Rep,X
prop: KramFilter Lin,Lin,Lin
```

== Compression
<compression>
We want to cram (lol) our textures into as small a space as possible
while retaining visual quality. To this end, compression is used, but
its not the same compression that image file formats use. GPU textures
have comparatively unique requirements, like arbitrary random access
patterns, so the compression algorithms are different. After all it
would be incredibly inconvienent to access a pixel halfway through an
image and be required to decompress every pixel before it.

Another interesting factoid is that we can send compressed textures
straight to the GPU without decompressing them.

#strong[BCn] is the name for a family of compression algorithms. BC, or
"Block Compression", refers to the idea that these compression
algorithms operate on 4x4 blocks of pixels.

#table(
    columns: (13.41%, 35.37%, 51.22%),
    align: (auto,auto,auto,),
    table.header([Compression], [Description], [Use Cases],),
    table.hline(),
    [BC1/BC2/BC3], [Old], [Don't],
    [BC4], [One Channel], [Height/Depth/grayscale],
    [BC5], [Two channels of BC4], [Normal Maps (compressed into two
    channels)],
    [BC6h], [RGB HDR (no alpha)], [Image Lighting],
    [BC7], [RGB (No HDR) (alpha optional)], [General RGB/color Use],
  )

#note [
  If you're doing something like packing unrelated data into channels, BC7 introduces "cross-talk" through sharing palettes, so its better to use something like BC4
]

The first 3 BC algorithms are older and mostly you don't need to use
them. There might be some use cases for BC1 if you're really trying to
squeeze into smaller file sizes.

- Overall for color data "just use" BC7.
- For HDR data, like you might find in lightmaps, use BC6h.
- For single-channel depth maps you can use BC4

Normal maps are normally 3 channels, xyz, but can be "compressed" into 2
channels and then the third channel can be re-constructed in a shader.
For this "two channel" normal map, BC5 can be used.

Game engines like Bevy already have support for normal maps stored in
this "2 channel" configuration within the `StandardMaterial`.

== Supercompression
<supercompression>
Compression is nice and provides size benefits. Supercompression is
additionally compressing already compressed textures.

More compression? I hear you saying.

GPU Textures are kind of like overpacking a bag with clothes to the
point that you need to ask a friend to hold them in while you close it,
then asking another friend to stand on the suitcase for even more
pressure, then throwing the suitcase into that hydraulic press that used
to be popular on tiktok.

We'll use Zstandard supercompression but if you're deviating and trying
out basis universal your supercompression decision is based on the
codec:

- ETC1S and BasisLZ
- UASTC and Zstd

== Review
<review>

- .ktx is a file format. It is a container that can hold various kinds
  of data
- Texures are more complicated than images and have different access
  requirements
- We're using Block Compression (BCn) algorithms

So here's a few kram commands for generating `.ktx2` files with mipmaps.

```
kram encode -f bc7 -type 2d -srgb   -zstd 0 -o base_color.ktx2 -i input_base_color.png
kram encode -f bc5 -type 2d -normal -zstd 0 -o normal_map.ktx2 -i input_normal_map.png
kram encode -f bc4 -type 2d -srclin -zstd 0 -o depth_map.ktx2  -i input_depth_map.png
```
