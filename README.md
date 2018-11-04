# Sens8

Sens8 is my personal design system and exemplifying area for
experimental designops workflows.

[Read the Docs](https://sens8.netlify.com/)

# Installing

Install the meta-package.

```
yarn add sens8
```

or a targeted version.

```shell
yarn add @sens8/react
```

# Usage

Sens8 is built on [emotion][emotion] so you will not have to handle
any additional sass/css/postcss files.

## Theming

```js
import React from 'react';
import { render } from 'react-dom';
import { ThemeProvider, themeDefault, Avatar } from @sens8/react'

render(
	<ThemeProvider theme={themeDefault}>
		<Avatar src={logoUrl} />
	</ThemeProvider>
)
```

### New Themes

You may want to extend themes, although it is generally advisable to
fork them as this reduces the number of places you have to check for
broken results after changing design tokens. Inheriting is sometimes
good for prototyping however, and you can grab an existing theme
as such.

```js
import defaultTheme, { colorblind, marketing } from "@sens8/design-tokens";
export {
  ...defaultTheme,
  ...colorblind,
  fontSizes: [
    12, 14, 16, 20, 24, 32, 48, 64, 96, 128
  ]
}
```

Note that the tokens are at their core JSON objects, so you can
include anything you want even though you should try to follow the types.

## Server Side Rendering

# Credits

- [emotion][emotion-github]
- [bolt][bolt]
- [styled-system][styled-system]

[emotion]: https://emotion.sh/
[styled-system]: https://github.com/jxnblk/styled-system
[bolt]: https://github.com/boltpkg/bolt
[emotion-github]: https://github.com/emotion-js/emotion
