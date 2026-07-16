---
title: Custom Game Engines
date: 2026-07-16
excerpt: Why You (Probably) Shouldn't Write Your Own Game Engine
tags: [gamedev, script-kitties]
hero: /devlog/bespoke-engine/bespoke.png
---

Last week I wrote about my new XGUI implementation that I had been working on for the last month. I had put together an Ability Training screen in a couple hours and it was a very smooth process overall and things seemed to be going well. So I took some time off, played some games, and then came back and saw the memory profile had climbed from about 155 MB to over 1 GB even though I was only rendering ~60 static elements on screen. XGUI was allocating about 300 KB of memory **per second** while doing nothing.

![bad sign](/devlog/bespoke-engine/bad-sign.png)

I was using smart pointers everywhere in C++, and I was able to correlate every constructor to a destructor call, so I started looking at Lua. Like most modern languages, Lua is garbage-collected, which just means for the most part it manages its own memory. You ask Lua for a new object and Lua takes care of creating and keeping track of it, including knowing when it's no longer needed and can be deleted (garbage collected). Garbage-collected languages make it seem like you never have to care about memory ever again. You can create as many objects as your heart desires and no one will stop you... until the garbage collector pauses your entire program to remove all the junk you made and now your game freezes every 4 seconds.

Having come from a primarily Java background, I wasn't sure where to start so I brought in Claude and asked it to "_review these C++, XML, and Lua files and find out why we're seeing 300 KB/sec in Lua allocations_". After it "dug into the files instead of guessing" and "had the full picture", it managed to find a couple of optimizations that helped bring the allocations down all the way to 3 KB/sec. Pretty good, I told Claude, but there's still a leak. Claude then assured me that we had made great progress and 3 KB/sec is really not that bad so we can stop now. _The hell we can_, I said, and decided to press on and ultimately found out the cause of the allocations was a clever little bit of code.

#### The Clever Little Bit of Code

I'm using `sol`, which is a C++ library that makes working with Lua simple, and one of the things it does really well is that it seamlessly integrates its type system with C++ types. It basically handles the conversions between an int, a string, and a table with a simple assignment (`=`) operation. Mainly, this is used for converting a known type from a Lua result into a known C++ type, like extracting the numerical result from a Lua function.
```cpp
sol::function_result Result = lua.do_file(Filepath);
int ResultInt = Result; // <-- sol converts `sol::function_result` to `int` seamlessly
```

In Lua, everything is a table, and through `sol`, you can access keys in a table like a standard map:
```cpp
sol::table Table = lua.do_file(Filepath);
int Status = Table["status"]; // <-- retrieve the `status` field from the table
```

And I mean everything in Lua is a table. Dictionaries, of course, and arrays, and objects. And importantly for our story, _C++ defined types_ are tables, too. If you had a Creature `class` with the `Name` field, you could access it like this with `sol`:
```cpp
lua.new_usertype<Creature>("Creature", "name", &Creature::Name);
sol::table MyCreature = new Creature(...);
std::cout << "Creature's name is " << MyCreature["name"] << std::endl;
```

So putting all this together, you can make pretty simple routing logic that seamlessly crosses between C++ and Lua objects in just a few lines:

```cpp
// Lookup->Path is a vector of strings
sol::object Res = RootTable;
for (; i < Lookup->Path.size() && Res.is<sol::table>(); ++i)
{
    const string& P = Lookup->Path[i];
    Res = Res.as<sol::table>()[P];
}
```

This functionality was critical because of runtime bindings in XGUI, a capability which allows you to create, for example, a text element that always displays the health of a creature in a single line of XML:
```xml
<Text text="{$.creature.stats.health}" />
```

And those bindings can be attached to Lua or C++ objects or even a mixture of the two. `{$.tooltipData.creature.name}` renders the `name` (string) of the `creature` (C++ pointer) field stored on `tooltipData` (Lua table). All of these types can be boxed into a `sol::object` and if it can also be boxed into a `sol::table`, we can access its fields dynamically at runtime.

Anyway, this clever routing logic is what was causing the persistent 3 KB/sec memory leak. At this point in time, I was looking at a memory leak I didn't fully understand and it was impacting one of the core reasons XGUI even exists. If this feature wasn't there, XGUI really didn't make sense as a 4 week investment.

#### Making Your Own Game Engine

If you ask anyone in the indie gamedev community which game engine you should use to make a game, you'll get a bunch of different answers. Unity, Godot, Love2D, etc. But there's always one answer you'll get consistently: "don't make your own game engine". It's good advice and when XGUI failed, I started to reconsider my decision to make my own game engine. I was spending all this time working on a framework for the game rather than the game itself. This was day 3 of debugging and it felt like I was genuinely stuck on this memory leak. If I couldn't solve it, I felt like I'd have to abandon the engine.

Then I remembered that I've never _not_ been able to solve a problem so why should this one be any different?

![better](/devlog/bespoke-engine/better.png)

So I just got back to work assuming I would figure it out.

#### The Answer is Always Caches

I pressed Claude some more to dig into this problem, focusing on that block of code in particular and it started searching the `sol` include files I had downloaded as well. It pointed out that when it comes to _userdata_ specifically (ie, the C++ objects), `sol` boxes the C++ data into a freshly-allocated Lua object every time you create a new reference to that object (which in C++ looks like `sol::table Table = OtherTable`, where the `=` is invoking the copy constructor on `sol::table`). And I'm doing that a _lot_ since the runtime bindings are updated every frame. I wasn't completely convinced Claude was correct here; LLMs hallucinate constantly, after all. But, I proved it was right by adding a gate to prevent userdata from being dereferenced through `sol` and the Lua allocations immediately dropped.

One of the most important skills for a software engineer is the ability to break down problems and abstract them. A lot of problems have already been solved and many unique problems are really just solved problems wearing a different hat. On the surface, my problem was "how do I stop invoking the copy constructor?", but put a different way, the problem was really: "I need a way to access data _without repeating unnecessary work_". A cache solves that problem by doing the work once and keeping the result for next time. So I implemented a cache. 

I would allocate the Lua reference once, store it in the cache, and the next time I need to find that reference I just return it from the cache instead without an additional allocation. For the cache key, I treat the runtime binding (eg, `$.tooltipData.creature.name`) as a route and each _hop_ in the route is cached: so for our example, there would be an entry for `$`, `$.tooltipData`, `$.tooltipData.creature`, and `$.tooltipData.creature.name`. As a result, the Lua allocations finally dropped to 0 KB/sec while idling, and incidentally, the frame time was reduced by 50% (4ms -> 2ms for 670 elements on screen).

#### Conclusion

Even though I managed to solve this particular problem, I know it won't be the last bug. I know that it takes a lot more time to work in a custom game engine because you have to reinvent features that are ready-to-use in commercial game engines. And I know that this is time taken away from making content for the game. So why do I persist? Honestly, because I choose to. 

![persistence](/devlog/bespoke-engine/persistence.png)

One piece of advice that's stuck with me for years is _write what you know_. Since I know programming a lot more than I know art and music, I'm focusing on that for Script Kitties and a custom game engine is the perfect playground. I don't know how that will translate to success, but at this point the only one who can stop me is me.
