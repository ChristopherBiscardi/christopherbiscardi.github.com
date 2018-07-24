---
title: "Getting Started with PureScript"
date: 2014-06-22
url: "/2014/6/22/getting-started-with-purescript/"
---


According to [PureScript.org](http://www.purescript.org/ "purescript.org")

> PureScript is a small strongly, statically typed programming language with
expressive types, written in and inspired by Haskell, and compiling to
Javascript.

It’s fairly easy to get started with the [grunt-init-purescript
template](https://github.com/purescript-contrib/grunt-init-purescript "grunt
init purescript template")


## Dependencies

We will need
[grunt](http://gruntjs.com/),[grunt-init](https://github.com/gruntjs/grunt-init)
and [bower](http://bower.io/) to work with this PureScript template.
[Node](http://nodejs.org/ "nodejs") is also a dependency because of this.

```bash
npm install -g grunt grunt-init bower
```

Then clone the template into a `.grunt-init` folder using git:

```bash
mkdir ~/.grunt-init
git clone https://github.com/purescript-contrib/grunt-init-purescript.git ~/.grunt-init/purescript
```

We also need the PureScript compiler, which we can grab with cabal:

```bash
cabal install purescript
```


## Developing

We can now install dependencies from npm and bower. There’s a decent amount to be excited about in the output including `purescript-quickcheck`, `either` and `maybe` to name a few.

```bash
npm install
bower update
```

Then grunt when we want to build:

```bash
grunt
```


## Testing

The template project is more of a library project, where the tests are what we
want to run if we cloned the repo. As such, our `Main` module is in
`tests/Test.purs` and can be run using:

```bash
node tmp/index.js
```

after running `grunt` to build the project.

To build an executable (a node.js scraper for example) we can make a few
changes.


## Modifications

First, we’ll make some changes to our test file.

#### Tests

```bash
mv tests/Tests.purs tests/Test/Main.purs
```

and change the module name from `Main` to `Test.Main`. Also change the
`Starter.Kit.Example` import to `Starter.Kit.Main`.

#### JS

Place two simple js files in `js/`

###### js/index.js

```bash
require("Starter.Kit.Main").main();
```

###### js/test.js

```bash
require("Test.Main").main();
```

#### Starter Kit

Now we will make a small modification to the Starter Kit file.

```bash
mv src/Starter/Kit/Example.purs src/Starter/Kit/Main.purs
```

and rename the module to `Starter.Kit.Main`.

#### Gruntfile

Finally make some modifications to the Gruntfile and run `grunt`

```javascript
module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    libFiles: [
      "src/**/*.purs",
      "bower_components/purescript-*/src/**/*.purs"
    ],

    clean: ["tmp", "output"],

    pscMake: {
      lib: {
        src: [""]
      },
      tests: {
        src: ["tests/Test/Main.purs", ""]
      }
    },

    dotPsci: [""],

    copy: [
      {
        expand: true,
        cwd: "output",
        src: ["**"],
        dest: "tmp/node_modules/"
      }, {
        expand: true,
        cwd: "js/",
        src: '**',
        dest: "tmp/",
        flatten: true
      }
    ],

    execute: {
      tests: {
        src: "tmp/test.js"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-execute")
  grunt.loadNpmTasks("grunt-purescript");

  grunt.registerTask("test", ["pscMake:tests", "copy", "execute:tests"]);
  grunt.registerTask("make", ["pscMake:lib", "dotPsci"]);
  grunt.registerTask("default", ["clean", "make", "test"]);
};
```
