+++
title = "The age of LLM's and Software Engineering - Part II"
description = "How the world of software engineering is changing in the age of LLM's - the downside"
date = "2026-07-09"
+++

I covered my thoughts around <abbr title="Large Language Model">LLM</abbr> usage in [Part I](/posts/the-age-of-llms-and-software-engineering-part-i). That was the upside of the content. This part is the downside of it - ethically.

I'm very much on the fence with using an <abbr title="Large Language Model">LLM</abbr>. I use it daily at work, and sometimes on my personal projects. Not so much for the code, but the planning, and I find it great to learn new languages. Last year I paid for the lowest subscription to Claude Code to have a play with this and figure out what it means, and I wanted to build a [tool](https://gitlab.com/NigelGreenway/jump-to-directory) to switch projects in my terminal, but in Rust. Whilst I've dabbled with the hello world type scripts, I'd never gotten out of my comfort zone. The <abbr title="Large Language Model">LLM</abbr> allowed me to do this. Instead of getting it to do my code for me, I gave it a problem and discussed the result and why it suggested that. Whilst doing this, I was also reading the documentation for Rust to understand it deeper.

This was a way to deal with being busy and trying to figure stuff out personally at that moment, so this helped with a faster feedback loop and faster gratification and sense of accomplishment.

With work, whilst I do see the positive impact with changes in coding being more efficient (not faster), I also understand how this data has been curated and served to millions of people around the world.

Let's go through them..

### Training the data

In order for the data to be verified, it needs a human. This means that humans are verifying things like images. Image's of dogs, cat's, car's, bridge's and more disturbing images like extreme content <sup>[1](https://www.theguardian.com/technology/2025/sep/11/google-gemini-ai-training-humans)</sup>, or paying people really low wages and exploiting them to train the data <sup>[2](https://privacyinternational.org/explainer/5357/humans-ai-loop-data-labelers-behind-some-most-powerful-llms-training-datasets)</sup>. There's even exploiting people in the web - you know those Captcha's that piss everyone off when it say's "select the bicycle" <sup>[3](https://gor-grigoryan.medium.com/how-recaptcha-turned-internet-users-into-unpaid-ai-trainers-a2107adf31e3)</sup> - yup, it's free training!

The other part of the data being trained is by using any and pretty much every digital asset on the internet <sup>[4](https://jskfellows.stanford.edu/theft-is-not-fair-use-474e11f0d063)</sup>, from books to music, to art <sup>[5](https://goodlawproject.org/ai-giants-are-stealing-our-creative-work/)</sup> - and none of those artists/authors are being payed for it either! It's the same with code. Using sources like github, gitlab, gitea and other git forges, it's scanning all open source content and using that to suggest the responses you've been given from your prompt of "Make me a website like wordpress".


### Environment impact

The first impact is the data centres. These are huge buildings, and sometimes are on a bigger scale with the amount of land they take for multiple warehouses. And these are full of servers, each stacked with power hungry CPU's [Central Processing Unit], Graphics cards and SSD's [Solid State Disc] drawing power and creating heat.

The heat given off by these server components then need to be cooled down, but by using water. This is done by either cooling the components down directly, or indirectly for the electricity generation. Now, at the time of writing this, there are on going advances being looked into around combating heat, but the best way is to use water to cool down these components <sup>[6](https://sustainableict.blog.gov.uk/2025/09/17/ais-thirst-for-water/)</sup>. However, this has multiple impacts on the surrounding environment. May that be that people can't use the water <sup>[7](https://www.bbc.co.uk/news/articles/cy8gy7lv448o)</sup> due to low pressure, or where we already see shortage of water supplies <sup>[8](https://www.bbc.co.uk/news/articles/ce85wx9jjndo)</sup> will be worsened if we add more data centres to power "AI". And this is just in the UK alone. The USA is seeing even worse impacts where customers of a energy supplier are to be cut off unless they have a new supplier as the current energy provider is routing it's power to a new proposed data centre to be built in their area <sup>[9](https://www.independent.co.uk/news/world/americas/lake-tahoe-energy-source-ai-data-centers-b2975802.html)</sup>.

Then there are wildlife impacts - that water being used to cool down components can't be easily reused as it will pick up dust particle's and chemical's during transit between entering the data centre and leaving it. In order to make these large scale builds, land is required. In order to build on this land woodland, forests and home to the local wildlife is destroyed. Once built, these buildings will shine a constant light on the surrounding area, drink the water, disperse the heat and have a constant humming noise of electricity. Wildlife is great at adapting, but this will disrupt the eco-system for sure. Then there is the fact we are clearing _more_ tree's in order to make our life easier? This is about money and nothing else.

### Local economy impact

You don't even have to stay up to date with the news to hear thousand's of job's being cut across the world. Microsoft <sup>[10](https://www.theguardian.com/technology/2025/may/13/microsoft-layoffs)</sup>, Amazon <sup>[11](https://www.theguardian.com/technology/2026/jan/28/amazon-global-job-cuts-email-error-workers-sent)</sup>, Meta <sup>[12](https://www.nytimes.com/2026/03/25/technology/meta-layoffs-ai-executives.htmlfb-nytimes&smtyp=cur)</sup> and more have all cut more than 46,000 jobs due to "AI". In 2025 [layoff.fyi](https://layoffs.fyi/) reported that over 115,000 jobs in tech had been cut, this will then have an impact on the software industry being saturated with applicants and for those who can't find a job, will have to end their career for the time being in order to pay the bills. A percentage of them will reduce their spending which will affect local businesses.

So, if people are not spending; then how will these companies in the "AI" world make money if no-one down the chain is spending money?

Another impact has been huge rises in computer components. Both memory (Random Access Memory [RAM]) <sup>[13](https://pangoly.com/en/price-trends/ram)</sup> and storage have been impacted <sup>[14](https://pangoly.com/en/price-trends/hdd)</sup> where it's either just under double or over! This mean's prices of other devices are affected. The Raspberry Pi announced <sup>[15](https://www.raspberrypi.com/news/more-memory-driven-price-rises/)</sup> price rises of up to $60. The Sony PlayStation announced a price rise <sup>[16](https://blog.playstation.com/2026/03/27/new-price-changes-for-ps5-ps5-pro-and-playstation-portal-remote-player/)</sup> which means a £40 increase on the digital edition - from £389.99 (in 2025) to now £519.99. All because memory and storage are in high demand from the data centre's to power "AI".

### Closing

I am finding that an <abbr title="Large Language Model">LLM</abbr> is a good tool, but understanding the impact of my usage does mean that I certainly don't depend on it for most things. Getting it to scan code and talk something through is powerful, and  doing this myself can be time consuming. Writing code is something I enjoy and is the reason why I got into programming.

With using it the last year now, I can see the benefit. However, my next step would be to build out my own model purely for coding, but in an efficient way with smaller and lower powered compute devices. Maybe powered by the sun, and asking permission from the authors of the code and books. Then, being able to run this locally on my machine, or a local server - hopefully something I can do sooner, rather than later!
