+++
title = "The age of LLM's and Software Engineering"
description = "How the world of software engineering is changing in the age of LLM's"
date = "2026-05-30T11:00:00Z"
+++

### Starting out with "AI"

Since early 2025, I have been curious on the impact of "AI" in my job and started introducing a Large Language Model [LLM] into my workflow. It started out with using Github's CoPilot. I found this useful, purely for it's auto-complete. It had moments of frustration, but all-in-all it was an aid I could do with to speed up my coding. As I used it more though, I found it was second guessing me incorrectly. This was happening around forty percent of the time. After a couple of weeks of trying to tweak it and keep it and got frustrated, and so I disabled it.

A couple of months passed and the director of engineering at work was encouraging the use of LLM's. I was reluctant at first for reasons discussed later, but as I found some spare time here and there I used that to set it up locally. We used Claude Code. This suited me as it is in the terminal. Once set up, I had a play with it and tested it with some work I was doing which involved duplication of changes across multiple repositories where the code was around eighty percent the same. The flow was to make the changes myself in one project, and then lean on the LLM to "copy and paste" the changes to the other projects. For the majority of the changes, it worked surprisingly well. A few tweaks needed by myself, but it certainly sped the process up. What would have taken around three weeks, reduced to about a week and a half.

This is where I found the LLM to be nothing more than a tool in my digital toolbox. Over the following months I would integrate it more, even to the point where I tried to "vibe-code" two projects. These turned out terrible. It doesn't work - and anyone who tells you they are successful are either bullshitting you, or they've succeeded at a high level.

After playing around with it for a few months, I took a step back from it. I wanted to understand why I want from it. This was hard to understand as social media was showing me how many people were ahead with using an LLM. LinkedIn for example, was showing posts that looked like everyone was in the camp of "this is amazing". As I checked social media over the coming month or so, people were telling you that "AI is taking your job" or "I don't need an engineering team now I can do everything myself" or my favourite, "SaaS companies think they can over charge me, not anymore as I've built it myself for a fraction of the cost".

Absolute Codswallap! But like always when something new arrives - and when enough people are saying the same thing, it does make you think about "being left behind". Over the next few months I found this is not true, or at least in the sense of doomsday talk by what seems to be everyone.

### Get a grip Nigel!

I am very fortunate to work with some very skilled engineers. All with different skills and traits. With LLM tools, some of these people are much further ahead of the curve than I am, but the best thing about them is they teach and encourage by giving you the time to discuss and learn.

It's the last few months I've found it really isn't going to "take our jobs", and here's why - in my experience so far ..

#### Critical thinking

Humans can't be replaced when it comes down to domain knowledge and true critical thinking.

What you don't see or hear in all the shit posting is that the people saying they are replacing jobs with "AI", or becoming a one man band (and being the programmer, marketer, salesman, legal advice and so on with "AI"), is they don't understand these areas enough to question the response from the LLM. So, what they are seeing is the first twenty percent being easy as it's quick feedback and instant gratification when they see "their" idea being brought to life. No blockers. No Questions from anyone else. No one saying "that can't be done" or "that won't work".

Humans are critical thinkers. Machines are not. Machines are `input > process > output`. This is where the people behind LLM's are very clever, in that they make the responses humanistic. They have a tone. They give the impression that they understand what is going on. But, they don't. 

This is why I'm not worried about my career ending any time in the near future, at least at this point. Let's go through it..

LLM's are very powerful, and great at patterns and quickly knowing how to do something. But - and this is important, it's all based on what's available digitally, probably just the internet! Now, anyone who knows the web - and knows it well, will understand that the web is full of shit. So many conflicting opinions on how to achieve X. Stack Overflow is a prime example of this, and in my time I've seen snippets pasted into code with a comment being the URL to the Stack Overflow answer. Depending on the daa it has bee trained on, depends on how well the model can achieve a task.

Over the last few months, I've been tweaking my interactions; longer and more detailed prompts, investigating and planning first before allowing the LLM to go and make the changes, and making sure I question the response or plan by understanding the code as well. I noticed the output was better, not always solid, but better none the less. It would get things right more of the time when the task was more focused and smaller in scope. But, it take's longer to do some simple tasks as there is back and forth. So, where is the efficiency gain these people talk about so much? From what I'm seeing, there isn't any. Not for the smaller tasks. And not when you just let it go off and do the stuff I have been training for all these years.

I'm seeing some code being generated that is probably fine for that problem, but the LLM does not understand the wider impact. Code where it doesn't take into account things like how a session works in our applications, or that we favour configuration over multiple logic gates with static string checks. And yes, I know you can avoid this with skills and markdown files to extend the prompt, but like documentation these things will be forgotten and missed and this code will seep into your code base and create more technical debt than before.

#### New tools

"AI" - or an LLM (let's be honest, these services are not Artificial Intelligence), is nothing more than a tool for people to use, and like any new tool that's being offered - in this industry at least, get's smashed into everything, people get over excited about it and is the new flavour for the next n years. Whilst I believe that as a tool, it's here to stay, I also believe that the new age of software engineering will take time to settle whilst people learn how to use it properly, when to use it, and how to really get the efficiency gains.
