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

![editor test](https://d32jwktcm7qojt.cloudfront.net/xgui-demo-audio.mp4)

### The Proof that was in the Pudding

So, yeah, four weeks is a long time, and while I _felt_ sure it would be worth it, there was no way to _know_ that until it was done. Thankfully it was worth it but it didn't click until I went to add a tooltip to an element and it only took one line:

```xml
<Panel id="itemSlot" tooltip="gui_item_slot_tooltip.xml" tooltipData="{.}" />
```

![ability editor](/devlog/xgui-src/ability-editor.png)

All the messy bits that come with detecting whether an element that supports a tooltip has a mouse over it or not and displaying another element depending on that all collapsed into these two beautiful attributes: `tooltip` and `tooltipData`. The backend logic orchestrating the messy bits [migrated to C++](https://github.com/mattschwartz/xgui/blob/main/src/XGUI.cpp#L98-L134).

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

Runtime bindings were another realized gain which allowed a text element to be set dynamically based on game data instead of static strings.

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

It's definitely a far cry from being a proper web framework but it feels like a solid start. I've got all the code hosted in [GitHub](https://github.com/mattschwartz/xgui) along with the XML and Lua code. You can't run it or anything, but if there's any interest I can spin up a simple working demo.