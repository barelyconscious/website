---
title: "Player Feedback"
date: 2026-07-02
excerpt: "The customer is always right"
tags: [gamedev, script-kitties]
hero: /devlog/spotlight-battle/battle_mode_v1.png
---

In the beginning, before I had any real plans for Script Kitties, the battle mode was a simple 1v1 arena with some basic actions: fight, run, use item, and switch out cats. Since the game was called **_Script_** Kitties, I wanted there to be some kind of "scripting" with the abilities. The idea was there were these items called Biograms that you could find in the world which changed how an ability worked. For example, the `Claw` ability augmented with a `Sweeping` Biogram would turn into the `Swipe` ability that hit multiple targets simultaneously. If you've ever played Path of Exile, Biograms are functionally Support Gems:

![poe](/devlog/spotlight-battle/poe.png)

As I was coming up with different kinds of Biograms, I realized that a 1v1 arena could not support my ideas. After all, what's the point of an ability that hits multiple targets when there is only ever 1 target to hit? So in order for Biograms to make any kind of sense, I _had_ to have party-based combat:

![Party-time](/devlog/spotlight-battle/battle_mode_v2.png)

I spent too much time working on the new interface and was getting ready to start polishing it up when my nephew asked to play it. So he did a few rounds of combat and then said to me, "All I'm doing is pressing enter". He had meant that all he had to do was hit _Fight_ (enter), select an ability (enter), select a target (enter), and then do it all over again the next turn. Without exaggeration, this was the most important bit of feedback I ever got.

Now, I'm in a lot of game dev spaces online (obviously), and I see this come up quite a bit where a developer gets feedback and their first reaction is defensive: "Well the player just _didn't get it_". It's understandable, but ultimately it's detrimental. One person in particular stood out to me because when he received the feedback that his tutorial was difficult to understand, he made _an entire video_ blasting the reviewer. I saw the tutorial; the reviewer was right and there were probably many more players who felt the same way.

![Am I so out of touch?](/devlog/spotlight-battle/player-feedback.png)

My nephew was right of course, which meant the combat system needed a rework. I knew it would be a huge investment and I wanted to see how it would look before committing too much time, so I put together a quick animation demonstrating the combat in full 2D as a proof-of-concept:

![Combat v4 prototype gif](/devlog/spotlight-battle/battlemap.gif)

The prototype ended up introducing a lot of concepts that I didn't have in the game yet like action points, visibility, and the terrain itself. I was inspired by games like Divinity: Original Sin 2 which has terrain mechanics that let you light up the ground with electricity and create explosions by mixing fire and poisonous gas. All of a sudden the combat was no longer about _just hitting enter_.

![Combat v4 sample video](/devlog/spotlight-battle/v4-sample.mp4)

Abilities and Biograms gained a great deal of depth as a result because of how many different ways the player could interact with the combat system. Some mechanics that emerged:
1. Positioning: line-of-sight, range, stealth, cover
2. Terrain: movement, area of effects, overlapping terrain effects
3. Action points: resource management, drains and gains

### Scripting

With the increased complexity and unbounded ideas, I needed a way to express the logic more easily. I knew early on I wanted to integrate Lua with the game so I could support mods, and so I started by exposing the combat interface. I used the raw Lua headers to start with because I didn't realize there was a better way until I came across [sol2](https://github.com/ThePhd/sol2). If you're ever looking to integrate Lua with C++, do yourself a favor and use sol2 unless you're a fan of managing the Lua stack by hand. Which I was not.

Anyway, exposing Lua bindings in C++ is dummy easy in sol2. Here I'm defining the `Ability` type:
```cpp
lua.new_usertype<Ability>("Ability",
	"id", sol::readonly_property(&Ability::Id),
	"name", &Ability::Name,
	"sprite", &Ability::Sprite,
	"description", &Ability::Description,
	"shape", &Ability::Shape,
	"tags", &Ability::Tags,
	"maxTargets", &Ability::MaxNumTargets,
	"range", &Ability::Range,
	"radius", &Ability::Radius,
	"cost", &Ability::Cost,
	"hasTag", &Ability::HasTag);
```
which lets you operate on an ability natively in Lua:
```lua
local isHarmful = false
for _, tag in ipairs(ability.tags) do
    if tag == AbilityTag.HARMFUL then
        isHarmful = true
        break
    end
end

if isHarmful then

    if creature.actionPoints < ability.cost then
        return nothing()
    end

    if closestDistance <= ability.range then
        battle:resolveCombat(creature, creature.position, {closestTarget}, attack)
        creature.actionPoints = creature.actionPoints - ability.cost
        return attack()
    end
end
```

My mental model for these bindings is: I don't care how the C++ needs to work as long as the Lua is easy and intuitive. I start backwards with Lua by writing how I would _want_ it to work and then retrofit the C++ code to _make_ it work. I call it customer-driven development: you start by writing code like the customer of your API and then figure out how to make it true.

![my hands](/devlog/spotlight-battle/my-hands.png)

Now, Biograms were especially tricky because of how I wanted _them_ to work specifically. I wanted an interface that could be used intuitively for any possible combination of actions. I came up with a solution using native Lua tables.

By the way, in case you didn't know, EVERYTHING in Lua is tables.

![tables](/devlog/spotlight-battle/tables.png)

In Lua, you might have: `action.actionType = "DAMAGE"` and using sol2, in C++ you can easily read it like a map: `action["actionType"] -> "DAMAGE"`. Because of this fact, creating arbitrarily-shaped object-looking text becomes trivial:
```lua
local damageAction = {
    target = v,
    action = CombatAction.DAMAGE,
    amount = 14,
    damageType = DamageType.FIRE
}
local arenaEffectAction = {
    action = "SET_ARENA_EFFECT",
    position = center,
    shape = self.shape,
    radius = self.radius,
    effect = "BURNING"
}
return { damageAction, arenaEffectAction }
```

And if the ability has a Biogram, the different actions created by an ability's script are modifiable. Biograms act on top of abilities, allowing them to change, remove, and create new actions to be processed. The `Splitting` Biogram, which replicates an ability's damage across multiple targets can be expressed like so:
```lua
return function(self, combat)
    -- figure out how much damage we already did
    local damageActions = combat:getActions(CombatAction.DAMAGE)
    local amount = 0
    for _, v in ipairs(damageActions) do
        amount = amount + v.amount
    end

    -- replicate 66% of that damage to all extra targets
    for _, target in ipairs(findExtraTargets(combat)) do
        target:takeDamage(amount * 0.66, DamageType.TECHNICAL)
    end
end
```

Ultimately, the idea is abilities describe how they function in terms of actions and Biograms have free rein to change those actions before the ability is resolved to create that feeling of _scripting_ abilities in Script Kitties.

#### The Player is Always Mostly Right

So, in the end the takeaway is pretty simple: listen to your players. They may not always know how to fix problems but they're usually pretty good at spotting them. In my case, "the game is boring" was enough to send me on a journey to find the fun.
