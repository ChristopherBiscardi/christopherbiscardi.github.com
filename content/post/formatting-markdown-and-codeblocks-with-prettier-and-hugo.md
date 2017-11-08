---
title: "Formatting Markdown and Codeblocks With Prettier and Hugo"
date: 2017-11-08
tags: [prettier, hugo]
---

[hugo](https://gohugo.io/) is a fantastic static site generator.
[prettier](https://prettier.io/) is a fantastic auto-formatter with support for
markdown and the codeblocks inside markdown. To get the two to work together,
we'll need to install some node dependencies. (alternatively, you could build a
container with these dependencies and run it with a volume as a pre-commit hook)

```shell
cd my-hugo-site
yarn init
yarn add husky lint-staged prettier
```

Then add the following `scripts` and `lint-staged` keys to your package.json.

```json
{
  "scripts": {
    "precommit": "lint-staged"
  },
  "lint-staged": {
    "*.md": ["prettier --parser markdown --write", "git add"]
  }
}
```

That's it. Add a new markdown file and watch it be formatted!

After implementing this in a precommit hook and in my editor I no longer have to
worry about any formatting issues when I'm writing, which is fantastic!
