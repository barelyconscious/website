---
title: "Script Kitties Roadmap"
date: 2026-06-18
excerpt: "Building roadmaps and how to manage them"
tags: [updates, gamedev, script-kitties]
hero: /devlog/script-kitties-roadmap/hero.png
---

Over the past week, I spent time reflecting on all the things that I want to include in Script Kitties. There are milestones with dates and work to be done for each. You can review it here: [ta-da](/script-kitties/roadmap)! I'm tracking three specific dates leading up to Steam Next Fest 2027: Playtest (8/1/2026, core capabilities implemented), PAX West (9/4/2026, working demo), Steam Next Fest (6/1/2027, stable demo). When the Playtest milestone is completed, you will have the chance to try it out yourself (more details to come).

That's really all I wanted to tell you. Anyway, if you're still here I guess I can talk about how I build roadmaps in case that's something you're interested in.

### How to build a roadmap

I've built and maintained SWE roadmaps for the last two years of my career so I'm not new to this. When you come right down to it, a roadmap is really just a big to-do list that spans months or years. My experience with building out a roadmap is the company tells me a list of things my team has to do and I add things we want to do before we review with management and decide what we can and can't do. 

Practically speaking, this is the template that worked extremely well for me in a large company for a team of 6:

| Column | Description |
| --- | --- |
| **Priority** | Based on a variety of factors like customer impact, leadership goals, and cross-team dependencies. |
| **Milestone/Theme** | A way to group like-items together. Can be a subproject, goal, or other company initiatives. |
| **Item** | A short descriptive name of the work to be done at a high level. |
| **Status** | At least: inactive, in progress, blocked, complete. |
| **Need-by date** | Some items are attached to cross-team/company-wide dates. |
| **Effort Remaining (Wks)** | Plan in weeks. Things smaller than a week should be tracked outside a roadmap typically. |
| **Next Step** | If blocked, what do we do to unblock? Could be another team's work or another item in the roadmap. |
| **Owner** | Useful if you're managing a team. |
| **Notes** | More details about the item, including all references (docs, Jira tasks, etc.). |
| **Tradeoffs** | Why a date was moved or the work was de-prioritized. Useful if you track work that is accountable to other teams. |

Some of these columns, like tradeoffs, really only make sense in companies with multiple disjoint teams or when your roadmap has multiple stakeholders that are competing for your time.

### How to maintain a roadmap

Building a roadmap is the easy part. Maintaining it is not. You may spend a few days building and aligning on a roadmap, but because they are built for months- or years-long projects, you're going to be living with it for a while. I would review and update the roadmap at least once a week. If you're at a larger company, your roadmap likely competes with other teams' roadmaps. Your roadmap will also compete with the real world where priorities shift and honestly sometimes things just happen.

If you do it right, your roadmap acts like a shield against unplanned or unscoped work. Your roadmap is a balance sheet where you manage time instead of money. If new work comes in, old work has to come out. You can use it to argue that the priority of your work is higher than the priority of someone else's work because the priority was set and agreed to ahead of time.

At least, that's how I used them. I didn't build them to add more work to my plate, I built them to manage the work already on my plate.
