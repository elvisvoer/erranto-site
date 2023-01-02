---
title: "Erranto v1.0.0"
slug: "erranto-1-0-0"
date: "2023-01-02"
tags:
  - erranto
  - programming
  - "2022"
---

What a year it has been, but on that later! For now I am excited to say that
my little project has reached an important milestone. Erranto is now at version
~v1.0.0~v1.1.0 (fake news, I already added some improvements).

## The idea

If you've just landed on this page, let me tell you what's up. Erranto is meant to
be my online face to the world, last year I've been doing some [social media cleansing](/blog/social-media-cleansing)
and I've decided to finally have my own website where I can blog and also do some coding
experiments.

## Using Gatsby

First and foremost I needed a blog, one that I can simply use without being distracted
from writing. I think I've nailed it when I [chose](/blog/so-far-so-good/) to use [Gatsby](https://www.gatsbyjs.com/)
for this purpose. Writing is as easy as setting up a few[^1] _frontmatter_ YAML tags and then
have the full power of markdown and React at your finger tips to write whatever comes to mind.

### Data layer

Gatsby has a powerful GraphQL-based feature called the data layer[^2] that you can use to pull
data into your site from anywhere. Anywhere includes the file system, which is very convenient!
With the use of `gatsby-transformer-remark`, I could store my blog posts in a separate folder as
markdown files and host them along-side the source code. Pretty neat, that's a serverless site.

Sometimes, the most entertaining part is the comments section. Adding one is easy, there are
plenty of solutions out there. Well, I was already using Github for my blog posts data so it
made sense to try and do the same with the comments. A quick search and I found [Gitalk](https://github.com/gitalk/gitalk), but that's not very secured, so the only option left was to find an app-based solution or to write my
own Github app. Luckily, I found [utterances](https://utteranc.es/) and I didn't have to reinvent the wheel.
Yey, still serverless!

### The View

Blog post pages are created using a React template file that combines the markdown with other elements
such as layout, metadata, and a comments section. I have been using React for the past six years, so adding
theming and light/dark color modes was a breeze. I also made some layout adjustments and simplified some
components since the [last update](/blog/so-far-so-good). One grate feature is the implementation of tags,
which utilizes the page context to pass variables to the tag's page GraphQL query, resulting in the generation
of dynamic pages for each blog post tag.

## What's next

So far, Erranto is a pretty simple blogging website but I am quite excited with the results. Now that I reached
the first "stable" version, I can focus on writing and other projects, and only do small changes when needed.

/Elvis

[^1]: This article _frontmatter_ tags:

    ```YAML
        ---
        title: "Erranto v1.0.0"
        slug: "erranto-1-0-0"
        date: "2023-01-02"
        tags:
          - erranto
          - programming
          - "2022"
        ---
    ```

[^2]: [Gatsby's GraphQL Data Layer](https://www.gatsbyjs.com/docs/reference/graphql-data-layer/)
