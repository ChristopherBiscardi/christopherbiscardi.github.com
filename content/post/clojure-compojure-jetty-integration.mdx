---
title: "Clojure Compojure Jetty Integration"
date: 2013-02-18
url: "/2013/2/17/clojure-compojure-jetty-integration/"
---


If you want to deploy a Clojure/Compojure application you’re going to need a couple hints.

First, in project.clj you’re going to need to add an item to :dependencies and :main.

I have some extra dependencies such as hiccup that aren’t strictly necessary. The ring/ring-jetty-adapter is most important.

under :main write the name of the module that has your (defroutes), we’re going to add a -main function to the same file.

```clojure
:dependencies [[org.clojure/clojure "1.4.0"]
              [compojure "1.1.5"]
              [ring/ring-jetty-adapter "1.2.0-beta1"]
              [hiccup "1.0.2"]]
:main projectname.handler
```

Now in projectname.handler add :gen-class and ring.adapter.jetty to (use).

Lower in the same file, include a new function called -main.
 This is the function java will call to start the server.

In this case my defroutes was named app-routes so that’s what goes after
run-jetty.

```clojure
(ns projectname.handler
 (:gen-class)
 (:use [compojure.core]
       [ring.adapter.jetty]
       [hiccup.core]))

(defroutes app-routes
           (GET "/" [] g/show-home)
           (route/resources "/")
           (route/not-found "Not Found"))

(defn -main [& args]
 (run-jetty (handler/site app-routes) {:port 5000}))
```

That’s it. You should be able to

```bash
lein compile
lein uberjar
java -jar target/whatever-STANDALONE.jar
```
