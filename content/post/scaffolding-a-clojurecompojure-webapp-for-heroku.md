---
title: "Scaffolding a Clojure/Compojure Webapp for Heroku"
date: 2014-01-15
url: "/2014/1/15/scaffolding-a-clojurecompojure-webapp-for-heroku/"
---

In this post we’ll go through the process to create a basic
Clojure/Compojure/libnoir scaffolding project and deploying it to Heroku.

First, make sure you’ve installed the prereqs:
[Leiningen](http://leiningen.org/) >= v2.0 [Heroku
Toolbelt](https://toolbelt.heroku.com/)

and here’s the
[GitHub](https://github.com/ChristopherBiscardi/clojure-compojure-libnoir) if
that’s your style.

After installing leiningen, run:

`lein new compojure scaffold-app`

to scaffold a new project. Then cd into the project and run `lein ring server`
to install dependencies and run the app.

````shell
cd scaffold-app
lein ring server
```

We can kill the server with `C-c`. We will need a `Procfile` to deploy to Heroku and it will look like this:

`web: java $JVM_OPTS -cp target/scaffolding-app.jar clojure.main -m scaffold-app.handler $PORT`

Be sure to save that as `Procfile`. This says we will have a “web” dyno type, which is a special type on heroku that is allowed to receive web traffic.

We need a `:main` namespace in our app so that `lein run` knows how to run the app.

Inside of `project.clj` add `:main` and a dependency on `lib-noir`, from which we will use a jetty adapter. We also want to add `min-lein-version` so that heroku uses lein 2.0 and add a section for our `:uberjar-name`. This will help us out with some startup-timing issues we could encounter otherwise.
```clojure
(defproject scaffold-app "0.1.0-SNAPSHOT" :description
"FIXME: write description" :url "http://example.com/FIXME" :dependencies
[[org.clojure/clojure "1.5.1"][lib-noir "0.7.9"] [compojure "1.1.6"]] :main
scaffold-app.handler :min-lein-version "2.0.0" :uberjar-name
"scaffolding-app.jar" :plugins [[lein-ring "0.8.10"]] :ring {:handler
scaffold-app.handler/app} :profiles {:dev {:dependencies
[[javax.servlet/servlet-api "2.5"][ring-mock "0.1.5"]]}})
```

In `src/scaffold_app/handler.clj` add `ring.adapter.jetty` to `:use` and bracket

```clojure
(:use [compojure.core][ring.adapter.jetty :as ring])
```

and `-main` to the body where the port will be given to us from Heroku:

```clojure
(defn -main [port] (run-jetty (handler/site app-routes)
{:port (read-string port) :join? false}))
```

At this point you should be able to run `lein run 8080` to start an instance of
the app on port 8080. If this works, you are ready to deploy to Heroku.

Assuming you have git, a Heroku account and the Toolbelt (mentioned at the top
of the post) installed we can deploy to heroku in this fashion: (Remember to
change “scaffolding-clojure” to something else. There is already an app with
that name that exists on heroku.)

```shell
git init heroku apps:create scaffolding-clojure
```

heroku’s `apps:create` adds a “heroku” remote to git.

```shell
git add Procfile .gitignore README.md project.clj src/ test/
git commit -m 'first commit' git push -u heroku master
```

We can open our app with `heroku open` or watch it run with `heroku logs --tail`

In the next post we’ll dive into lib-noir a bit to investigate potential
applications (such as JSON APIs).

[![CBLogo_2014_transparent](http://res.cloudinary.com/diqzbm8lz/image/upload/h_300,w_300/v1428611521/CBLogo_2014_transparent_swcmig.png)](http://res.cloudinary.com/diqzbm8lz/image/upload/v1428611521/CBLogo_2014_transparent_swcmig.png)
````
