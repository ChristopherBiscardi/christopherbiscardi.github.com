#context {
  set text(40pt, font: ("Outfit", "Comic Sans MS"), weight: 900, alternates: true)
  let meta = query(<frontmatter>).at(0).value

  pad(bottom: 16pt,)[
    #box(height: 20%)[
      #image("/assets/" + meta.image_url, width: 100%)
    ]
  ]

  box(height: 30%, width: 100%)[
    #align(center)[
      #meta.title
    ]
    #set text(15pt, font: ("Outfit", "Comic Sans MS"), weight: 400, alternates: true)
    #box(height: 20%, width: 100%)[
      #align(center)[
        #meta.byline
      ]
    ]
  ]
}

#align(center)[
  #image("assets/logos/logo-full-light.svg", width: 40%)
]

#outline()

#include sys.inputs.post_path