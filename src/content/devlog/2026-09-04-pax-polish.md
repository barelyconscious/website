---
title: PAX Demo
date: 2026-09-04
excerpt: Launching Demo Version 0.1.0
tags: [gamedev, script-kitties]
hero: /devlog/pax-polish/pax-hero.png
---

Today kicks off PAX West, one of the largest gaming conventions in the world, where tens of thousands of people will gather in Seattle to meet gaming celebrities, attend panels, play games, and meet other fans. It also marks the first major milestone for Script Kitties - a playable demo. For the past two weeks, I've been working on that demo, squashing bugs and polishing the rougher edges. Surprisingly, a lot of time was also spent _removing_ stuff. The Script Kitties code base is over two years old at this point and has gone through a few different iterations and implementations. Some ideas  were no longer part of the game, but the code had stuck around. I also found some parts of the game I thought existed which turned out to be missing: the entire "Game Over" sequence was just a little `todo` sitting there.

Most of this time, however, was spent improving the new player experience. I wanted to focus on the first minute of Script Kitties, before the actual gameplay even starts. I began with the very first thing the player would see - the splash screen - and tried to rush it just to throw something out there and move on to what I felt was more important.

![The old unimaginative title](/devlog/pax-polish/title-old.png)

I had hoped I could get away with something quick, but when I polled my friends it was clear that I couldn't use this. So, I took their feedback and came up with something that I felt painted a better picture of the experience the player would get:

![The new, presumably better, title](/devlog/pax-polish/title-new.png)

The next thing I turned my attention to was the font. I was using an old bitmap font that was scaling incorrectly, which caused a stretched appearance that made it difficult for most people to read. So I went on a hunt for a new font. In the past, I've relied on [DaFont](https://www.dafont.com/), but the licensing restrictions wouldn't support a commercial game, so I created my own font from scratch using this [pixel font maker](https://yal.cc/tools/pixel-font/) tool.

![font example 1](/devlog/pax-polish/font-cmp-2.png)
![font example 2](/devlog/pax-polish/font-cmp-3.png)

Lastly, I began a round of balancing the creatures, abilities, and items by adjusting stats and damage numbers. I studied two of the main games that inspired Script Kitties - Pokemon and Divinity - to get an idea of what values to use. That helped me get started, but it's clear that this is going to require a ton of iteration. For now, I'm thinking in simple terms like, "How many hits should it take to kill this enemy?" and "How many enemies should it take to level up?", but I think that these are naive questions, and I'll be researching this topic deeper. For now the demo is available in a proof-of-concept state where things (should) work, but they may not always feel right.

### How Can I Play the Demo?

Right now, the demo is hosted on my website [here](/script-kitties) and playable in your browser. Eventually, it will be available on itch.io once I clear a few more hurdles.
