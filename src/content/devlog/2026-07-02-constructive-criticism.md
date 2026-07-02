---
title: "Player Feedback"
date: 2026-07-02
excerpt: "The customer is always right"
tags: [gamedev, script-kitties]
hero: /devlog/spotlight-battle/battle_mode_v1.png
---

In the beginning before I had any real plans for Script Kitties, the battle mode was a simple 1v1 arena with some basic actions: fight, run, use items, and switch out cats. Since the game was called **_Script_** Kitties, I wanted there to be some kind of "scripting" with the abilities. The idea was there were these items called Biograms that you could find in the world which changed how an ability works. For example, the `Claw` ability augmented with a `Sweeping` Biogram would turn into the `Swipe` ability that hit multiple targets simultaneously. If you've ever played Path of Exile, Biograms are functionally Support Gems:

![poe](/devlog/spotlight-battle/poe.png)

As I was coming up with different kinds of Biograms, I realized that a 1v1 arena could not support my ideas. After all, what's the point of an ability that hits multiple targets when there is only ever 1 target to hit? So in order for Biograms to make any kind of sense, I _had_ to have party-based combat:

![Party-time](/devlog/spotlight-battle/battle_mode_v2.png)

Anyway, I spent a lot of time working on the new interface and was getting ready to start polishing it up when my nephew asked to play it. So he did a few rounds of combat and then said to me "All I'm doing is pressing enter". He had meant that all he had to do was hit _Fight_ (enter), select an ability (enter), select a target (enter), and then do it all over again the next turn. Without exaggeration this was the most important bit of feedback I ever got.

Now, I'm in a lot of game dev spaces online (obviously), and I see this come up quite a bit where a developer gets feedback and their first reaction is defensive: "Well the player just _didn't get it_". It's understandable, but ultimately it's detrimental. One person in particular stood out to me because when he received the feedback that his tutorial was difficult to understand, he made _an entire video_ blasting the reviewer. I saw the tutorial; the reviewer was right and there were probably many more players that felt the same way.

![Am I so out of touch?](/devlog/spotlight-battle/player-feedback.png)

My nephew was right of course, which meant the combat system needed a rework. I knew it would be a huge investment and I wanted to see how it would look before committing too much time, so I put together a quick animation demonstrating the combat in full 2D as a proof-of-concept:

![Combat v4 prototype gif](/devlog/spotlight-battle/battlemap.gif)

The prototype ended up introducing a lot of concepts that I didn't have in the game yet like action points, visibility, and the terrain itself. I was inspired by games like Divinity: Original Sin 2 which has terrain mechanics that let you light up the ground with electricity and create explosions by mixing fire and poisonous gas. All of a sudden the combat was no longer about "just hitting enter". Biograms also gained a great deal of depth because of how complex the battle system had become. 

![Combat v4 sample video](/devlog/spotlight-battle/v4-sample.mp4)

And so the obvious conclusion to this is: listen to your players.
