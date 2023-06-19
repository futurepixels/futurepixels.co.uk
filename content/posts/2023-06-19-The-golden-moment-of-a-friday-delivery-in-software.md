+++
title = "The golden moment of a Friday delivery in software"
description = "The golden moment of a Friday delivery in software"
date = "2023-06-19T9:45:00Z"
+++

Having been in software engineering for around 15 years, there's been a lot of talk around Friday deployments - in that you should be able to do them wihtout worries. This is all well and good, but there are some things that you need, and steps you need to make in order to get to the "holy grail" of software delivery in my eyes.

In a recent discussion with someone in our team, it was suggested that they'd be more comfortable to wait to deploy on a Monday and not at 4:30 on a sunny Friday afternoon...

This got me thinking... from my perspective a softawre delivery should only happen when you have confidence, not just in the code but other area's too. Let me break it down into sections:

## Confidence in the code

Okay, most people will say they are confident in the code that they work on, but it takes more than just having confidence in it. We all know that it's rare to have that as there are always times you open up the code and think "what on earth is this doing...". It's a fact that for what ever reason you will miss a unit test, or it will be written in a way that is fragile - whether or not that should happen is a different post, but it will happen unfortuanately.

The way to increase confidence is to ensure that you have a good test suite for unit, integration and if it's a website/web app then good functional tests. This means you can make changes with knowledge that _something_ will break.

## Pipelines

I will go into detail in another article around this specifically, but your pipelines must run your build and tests but most importantly they must fail the build denying the auther of the code to merge or deploy their change set.

## Team

The team should have confidence in each other. This for me is integral, and for me means that all team members that touch the code should understand how the code works to a large degree, how it's deployed and how to view the logs, monitoring and understand the tooling. Now some people argue that software engineers need to hand their code over to the next part of the factory line, however I firmly believe that if you write it, you are responsible and accountable for that change set going into production - this is also true in my eyes that you should (where possible) understand the impact to the user.

## Documentation

Just as key as a collaborative and well oiled team, the right level of docs around the release process - no matter how simple, will help more than you'll realise. Enuring that steps are followed means that every person will do it the same, no rogue deployments, no "I do it this way" and then the team can't figure out what's gone wrong when someone say's "I think I pressed this button, then routed this and then, no wait... I routed it first and then update the Nginx configuration.. or did I ...", you get what I am getting at...

## Support Team

I am personally a huge advocate of DevOps. If you don't understand how it works in production, then my view is that you don't know what you are delivering. By this I mean that what happens locally vs your "qa", "staging", "prod" environment will not 100% be the same - especially in NodeJS land where you are using Webpack locally to build for hot reloading vs you `npm run build` command which does it differently.

With that, having a platform team or support teamn that know that you've got each others back when there is a problem make's deliveries smoother, and in my experience - especially when they know, that you know what you are doing. Having a chat with someone in another team where it goes "hey we've just done a release and there's an issue and we're not sure why - can someone help ASAP please!" via Slack or what ever whilst they are currently in another set of context isn't great for team dynamics and is the opposite of collaboration across the digital teams.

## Communication

Now, this isn't something that can always be achieved - especially if you are 100% continuous delivery! But for those that aren't I would heavliy suggest that you give notice of deployments. Whether that's hours, day(s) or week(s) notice, let the wider team know of your intentions of release, include release notes, times and any other notes for the deployment. For example; "Need to flush the cache on deployment". This readies the wider teams in case of any potential issues that they might need to support on.

## Tooling

Just like you local editor that you use, the delivery tools are just as important. And, just as important is ensuring everyone in the team has access, the right admin privilages and an understanding on how the tool works. For example, if there is a production issue, how does one roll back to the previous version?

## Monitoring

This is your windscreen, you view to see what disaster is on it's way to greet you and your users with potential issues. Making sure the team know where your logs are (per env), the Grafana dashboards with your helath metrics and how to trigger off any other monitoring tools like checklyhq.com, as well as how to read the errors across all monitoring tools.

These may seem simple, but when starting a new product, or having to take over an old legacy system that you've been given, having the above items means that you will have more confidenceto deploy. Have the ability to get someone else to deploy to production whilst you attend a meeting, or take the day off that you planned where you'd probably not normally take and cancel because of an emergency deployment.

A couple of weeks back, I deployed a release. It was 16:30, on a Friday afternoon. I felt confident because of the above. Because I understand what I am doing with the code base I am using. Because there is a process we follow everytime. Because we've worked as a team to remove dependencies that are people specific. Because we care about the quality of coe. Yes, things get missed for reasons and some bug's slip through the net, but if it's something that's bad for the user we'll roll back and try again the next day with a hot fix.

When I was asked to hold on the Friday deployment, my response included the above headings and that without them I wouldn't release on the final hour of the week, before the weekend. I wouldn't deploy something and just let the support team out of hours handle any issues. I take responsibility and hold myself accountable for any issues.

Above all, it's a bold way to test that a Friday deployment is possible!

I am not saying Friday deployments are a must, but if you don't feel confident to deploy your code on a Friday then why are you deploying your code any day, at any time?
