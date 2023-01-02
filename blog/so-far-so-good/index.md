---
title: "So far, so good"
slug: "so-far-so-good"
date: "2022-12-18"
tags:
  - programming
  - erranto
---

Alright! A couple of afternoons and evenings spent on this project, and it already
starts to look pretty decent. Let's dive into what I have got so far.

## The idea

The idea behind Erranto is to create a playground for experiments, writing, and teaching.
As mentioned in my [previous post](/blog/number-47), a great source for inspiration was
using Bash to create a little "slideshow" app for teaching how to code. Another source
has been Jack Crenshaw's [Let's Build a Compiler](https://compilers.iecc.com/crenshaw/)
course, from where I got the idea of using a simple "Copyright Notice" footer.
Put these two together, and you end up with an "80s vibes" terminal-like layout.

## The technology

The technology choice has somehow been the easiest part. I didn't want to
use Wordpress or any CMS alike, and building something from scratch was a no go.
Instead, the best choice was to go for a static site generator and slowly add
functionality as I see fit.

There are a dozen static site generators out there, but the two most popular
are [Jekyll](https://jekyllrb.com/) and [Gatsby](https://www.gatsbyjs.com/).
I have heard only good things about Gatsby in the past, and it somehow felt
easier to start with, so I gave it a go. Following [this tutorial](https://www.gatsbyjs.com/docs/tutorial/)
was enough to get a basic blog site up and running in no time.

Now the only question left was "where should I host it?". It is a static
website, so there are a few great choices to pick from:
 - use Github Pages
 - use a simple CDN provider
 - use some other cloud solution
 - self-host it

I didn't want to spend much time on this decision because it has a low risk.
I can always change the provider and move my static pages somewhere else.
So, for simplicity, I chose to use the free tier of Gatsby Cloud provider.

Deployments are as simple as pushing a commit to `main`, so I've already been
pushing changes a few times a day (continuos delivery, ftw!). So far, so good,
`git` and Github for deployments, and Gatsby Cloud for hosting.

But wait, no software is complete without some form of monitoring!

Gatsby Cloud Dashboard provides a great way to monitor your builds and to revert
to a previous one if needed, but that is still only one side of the equation.
What about usage?

For getting page views and other usage metrics, I wanted to go for a cookie-less solution,
so I don't have to "install" the cookies banner. I find most of the cookies banners to be
annoying and a huge UX loss (not like my website is very UX focused :D).

After a bit of research, I ended up looking at [running Umami on Railways](https://umami.is/docs/running-on-railway).
The "one-click" deploy button didn't do the trick for me. For some strange reason, 
the Postgres instance was running, but the actual Umami app wasn't getting any deployments.

I then tried running it from a forked repo as indicated by the docs but that didn't go well either.
The build was failing due to [this issue](https://github.com/umami-software/umami/pull/1708), so I went
ahead and created a PR with a fix and managed to finally get my page tracking app running.

Even with the fix in place, if you are as cheap as myself, you'll have another problem.
Running on a free Railway plan means that the app could go to sleep, so page tracking will be lost
until the app manages to boot-up. Damn it, and I thought I had it!

Luckily, Umami is working on a cloud solution so you can sign up for their [Beta program](https://cloud.umami.is/signup)
and use the app for free. For the time being, this seems to be a reasonable choice. If I get some
time, I might give writing an analytics app a go, you never know.

## What's next

This project has been pretty fun so far and it already accumulated 59 commits (60 with this post).
Here are a few things I will be working on in the near future:

- add categories and tags to blog posts
- small layout adjustments
- fix broken `/blog` page
- prevent tracking `localhost` pages.

/Elvis