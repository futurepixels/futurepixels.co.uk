+++
title = "The age of LLM's and Software Engineering - Part I"
description = "How the world of software engineering is changing in the age of LLM's - the upside"
date = "2026-05-30T11:00:00Z"
+++

### Starting out with "AI"

Since early 2025, I have been curious on the impact of "AI" in my job and started introducing a Large Language Model [LLM] into my workflow. It started out with using Github's CoPilot. I found this useful, purely for it's auto-complete. It had moments of frustration, but all-in-all it was an aid I could do with to speed up my changes. As I used it more though, I found it was second guessing me incorrectly. This was probably happening around forty percent of the time as I was finding I was just ignoring what it was suggesting. After a couple of weeks of trying to tweak it and keep it and got frustrated, and so I disabled it.

A couple of months passed and the director of engineering at work was starting to encourage the use of <abbr title="Large Language Model">LLM</abbr>'s. I was reluctant at first for reasons discussed in a future article, but as I found some spare time here and there I used that to set up the tooling on my machine. We used Claude Code. This suited me as well being a terminal tool. Once set up, I had a play with it and tested it with some work I was doing which involved duplication of changes across multiple repositories where the code was roughly the same. The flow was to make the changes myself in one project, and then lean on the <abbr title="Large Language Model">LLM</abbr> to "copy and paste" the changes to the other projects. For the majority of the changes, it worked surprisingly well. A few tweaks needed by myself, but it certainly sped the process up. What would have taken around two weeks, reduced to about a week.

This is where I found the <abbr title="Large Language Model">LLM</abbr> to be nothing more than a tool in my digital toolbox. Over the following months I would integrate it more, even to the point where I tried to "vibe-code" two projects - which turned out terrible. It doesn't work - and anyone who tells you they are successful are either bullshitting you, or they've succeeded at a high level where it works for them, but they've not made any changes or tried to get it deployed or added integrations.

After playing around with it for a few months, I took a step back from it. I wanted to understand what I want from it. This was hard to understand, especially as social media was showing me how many people were ahead with using an <abbr title="Large Language Model">LLM</abbr>. LinkedIn for example, was showing posts that looked like everyone was in the camp of "this is amazing". As I checked social media over the coming months, people were yelling at you that "AI is taking your job" or "I don't need an engineering team now I can do everything myself" or my favourite, "SaaS companies think they can over charge me, not anymore as I've built it myself for a fraction of the cost".

Absolute Codswallap!

But like always when something new arrives - and when enough people are saying the same thing, it does make you think about "being left behind". Over the next few months I found this is not true, or at least in the sense of doomsday talk by what seems to be everyone.

### Get a grip Nigel!

I am very fortunate to work with some very skilled engineers. All with different skills and traits. With <abbr title="Large Language Model">LLM</abbr> tools, some of these people are much further ahead of the curve than I am, but the best thing about them is they teach and encourage by giving you the time to discuss and learn.

It's the last few months I've found it really isn't going to "take our jobs", and here's why - in my experience so far ..

#### Critical thinking

Humans can't be replaced when it comes down to domain knowledge and true critical thinking.

What you don't see or hear in all the shit posting is that the people saying they are replacing jobs with "AI", or becoming a one man band (where they are the programmer, marketer, salesman, legal advice and so on with "AI"), is they don't understand these areas enough to question the response from the <abbr title="Large Language Model">LLM</abbr>. So, what they are seeing is the first twenty percent being easy as it's quick feedback and instant gratification when they see "their" idea being brought to life. No blockers. No Questions from anyone else. No one saying "that can't be done" or "that won't work".

Humans are critical thinkers. Machines are not. Machines are `input > process > output`. This is where the people behind <abbr title="Large Language Model">LLM</abbr>'s are very clever, in that they make the responses humanistic. They have given them a tone. They give the impression that they understand what is going on. But, they don't. 

This is why I'm not worried about my career ending any time in the near future, at least at this point.

#### Let's go through it..

<abbr title="Large Language Model">LLM</abbr>'s are very powerful, and great at patterns and quickly knowing how to do something. But - and this is important, it's all based on what's available digitally, probably just the internet! Now, anyone who knows the web - and knows it well, will understand that the web is full of shit. So many conflicting opinions on how to achieve X. Stack Overflow is a prime example of this, and in my time I've seen snippets pasted into code with a comment being the URL to the Stack Overflow answer. Depending on the data it has been trained on, depends on how well the model can achieve a task.

Over the last few months, I've been tweaking my interactions; longer and more detailed prompts, investigating and planning first before allowing the <abbr title="Large Language Model">LLM</abbr> to go and make the changes, and making sure I question the response or plan by understanding the code as well. I noticed the output was better, not always solid, but better none the less. It would get things right more of the time when the task was more focused and smaller in scope. But, it take's longer to do some simple tasks as there is back and forth. So, where is the efficiency gain these people talk about so much? From what I'm seeing, whilst there are gains, they are not 100% gains which people seem to be saying. This is both true for smaller and larger tasks.

I'm seeing some code being generated that is probably fine for that problem, but the <abbr title="Large Language Model">LLM</abbr> does not understand the wider impact. Code where it doesn't take into account things like how a session works in your application, or that you favour X over Y. This becomes dangerous when you have teams of people that don't fully understand the code either, where it will get though reviews because either people are moving faster than before with <abbr title="Large Language Model">LLM</abbr>'s or they also don't understand the code and allow it to go through because it looks "fine" in principle. This is becoming an ownership and lack of understanding problem that's being introduced.


Whilst you can try to avoid this with skills and markdown files in the project to extend the prompt, this becomes just like documentation where these things will be forgotten and missed, and this code will seep into your code base and create more technical debt than ever before. Then one day, it will bite you in the ass because the LLM will use this code it's introduced as the way of doing things and it will get accepted again and again.

#### New tools

"AI" - or an <abbr title="Large Language Model">LLM</abbr> (let's be honest, these services are not Artificial Intelligence), is nothing more than a tool for people to use, and like any new tool that's being offered - in this industry at least, get's smashed into everything, people get over excited about it and is the new flavour for the next n years. Whilst I believe that as a tool, it's here to stay, I also believe that the new age of software engineering will take time to settle whilst people learn how to use it properly, when to use it, and how to really get the efficiency gains.

If you are worried about being left behind, or even replaced? My suggestion is try it out, and start small. Co-Pilot is a great introduction to it, there are free tools out there like <a href="https://opencode.ai/" target="_blank">Open Code</a>. Give it little problems to start where you understand the problem space and work with it.

The only risk I see at this point, is that you will seem "slower" compared to people that use it and nothing more at this point.
