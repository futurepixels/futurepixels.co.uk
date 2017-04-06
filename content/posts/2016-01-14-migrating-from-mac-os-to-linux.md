+++
title = "Migrating from Mac OS to Linux"
description = "My struggle/experience on moving away from Mac OS to a Linux distribution"
date = "2016-01-14T10:00:00Z"
aliases = [
    "/experience/migrating-from-mac-os-to-linux"
]
+++

# Preface

I have now been a Mac OS user for around 8 years now. Don't get me wrong, I have enjoyed using it. However, I have recently wanted to change for two reasons.

_The first;_ I want to advance on my skills as a developer/devops, so I feel like using a pure Linux operating system will help with that in regards to being familiar with the OS, structure, kernel and so on...

_Second;_ I am not liking the direction of Apple, both in terms of [mainly] cost and that I think iOS is going to heavily influence the design of the desktop.

This is a simple migration log/experience from moving to Mac OS to Linux, Elementary OS.

# The move

_It terms of migrating from Mac OS to Linux OS, it is just the OS that I am changing and not the hardware, yet._

At the start of 2015, I was looking at trying Linux. My first flavour I tried was Fedora. I lasted around 3 days due to a few issues with things like WiFi and audio, and as a dad, my time to myself precious. With this, I went back to Mac OS and thought it was going to be more trouble than it was worth.

Come summer time, I was getting the itch again for moving away from Mac OS. So, I went with what seemed the common flavour; Ubuntu. This was better in terms of set up, it was a lot easier but it did come with its problems. WiFi once again played up due to some driver issues, but I managed to get that sorted. One of the main issues I was facing this time round was key bindings. It sounds silly as I sit here and write about the issue, but `ctrl` replacing `cmd`, the key short cuts for other parts of the OS like `cmd`+`n` for opening a new window in Finder or every programming having the standard `cmd`+`,` for the program preferences panel are all very useful. Other parts like the Unity search being a mess when coming from being so used to the simplicity, tidiness and ease of spotlight when searching across the file system was a struggle too, along with default applications like the address book and so on.

Once again, this made me switch back to Mac OS. Yes, I know you can install the software to help things like this but at the time it was a bit annoying and again I had not really thought it through about how hard it would be to transition from one environment to another.

# The actual move

So, a few weeks before Christmas 2015, I once again got the urge try Linux.

The last time I failed with Ubuntu, [Phil Bennett](https://twitter.com/philipobenito) suggested using [ElementaryOS][elementary-link] (see [this tweet](https://twitter.com/philipobenito/status/646052457194389505)). Previous to this suggestion I had heard about [ElementaryOS][elementary-link] and had a brief look into it, but at the time I was still trying Ubuntu and decide to give up.

So, this time round I tried [ElementaryOS][elementary-link] and within a week of dual booting I used Mac OS for all of 2 hours tops. The transition was pleasant and easy.

## The inner parts

### <s>Spotlight</s> Slingshot

Now, one of the things I have really enjoyed (and miss) about Spotlight is the fact that it can search across pretty much anything. In ElementaryOS, Slingshot does not search across files within your Documents directory and so on, only `.desktop` files which are mapping files to an application. There are alternatives like [the synapse launcher](https://launchpad.net/synapse-project), [albert](https://github.com/ManuelSchneid3r/albert) and [alfred for debian](https://github.com/ffnord/alfred-debian).

Slingshot works well for application search, although I do miss things like document search and so on.

 I have come to rely on the spotlight feature of Mac OS when it comes to searching for docs, applications and contacts without having to always open the application, sling . The other thing it can do, which is a great thing, is calculations. It's great to hit `cmd`+`space` and then type in `(2+4)*(1+1)` and it returns the answer. It has helped more than I thought it would. This is mainly because my maths is terrible, although not as bad as my handwriting, but it is still terrible. When I tried [Elementary OS][elementary-link] this was my first test, as it was with the other flavours before, check that I can do calculations, _it is the small things_.

For this reason, I have gone with [the synapse launcher](https://launchpad.net/synapse-project).

### <s>Slingshot</s> Synapse

To use Synapse Launcher, install via the following:

`sudo su`
`apt-get install -y synapse`

I have gone one step further and disabled the keyboard shortcut for the slingshot launcher via `settings` -> `keyboard` -> `shortcuts` -> `Applications` and in the right panel, simply click on the `Applications Launcher` and press delete. Then, open `synapse` and in the top right (in the indicator bar), right click and select preferences. This will bring up a dialogue, in the **shortcuts** section, click the shortcut input for **Activate** and replace it with `cmd`+`space`. Synapse will now be your default search tool for the OS.


### Design

The one thing I have become to enjoy with Mac OS is the simple and plain design on the UI along with its key bindings and so on. ElementaryOS has been designed very, very well, which has helped the transition I am sure. Not much more I can say about that, without repeating myself.

### My issues

I have found a few issues, but nothing that can't be <s>ignored</s> fixed.

 - I have found Slingshot can fail, but the fix is more than simple: `killall slingshot`. (this has been negated so far by using synapse)
 - Wingpanel can take a few minutes to start up at time
 - When using full screen in an application, you are able to have multiple applications for that screen. If you have an application in full screen along with another non full screen application, wingpanel (the indicator bar) is also shown with a transparent background.

Apart from the list above, I have found it a pleasant experience, hence why I have stayed.

### Thoughts

So far I have been really impressed with what the team of ElementaryOS have done. Part of me wants to move up the family tree to Debian, but I think that will be a while yet. I have been using ElementaryOS since a week before Christmas 2015 and I have even stopped using Mac OS at work and I am just working off my MacBook Pro. Even further than that, I have been looking replacing my MacBook Pro with a non Apple device. Baby steps first though...

Things like multiple screens for displays are also good, was a bit frustrating at first as only the primary screen can be used for multiple screens and any other added display only has one screen. I have learnt to use this to my advantage. For instance, I will have my secondary monitor for PHPStorm (or main application for the moment) and my laptop display for any other application that is in full screen. This way I can switch between email, Slack, Chrome, Terminal and so on on my laptop display whilst still having my main application in focus (when I say focus, I mean I can use `cmd`+`left key/right key` to switch between screens on my laptop, but, to use the app in the screen I have selected I must `alt`+`tab` to that app).

For a Mac OS user, it is hard to do the switch from one OS to another, and for many reasons. In terms of style and simplicity, and lets be honest; Mac OS is the fisher price of operating systems, I would recommend ElementaryOS for anyone thinking of switching from Mac OS, whatever their reason be.

[elementary-link]: https://elementary.io/