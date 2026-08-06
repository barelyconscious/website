---
title: The Battle Pipeline
date: 2026-08-06
excerpt: 
tags: [gamedev, script-kitties]
hero: /devlog/bpipeline/hero.png
---

Last week, the first milestone of the Script Kitties' roadmap was completed and I began working on the second. This milestone coincides with PAX West, which is 29 days from today, and is focused heavily on combat scripting and preparing the game for a limited playtest audience. Now, I already had a fully-functional combat system implemented, so the plan was just to start scripting more abilities to round it out and spend the rest of the month polishing the demo. _This was a solid plan_, I thought, _this will be done so quick, I can even take some time off_.

![this meme is so overused but i still love it](/devlog/bpipeline/oh_buddy.png)

Yeah, so the combat system _worked_ but as it turns out, "fully-functional" only really applied to a small subset of the abilities I wanted to make. I could create abilities that dealt damage, applied effects like buffs and debuffs, and even create environmental hazards like burning ground. It supported biograms (think support gems from Path of Exile) that could split an ability into multiple targets, the environmental hazards would combine on application (fire + water = steam), and debuffs could cause creatures to take more damage (bleeding targets take +50% more damage). That's a pretty good capability set, right? Sounds pretty extensible, right? You could do a lot with that, right? Well, no.

Let's break it down. At a high level, combat engagements in Script Kitties were processed in four incremental steps:

![what is this a TA?](/devlog/bpipeline/v1_flow.png)

Abilities produce _actions_, which biograms/effects modify (like dealing 25% more damage). An action is something like "deal damage". A biogram, being agnostic to the ability's specific code, would see that a damage action has been created and change its damage value to be 25% greater. Unfortunately, there's one major flaw: **actions only flow downstream**. Consider a simple biogram that reduces the AP cost of an ability by 50%. In this approach, the biogram script runs only _after_ the AP cost has been deducted. So you just don't remove AP until after the biogram runs, too, and the problem is solved, right? No, that doesn't work either: if the creature only has enough AP to cast the reduced cost version, the engine cannot tell if the ability is too expensive until after running both the ability _and_ the biogram scripts. This also completely breaks tooltips: how do you know how much an ability will cost before you cast it?

I sat with this realization for a moment and saw two paths ahead of me: I could accept this limitation or I could increase the scope of the work. Accepting this limitation likely meant abandoning the biogram idea altogether because there are so few biograms that fit this narrow implementation. As I've become increasingly aware of scope creep and the risks involved, I did seriously consider this. After all, the most common advice for first-time indie game devs is *start small and just ship games*.

I don't know if it's naivety, arrogance, or faith, but I decided to increase the scope of the work anyway. When I first implemented the combat system and tried it out for myself, I immediately felt the spark of a real game. I had found the fun. If I watered it down, I knew it would negatively impact the entire game and maybe even kill it. The game revolves entirely around combat being fun and, to be fun over long periods of time, it needs depth; and to have depth, it needs a more capable implementation.

So I took a step back and thought about how combat works from the player's perspective. The player chooses an ability, selects targets, casts it, and the targets take damage. This made me realize there were more stages to a combat engagement than I had accounted for (my implementation only covered the last two). In fact, the deeper I dug, the more stages I found. The first stage is actually when the player _considers_ their abilities before choosing one, which requires accurate tooltips. Players need _feedback_ from an ability, which requires animations. Combat also often produces side-effects, like applying a bleed debuff after dealing a critical strike. What it all came down to was: I needed more stages and I needed to break abilities down into components.

And that's pretty much where I am, now. I've come up with the interface that I think I'll need and rewrote a bunch of abilities and effects to stress-test it before starting the actual implementation in C++, which I'd estimate will take another 100 hours or so to complete. So, another week or two and I should have a nice little combat demo.

