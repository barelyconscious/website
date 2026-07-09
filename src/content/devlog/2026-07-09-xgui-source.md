---
title: "XGUI Source Code"
date: 2026-07-09
excerpt: Hopefully they don't pay me per line of code
tags: [gamedev, script-kitties]
hero: /devlog/xgui-src/hero.png
---

Four weeks ago I decided to invest what ended up being way more time than I anticipated in creating a new GUI engine for Script Kitties, XGUI. It was designed to support faster and easier development of all the GUI screens I'm going to need, which is a lot.

I started working on one of the new screens, an ability editor, to test it out. The ability editor will allow players to change which abilities a creature has available to use in combat from a library of unlocked abilities. The player unlocks new abilities by exploring and completing challenges in the game, such as defeating a number of enemies in combat with fire abilities to unlock Firestorm.

I took XGUI out for a spin and I'm thrilled to say the whole process was an absolute delight. Here's a demo of building that screen, with the editor on the right and the game itself running on the left with hot-reloading:

![editor test](https://d32jwktcm7qojt.cloudfront.net/xgui-src-video.mp4)

### Design-Driven Development

In the software-buildin' business, when you set out to make something that will take many weeks or months to build, that *something* is a risk because you don't _know_ that it will work. You can manage the risk by clarifying the ambiguity, isolating unknowns, building proofs-of-concept, and, ultimately, trusting your gut a little. It takes time to do all of that, but it's good to know if it'll be worth it before you waste time.

For XGUI, I did just that. I started by writing a design document, which is just a fancy name for a markdown file that describes what I want to build and how I'm going to build it. I spent a couple days working it over, putting down examples of the interface and designing rules around what values are possible for each attribute and what those values would mean for the engine's responsibilities. If you've ever read through the instruction manual for a board game, you've read a form of a design document. Both the manual and design documents introduce new ideas and describe precisely how those ideas are supposed to work in practice.

Now, I felt pretty good on day 3, and having a well-rounded design document helped maintain confidence for the next 20ish days. See, software gets built like a 3D printer, going layer-by-layer, setting up foundations before building on top of them. Sure, you test your code along the way so you know each piece is working as it's supposed to, but until that last piece gets built you still don't know the whole thing will work.

Each piece along the way that worked would simultaneously boost my confidence while increasing my anxiety for the final flip when I would test it out end-to-end. Any small mistake nestled deep in the code early on may not be visible until everything's hooked up. And those small mistakes are the most difficult to find during an end-to-end test.

### The Proof that was in the Pudding

With XGUI, since there already existed a functioning GUI engine, the question wasn't just, "would it work?" but "would it work _better_?" And as soon as I went to add a tooltip to an element, I was convinced the answer was yes, it will work better, because all it took was two little attributes on any element that needed to have a tooltip:

```xml
<Panel id="itemSlot" tooltip="gui_item_slot_tooltip.xml" tooltipData="{.}" />
```

![ability editor](/devlog/xgui-src/ability-editor.png)

All the messy bits that come with detecting whether an element that supports a tooltip has a mouse over it or not and displaying another element depending on that all collapsed into these two beautiful attributes: `tooltip` and `tooltipData`. The backend logic orchestrating the messy bits [migrated to C++](https://github.com/mattschwartz/xgui/blob/main/src/XGUI.cpp#L98-L134):

```cpp
if (auto& tt = Hit->Tooltip)
{
    auto View = Hit->GetView();
    auto Model = View->FindInModel<sol::table>(tt->ModelIndex);
    tt->GetView()->SetModel(Model);

    // show only if it has data
    if (Model.valid()) Tooltip = tt;
    else Tooltip.reset();
}
```

Runtime bindings were another material gain which allowed a text element to be set dynamically based on game data instead of static strings.

```xml
<Text id="levelText" text="Lv. {$.selectedCreature.level}" />
```

![bindings](/devlog/xgui-src/dynamic-bindings.png)

Again, [C++ handles the finnicky part about all that](https://github.com/mattschwartz/xgui/blob/main/src/XGUIRuntimeBinding.h#L328-L372):

```cpp
virtual void Apply(const ViewHandle::ScopeContext& Context, FWidget& Widget) const override
{
    if constexpr (std::is_same_v<T, std::string>)
    {
        if (StringTemplate.empty()) return;

        string res;
        bool bOpen = false;
        size_t i = 0;
        for (auto& c : StringTemplate)
        {
            if (c == '{')
            {
                bOpen = true;
            }
            else if (!bOpen)
            {
                res += c;
            }
            else if (bOpen && c == '}')
            {
                if (i >= BindingResolvers.size())
                {
                    return;
                }
                res += BindingResolvers[i++]->Resolve(Context);
                bOpen = false;
            }
        }
        Widget.*Member = res;
    }
    else
    {
        Widget.*Member = BindingResolvers[0]->Resolve(Context);
    }
}
```

In the early days of my career, I worked with a few different web frameworks like Angular, jQuery, Razor, and React. There were things along the way that I liked and didn't like about each, and so I tried to carry forward just the elements I found enjoyable to work with. 

![high praise](/devlog/xgui-src/high-praise.png)

It's definitely a far cry from being a proper web framework but it does what I need for Script Kitties. I've got the XGUI code hosted in [GitHub](https://github.com/mattschwartz/xgui) along with some example XML and Lua code. It's not currently runnable (it expects a simple renderer) but if there's any interest I can get a working demo going.
