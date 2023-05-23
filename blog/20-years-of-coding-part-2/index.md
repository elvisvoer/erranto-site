---
title: "20 years of coding (Part 2)"
slug: "20-years-of-coding-part-2"
created: "2023-05-23"
tags:
  - personal
  - programming
  - C
  - C++
  - Avahi
---

As part of my "20 years of coding" anniversary, I have started writing a series
of articles describing my journey as a software engineer and the learnings I've
accumulated so far.

In [the first part](/blog/20-years-of-coding-part-1), I have described how
constraints can be a good thing, how code comments are important, and how
self-awareness can help you overcome your flaws. In this second part, I will
continue my story by sharing my experience getting into the real world.

## Limitations of university projects

Almost all university projects consist of one or more deliverables that need to
be handed over on a certain date. Close to none involve maintaining a (somehow)
complex software project over a longer period of time. Part of it is because
on-boarding students on a more complex project will require too much time which
is not always available in the way we organize our university courses. By the
time the students would become remotely productive at what they do, they will
need to handover their work to the next group of students who probably haven't
even started their new semester yet. Such projects can still exist but they are
normally part of a bigger research project conducted by a research department,
one or more PhD students, or even some bachelors/masters students. The main idea
is that you need some members of the team team with longer tenure who will be in
charge with the overall project direction and with transferring knowledge from
one group to the other.

This "time boxing" limitation deprives you as a student from a number of
real-world scenarios:

- you don't have to read and understand other people code (at least not to the
  same extent as you'd do professionally);
- you don't have to obey code styling and naming conventions;
- you don't have to write as many tests (bye, bye, regression testing);
- you don't have to maintain documentation that gets obsolete;
- you don't have to fight technical debt while still trying to "ship" something.

## Navigating a new codebase

Alright, we are now back in time again, this time in the summer of 2010, when I
started with an internship at a software company called Saguaro Print. I
remember how in my first week they handed me the 700ish mb of source code, on a
USB STICK! I guess it was faster than downloading it. Who knows!?

My first task was to write a "toString" method in all the printer controller
classes for logging purposes. "You'll basically need to serialize every object
and your code cannot crash the app, it would be ridiculous for the logger to
crash it", those were basically my instructions. Yeah, no pressure, Elvis! And,
oh Lord, C Plus Plus...C++... There's C, and there's C++. I don't want to start
a war, but damn, operator overloading doesn't sit very well with beginners,
especially not when it's all over the place and you stare at some `while` loops
"ca mâța în calendar" (Romanian saying that translates to "starring like the cat
at the calendar", don't ask).

A few weeks in, my manager (and head of the department) checks in with me during
lunch to see how I am progressing on the code: "So, Elvis, how is it going?".
"Oh well, I am staring at a `while` or `for` loop for half an hour before I get
what is going on inside it". He smiled and said something like "That's quite
normal, this is not the easiest code you come around and what's important is
that you take the time to figure it out.". His answer really took me by
surprise. I was embarrassed by my lack of understanding the code and I had way
too big expectations of what it takes to navigate a new codebase. With just a
few words he made me feel relieved of that self-pressure and he restored my
confidence.

This is one of the first lessons I have been carrying with me over the years. It
is a lesson about influence and how important it is for a junior engineer to
receive encouragement from more senior folks. Self-confidence can greatly
accelerate someone's growth and it is vital that we foster it whenever possible.
As I became more and more senior, I have tried to walk my in manager's shoes and
be that influence for my younger colleagues (hopefully, I have sometimes
succeeded).

## "There is no 'main'"

_(This story always makes me smile thinking back at my own naivety)_

Once I've completed my internship, I have joined Saguaro's Network Team as a
Junior Engineer. The team was responsible for integrating the printer in an
organization network by supporting DHCP, service discovery, Active Directory,
file transfer over FTP, and more. The position was a perfect match because I was
in love with computer networks and I was about half way through Douglas E.
Comer's [Internetworking with TCP/IP Vol.1: Principles, Protocols, and
Architecture](https://www.amazon.com/Internetworking-TCP-Vol-1-Principles-Architecture/dp/0130183806)
book (yes, we were learning new things from books back then).

This time I was tasked to integrate [Avahi](https://www.avahi.org/) in our stack
and publish the printer services using mDNS. As you can imagine, the learning
curve on this task was quite steep, especially around the [Event Loop
Abstraction](https://www.avahi.org/doxygen/html/index.html#event_loop) and
multithreading.

Luckily, there are some nice
[examples](https://www.avahi.org/doxygen/html/examples.html) included as a good
starting point, and after spending some time to get a grip of the API and how
things work, it was time to integrate my code in our stack. I put together the
bare minimum needed and submitted it to my team leader for an initial review.
Just like the examples, my code also included a `main` function.

I remember that I've received a great amount of feedback but one particular
interaction was priceless: the `main` function was highlighted with a message
reading "there is no 'main'". My brain went straight into confusion mode so I
asked back "what do you mean there is no 'main'?". The explanation was so simple
that I had facepalmed myself after reading it. It went something like this:
"your code won't have the 'main' function because that sits somewhere else. You
are already used to splitting your code in individual modules that are compiled
separately and linked afterwards. That is exactly what will happen here, your
code will be compiled as a shared object or static library and will be called
when needed".

That explanation made a lot of sense, I was no longer in control of the entire
system as I used to be in university projects, but rather only a small portion
of it. However, it did raise another question "how does everything integrate?"

## Understand the bigger picture

I took that question to my team leader and asked him if he can give me an
overview of how the printer works and how my code integrates in the bigger
picture. He got very excited and we ended up spending 2-3 hours in front of the
white board where he showed me the architecture and how different components
interact with each other.

This was by far the best question I've asked until that point. Zooming out and
having an overview of how everything works helped me understand how my code fits
in the bigger picture and it gave me a sense of "direction", I could now
understand what role it plays and what is expected from it.

Oh well, that didn't prevent me from getting into some nasty deadlocks, but
multithreading is not easy, especially for a beginner.

_This marks the end of the second part of this series. In the next part, I will
be covering my way of working and why I rarely use a debugger. Stay tuned!_

/Elvis
