#import "/lib.typ": template, highlight

#metadata((
  "title": "Bevy's 4th birthday",
  "slug": "bevy-4th-birthday",
  "tags": ("bevy", "rust"),
  "byline": "Bevy gets another year older",
  "image_url": "/opengraph/bevy-4th-birthday.webp",published: "2024-09-08"
)) <frontmatter>

#show: doc => template(
  "Bevy's 4th birthday",
  [#doc]
)

Its #link("https://bevyengine.org/news/bevys-fourth-birthday/")[Bevy's 4th birthday] and while I've been around for a couple of previous birthday posts I've never written something myself.

This year I chose to step up into some additional maintainer duties on ecosystem crates like #link("https://github.com/StarArawn/bevy_ecs_tilemap")[`bevy_ecs_tilemap`], which I consider foundational and important to update to new versions, and I started #link("https://thisweekinbevy.com/")[This Week in Bevy],
which I'll talk about a bit more later.

= Why Bevy? <why-bevy>

The overriding reason I started writing Rust in the first place is that it expanded the kinds of programs I could write.
Game development falls into that category, so I started working with Bevy a number of years ago, before there were regular releases, but really ramped up when #link("https://bevyengine.org/news/bevy-0-8/#new-material-system")[0.8 introduced the Material APIs] which really inspired me to dig deeper into rendering, and feel like this year was another "up another notch" for my personal involvement.

Because of Bevy I now have a stack of Rendering books on my desk, in addition to the others on geometric math, animation, and more.

But that doesn't really answer "why bevy?".

Bevy has proven time and again, as a community and a project, that it will continue to improve over time.
Whether this is Stageless, Materials, Observers, the plethora of rendering features, or any of the other great work in each release.

I don't really have great words for why I think the future of Bevy's funding and operational position look good to me… I've seen too many projects and companies destroyed by VC funding, growth at any cost, "crush all competitors", etc.
Bevy-the-project's position seems to be on sustainable long-term open source which I really, really appreciate after experiencing more than a decade of tech startups.

There's a specific kind of "we coexist well" in the project that I really want to see succeed and from a technical perspective Bevy seems uniquely suited to being extended and built-in-collaboration-with rather than "worked around".

This leads to the ability to fully develop third party crates for many use cases which can then be evaluated for potential upstreaming.
The strength of the ecosystem at least in part, comes from this ability to extend the engine.

== The community <the-community>

I can't really cover "why Bevy" without covering the amazing community that exists around it.
A huge amount of people who know more than I do in a wide variety of topics who are volunteering their time and energy to both developing Bevy and interfacing with the rest of the community.
Thank you to everyone who is working on Bevy and who shares their knowledge around that work.
Your effort, knowledge, and kindness is incredibly appreciated.

== Why This Week in Bevy? <why-this-week-in-bevy>

I make Bevy educational resources and keeping those resources up to date is a serious amount of effort that requires explicitly designing how
that happens.
YouTube videos are one-and-done so the update mechanism for them is "ship another one". Workshops and courses are significantly
different.
API changes from version to version might be fairly trivial, but "best practices" evolve as does my own understanding of those "best
practices".
Given the release cadence, the amount of work it takes (and the time it takes) has to be carefully considiered. For example, if each workshop for building a type of game takes a week to update the scripts for and re-record, then on a 3 month release cycle you really can only afford a single-digit number of them #emph[if that's the only thing you're working on].

This leads to a conclusion that means tracking issues and PRs as they go in throughout a release cycle is the most efficient way to stay up to date and keep resources on track for the next release.

As I spent more time last year tracking issues, making games, videos, and workshops, it became clear to me that keeping up with the pace of Bevy's development could be a full time job for anybody.
Of course, the vast majority of people do not have that kind of time and at this point I considered myself fairly good at ingesting this kind and size of data.

So in the interest of deepening my own knowledge, keeping that knowledge current, and making it so that every other person doesn't have to duplicate that work: This Week in Bevy was created with the goal of keeping more people up to date without requiring them to read all of the Discord channels, all of the GitHub issues, and paying attention to the wider ecosystem.

So far this seems successful. I've shipped This Week in Bevy in written form on the website and on YouTube as a video every week for about 6 months.
People seem to find it useful and I'm looking forward to shipping better versions of it over time.

=== This Week in Bevy Distribution <this-week-in-bevy-distribution>

From a YouTube perspective "This Week in Bevy" are not "high viewcount" videos and don't serve to expand the reach of my channel today, but I believe they are valuable to the Bevy community as well as myself and I think this is important work to do.
I might split them off into a second channel now that I have the process well trodden. I don't know yet.

From a website perspective, I think having a written form of the content is important and I hope to ship additional website features, such as search and better issue/pr categorization.
My focus is primarily on sustainably getting issues out each week, so the website features will be slow to ship, which I am totally comfortable with as I plan to do this for a number of years.

I also plan to send This Week in Bevy out as a newsletter each week, which has been requested a few times.
This work is already in progress
and I anticipate it will happen over the next month or two.

This Week in Bevy is also available as an RSS/Atom feed, and I try my best to remember to post it to social media and subreddits for those that wish to read it there.
The Rust subreddit in particular has been gracious in providing support when "This Week in Bevy" issues were automodded (Its a game-development topic, which overlaps a bit with the "Rust game" posts the subreddit gets accidentally, so completely understandable).

I've also seen This Week in Bevy mentioned in This Week in Rust and other newsletters, and I am thankful for those of you that submit/include it in those places.

== What am I excited about?  <what-am-i-excited-about>

There's a number of exciting projects in the Bevy ecosystem. In core, seeing progress on UI, Editor, Scenes, Rendering, ECS and more is incredible and each 0.x release feels like a full new set of features.
Its amazing to think that development is only going to accelerate from here (as it has through past releases).
We have a lot to appreciate from
the people working on keeping the organization running as a whole as it expands.

In particular I'm excited about projects that make it easier for artists to create and the development of art pipelines to support that work.
Bevy today is largely programmer-powered today but I believe that this will shift greatly to include support for artists over the next 5 years.

- #link("https://github.com/kaosat-dev/Blenvy")[Blenvy] makes 3d game development significantly more streamlined by integrating Blender and Bevy in a dual-direction workflow.

- #link("https://github.com/nannou-org/nannou")[Nannou] is a creative coding framework that I'm happy to see getting next-generation level work.

- wesl (pronounced "weasel") is the work-in-progress name for the next generation of wgsl tooling. There's not a lot concrete to point to, but there is a Discord where people are working on this and the work is very exciting.

=== Blenvy <blenvy>

Blenvy is in an alpha release state and I'm very excited for it to get a full stable release.
Working with Blender's APIs is difficult and time consuming but having bi-directional data transfer between Bevy components and Blender models is an incredible step forward in terms of usability for creating 3d games with Bevy.

There are still problems to be solved, both in terms of technical workflows and education: How do you answer "is this Blender feature supported in Bevy?" for example.

Bevy will eventually have its own editor, but in the meantime Blenvy is a really strong addition to the ecosystem.

=== Nannou <nannou>
I started with Nannou before I started with Bevy, so it was very exciting to see the project decide to rework into #link("https://github.com/nannou-org/nannou/issues/953")[a set of Bevy plugins].
This has been producing very interesting abstractions like #link("https://github.com/nannou-org/nannou/blob/ac654161a96d3a655e2deaf6193a0e846f6ff3e6/examples/compute/particle_mouse.rs")[ComputeModel] as well as having impacts on Bevy's rendering capabilities.

I generally view Bevy as being a number of different layers of abstraction from raw wgpu to mid-level apis, to high-level Materials, and I really appreciate this progressive disclosure of complexity.
I see Nannou as being at the very top of this abstraction stack and am excited to continue to see improvements to support it in Bevy and in Nannou.

Charting a path from high-level Nannou APIs into Bevy could be a great way for a sub-set of artists to get more involved in the Bevy ecosystem.

== The Next Year <the-next-year>
Over the next year I'm absolutely committed to continuing
This Week in Bevy and keeping the crates I've committed to maintaining up to date with each release.
I have a vision for my educational resources that I've started working on but that's not really the subject of this post.

Viewing Bevy as a whole, I don't know that doing the work to become an SME in some area is the right place for me.
The work I do today with This Week in Bevy isn't really covered by anyone else and that easily
takes hours each week.
Additionally, the work I can perform with respect to video and content creation, serving as a source for "this feature landed, here's what it is and how to figure it out" seems very useful as an extension of the work happening in PRs and in documentation.
This is also an area in which there aren't that many other consistent efforts happening.

My work is made sustainable primarily through the creation of educational resources, and secondarily through consulting practices, so while I believe in Bevy and its future, it is only one piece of the work that makes what I do sustainable.

So in general the closest kind of work that I see as "what I do" with respect to Bevy on the internet is #link("https://en.wikipedia.org/wiki/Science_communication")["science communication"] and while that wikipedia link has a bit of a grand explanation (like "informing public policy"), in practice I mostly see this as taking expert-level information and translating it for the benefit of non-experts.
Examples of this include #link("https://youtu.be/aMjg3_E8k1c")[Observers and Hooks introductions after release]
and #link("https://youtu.be/DS5Ww2QoIqs")[explanations of features that have recently landed].
I imagine this extends to Required Components after the migrations start landing and other features as they are developed.

I additionally want to gain a deeper understanding of what it means to ship games in a production capacity with Bevy.
To that end I've started developing games on stream on Saturday mornings with the intent of getting to a "Steam Page"'able state in 3 months (so, small focused games).

I'm very much looking forward to the next year of Bevy.
Turns out treating a game as a database is kind of awesome.
