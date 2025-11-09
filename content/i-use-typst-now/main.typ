#import "/lib.typ": template, highlight, note

#metadata((
  "title": "I use Typst now",
  "slug": "i-use-typst-now",
  "tags": ("rust", "writing"),
  "byline": "This site uses Typst for its content, and so do my videos, and everything else",
  "image_url": "/opengraph/typst-with-ferris.webp",
  "published": "2025-11-05"
)) <frontmatter>

#show: doc => template(
  "I use Typst now",
  [#doc]
)

#outline()

= I use Typst now <i-use-typst-now>

I write technical education content at all sorts of lengths.
Recently this meant 30k words for a client's technical education coursework, then wrote another 8,500 for a Rust Quickstart document.

The content I write is distributed in many formats in many places.
Some are used as scripts for videos, some are posted directly to the web.
Others are distributed via PDF or email.
Still more gets printed and bound or used in a talk at conferences.

A short roundup might be the coursework and articles on #link("https://www.rustadventure.dev/")[Rust Adventure], #link("https://thisweekinbevy.com/")[This Week in Bevy], client work, YouTube and other video platforms, etc.

For a long time I've been searching for a writing format that suits a variety of needs.

== Typst <typst>

I first came across Typst a number of years ago #cite(<bib:yt:typst>), around the time it launched and it has been on my radar ever since.

For a long time now, Typst has made great strides in being a modern LaTeX competitor, which means I've been using it to write book-length content in a directory on my laptop all that time.
More recently they've expanded their sights to be more general, "*The new foundation for documents*", and I think it's a good direction.

== What do I like about Typst? <what-do-i-like-about-typst>

To note what I like about Typst it's probably useful to mention what I've used before.
Most of my writing "before Typst" was in Markdown variants and Org mode (yeah, I used to use Emacs a lot more).

There are some really compelling things about both.
Markdown is great and awful because of its simplicity.
If you can keep to the golden path and use minimal extra features, Markdown is fine and supported basically everywhere.
It always requires some custom modifications though, and the more modifications you do, the less maintainable your content authoring setup becomes.

Org mode is wonderful for many *different* reasons.
Nobody would say org is simple, but there's a lot of really interesting interactivity like being able to pop open codeblocks in new language-specific buffers, execute arbitrary code, capture, interlinking, agendas, etc.

But org is basically locked into Emacs and GitHub.
Its not a format that can be used *with* anyone else, and not a format that writes well outside of Emacs.

=== Bibliography <complementary-shaders>

Typst supports bibliographies out of the box.
I do so much research and take advantage of tools like #link("https://www.zotero.org/")[Zotero] to manage it.
Being unable to cite other posts, papers, videos, and more without additional effort to embed links really sucks.

Typst supports a number of bibliography formats, including their own #link("https://github.com/typst/hayagriva")[Hayagriva], and I can cite anything in my growing hayagriva file, like this #cite(<complementary-shaders>) page that I brought in because I was writing a post about shaders.

```yaml
complementary-shaders:
  type: Misc
  title: Complementary Shaders | Official Site
  author: https://github.com/ComplementaryDevelopment
  date: 2025-11
  url: https://www.complementary.dev/shaders/
```

This all gets tracked and I can drop it into the bottom of any post I write from now on, automatically.


=== Document Queries <document-queries>

Typst allows you to #link("https://typst.app/docs/reference/introspection/query/")[query the document], both from inside and outside the document.
This means you can query for say:

- all headings, for a table-of-contents as JSON
- all codeblocks, to test or screenshot
- specific metadata, as a frontmatter replacement

Here's an example of using `query` in a document that is targeted at PDF output, which fetches the `<frontmatter>` metadata defined in a different place in the document to write a title, byline, and image into the first page of the PDF.

```typst
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
```

To get a JSON output of all headings in a document on the CLI

```
typst query main.typ "heading"
```

=== Scripting <scripting>

Typst includes a whole scripting language and adjacent things like show rules, etc.

The shortest way I can describe how nice this is, is to show you a custom function I wrote for notes that used to require special ast support in markdown.

Here is the output:

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

Here is the usage in the typst document:

```typst
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
```

and the implementation configures itself to do specific things based on the target output format.
So this renders the HTML I want when targeting the web, and different layouts when targeting PDFs.


=== Plugins <plugins>

Given a content format with scripting and styling solutions built-in, you can now go check out #link("https://typst.app/universe/")[Universe], the Typst package registry.

This includes awesome packages like #link("https://typst.app/universe/package/zebraw")[zebraw], which provides more sophisticated code syntax highlighting, complete with headings, footers, line numbers, and line highlighting.

=== Multi-Target (HTML, PDF, Slideshow, etc) <multi-target>

Honestly I could write about how cool it is to have a format that can target multiple platforms, but you're already reading this in HTML, its available as a PDF, and I'm #link("https://typst.app/universe/search/?q=slides")[looking into] using this for talk slides too.

=== PDF hot reload? <pdf-hot-reload>

My sites are typically built in #link("https://leptos.dev/")[Leptos] and content-based sites like #link("https://www.rustadventure.dev/")[Rust Adventure], #link("https://www.christopherbiscardi.com/")[christopherbiscardi.com], and #link("https://thisweekinbevy.com/")[This Week in Bevy] are also built with Islands.
This means I get a fully functional, modern, frontend framework that can be deployed as a client-side webapp, a static site, or a full stack server/client hybrid deployment.
Islands also means I get to deploy as little WASM as possible.

With all of that, hot-reload for a website is ready-to-go anytime I need it... but sometimes its nice to have a non-site-specific content authoring workflow.

Typst comes with its own PDF and HTML target hot-reload server.
This means I can write, save, and view in milliseconds regardless of where the content is going to end up.

== The Downsides <the-downsides>

It's not all sunshine and rainbows, and probably not even *for* everyone right now.
I write a lot, and I need a format that can keep up, so I'm willing to be an early adopter of say, the HTML target, and hit some issues.
Most people probably want to wait for the HTML target to stabilize.

=== Experimental HTML Target <experimental-html-target>

The HTML target is experimental, and as such has big warning signs all over it saying that it's incomplete and that you shouldn't use it in production.

whoops.

I've always been an early adopter anyway and I'm confident in my near decade of Rust skills, my almost-two-decades of web skills, and my ability to fix something inside of Typst if I really needed to. #footnote[look recruiters, I've finally got over a decade of working with React, lol]

Since I'm early-adopting the HTML target there are issues to work around.
For example, 

=== My ever-growing lib.typ? <my-ever-growing-lib.typ>

I'm not really sure this is a downside, but I've taken to storing all customizations in a `lib.typ` file which I then use to handle the differing needs for large-scale layout, target (PDF/HTML/etc), bibliography inclusion, and provide functions that I can use for rendering, like this note function:

#note[
  This is a note that can come in a variety of flavors.
]

```
#note [
  This is a note that can come in a variety of flavors.
]
```

=== Stability? <stability>

Typst isn't guaranteed to be stable at the pace I want to use it at.
The format isn't "locked in" like the commonmark spec, and it does a lot more.

That said, I've seen the migration guides and worked through a few of them.
I'm comfortable with the workload if I have to migrate, compared to the benefits I get from using the format.

=== References <references>

Using a single bibliography across all documents (including HTML targets) is a nice way to maintain a single file instead of many files.
The HTML target output uses `#loc-1` format ids by default, which can be customized using reference syntax.

```
=== References <references>
```

This is fine, but provides a vector for breaking old posts by adding to my bibliography library since the reference names live in the same namespace.

For this, I prefix my bibliography ids with `bib:`, so `bib:mytopic`

I've #link("https://github.com/typst/typst/issues/7320")[filed this].

== Typst for Everything? <typst-for-everything>

So yeah, Typst is my number 1 choice for writing format and I'm working it in to more and more places.

For me it powers:

- video scripts, and the codeblock generation from those scripts
- HTML platforms. Mostly websites... but also email?
  - and HTML-target outlines via heading queries, etc.
- PDF construction for email and print

There are still places I haven't quite fit it in yet.
I still need to see if it is a good replacement for slide creation for conference talks.

And it probably doesn't make sense to replace markdown for the small descriptions for each project on This Week in Bevy.
Well, maybe.
We'll see.

I still have some work to do on the integration, but I'm very excited about the future at the moment.