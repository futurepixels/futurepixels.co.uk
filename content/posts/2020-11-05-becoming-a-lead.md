
+++
description = "Becoming a lead, part 1"
title = "Becoming a lead, part 1"
date = "2020-11-21T00:00:00Z"
+++

# Prelude

The past year has been a roller-coaster - for me at least...

Back in September 2019, I was promoted to "Lead Software Engineer". This was a role I was very much excited about, for many reasons - but one reason stood out the most. This was that I was able to help make a difference to my team, the business and more importantly the customer.

Anyone who knows me - and knows me well, understands that I am pretty passionate about what I do so I took this seriously but not in a way where I told everyone that they were wrong and we are doing it my way. They also understand I can loose focus on the end goal to a large extent and help too many people which impacts on my own targets/goals.

With this role, my first time on a work trip to our Polish office was planned and it was an amazing experience as it was great to get over to the team in Poland and experience their amazing culture but was a great few days out there as there was plenty of collaboration. This is something I'm very passionate about. Collaboration is key to success - at least in my eyes.

A month later however, me and my wife agreed to call it a day after 14 years together. This was a mutual decision. I let key people know about this at work and made them aware it was nothing bad and I was fine.

The next few months were rough, I didn't expect to feel the way I did but I also didn't expect this to impact my work. Up until Christmas of 2019 I was a roller-coaster emotionally for various reasons and also had to take sleeping tablets as I was not sleeping more than 1-2 hours a night.

Throughout my life I've never let personal and professional parts of my life mix and this is something I've been particularly proud off. This time round this wasn't the case. Although there were only a few days or half days I took as last minute absent leave within a 3 month window, I didn't expect how it would affect me in the various ways it did.

The transition from a senior software engineer to a lead was something I didn't really think about to much as it was stuff I was doing already - at least to a large extent. There were extra things I needed to take into account and learn - like trying to learn from features/products that we put into production and rolled out to our user base, but generally it seemed there would not be as much difference.

However, a new role plus the fact my marriage ended as well as the lost time with my daughter and now having to pay for and maintain a house solely by myself were something I'd not had to deal with before - let alone all at the same time...
 
One thing I will say is the support from close friends and my direct and in-direct management. This is something that was a key part and re-enforced why I was in the right place.

# 12 months later, or present day...

October was meant to be the delivery of a brand new micro front end. This was extracting some functionality from our legacy codebase as well as helping tackle an issue within the business. During this time I wanted to limit the dependency on our legacy codebase and get another service out to extract that functionality. On top of that I've been aware of how long it currently takes to deliver a new micro front end as well as the issues that come with it.

Within digital, we are [Lean](https://www.lean.org/WhatsLean/) and deliver work that has value. This can be something very small or large, naturally... We also work in pods which contain the following roles; user experience, quality assurance, API engineer, three software engineers, a lead and a product owner. The teams focus on a specific product area. We handle the fun part - the account area. This can include anything from managing your account to signing up for a smart meter.

Up until April/May my role was simple, lead the team to help support on a roll out of a new identity service. This would lead the way forward to allow us to make a huge move forward with how we think about our customers and empower them to manage multiple accounts without having to log out and back in with a different account as well as a lot more cool stuff. Then, when that project was delivered, we supported post roll-out across the business where required. Whilst the team was doing that I got involved in a lot of meetings which was to allow us identify what our next project was. This was a problem looking back...

Some background; we worked previously with a monolith PHP application. As everything you work on in a new job there are areas where you wish is was not so complex, however part of being a software engineer is that you don't get to always work in greenfield projects; if you did, you would be amazing at build new stuff but never understand how to maintain legacy code and understand identifying issues or potential issues with codebases. Unfortunately, the world of software isn't always able to accommodate SOLID, DDD, BDD and what other practice you want to use. For the past few years, one of our aims in our pod was to break up this monolith and extract to micro front ends. This was planned a few times and me and another [amazing engineer](https://www.steadweb.co.uk/about) worked on getting something put together which involved PHP7, SlimPHP and ReactPHP. The plan was to put something into production with the initial value of moving key areas of the monolith into micro sized websites and then we could iterate on them with ReactJS to bring inline with the rest of the department. We probably got about 80% of the way there and then it was stopped due to various big projects taking importance.

Now, back to that problem. Value can be a very subjective thing in my eyes. You are employed by a business, their aim is to make money. To do that you need to get customers. To get customers you need to put stuff out there to attract them. Part of our problem in our pod is to keep them interested. That's hard to do, unless you have a user experience team that were good at research and thinking about the customer. Luckily, we have a small pot of these people embedded into our department - and they are _very_ good. Now, you need to know what the problem is. Once you have the problem you can go away and solve the problem, sorted.. _right?_.

Well, not exactly. To get the value you need to research. To research you need enough data and feedback to lead your hypothesis, which is fine.. We have plenty of that. Now you need direction. This can be the problem as in any business you can have miss-alignment. This part, this is deadly. I'm very much a customer first approach, without the customer there is no business. That's a key fact people seem to forget. Many times I've been in places where I've asked about the end user from testing to implementation and more than I'd like to admit I get "Works on my machine" or "I think the customer would love it, it's what we get emails about". The latter is always based off assumption as a customer asks for x but they add y as it's largely based on their idea and fed down to lead the design and then passed to the devs to implement.

This is wrong, but happens more often than you think.

The latest project we've [nearly] delivered is taking 3 key areas and merging them into one page. This was done with the research loops required - where you take the feedback, create something in wireframe form, test it and then iterate over one or two more times. We then broke them designs up and created high level tickets. Once that was done, we started working on them and ... Frustrations started.

This was based on the fact that the direction we were given was based on something from the business - which is fine and I agree with the drive based on this. However, more people got involved and the value started to be blurred.

Everyone has there own selfish needs when you are part of something. It's human nature to want something to help with your tasks, workload and what ever else but, you need to ensure you are aligned with what you are trying to achieve. I have my own selfish need from this project and future projects - From Christmas Eve this year (2020) I will be the only person currently able to maintain our current code base. I've no where near the domain knowledge that previous people to me have had around how business logic is implemented across the code base as well as certain functionality and what changes elsewhere in the business could affect this application. So, with that I have been very open with people and told them that if we can at least use this as a way to extract the domain out of the current codebase then I will be very much up for that, and anything else is a bonus from a technical point of view. The thing is, it can't stop there as the business have there requirements. Design/UX will want their changes to be implemented, the API team will want their changes and so on, and so on... This is where you have alignment. This really wasn't the case.

On top of that, due to miss-alignment we managed to miss out on certain things like the ability to understand the domain fully and have contextual awareness to help support all in the team and have a full understanding.

I've very much witnessed a fair amount over the past few months as a lead and had to undergo a lot of learning through frustrations around difficult meetings with people within my team and outside. I've had to push hard on people trying to get dates and so on, whilst trying to raise potential issues with the affects on customers. All the while I've lost focus on the following; the value and alignment.

*The value*: This is something that I should have got upfront. I had my value, I understood the UX value and I understood the value from the business. 

*Alignment*: Quite simply, there wasn't much of it looking back. It was a case of "this thing  needs to be done to impact on this thing over here". As the project went on different parts of the business were after different things that I wasn't aware of, or at least not fully aware of.

As we've developed this micro front-end we've ran into small issues and mistakes around assumption - I know, you should never assume _anything_... These aren't just mistakes though - these are what my eight year old daughter call "marvelous mistakes". Mistakes that you can learn from, and one thing I also pride myself on is the ability to admit errors and try to correct them.

In this project, I've made a fair amount. But these aren't mistakes that solely rely on myself. Who ever is included in that, it doesn't matter as its a collaborative thing - you work in a team, changes happen and people get busy or their priorities change due to these changes and what ever else. Being the person I am I went away and had various discussions with my girlfriend to both invalidate and validate my thoughts on things. I drew out various ideas of what I thought I should put in place around a process of some sort. After a few drafts I went and shown other leads I looked up to, as well as my lead - someone who has mentored me from a software engineer to a senior to a lead. After some back and forth I had something I could present to the team.

This was a lesson in itself...
