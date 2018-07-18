+++
title = "Creating a CI & CD pipeline with GitLab, Rancher and Digital Ocean"
description = "A documentation of my initial set up and discovery of dev ops tooling"
date = "2018-07-17T00:00:00Z"
+++

## <a href="#setting-the-scene" id="setting-the-scene">Setting the scene</a>

Over the past 2 years I've been working at First Utility and in that time I have worked with an awesome team - which, in turn has allowed me to pick up a lot of useful methods and learn some pretty amazing stuff.

One thing I got into was running my own servers for things like OwnCloud, GitLab and other useful tools. I have a HP MicroServer which allowed me to practice on but I was fed up of running a server from home with running both a server and a nameserver. So, after much playing around I decided to have a play around with [Digital Ocean](https://m.do.co/c/7ceb48d8e994).

This is some documentation to show what I've got set up and how I got to where I am today. There will be some follow up post's on how to set up each application to show my configurations and setup.

## <a href="#continuous-integration" id="continuous-integration">Continuous Integration</a>

I'm not going to get into what this is as its better explained [here](https://martinfowler.com/articles/continuousIntegration.html), but the gist of it is:

> Continuous Integration is a software development practice where members of a team integrate their work frequently, usually each person integrates at least daily - leading to multiple integrations per day. Each integration is verified by an automated build (including test) to detect integration errors as quickly as possible. Many teams find that this approach leads to significantly reduced integration problems and allows a team to develop cohesive software more rapidly. This article is a quick overview of Continuous Integration summarizing the technique and its current usage.

In simpler terms, you create your feature with tests, push to your code's repository and something will run the tests for you as well as using other tools like linting and so on.

For me, it's a way of coding and pushing my code to allow my build server/service to run the tests for me as I don't want to be running both unit and functional tests locally. I generally work with my implementation and unit test side-by-side with the test framework watching for file changes so it can re-run the tests automatically so I can see bugs/failures quickly. I don't want my functional tests running as well, making me wait for these to run. _(Some people will disagree withis style, but for me it's about learning your tradeoffs and where certain tools can assist you)_

## <a href="#continuous-deployments" id="continuous-deployments">Continuous Deployments</a>

Continuous deployment can be confused with continuous delivery (well, I got confused between the two for a while). They are different only by a single phase in the delivery process.

With continuous delivery, you prove that your feature or release has passed the unit, user acceptance and feature tests and *can* be released.

Continuous deployment is where you do the above, but you have automatic deployments (which means you should have confidence in your tests and product). The downside is that if something is missed you have bugs being deployed - but that is no different to the manual process of regression and deployments. The upside to this, is that if a bug does slip though the net - and lets be honest, _everyone_ does it from time-to-time - then you can fix this "quickly" and release the patch. Sometimes within minutes of it happening.

_(This is providing you are working with the web, or something/somewhere which you have full control of, of course - like the web or an internal business tool)_

## <a href="#show-me-the-pipeline" id="show-me-the-pipeline">Show me the pipeline</a>

I've decided that the best way to do this would be by breaking each part of the workflow/process or whatever you want to call it down into smaller articles. This _should_ make it easier to both take in what I'm doing and trying to achieve as well as making the articles smaller to read... _Not a fan of these huge articles._

So, I've broken them down into the following:

 - [An overview of my GitLab pipeline](/posts/my-gitlab-ci-cd-pipeline-overview)
 - Deploying GitLab to a self hosted instance on Digital Ocean
 - What are the benefits of GitLab?
 - Setting up Rancher
 - Creating the droplet (VM) for your application deployment destination
 - Set up review zones
 - Set up staging zone
 - Set up production zone
