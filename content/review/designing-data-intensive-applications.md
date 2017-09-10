---
title: "Designing Data Intensive Applications"
date: 2017-09-09
tags: [data, databases, dist-sys, book]
link: https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321/
---
n
**title** Designing Data-Intensive Applications

**subtitle** The big ideas behind reliable, scalable, and maintainable
systems

**link** [Amazon](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321/)

# Why

#### Why did I read this book?

I'm building a system on Kafka and the biggest issue is going to be
the data coming in and how to process and store it. I also have a
general interest in distributed systems.

#### Why should you read it?

Check out the [website](http://dataintensive.net/) to see what some
smart people have to say about the content.

#### What did I get out of it?

I shored up some of my knowledge around CAP and Linearizability. This
built on knowledge I aquired while interested in Riak (which is also
where I learned about CRDTs, etc) and
[@aphyr's](https://twitter.com/aphyr) Jepsen posts and
[talks](https://aphyr.com/posts/343-scala-days-2017-jepsen-keynote). 

I also got to delve into
[Avro](http://docs.confluent.io/current/avro.html#serialization-and-evolution-avro)
and explore why it's an interesting solution for forward/backward
compatible schemas which is cool because I was kinda wondering what
the [Confluent Schema
Registry](http://docs.confluent.io/current/schema-registry/docs/intro.html#schemaregistry-intro)
was used for.

I also got a lot out of the stream processing and future of data
systems chapters. 

# Review

There are a ridiculous number of references at the end of each
chapter. If you're interested in delving deeper this is definitely a
book you want to pick up and then go through all the references. Oh
and lucky you they keep [an up to date git
repo](https://github.com/ept/ddia-references) with all of the
references for your viewing pleasure.

## Data Intensive

> We call an app *data-intensive* if data is its primary
> challenge--the quantity of data, the complexity of data, or the
> speed at which it is changing--as opposed to *compute intensive*,
> where CPU cycles are the bottleneck

## Structure

The book is structured into three parts. Part 1 is fundamentals, Part
2 is moving from one machine to many, and Part 3 is about derived
data. For me, Parts 1 and 3 were most impactful. A refresher on
fundamentals and the topic of streaming processing.

## Latency

The book starts off by defining terms like *reliability*,
*scalability*, and *maintainability* in Chapter 1. Particularly
relevant is a discussion on using mean vs percentiles for measuring
latency. I find this interesting because it seems to escape a lot of
people even though it has been well known for a long time now.

## Load

From latency, the book moves on to a discussion of load and approaches
for dealing with it like horizontal and vertical scaling.

> An architecture that is appropriate for one level of load is
> unlikely to cope with 10 times that load. If you are working on a
> fast-growing service, it is therefore likely that you will need to
> rethink your architecture on every order of magnitude load
> increase--or perhaps even more often than that.

Chapter 1 is finished off by a discussion of Maintainability in the
context of three design principles: Operability, Simplicity, and
Evolvability. 

## Data Structures

Chapter 2 discusses query languages before leading to Chapter 3, which
is a discussion of data structures behind databases. Specifically, on
log-structured storage engines vs page-oriented storage engines.

## Encoding and Evolution

Chapter 4 was possibly my favorite at this point in the book. The
author turned their eye towards the evolvability of encoding formats
such as JSON, XML, Protocol Buffers, Thrift, and this is where I
learned more about Avro.

## Avro

Avro is a binary encoding like Protocol Buffers and Thrift but has
some interesting properties that allow forward and backward
compatibility. Full compatibility is interesting because it means not
every schema on every service needs to be the same, only
compatible. The idea that the *writer's schema* and the *reader's
schema* don't have to be the same is presented as the key idea of
Avro.

One part of Avro that I really appreciated was that null values had to
be explicitly declared in a union type, rather than having nullable
fields by default. The book also went into use cases for dynamically
generated Avro schemas, say from a relational database export
process. Avro container files include the schema metadata with the
data. 

## Linearizability

Jumping way ahead, the book defines Linearizability and explores what
it means for a system to be Linearizable. This chapter also explores
concepts such as Serializability and shows some nice diagrams for
making the impact of Linearizability explicit.

> The reason for dropping linearizability is *performance*, not fault
> tolerance. 

### Linearizability vs Causal Consistency

Since dropping linearizability is a performance concern, thinking
about strong consistency models and performance is interesting.

> In fact, causal consistency is the strongest possible consistency
> model that does not slow down due to network delays, and remains
> available in the face of network failures. 

There are a few references here that will go on my to-read list: [49,
50, 51, 52,
53](https://github.com/ept/ddia-references/blob/master/chapter-09-refs.md).

Following on the investigation of causal consistency, the book leads
into a discussion on lamport timestamps, generalizing version vectors,
and Total Order Broadcast. This is where we start to dip into
Zookeeper, which uses Total Order Broadcast.

# Stream Processing

Stream processing was the most interesting chapter in the book for me,
other than the discussion of Avro and schema evolution.

## State, Streams and Immutability

The chapter starts off by discussing the potential advantages of using
an immutable log as the source of all events and how that compares to
the typical approach of using the database as the current state of the
world.

Some advantages of using immutability in this way are:

* Audit Logs
* Easier Recovery from buggy, deployed code
* Availability of more information
  - Such as "this person added to cart, then deleted"
* Enabling easier multiple derived views of the central dataset

A really interesting property of creating an architecture using an
immutable log like this is the ability to develop new features which
can use the entire history to retroactively populate information or
run it alongside current systems without affecting performance for the
existing systems.

The book then talks a bit about how separating the form in which data
is written from the form in which it is read can yield a lot of
flexibility. CQRS (Command query responsibility segregation) is
referenced as one possible interpretation of this principle before
going on to talk more about stream processing use cases.

TODO: pick a set of papers from the references to read from this
chapter. 

# The Future

The content of the last chapter surrounds the future of data
systems. It builds on the rest of the book in very interesting ways. I
also really appreciated the final sections on the ethics of building
and using data systems.
