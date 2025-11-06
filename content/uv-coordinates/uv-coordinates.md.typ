#import "/lib.typ": template, highlight, note

#metadata((
  "title": "UV Coordinates",
  "slug": "uv-coordinates",
  "tags": ("graphics",),
  "byline": "",
  // "image_url": "/opengraph/substance-designer-and-ktx2.webp",
  // "published": "2025-10-14",
)) <frontmatter>

#show: doc => template(
  "UV Coordinates",
  [#doc]
)


image_url "/opengraph/bevy-observer-filters.webp" published
"2025-10-17"

Ways to work with UVs

- scrolling UVs

- Apply noise to uv of each fragment (voronoise)

- Gradient Mapping

  - Single "palette" texture, with uvs placed inside to choose colors

- "pixelization" -> quantized uvs

  - `(uv \* 10).floor()`
  - "is a step function"

- Polar coordinates

  - `(water on a quad)`
