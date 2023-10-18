+++
title = "Using --legacy-peer-deps in NodeJS"
description = "Should, or should you not use --legacy-peer-deps. If so, when should you use it?"
date = "2023-10-18T22:10:00Z"
+++

## Let me set the scene…

At the time of writing this, I'd have been writing code for a little over two decades. Professionally, I’ve been doing it for thirteen years, and the past two years I’ve been working purely in the wonderful land of JavaScript as both a senior software engineer and then a lead engineer.  

Why is this important? Well, two weeks ago I was doing a routine update on bumping versions of our NPM packages - as an engineer I understand that keeping packages up-to-date is good practice for reasons like being able to use the latest API’s from packages, as well as ensuring any security holes are filled in when a Common Vulnerabilities and Exposures \[[CVE](https://www.redhat.com/en/topics/security/what-is-cve)\] is created. I’ve been really keen to keep the code I maintain up-to-date so I know that I am lowering the risk of both the company I work for as well as our clients. Not a bad way to think, right?

Well, a couple of months ago we were updating packages as part of this routine, and out of a reporting tool we use to make us aware of this potential security issues (for the curious readers, we use [Snyk.io](snyk.io)). However, I was presented with this issue:

```
npm WARN While resolving: @phenomnomnominal/tsquery@4.1.1
npm WARN Found: typescript@5.0.4
npm WARN node_modules/typescript
npm WARN   typescript@"5.0.4" from the root project
npm WARN   8 more (@commitlint/load, cosmiconfig-typescript-loader, ...)
npm WARN
npm WARN Could not resolve dependency:
npm WARN peer typescript@"^3 || ^4" from @phenomnomnominal/tsquery@4.1.1
npm WARN node_modules/@phenomnomnominal/tsquery
npm WARN   @phenomnomnominal/tsquery@"4.1.1" from @nrwl/jest@15.9.2
npm WARN   node_modules/@nrwl/jest
npm WARN   3 more (@nrwl/js, @nrwl/linter, @nrwl/react)
npm WARN
npm WARN Conflicting peer dependency: typescript@4.9.5
npm WARN node_modules/typescript
npm WARN   peer typescript@"^3 || ^4" from @phenomnomnominal/tsquery@4.1.1
npm WARN   node_modules/@phenomnomnominal/tsquery
npm WARN     @phenomnomnominal/tsquery@"4.1.1" from @nrwl/jest@15.9.2
npm WARN     node_modules/@nrwl/jest
npm WARN     3 more (@nrwl/js, @nrwl/linter, @nrwl/react)
npm notice
npm notice New major version of npm available! 9.5.1 -> 10.2.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v10.2.0
npm notice Run npm install -g npm@10.2.0 to update!
npm notice
npm ERR! code ERESOLVE
npm ERR! ERESOLVE could not resolve
npm ERR!
npm ERR! While resolving: @testing-library/react-hooks@8.0.1
npm ERR! Found: @types/react@18.0.35
npm ERR! node_modules/@types/react
npm ERR!   dev @types/react@"18.0.35" from the root project
npm ERR!   @types/react@"*" from @types/react-dom@18.0.11
npm ERR!   node_modules/@types/react-dom
npm ERR!     dev @types/react-dom@"18.0.11" from the root project
npm ERR!     @types/react-dom@"^18.0.0" from @testing-library/react@14.0.0
npm ERR!     node_modules/@testing-library/react
npm ERR!       dev @testing-library/react@"14.0.0" from the root project
npm ERR!   3 more (react-focus-lock, use-callback-ref, use-sidecar)
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peerOptional @types/react@"^16.9.0 || ^17.0.0" from @testing-library/react-hooks@8.0.1
npm ERR! node_modules/@testing-library/react-hooks
npm ERR!   dev @testing-library/react-hooks@"^8.0.1" from the root project
npm ERR!
npm ERR! Conflicting peer dependency: @types/react@17.0.68
npm ERR! node_modules/@types/react
npm ERR!   peerOptional @types/react@"^16.9.0 || ^17.0.0" from @testing-library/react-hooks@8.0.1
npm ERR!   node_modules/@testing-library/react-hooks
npm ERR!     dev @testing-library/react-hooks@"^8.0.1" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR!
npm ERR! For a full report see:
npm ERR! /home/node/.npm/_logs/2023-10-11T09_37_53_642Z-eresolve-report.txt

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/node/.npm/_logs/2023-10-11T09_37_53_642Z-debug-0.log
```

You will notice that there are three things going on in this sea of text. The first half is a warning about conflicting dependencies, the second part is a notice of a new version of npm, and the third is an error - this is the part we are going to focus on.

Like any coder will do, I took to Google and other repositories I had access too for insight. After some [reading](https://github.blog/2021-02-02-npm-7-is-now-generally-available/#peer-dependencies) (and yes, it did involved multiple StackOverflow post’s), I found that this was a “common” problem. However, I failed my stars and stripes I’d earned from my time in the field and took the advice of various posts and examples, and added `--legacy-peer-deps`, I ran the test suite and everything passed - awesome work Nigel \o/!

However, two weeks ago I tried to update some packages, this then presented another issue . I updated some packages and my tests started to fail. This sent me into a rabbit hole in which I can't remember how to re-create the issue - annoyingly.

## WTF! How?! Why?! FFS NPM!

As you can imagine, the NodeJS/JavaScript/NPM’s eco system  is crazy and were put to blame straight away. So, I called up one of the team and explained the crazy shit that it’s doing and they straight away asked “do you use legacy peer deps?”… "Yeah" - I paused, and continued with “why?”. My delayed response was me realising that I’d blindly used something I was not fully knowledgable about, for various reasons. Unfortunately, the main reason for this was speed - something that’s been reflected on the since as my knowledge on NodeJS/JavaScript is not comparable to what it was when I was a PHP programmer. It was here I realised that I had failed myself as an engineer...

I had also blamed the tool, that’s not something I should be doing!

## Come on, back to the issue at hand please...

So, there is an issue using `--legacy-peer-deps`. What it’s doing is just forcing packages to install, but not in a good way.

Why is this an issue? Glad you asked. This is an issue as it will cause issues - like above, where you have mismatched peer dependencies - where it will allow your newly required package to use the version of the peer dependency you have installed already - even if it’s lower or higher than what it’s using.

Here’s a contrived example in a new directory:

```
npm init --yes # --yes just creates a new project with defaults
npm install --save react@17.0.2
npm install --save-dev @testing-library/react@14.0.0
```

Here you will see you get the following output

```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR!
npm ERR! While resolving: npm-install-playground@1.0.0
npm ERR! Found: react@17.0.2
npm ERR! node_modules/react
npm ERR!   react@"^17.0.2" from the root project
npm ERR!
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^18.0.0" from @testing-library/react@14.0.0
npm ERR! node_modules/@testing-library/react
npm ERR!   dev @testing-library/react@"14.0.0" from the root project
npm ERR!
npm ERR! Fix the upstream dependency conflict, or retry
npm ERR! this command with --force or --legacy-peer-deps
npm ERR! to accept an incorrect (and potentially broken) dependency resolution.
npm ERR!
npm ERR!
npm ERR! For a full report see:
npm ERR! /home/nigel/.npm/_logs/2023-10-10T10_02_28_467Z-eresolve-report.txt

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/nigel/.npm/_logs/2023-10-10T10_02_28_467Z-debug-0.log
```

So, what’s this telling us. Well, the important information we want here is in the following:

```
npm ERR! Could not resolve dependency:
npm ERR! peer react@"^18.0.0" from @testing-library/react@14.0.0
npm ERR! node_modules/@testing-library/react
npm ERR!   dev @testing-library/react@"14.0.0" from the root project
```

This is basically saying that `@testing-library/react` is expecting React to be version 18. But, we explicitly installed React version `17.0.2` in ***our*** package.json dependencies object, which will look like this:

```
"dependencies": {
  "react": "^17.0.2"
},
```

So, why is this an error? Well, imagine a less contrived example where you are installing something you need but are not running the latest version of a package. If you install with `--legacy-peer-deps` you are saying “I know package `@testing-library/react` requires `react@^18.0.0`, but I want to stick with version `^17.0.2` and use `@testing-library/react@14.0.0` anyway”. The danger here is that if in our example the package `@testing-library/react` was using a new API only available to `React@&18.0.0` then this could potentially break the functionality and in theory your tests could fail. This then interrupts the dev joy of your job as you are going to be debugging this issue from the next 10 minutes to the next couple of hours, then you’ll be asking others if they’ve seen it on a channel in Slack, and, as programmers we have a nature of curiosity - that could then interrupt their tasks and send them down a rabbit hole, which you then end up on a call with one or more people trying to help you and approach it in different ways - which will cause more frustration and pain as you go down the rabbit hole together and not realise the real issue at hand ... argghhhhh!

The long an short of it, don’t just install packages without due-diligence checks. Check if the peer dependencies (run `npm ls <pkg> peerDependencies` to fine out) in the required packages match **your** dependencies. If the peer dependency is set too version `^18.2.9` but your local version of it is `18.1.2` then upgrade _that_ package first. Understand that the tooling is there to help you, not block you because it’s a “badly designed language” or what ever other excuse people throw at the language. This is a fundamental foundation of any tooling - take the time to understand what the issue is and understand why it’s blocking you.

## That’s great and all, but how do I find the problem exactly?!

The best way to solve the issue proactively is to run `npm install` from the start, but **without** the `--legacy-peer-deps` flag! But, you're here because the dreaded flag has been used.

The way to fix it... remove `--legacy-peer-deps` from your install command. Both locally, in your CI scripts/config and your Dockerfile scripts. I know, it's going to cause you a possible world of pain. But as a software engineer you should be thinking long term and not short term - you got this! You will now need to go through each broken dependency.

_To put the above into perspective around pain, it's taken me over a week to try to sort this issue and now it's done, I know I have the confidence in knowing that I understand how npm manages it's packages. However, if you've inherited this issue then there are ways to sort it._

NPM give's you some nice tools. The first is the early warning lights as you've seen here at the start of this article. The other is running `npm ls --all`. [npm-ls](https://docs.npmjs.com/cli/v7/commands/npm-ls) will print out all packages, their version, as well as their dependencies. An example:

```
npm ERR! code ELSPROBLEMS
npm ERR! invalid: react@17.0.2 /tmp/npm-playground/node_modules/react
npm ERR! missing: react-dom@^18.0.0, required by @testing-library/react@14.0.0
npm-playground@1.0.0 /tmp/npm-playground
├─┬ @testing-library/react@14.0.0
│ ├─┬ @babel/runtime@7.23.2
│ │ └── regenerator-runtime@0.14.0
│ ├─┬ @testing-library/dom@9.3.3
--- 
│ ├─┬ @types/react-dom@18.2.14
│ │ └─┬ @types/react@18.2.29
│ │   ├── @types/prop-types@15.7.9
│ │   ├── @types/scheduler@0.16.5
│ │   └── csstype@3.1.2
│ ├── UNMET DEPENDENCY react-dom@^18.0.0
│ └── react@17.0.2 deduped invalid: "^18.0.0" from node_modules/@testing-library/react
└─┬ react@17.0.2 invalid: "^18.0.0" from node_modules/@testing-library/react
  ├─┬ loose-envify@1.4.0
  │ └── js-tokens@4.0.0
  └── object-assign@4.1.1
```

> To shorten the output on the larger projects, run `npm ls --all | grep -e invalid -e UNMET` - this should give you an easier list to read ;)

Here, it's telling us as clear as day that there are two issues:

**Issue one:**

`react-dom` is missing due to it being an unmet dependency for `@testing-library/react`; running `npm info @testing-library/react peerDependencies` will output the following `{ react: '^18.0.0', 'react-dom': '^18.0.0' }`.

The fix at this point would be to run `npm i react-dom --legacy-peer-deps` (because we will get the peerDependencies issue without the `legacy-peer-deps` flag). Now the error "UNMET DEPENDENCY react-dom@^18.0.0" will not be there when running `npm ls --all` again.

**Issue two:**

`react` is invalid as `@testing-library/react` is requiring version `^18.0.0`; Run `npm outdated react` and you should see a list containing `react`.


 ```
 Package  Current  Wanted  Latest  Location            Depended by
react     17.0.2  17.0.2  18.2.0  node_modules/react  npm-playground
react     17.0.2  18.2.0  18.2.0  node_modules/react  react-dom
react     17.0.2  18.2.0  18.2.0  node_modules/react  @testing-library/react
```

You can see here that the latest version at the time of writing this article is at `18.0.2`, you can either run `npm i react@latest`, or `npm i @react18.2.0` for a locked version (Same goes for `react-dom`).

Once you got that list, you'll need to slowly make your way through it and fix each issue, test, commit and repeat!

Further reading:

 - https://weekendprojects.dev/posts/how-to-use-npm-legacy-peer-deps-command/#what-does-the---legacy-peer-deps-flag-do
 - https://www.codingace.com/js/npm-install-legacy-peer-deps
 - https://luisrangelc.medium.com/how-to-run-npm-install-without-using-legacy-peer-deps-flag-a16f0a573ae2
 - https://www.heatware.net/software-tips/npm-legacy-peer-deps-dependency/

References:

- https://docs.npmjs.com/cli/v9/using-npm/config#legacy-peer-deps
