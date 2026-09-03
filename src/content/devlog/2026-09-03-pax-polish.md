---
title: PAX Polish
date: 2026-09-03
excerpt: v0.1.0
tags: [gamedev, script-kitties]
hero: /devlog/pax-polish/hero.png
---

Tomorrow, September 4, kicks off PAX West, one of the largest gaming festivals in the world, where tens of thousands of people will gather in Seattle to meet gaming celebrities, attend panels, playtest new games, and meet other fans. It also marks the first major milestone for Script Kitties: a playable demo. And in preparation for that demo, I've spent the last two weeks stuck inside an entirely new phase of game development: _the polish phase_ where I would start up Script Kitties, play for 2 minutes until I found a bug or some jank, fix it, then do it all over again. I created an entirely new roadmap just to keep track of all the small things that I wanted to address before PAX. This might sound tedious, but there's something deeply rewarding about smoothing the rough edges and seeing something real shining through. 

I already had a plan for what I wanted to get done in this phase, but most of it meant adding more stuff. Instead, what I ended up doing was essentially removing a lot of stuff. Script Kitties' code base is over 2 years old now and a lot of ideas and implementations have come and gone, but pieces of them are still lying around in dead code and broken menus. And the rest of the time was spent finishing up parts where I had stopped halfway through before, like the Game Over screen, which was nothing more than a little `todo` in the code. 

The next thing that had to be done was the font. I was using an old bitmap font that I was scaling incorrectly which caused a stretched appearance that made it pretty difficult for most people to read. Fixing the scaling bug immediately made a huge difference:

![alt](/devlog/pax-polish/font-cmp-1.png)

For some reason, though, it still bothered me so I went on a hunt for a new font. In the past, I've relied on [DaFont](https://www.dafont.com/), but the licensing restrictions wouldn't support a commercial game, so I went and created my own font using this [pixel font maker](https://yal.cc/tools/pixel-font/) tool, which improved the readability even further:

![alt](/devlog/pax-polish/font-cmp-2.png)

But by far, the thing that took the most time was the title screen. I planned on hiring an artist long-term, so at first I just threw something together and figured that'd be good enough since it's just a little demo. But the feedback I got was so strong that I invested another 20-30 hours into it, ultimately going from this:

![alt](/devlog/pax-polish/title-old.png)

to this:

![alt](/devlog/pax-polish/hero.png)

### How Can I Play the Demo?

The first thing I wanted to do was make the demo available on web, so players wouldn't have to fumble with downloading something that Windows would flag as malicious. Surprisingly, this was the easy part thanks to [Emscripten](https://emscripten.org/). Creating a page on itch.io was also really straight-forward, but when I got to the button to publish my page, I stopped. 

