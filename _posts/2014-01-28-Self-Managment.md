---
layout: post
title: Self management
description: Self management is a massive thing for a developer, here is how I learnt how...
keywords: project management, slef management, time management, self learning
categories: back-to-basics
twitter:
  author: Nigel Greenway
toc: true
---

# Self management

<h3 id="section:why-the-post">Why the Post's</h3>

<h4 id="subsectionsection:Why I have written this post" data-section="why-the-post">Why I have written this post</h4>

Since moving from a hobby developer with the most basic of HTML knowledge since school, I have set targets on improvement of my knowledge within programming. Although my knowledge has improved to a certain degree, along with my workflow, my self management however has got no better. Sure, you can have all the tools you need and within the 4 years (at the time of writing this) of my commercial experience, I think I have only just found the tools that suit me best and I am still learning new tools.

<h4 id="subsectionsection:bad-with-time-keeping" data-section="why-the-post">Bad with time keeping</h4>

Your workflow and tool set (in my opinion) come hand in hand, in that both should integrate well. That said, my biggest failure since working within the development industry is my time management. It's something that has been my downfall for a good few years (no seriously, ask my wife...).

<h4 id="subsectionsection:wanting-to-improve-myself-as-a-developer" data-section="why-the-post">Wanting to improve myself as a developer</h4>

This is something I need to change, to improve as a developer, and the way I learn is to try to write about it.  I am going to write a few pieces by going back to basics to see if I have failed or as always can improve myself in certain areas throughout this blog.

<h3 id="section:why-time-management-is-important">Why time management is important</h3>

It is easy to tell someone that you will take 'x' amount of minutes/hours/days to do something. But it really needs context against the given task. With this, I mean it is better to break down the task into bite size chunks or sections. This way the broken down task will reveal the amount of work needed to be taken for the given task.

An example of this would be if someone asks me to set up their AV system I would normally say 15-20 minutes. However, it would take longer. If I had broken down the task it would look more like this:

* Unboxing of system -> 10 mins
* Re-organising of the current set up -> 20 mins
* Placement of speakers -> 8 mins
* Cutting wires to length -> 6 mins
* Connecting AV Amp -> 15 mins
* Assigning inputs/outputs -> 25 mins
* Testing of set up -> 20 mins
* Configure full system -> 25 mins

I failed, and this was because I guessed an amount of time without thinking about what is actually involved. My 15-20 minutes was actually 2 hours and 9 minutes, that is an astonishing 1 hour and 49 minutes under or an under estimation by 84%!

<h3 id="section:how-to-break-down-time">How to break down time</h3>

<h4 id="subsectionsection:test-example" data-section="how-to-break-down-time">Test example</h4>

Now, the following example is not related to development as I wanted to give an idea of how to break something down into sections. This allowed me to use common day to day tasks as an example for me to get my head around.

With my first so called 'Project' to test I wanted to estimate on (as boring as it sounds), cleaning the house. I know, but [almost] everyone does it. Besides, before I looked into the concept of time and how long things actually take I put about 15 minutes away of my time to cleaning a bathroom which made this a perfect test.

Lets split my cleaning tasks into sub-projects:

* Hoovering
* Bathroom
* Bedroom 1
* Bedroom 2

Then, for each sub-project I split it into tasks along with their estimations.

| Task | Project | Est | Logged Time |
| :--- | :------ | :-- | :---------- |
| Stairs    | Hoovering | 0h07 | 0h04 |
| Landing   | Hoovering | 0h04 | 0h08 |
| Bedroom 2 | Hoovering | 0h06 | 0h02 |
| Bedroom 1 | Hoovering | 0h06 | 0h02 |
| Total     | 0h38 [total (0h23) + 15 mins | 0h16|
| Bath      | Bathroom  | 0h04 | 0h13 |
| Sink              | Bathroom  | 0h12 | 0h18 |
| Mirror    | Bathroom  | 0h03 | 0h01 |
| General   | Bathroom  | 0h06 | 0h04 |
| Total     | 0h22 [total (0h12) + 10 mins] | 0h05 |
| General   | Bedroom 2 | 0h22 | 0h05 |
| Total     | 0h22 [total (0h22) + 10 mins] | 0h05 |
| General   | Bedroom 1 | 0h26 | 0h07 |
| Total     | 0h26 [total (0h26) + 10 mins] | 0h07 |
|                   | Overall Total | 2h12 | 1h06 |

For the above tasks, all I have done is taken the total of each sub-project and added half for each. Think of it as a buffer to catch other unexpected things to be done or things that can crop up whilst doing something.

In my test scenario I have added the extra half by factoring in that an extra 10 and 15 minutes, which I consider a fair, if a little generous amount of time for what I am doing.

Whilst I was cleaning the bathroom I managed to create one spillage and I received a phone call. This added time on 2 separate tasks which at the time I did not factor into my time estimations.

In this case, although I over estimated on my times I managed to complete within (very) good time. I had completed all tasks within half of the time. Now, in one respect it is bad that I have over estimated, but then if I had organised to do something after I would not have disappointed anyone; including myself. Already, it is becoming apparent that I am able to hit time targets which is already a big positive.

<h4 id="subsectionsection:development-example" data-section="how-to-break-down-time">Development example</h4>

If I now apply what I have just learnt into a working development example, in theory I should be able to manage my time better by breaking the task down into chunks and estimate per chunk.

So, in the example I am working on a project which uses the Symfony 2 framework and I am given a specification for creating a staff profile page which requires the following:

* A set of pages (Show\|Edit)
* Ability to add a profile image
* New profile specific fields

So, on first glance the task is to create a profile page with current data but add a few fields and an image uploader. Estimate 4-6 hours and let your (project) manager know and get on with it. However, I would not be to hasty to start. You will need to research how a profile of the user is currently built up. For instance, you could have the entities 'Staff', 'StaffRole', 'StaffPrivilage' currently created and working in the production environment. You may need to add the ability to add contact numbers and addresses which would be brand new entities which will then need relationships for both (and create the database tables/columns and the migration files if you manually manage the database).

Once broken down, it should look something like this:

| Task | Project | Sub-Project | Est | Taken |
| :--- | :------ | :---------- | :-- | :---- |
| Read and understand the spec | Awesome App |Feature: New awesome profile screen/details | 01h00 |
| Create / Amend the table(s) and research the relationships if needed | Awesome App | Feature: New awesome profile screen/details | 00h40 |
|Create / Amend entities |Awesome App |Feature: New awesome profile screen/details | 01h10 |
|Create / Amend controller and actions |Awesome App |Feature: New awesome profile screen/details |01h45 |
|Create / Amend templates |Awesome App |Feature: New awesome profile screen/details | 01h10 |
|Create Migration File |Awesome App |Feature: New awesome profile screen/details | 00h30 |
|Create and action tests |Awesome App |Feature: New awesome profile screen/details | 04h00 |
|Code review |Awesome App |Feature: New awesome profile screen/details |01h30 |
|User test/demo/review |Awesome App |Feature: New awesome profile screen/details | 03h00 |
|Create Feature Documentation |Awesome App |Feature: New awesome profile screen/details | 04h00 |
|  |  | Total | 47h00 |

You will notice I have been generous on time estimation as previously learnt both you, and the business will benefit from this. This allows us to factor in extra time for possible issues. For instance, a migration file should only take 15 minutes at the most as this is an end of feature task so I would copy create/update/delete statements from the database and paste into the file. If there are command line actions, they should take seconds to create as I should have already noted down within our task notes, so a copy and paste will be sufficient. That should not take 30 minutes, but giving the extra time will allow for problems/ interruptions.

So, I have say 7 hours in a working day. The total for the tasks are 18 hours and 45 minutes which relates to 2 full days, 4 hours and 45 minutes. In this case, I would add an extra 4 days. The reason for this is important; the person who has requested the feature will need to see it as you will want feedback from them when showing the feature. This allows for changes to be requested at the point of user testing.

If changes were wanted like wanting a border added to a table and the wording changed on a label or they have noticed that I have not added certain fields as required or even that the layout is wrong (which I believe should be discussed either at the time of the specification creation or just after), we have factored in time to make the amendments without going over the estimated time.

However, if they feedback that we are not collecting enough profile data even though we have read and understood the specification at the start, I would strongly suggest the following: submit a feature request to allow for amendments.

In my personal experience, being helpful and accommodating to the person who requested the feature/change is great for them but not for you as a developer for the following reasons:

* You **will** go over your estimated time and take longer on the task.
* You have designed and created the code as per the current specification and it may cause headaches and unneeded stress to your workload
* You will look inefficient and unprofessional to your (project) manager
* Above all, you will allow all users to make additions to the feature/change requests they submit and sometimes deviate from the task in hand by asking "if you could just change this on that part whilst you do this".

As strict as it sounds, if you are asked anything outside of the project, always get them to request it as a feature/change request. Unless it is no more than a 5 minute task, for example; they want a column adding, you know you already return the data to the view and it is a matter of adding a table column.

This is why the extra time has been factored in, but my rule of thumb is that if it requires me to create new functionality within the application it will take a further 15(plus) minutes to create and test which for me is a no no.

As you put the above into practise, your users will start to improve on their submission of specifications by being clearer with what they are asking and stop submitting incomplete specifications.

Apart from the obvious create/read/update and delete tasks, you will notice the following:

* Code Review: Always go over your code with another developer in your team before pushing the changes as there are always more than one way of coding. (I have found these most benificial within my current role)
* Create/Action Tests: Depending on how your team work, you may do Controller/DBUnit/Browser or framework specific tests, if this is the case always allow time for these and plenty of it.
* Document the feature/change: This is a good practise to get into as you will help the future you when you need to fix or change the codebase for the feature and anyone can read the docs and understand the feature to allow them to add their own changes and fix bugs.

With the above information, I would also like to point out to allow for time to get back into your code after interruptions. If you are working on a development project and it is something that requires the majority of your concentration then you will want to factor in enough time to allow you to get your head back in the code which can often take up to 20 minutes depending on what your code is doing.

If I was in the middle of writing a service which had a complicated amount of business logic then I should factor in time for toilet/drink breaks, code breaks and interuptions. Although this may sound daft when reading, breaks are important when working with screens and a fresh mind will work more efficiently.

If I think on a day to day basis, I could get up to 6 interruptions on a busy day. I would then look at the project, which for this example is estimated at 3 days. With the previous knowledge I could factor in 2 hours to the project each day, which in total will add 6 hours. You also need to take into consideration the project deadline and common sense. I personally would only add 3 hours and 30 minutes to the overall project in this case.

One more thing I would add when working on projects, note down things that happen in the day, it is something I have only just started to do. The advantage of this, whether you are working in a business or self employed is that you can review why things have taken so long. For instance, if a server went down for several hours which you had to talk to your support team, then log the calls either against the project or better still create a new task as an issue and log your time against it. At the end of the week, you can then see why you did not meet a deadline, bill your client accordingly or just see where you could have improved workflows, processes or structure of your support team?

<h3 id="section:summary">Summary</h3>

So, to go over the above in bullet points:

* Break down into sections or bite size chunks
* Estimate the time for each chunk and add extra time on the sections overall time
* Factor in extra time to allow for interuptions and potential issues
* If there is an issue (related or not), record it either in the notes or as its own task
* Prioritise tasks
* Stay focused
* Always be generous with your time
* Take breaks. I have wasted hours at times trying to code something. After a walk or long break, I have found the issue immediatly and sort the problem

I hope this has helped. If you think anything could be improved or found better ways of dealing with any of the above, please contact me on [twitter](http://twitter.com/smilinmonki666) as I always like to here other methods or practices.