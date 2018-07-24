---
title: "Quick Tip: Haskell List Comprehensions"
date: 2013-02-08
url: "/2013/2/8/quick-tip-haskell-list-comprehensions/"
---


I think [list
comprehensions](http://learnyouahaskell.com/starting-out#im-a-list-comprehension)
are my favorite reason to pull out Haskell.

For example: I was recently asked this:

You have a row of 100 school lockers. For each number from 1 to 100 walk down
the line of lockers starting at the beginning, and switch the state of every nth
locker. All of the lockers start closed.

For example:
 we start off at 1 and switch all the lockers to open. (1,2,3,4,5,…)
 we then go to 2 and switch all of the lockers evenly divisible by 2. (2,4,6,8…)
 for 3 we flip every 3rd locker (3,6,9,12,…)
 4 is every 4th locker. (4,8,12,16,…)
 etc.

#### Answer Below This Line

In Haskell this is easily accomplished using a list comprehension.

We can observe through trial (ie: actually flipping every locker) that the
lockers are flipped by their factors. (ie: 6 is flipped by 1,2,3,and 6), so
we’ll write a quick comprehension to give us the factors of a number:

In this example, we get the factors of 6

```haskell
[x | x
```

links:
[[1..6]](http://learnyouahaskell.com/starting-out#texas-ranges)
[modulo](http://en.wikipedia.org/wiki/Modulo_operation)
[mod](http://zvon.org/other/haskell/Outputprelude/mod_f.html)
[`infix`](http://www.haskell.org/haskellwiki/Infix_operator)

Essentially you can read the above code as

```haskell
Give me x where x is [1,2,3,4,5,6] and 6 is evenly divisible by x
```

and breaking it down:

```haskell
Give me x
[x

where
|

x

is
```

We can then realize that if you flip something an even number of times, nothing
changes. This means we're looking for the number with an odd number of factors
because we want the lockers that are open at the end.

The code to determine an open locker will look like this, where factors is the
code we just wrote.

```haskell
length factors `mod` 2 == 1
```

If we stick that in a list comprehension for all numbers [1..100] we have
effectively filtered out all of the open lockers.

```haskell
[n | n
```

But wait! There's more! For the low low price of $19.95 we can realize there's a
pattern in the results. The pattern happens to be perfect squares. This is
because perfect squares are the only numbers with an odd number of factors!

for example:
 9's factors are 1,3 and 9.
 While 8's factors are 1,2,4 and 8

We can now write a far more efficient list comprehension.

```haskell
[x*x | x <- [1..10]]
```

Which can be read as:
 give me x*x where x is [1,2,3,4,5,6,7,8,9,10]

We can also expand this into an function using an infinite list, just in case we
want to calculate how many lockers are open if we have 50081 lockers.

```haskell
let lockers = [x*x | x
```
