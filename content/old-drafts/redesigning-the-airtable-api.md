---
title: "Redesigning the Airtable Api"
date: 2017-09-03
tags: [api, javascript, graphql]
draft: true
---

TODO: remove notes **notes** Use GraphQL Don't use classes

[Airtable](https://airtable.com/) is one of my favorite products.

> Part spreadsheet, part database, and entirely flexible, over 30,000 companies
> use Airtable to organize their work, their way.

It's basically like a modern Excel with an HTTP API. I use it extensively for
consulting (time tracking), product development (research, etc), and my own
personal projects.

It has an official node.js API client but the official node.js client can be a
bit awkward to work with.

```js
var Airtable = require("airtable");
var base = new Airtable({ apiKey: "YOUR_API_KEY" }).base("apphHuWql10zQUmTS");

base("Tracking")
  .select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: "Grid view"
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function(record) {
        console.log("Retrieved", record.get("ID"));
      });

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage();
    },
    function done(err) {
      if (err) {
        console.error(err);
        return;
      }
    }
  );
```

You'll notice that basic property access has been obfuscated by `.get` function
calls. Why is that? If you log out `record` in the about code, you get something
that looks like this:

```js
Retrieved 11 Class {
  _table:
   Class {
     _base: Class { _airtable: [Object], _id: 'apphHuWql10zQUmTS' },
     id: null,
     name: 'Tracking',
     find: [Function],
     select: [Function: bound _selectRecords],
     create: [Function],
     update: [Function],
     destroy: [Function],
     replace: [Function],
     list: [Function],
     forEach: [Function] },
  id: 'recBIhXifUo2U4qpF',
  _rawJson:
   { id: 'recBIhXifUo2U4qpF',
     fields:
      { ID: 11,
        Start: '2017-08-27T14:00:00.000Z',
        End: '2017-08-28T19:00:00.000Z' },
     createdTime: '2017-08-28T20:22:52.000Z' },
  fields:
   { ID: 11,
     Start: '2017-08-27T14:00:00.000Z',
     End: '2017-08-28T19:00:00.000Z' },
  save: [Function],
  patchUpdate: [Function],
  putUpdate: [Function],
  destroy: [Function],
  fetch: [Function],
  updateFields: [Function],
  replaceFields: [Function] }
```

This may look [familiar to
you](https://github.com/Airtable/airtable.js/blob/0c0dd2bc371ce1abe6ebcd2b856f72a1e7e69617/lib/class.js)
because it is a pattern [that has been around a
while](http://ejohn.org/blog/simple-javascript-inheritance/).

# Updating the Library

So, since this library is clearly using some outdated techniques let's first
bring the code up to 2017 JS before we attempt to rebuild it.

## package.json

The first place to go is the package.json. This yields a decent amount of
information about what's going on in the codebase.

```json
{
  "name": "airtable",
  "version": "0.5.0",
  "homepage": "https://github.com/airtable/airtable.js",
  "repository": "git://github.com/airtable/airtable.js.git",
  "private": false,
  "dependencies": {
    "async": "1.5.2",
    "lodash": "2.4.1",
    "request": "2.79.0",
    "xhr": "2.3.3"
  },
  "main": "./lib/airtable.js",
  "browser": {
    "request": "xhr"
  },
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-browserify": "^3.8.0",
    "grunt-contrib-jshint": "~0.10.0"
  },
  "keywords": ["airtable", "productivity", "database", "spreadsheet"],
  "engines": {
    "node": ">= 0.10.0"
  }
}
```

### Dependencies

None of the `dependencies` look particularly critical so we'll probably try to
rewrite them out of the codebase where it makes sense to so we can bring the
weight of the library down and simplify things overall. Size is not our primary
motivator here though, so we will pull in any libraries that make sense to in
the future before turning an eye to optimization.

How can I tell that most of these dependencies aren't particularly critical just
by scanning the package names? To see, we'll go through them one by one.

#### async

[async](https://github.com/caolan/async) is a set of async utilities that was
popular before Promises, Generators, and async/await. It's likely that this is
just being used to make working with series of callbacks cleaner so hopefully we
can update that code to use code from babel instead.

#### lodash

Lodash is the king of utility libraries. Given some of the older styles used in
this codebase, it's likely that lodash is being used for functions that exist in
the JavaScript language itself. In these cases we'll use the JS language
versions instead of Lodash. There may be some additional cases where it's better
to use the Lodash version of a function and for those we'll use Lodash's amazing
tooling to only include what we use. ([lodash-es][lodash-es],
[babel-plugin-lodash][babel-plugin-lodash]).

#### request

[Request][request] is a fairly heavyweight library for dealing with http
requests. Its interface is very simple, which is awesome, but we can likely
replace it with `fetch` calls. If we turn out to need a request library, we'll
use [r2][r2], which is the spiritual successor to `request`.

#### xhr

Remember when we said that `request` was pretty heavy? [xhr][xhr] here is likely
being used to replace `request` when bundling for use in the browser. If we get
rid of request, we get rid of xhr.

A few lines later in `package.json` our suspicion here is confirmed:

```js
"browser": {
  "request": "xhr"
},
```

## The Build

There are only three `devDependencies`, all of which are `grunt`-related. Grunt
is pretty old at this point and we have better solutions for build pipelines
such as using raw babel-cli or rollup. (note: Webpack is great for applications
but we're building a library here). We'll move it to straight babel to start.
This brings the complexity of the build process down while we bring the codebase
up to speed.

We'll need to take a look at the `gruntfile` to make sure there's nothing too
crazy going on. We know from the package.json `devDependencies` that we should
expect to see browserify used here and we do.

```js
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    jshint: {
      // define the files to lint
      files: ["gruntfile.js", "lib/**/!(class.js)*.js"],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        strict: true,
        globalstrict: true,
        globals: {
          console: true,
          module: true,
          require: true,
          process: true,
          setTimeout: true
        }
      }
    },
    browserify: {
      client: {
        src: "./lib/airtable.js",
        dest: "./build/airtable.browser.js",
        options: {
          preBundleCB: function(b) {
            b.require("./lib/airtable.js", { expose: "airtable" });
          }
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-jshint");

  // Default task(s).
  grunt.registerTask("default", ["jshint"]);

  grunt.loadNpmTasks("grunt-browserify");
};
```

We also see JSHint, which we'll replace with prettier to start and ESLint if we
feel more strongly about any specific lint rules.

## Prettier all the things

The first step we'll take is to clean grunt out of the package.json before
applying prettier to the entire codebase.

```
yarn add --dev husky lint-staged prettier
```

Our new package.json looks like this:

```js
{
  "name": "airtable",
  "version": "0.5.0",
  "homepage": "https://github.com/airtable/airtable.js",
  "repository": "git://github.com/airtable/airtable.js.git",
  "private": false,
  "scripts": {
    "precommit": "lint-staged"
  },
  "dependencies": {
    "async": "1.5.2",
    "lodash": "2.4.1",
    "request": "2.79.0",
    "xhr": "2.3.3"
  },
  "main": "./lib/airtable.js",
  "keywords": ["airtable", "productivity", "database", "spreadsheet"],
  "lint-staged": {
    "*.{js,jsx}": ["prettier --write", "git add"]
  },
  "devDependencies": {
    "husky": "^0.14.3",
    "lint-staged": "^4.0.4",
    "prettier": "^1.6.1"
  }
}
```

Now when we commit our code it is formatted according to the prettier version in
our package.json.
[commit](https://github.com/ChristopherBiscardi/airtable.js/commit/954add083b287208d5ded73b98962b7b71e6f151).

```sh
> git commit -m 'remove grunt'
Alias tip: gcmsg 'remove grunt'
husky > npm run -s precommit (node v8.2.1)

s ↓ Running tasks for *.{js,jsx} [skipped]
   → No staged files match *.{js,jsx}
[kaskade-redux 954add0] remove grunt
 3 files changed, 844 insertions(+), 58 deletions(-)
 delete mode 100644 gruntfile.js
 create mode 100644 yarn.lock
```

I want to move `lib` to be `src` because it aligns better with open source
conventions. Luckily for us this kills two birds with one stone since all of the
source files get formatted after the move. We also remove the build folder since
we don't have any use for it.

```
gcmsg 'mv lib -> src; remove build folder'
husky > npm run -s precommit (node v8.2.1)

 ✔ Running tasks for *.{js,jsx}
[kaskade-redux d50431a] mv lib -> src; remove build folder
 26 files changed, 996 insertions(+), 11225 deletions(-)
 delete mode 100644 build/.gitkeep
 delete mode 100644 build/airtable.browser.js
 delete mode 100644 lib/airtable.js
 delete mode 100644 lib/airtable_error.js
 delete mode 100644 lib/base.js
 delete mode 100644 lib/callback_to_promise.js
 delete mode 100644 lib/class.js
 delete mode 100644 lib/object_to_query_param_string.js
 delete mode 100644 lib/query.js
 delete mode 100644 lib/record.js
 delete mode 100644 lib/run_action.js
 delete mode 100644 lib/table.js
 delete mode 100644 lib/typecheck.js
 create mode 100644 src/airtable.js
 create mode 100644 src/airtable_error.js
 create mode 100644 src/base.js
 create mode 100644 src/callback_to_promise.js
 create mode 100644 src/class.js
 rename {lib => src}/deprecate.js (65%)
 rename {lib => src}/internal_config.json (100%)
 create mode 100644 src/object_to_query_param_string.js
 create mode 100644 src/query.js
 create mode 100644 src/record.js
 create mode 100644 src/run_action.js
 create mode 100644 src/table.js
 create mode 100644 src/typecheck.js
```

## Getting into the code

There is no index.js in the src folder, but package.json pointed `main` to
`lib/airtable'` before the rename so that means airtable.js is where we're
headed.

We immediately see the older type of class inheritance used to construct the
core `Airtable` class. Before we can do anything to `Airtable` we'll have to
deal with `Base`. This sort of inheritance pattern tends to make code more
complicated so we'll likely try to write that out when we start making API
changes later on. For now, we'll just start with rewriting `Base` into a modern
class implementation.

### Testing

This project has a few tests in an html file in the tests directory but not much
else. We could realistically rewrite `Base` without writing tests but writing
additional tests here will allow us to dig in on a more granular level as we
rewrite, giving more insight into how the library is constructed.

```
yarn add --dev jest babel-jest babel-preset-env babel-preset-stage-0 babel-cli
```

We'll take the opportunity to set up `jest` with `babel` as well. Our babel
config will use [babel-preset-env][babel-preset-env] and the collection of
[stage-0][babel-preset-stage-0] plugins.

```js
{
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }], "stage-0"
  ]
}
```

Creating `base.test.js` with a simple test to make sure everything is working:

```js
import Base from "./base";

describe("base", () => {
  test("new Base", () => {
    const base = new Base("my-table", "my-id");

    expect(base._airtable).toBe("my-table");
    expect(base._id).toBe("my-id");
  });
});
```

Which works!
[commit](https://github.com/ChristopherBiscardi/airtable.js/commit/95283344a2104a0bdcc486d4e23585ba414bd1b4)

```
 PASS  src/base.test.js
  base
    ✓ new Base (2ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.066s
Ran all test suites related to changed files.
```

`Base` actually depends on a couple other modules:

```js
var AirtableError = require("./airtable_error");
var Table = require("./table");
var runAction = require("./run_action");
```

`AirtableError` looks trivial to convert, so we'll move to starting there.
Snapshotting is super useful at this stage since we're basically just trying to
make sure the output doesn't change while we update the code. We'll use
[jest-in-case][jest-in-case] to apply a series of inputs to snapshots. This
makes it easy to add cases later and evaluate differences in the output as they
occur.

```js
//airtable_error.test.js
import cases from "jest-in-case";
import AirtableError from "./airtable_error";

const data = [
  { err: "my-error", msg: "some message", code: 500 },
  { err: "my-error", msg: "some message", code: undefined }
];

describe("airtable_error", () => {
  cases(
    "new AirtableError(error, message, statusCode)",
    ({ err, msg, code }) => {
      expect(new AirtableError(err, msg, code)).toMatchSnapshot();
    },
    data
  );
  cases(
    "new AirtableError(error, message, statusCode)",
    ({ err, msg, code }) => {
      expect(new AirtableError(err, msg, code).toString()).toMatchSnapshot();
    },
    data
  );
});
```

and the output:

```
PASS  src/airtable_error.test.js
 airtable_error
   new AirtableError(error, message, statusCode)
     ✓ case: 1 (13ms)
     ✓ case: 2
     ✓ case: 1 (1ms)
     ✓ case: 2 (1ms)
```

The snapshots file looks like this, which includes the `toString` output as well
as the class itself.

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[
  `airtable_error new AirtableError(error, message, statusCode) case: 1 1`
] = `
Class {
  "error": "my-error",
  "message": "some message",
  "statusCode": 500,
}
`;

exports[
  `airtable_error new AirtableError(error, message, statusCode) case: 1 2`
] = `"some message(my-error)[Http code 500]"`;

exports[
  `airtable_error new AirtableError(error, message, statusCode) case: 2 1`
] = `
Class {
  "error": "my-error",
  "message": "some message",
  "statusCode": undefined,
}
`;

exports[
  `airtable_error new AirtableError(error, message, statusCode) case: 2 2`
] = `"some message(my-error)"`;
```

[commit](https://github.com/ChristopherBiscardi/airtable.js/commit/5104d018f5af8efe1d743ada4e58b1a1477fba1f)

The most basic reimplementation isn't that interesting at all (which makes it a
good candidate for the first one).

```js
export default class AirtableError {
  constructor(error, message, statusCode) {
    this.error = error;
    this.message = message;
    this.statusCode = statusCode;
  }
  toString() {
    return [
      this.message,
      "(",
      this.error,
      ")",
      this.statusCode ? "[Http code " + this.statusCode + "]" : ""
    ].join("");
  }
}
```

But now our tests are failing!!

```
 FAIL  src/airtable_error.test.js
  ● airtable_error › new AirtableError(error, message, statusCode) › case: 1

    expect(value).toMatchSnapshot()

    Received value does not match stored snapshot 1.

    - Snapshot
    + Received

    -Class {
    +AirtableError {
       "error": "my-error",
       "message": "some message",
       "statusCode": 500,
     }

      at src/airtable_error.test.js:13:58
      at Object.cb (node_modules/jest-in-case/index.js:38:20)
          at Promise (<anonymous>)
      at Promise.resolve.then.el (node_modules/p-map/index.js:42:16)
          at <anonymous>
```

We can see our snapshots have changed, and actually they've changed for the
better. Instead of seeing `Class` printed out for every instance of
`AirtableError`, we now see `AirtableError`. Even a simple refactor like this
can have an impact on debuggability later.

[commit](https://github.com/ChristopherBiscardi/airtable.js/commit/289104bdc46b7a6b650c89c3fbc0ed1d79b53c45)

## Going Deeper into Table

`Base` has a dependency on `Table`, which has a number of it's own dependencies.

### deprecate

`deprecate` is a simple function but we should probably use a more maintained
alternative rather than having this in our own codebase. [warning][warning] is a
library like [invariant][invariant] that only outputs warnings.

We'll get rid of `deprecate` entirely and instead use `warning` at the
callsites. Since we can compile out `warning` warnings for production, it's easy
to ship a dev and prod build. Interestingly, since we're planning to do a major
API bump we can just get rid of the two deprecated functions in `Table` (`list`
and `forEach`). They aren't used anywhere else in the codebase and because we've
committed to a breaking change already we can use that here.

[commit](https://github.com/ChristopherBiscardi/airtable.js/commit/abaa9f6eab42bb115bfb677f2d8e8ae7943e6575)

### typecheck

After following dependencies we find ourselves in the `typecheck` and `query`
files.

typecheck has three functions which are all fairly simple.

```
var _ = require("lodash");

function check(fn, error) {
  return function(value) {
    if (fn(value)) {
      return { pass: true };
    } else {
      return { pass: false, error: error };
    }
  };
}

check.isOneOf = function isOneOf(options) {
  return _.contains.bind(this, options);
};

check.isArrayOf = function(itemValidator) {
  return function(value) {
    return _.isArray(value) && _.every(value, itemValidator);
  };
};
```

Using ack we can quickly find all the callsites:

```sh
> ack check src
src/query.js
6:var check = require("./typecheck");
138:  fields: check(
139:    check.isArrayOf(_.isString),
143:  filterByFormula: check(
148:  maxRecords: check(
153:  pageSize: check(_.isNumber, "the value for `pageSize` should be a number"),
155:  sort: check(
156:    check.isArrayOf(function(obj) {
169:  view: check(_.isString, "the value for `view` should be a string")
```

They're all pretty much in `query` and there aren't that many so we can easily
enumerate the usages manually. While looking at this file it's easy to just jump
right in and add test cases then convert, but we may do better by taking a look
at the use sites because this module is so similar to [prop-types][prop-types].

`isOneOf` looks a lot like `PropTypes.oneOf(['News', 'Photos'])` while
`isArrayOf` looks a lot like `PropTypes.arrayOf(PropTypes.number)`.

If this is all true and it works for the use cases that means we can delete the
entire typecheck file (and who doesn't love deleting more code?). It would be
really nice to reduce some of the code dependency here and push the logic for
validators closer to the callsites.

As it turns out, all of the typecheck functions are used in `paramValidators`.

```js
Query.paramValidators = {
  fields: check(
    check.isArrayOf(_.isString),
    "the value for `fields` should be an array of strings"
  ),

  filterByFormula: check(
    _.isString,
    "the value for `filterByFormula` should be a string"
  ),

  maxRecords: check(
    _.isNumber,
    "the value for `maxRecords` should be a number"
  ),

  pageSize: check(_.isNumber, "the value for `pageSize` should be a number"),

  sort: check(
    check.isArrayOf(function(obj) {
      return (
        _.isPlainObject(obj) &&
        _.isString(obj.field) &&
        (_.isUndefined(obj.direction) ||
          _.contains(["asc", "desc"], obj.direction))
      );
    }),
    "the value for `sort` should be an array of sort objects. " +
      "Each sort object must have a string `field` value, and an optional " +
      '`direction` value that is "asc" or "desc".'
  ),

  view: check(_.isString, "the value for `view` should be a string")
};
```

It also turns out that `isOneOf` is _never_ used, so we'll just delete it. This
means we're down to doing basic check with one check that is a bit more complex
and would be aided by moving to a more featureful library.

Here's what our rough test sketch looked like. All tests passed.

```js
import cases from "jest-in-case";
import check from "./typecheck";

const trueFn = () => true;
const falseFn = () => false;

describe("typecheck", () => {
  describe("check", () => {
    test("truthy response", () => {
      const { pass, error } = check(trueFn, "my-error")();
      expect(pass).toBe(true);
      expect(error).toBeUndefined();
    });
    test("falsey response", () => {
      const { pass, error } = check(falseFn, "my-error")();
      expect(pass).toBe(false);
      expect(error).toBe("my-error");
    });
  });

  describe("isOneOf", () => {});
  describe("isArrayOf", () => {
    test("[String]", () => {
      const { pass, error } = check(
        check.isArrayOf(str => typeof str == "string"),
        "the value for `fields` should be an array of strings"
      )(["passing string"]);
      expect(pass).toBe(true);
      expect(error).toBeUndefined();
    });
  });
});
```

We can then rewrite typecheck into an es6 module and change our imports of
typecheck to es6 `import check, { isArrayOf } from './typecheck'`.

```js
export default function check(fn, error) {
  return value => {
    if (fn(value)) {
      return { pass: true };
    } else {
      return { pass: false, error: error };
    }
  };
}

export function isArrayOf(itemValidator) {
  return value => Array.isArray(value) && value.every(itemValidator);
}
```

[commit](https://github.com/ChristopherBiscardi/airtable.js/commit/ec265cd1704db28238c5b893948516db7c387f8a)

### record

So now we get to the file that contains the code from the beginning of the post
(`record.get('ID')`).

Overall this code seems pretty benign on the surface. A few legacy code patterns
that used to be common of the `var that = this;` sort. There's a bunch of
"convert this callback to a promise" type code. There's an implicit dependency
on the `Table` API which is awkward.

Let's dig in.

A basic snapshot test:

```js
import cases from "jest-in-case";
import Record from "./record";

const data = [{ table: {}, recordId: 5, recordJson: {} }];

describe("record", () => {
  cases(
    "new Record(table, recordId, recordJson)",
    ({ table, recordId, recordJson }) => {
      expect(new Record(table, recordId, recordJson)).toMatchSnapshot();
    },
    data
  );
});
```

Yields us another generic class template with a few properties.

```js
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`record new Record(table, recordId, recordJson) case: 1 1`] = `
Class {
  "_rawJson": Object {},
  "_table": Object {},
  "destroy": [Function],
  "fetch": [Function],
  "fields": Object {},
  "id": 5,
  "patchUpdate": [Function],
  "putUpdate": [Function],
  "replaceFields": [Function],
  "save": [Function],
  "updateFields": [Function],
}
`;
```

We should be able to convert the class structure into es6 without any additional
tests.

One antipattern that is present in the record class is the "property access
wrapper". Also known as a full function indirection to do a simple property
access as such:

```js
  getId() {
    return this.id;
  }
```

You see this kind of code a lot when dealing with Redux because of the tendency
to adhere to boilerplate (or consistency) at the expense of all else. Really,
this function shouldn't exist so we'll eventually delete it.

Two function aliases are defined in the constructor. Maybe at one point there
was an API to keep up and getting rid of them entirely didn't make sense at the
time.

```js
this.updateFields = this.patchUpdate;
this.replaceFields = this.putUpdate;
```

The only two calls to Lodash are for `_.extend`, which is easily replaced by
object-rest spread, so we'll do that and finish off Lodash around here.

It turns out that the implicit `Table` dependency makes it hard to test `Record`
without mocking or straight up using `Table`. So let's see if we can use it. The
finnicky part though is that `runAction` seems to be called everywhere, and
`runAction` sends an HTTP request.

I'm also dealing with the `that = this` scoping issues in `Record` by replacing
the function with a fat arrow.

```
  fetch(done) {
    var that = this;
    this._table._base.runAction(
      "get",
      "/" + this._table._urlEncodedNameOrId() + "/" + this.id,
      {},
      null,
      function(err, response, results) {
        if (err) {
          done(err);
          return;
        }

        that.setRawJson(results);
        done(null, that);
      }
    );
```

## Information gathered so far

`Record` is basically a thin API wrapper that has a few too many implicit
dependencies on other classes. Most of the logic is in `put`, `patch`,
`destroy`, and `fetch`.

Accessing `runAction` through two other unrelated classes seems like the wrong
way to get it there (ala `this._table._base.runAction(`). If I'm not mistaken,
there are no `this` accesses in `run_action.js` which would mean that we could
just straight up swap the hidden property access for an import. Which leaves
`this._table` as the only foreign class access in `Record`.

Perhaps disappointingly, `Base` re-exports a `runAction` that uses `this` as the
first argument, so we can't just import it.

```js
runAction(method, path, queryParams, bodyData, callback) {
  runAction(this, method, path, queryParams, bodyData, callback);
}
```

# Crossroads

Now that I've been through every file multiple times and re-written about half
of them I feel much better equipped to say whether this should be started over
from scratch. I think that untangling the web of `_table._base` indirection
would be about as much effort as designing the API over again in a new project
so that's what I'm going to explore next.

# The Unofficial Airtable API

The first thing I did was create a new Airtable base with the Editorial Calendar
template. This gives us some random data to work with.

---

# An Ideal API

I know we can't get introspection data from the Airtable API, which is
unfortunate, but let's take a look at what we could achieve by using GraphQL for
the data layer.

```graphql
{
  base(id: "sadkgljge") {
    view(id: "asgkljg") {
      rows(first: 50) {
        id
        name
        client {
          id
          displayName
        }
      }
    }
  }
}
```

---

[lodash-es]: https://www.npmjs.com/package/lodash-es
[babel-plugin-lodash]: https://www.npmjs.com/package/babel-plugin-lodash
[r2]: https://github.com/mikeal/r2
[request]: https://github.com/request/request
[xhr]: https://www.npmjs.com/package/xhr
[babel-preset-env]: https://github.com/babel/babel-preset-env
[babel-preset-stage-0]: https://babeljs.io/docs/plugins/preset-stage-0/
[jest-in-case]: https://github.com/Thinkmill/jest-in-case
[warning]: https://github.com/BerkeleyTrue/warning
[invariant]: https://github.com/zertosh/invariant
[prop-types]: https://www.npmjs.com/package/prop-types
