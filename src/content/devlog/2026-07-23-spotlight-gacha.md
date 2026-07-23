---
title: "System Spotlight: Creature Collecting"
date: 2026-07-23
excerpt: "How to collect cats in Script Kitties"
tags: [gamedev, script-kitties]
hero: /devlog/spotlight-gacha/hero.png
---

In the beginning, catching cats in Script Kitties would involve using an item, like tossing a Pokeball at a Pokemon. I had always planned on changing how you caught cats, but struggled to think of an engaging mechanic to replace it. My idea was that fighting cats would give you points and once you fought enough of them, you could trade the points in for that cat. So, fight 10 CaliGOs and get 1 free. This removed what I found to be a frustrating part of the Pokeball system: weakening a creature before you can catch it.

But when Pokemon Legends: Z-A replaced the weaken component by offering the player a chance to catch the Pokemon after it faints instead, it arguably weakened the system. Removing the friction that existed when players had to weaken a Pokemon for a better chance at catching it streamlined the experience, but that gameplay element was a deliberate part of catching them which was no longer there. It left a gap that wasn't filled.

The point system I had come up with would also lessen the feeling of finding rare creatures. Finding a rare Pokemon is an exciting moment. I wanted to preserve this feeling and I wasn't sure a point system could. A player determined to obtain a Bitlynx would be thinking "I just need to find 10 more and I'll have it". But I wanted a system that would delight players with moments of surprise. Like that sudden dopamine hit when finding rare loot.

When I started to focus on that part specifically, I realized what it was. It's a gacha game.

![gacha 1](/devlog/spotlight-gacha/sk-gacha-1.png)

During Covid, I got into Magic (the card game, not the wondrous acts performed by wizards). The game itself was fun, but what I _really_ liked was buying and opening packs. Pulling an $80 card after spending $100 on packs just hits different. So I knew the TCG formula had exactly the kind of chase I was looking for in Script Kitties. 

![mtg](/devlog/spotlight-gacha/mtg-collection.png)

I got started and came up with the two main design requirements for the system. First, it must have longevity. It's something the player will keep engaging with over the course of the entire game. Second, it needs to be rewarding. The player should _want_ to keep buying and opening more and more packs. 

I looked into the game theory and found an article, a sort of postmortem, on how one mobile gacha game failed while the other succeeded. The main takeaway was that a good gacha game knows how to manage its content; the heroes and items and whatnot that you can pull, and how often they appear. This got me thinking about the longevity requirement; the mechanic needs to be relevant throughout the entire game, which means we can't have the player exhausting all the cards within a few hours. The article pointed to several levers I could tweak like the number of slots per pack and drop chance of rare creatures, but regardless I knew I was going to run into a content problem.

![sk gacha](/devlog/spotlight-gacha/sk-gacha.png)

At the same time, I was working on fleshing out two other ideas: DLC and Ability Challenges. You'd buy these DLC packs (with in-game currency) that would allow you to catch new creatures, unlock new abilities and gain access to new areas with new shops and items. Once the gacha idea came to me, I immediately scrapped the DLC idea, and I was honestly happy to. It was so hard to explain the DLC system because people think of _paid_ DLC which I was worried would turn into bad marketing. 

Ability Challenges were a component in ability training. DLC would give you access to new abilities but before you could train your cats to use them, you'd need to complete a challenge. For example, you'd buy a DLC that allowed you to learn the Firestorm ability but before you could use it, you'd need to cast Fireball on 10 enemy cats.

![ability trainer](/devlog/spotlight-gacha/sk-ability-trainer.png)

Initially, I was thinking the gacha system would be _only_ for cats, since the system was meant to replace how to catch them specifically. But if I wanted to make the system long-lasting, I figured I would need way more cats than I could realistically make by myself. I also thought about how to handle duplicate drops. There are recycle systems, but if most of the engagement with the system is buying cards to trash them, it would quickly turn into a currency exchange simulator. So I took a look at other things to include in the packs: abilities and biograms (items that modify abilities).

Since I was scrapping the DLC system, which was what gave the player abilities, moving them to the gacha system was an easy decision. I also hadn't quite figured out how the player would acquire biograms, either, so this ended up solving that problem too. 

#### How it works

![the whole thing](/devlog/spotlight-gacha/full-page.png)

Now we'll get into a bit of the technical stuff. First, another shout-out to [XGUI](https://github.com/mattschwartz/xgui) and hot-reloading for not making my life miserable in GUI land. I needed to make three screens for this system and manage a ton of state and I'd say about 90% of the work was done solely through the drag-and-drop visual editor:

![workflow](/devlog/spotlight-gacha/workflow.png)

I modeled the gacha system in terms of `season`s and `pack`s. A `season` is a group of abilities, biograms, and creatures that belong to a themed draw pool. A `pack` assigns `season`s to draw `slot`s so each slot can have a different pool. Each `slot` has assigned weights, both for the `season` from which draws are pooled and from rarity, assigned to each ability, biogram, and creature. All of this allows us to express, for example, that slot 1 will pull a _common_ creature from _season 1_ while slot 8 might pull a _rare_ creature from _season 2_.

![pack slots](/devlog/spotlight-gacha/pack-slots.png)

In the GUI, I wanted the player to be able to see the entire draw pool before they bought or opened a pack, which meant I needed to iterate each slot in a pack to figure out which season it came from and then look at each season's draw pool. Packs will have 8-12 slots and will only reference a handful of seasons, so this is a fairly low `n` but still makes for an `O(n^2)` operation (or `O(n^3)` if you're really lazy):

```cpp
for (Slot : Pack.Slots) {
    for (Season : Slot.Seasons) {
        // tip: store the season IDs in a separate vector and iterate it sequentially
        // to go from O(n^3) -> O(n^2)
        for (Draw : Season.Draws) {
            DrawPool.add(Draw)
        }
    }
}
```

Any time I see `O(n^2)`, I think cache. And that's what I did here too. When I'm loading season and pack data during initialization, I also go ahead and do this operation exactly once per pack and store the draw pools so that the `O(n^2)` operation becomes `O(1)` at runtime.

```cpp
unordered_map<string, vector<shared_ptr<FKittypackDrawItem>>> DrawPoolsByPackId;
```

I then fleshed out the Lua API to expose the gacha system to Lua and then built the actual screens using data from those APIs. One of the more interesting implementation decisions I had to make during this was how to handle state when the player opens a pack. 

![draw card](/devlog/spotlight-gacha/draw-card.png)

Opening a pack requires some coordination and there are a few rules like you can't open a new pack when you have one already open and that the player can't draw the same slot twice. I created a data structure to model the state for opening a pack, which is simply: is a pack open currently and if so, which slots have been drawn? 

```cpp
enum class EDrawItemType { Ability, Biogram, Creature, };

struct FKittypackDrawItem
{
	string Id;
	EDrawItemType Type;
	string Name;
	string Sprite;
	string Description;
};

struct FKittypackPulls
{
	vector<shared_ptr<FKittypackDrawItem>> Results;
};
```

I expose this structure to Lua but I fully lock modification to this structure behind the API. Lua can freely read it, but in order to actually pull a card, Lua has to go through a protected controller function:

```cpp
FKittypackDrawItem* KittypackController::DrawCard(int SlotNumber) const
{
	auto& Pull = GameManager::Only().CurrentPull;
	auto& Kittypacks = DataTables::Only().KittypackDataTable;

    // slot already drawn
	if (Pull->Results[SlotNumber]) return nullptr;

	auto Kittypack = Kittypacks->GetPack(Pull->KittypackId);
	auto DrawPool = Kittypacks->GetDrawPool(Kittypack->Id);

	auto& Draw = GetRandomCard(DrawPool);

	Pull->Results[SlotNumber] = make_shared<FKittypackDrawItem>(*Draw);
	
    return Pull->Results[SlotNumber].get();
}
```

#### Conclusion

All things considered, the gacha system was rather straightforward to implement once I had the core data structures in place. I'm really excited to take a stab at balancing it, but that'll be for a later phase of development. For now, I'm going to move on. I'm taking a breadth-first approach, building out a skeleton of the game first so I can feel the core gameplay loop and do any tweaks before going deeper into each system. One of the traps I've fallen into before is going deep on one system only to find out it doesn't work with the others and having to fundamentally change it.

Oh, also here's a new mini showcase of Script Kitties' features so far:

![trailer](https://d32jwktcm7qojt.cloudfront.net/sk_trailer.mp4.mov)
