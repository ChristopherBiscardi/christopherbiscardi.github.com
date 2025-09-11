---
title "If you can't delete code then you're stuck with it"
published "2019-11-18"
updated ""
slug "if-you-cant-delete-code-then-youre-stuck-with-it"
byline "Letting your products tangle unrelated features is a long-term risk"
image_url "/opengraph/if-you-cant-delete-code-then-youre-stuck-with-it.webp"
---

You've likely worked in a codebase (or heard about someone
working in a codebase) that was described as Legacy Code.
The stories told are that of extremely long build times,
gnarly sections of code written by people that left the
company years ago, and files that no one goes in.

In projects that last multiple years there are pieces of
code you will never need to touch again until you need to
delete it. The context and the people that you are working
with are, at any given point in time, far more important
than which specific subset of the technology and approach
you use. Fundamentally when you're building something and
you have an existing codebase (or you're building something
new even), the context of the people that you're working
with and the people that you want to hire, and the people
that you want to train are far more important any decision
about, for example "Should we port the entire codebase to
X or not?". The thing that I will add to that is that
you, when writing your codebase, need to optimize your
codebase for the ability to delete isolated pieces of it
entirely and rewrite them.

If you're not optimizing for deletion then rewriting becomes
much more of a "how do we rewrite this entire project"
because now we've cross-contaminated everything. When
codebases start out cross-contaminated they tend to evolve
in layers that don't stack neatly. If you _do_ optimize for
deletion, which things like hooks and component models allow
you to do, then you can just delete the files off your
computer and everyone else's computer forever and rewrite it
in the new style when you need to touch it. The code that
you have from 1.5+ years ago that no one has really needed
to touch because it doesn't do anything different can stay
there. You don't actually need to touch it and you don't
need to upgrade it because it doesn't do anything different.
All of your new code can opt-in to this new pattern through
incremental rewriting.

My operating context is startups and when I think of what
startups are at their technological core I think of
incremental rewrite machines. You can choose to take a path
leading to needing to do a wholesale rewrite in the
future—Which to be fair is a choice that when made
purposefully can be the right choice. When making this
choice you need your team all on the same page so some
people aren't trying to rewrite or properly architect when
sometimes you just need to build something out, accumulate a
bunch of tech debt and then 3 or 4 years from now when your
company is still alive because you did that you can rewrite
it. The better choice today is to write your code so that
you can make suboptimal choices in sub-sections of your
application so that you can delete those subsections instead
of needing to delete those subsections and the spiderweb of
dependencies in which they touch.

Large scale rewrites contain risk on the scale that can kill
everything from open source projects to companies.
Optimize for deletion when you write your code because if
you don't it's easy to end up needing to grind out large
rewrites, which contain massive risk.
