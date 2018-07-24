---
title: "Episode 1: A New Blog"
slug: "episode-1-a-new-blog"
date: 2016-03-27
---

Hooray! A new published version of my blog (which also happens to include
everything on this domain and thus is not just a blog).

# A New Blog Engine

I did what everyone tells you not to and wrote a whole new engine to build the
new version of this blog. I dubbed it Leo and you can check it out [on
GitHub][leo] if you are so inclined. It, for example, supports conditionally
including drafts in the output with env vars:

```javascript
BLOGPOST_RENDER_DRAFTS=true npm start
```

I'll do a more in-depth discussion of the static-site engine beneath this site
in a different post. The technical architecture is fairly interesting itself
since it uses Relay, GraphQL and React.

## Authoring

The markdown implementation is [markdown-it][markdown-it], which supports
commonmark in it's default configuration and has a plugin system. Hopefully I
won't abuse the plugin system too much... or I may just end up with a custom
markdown syntax &nbsp;

### Emoji Shortcode Support

```
:poop: :) :fire: :joy: :sunglasses: :dizzy_face: :athletic_shoe:
:tongue:
```

yields

:poop: :) :fire: :joy: :sunglasses: :dizzy_face: :athletic_shoe: :tongue:

Unfortunately, for some reason they only work in `<p/>` tags. Experimentally
they use the correct utf-8 code in headers, but render with an effect similar to
`visibility: hidden`.

### Youtube/Vimeo

YouTube support is enabled via "shortcodes" from
[markdown-it-video](https://www.npmjs.com/package/markdown-it-video)

```
@[youtube](https://youtu.be/rO7oDZZb7K0)
```

turns into

@[youtube](https://youtu.be/rO7oDZZb7K0)

## Headers

- [markdown-it-named-headers](https://www.npmjs.com/package/markdown-it-named-headers)

headers have `name` attributes automatically associated with them, but they
aren't "auto-linked". This means that you have to either guess at the
`#slugified` representation or inspect element. I'd like to change this to have
a clickable link in the future.

## Footnotes

Pandoc-style footnotes are enabled.[^0]

## PostCSS

- More on [PostCSS][postcss]

I have a component library system[^fate] in development that's also being used
in places on this site. It uses PostCSS for the CSS generation.
[postcss-responsive-type][postcss-responsive-type] is responsible for the
font-size changing depending on viewport size (try it, it's cool!). This yields
a nice effect where the entire site scales a bit, based on typography size,
between phones and 4k screens.

# Design

Ok, so I spent 0 time designing this thing. It's mainly an exploration of the
functionality of [Leo][leo] (which was used to build the site). That means there
are significant areas to improve in terms of design. You may notice, for
example, that there are some blueprint-ish placeholders for featured post
images, etc.

## Fonts

Roboto is _ok_, but a stack based on [Proxima Nova][proxima-nova] is probably
where I'll end up long term.

# Open Source

The source for this site is on [GitHub](website) and the source for the static
site generation tool [is there too][leo].

[^0]:

  Enabled by [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)

[^fate]: Not open source yet, but will live at [superawesomelabs/fate][fate]

[proxima-nova]: https://typekit.com/fonts/proxima-nova
[leo]: https://github.com/superawesomelabs/leo
[postcss-responsive-type]: https://github.com/seaneking/postcss-responsive-type
[postcss]: https://github.com/postcss/postcss#plugins
[markdown-it]: https://github.com/markdown-it/markdown-it
[fate]: https://github.com/superawesomelabs/fate
[website]: https://github.com/ChristopherBiscardi/christopherbiscardi.github.com
