+++
title = "Improving my productivity and context switching with git worktrees"
description = "As an engineer, context switching is hard. When you are knee deep in solving a problem, debugging or just in that zen flow - until that notification comes through that prod is down. Git worktree's are here to save you!"
date = "2025-10-26T22:10:00Z"
+++

### Let me set the scene.

You are knee deep in focus with an interesting problem to solve, debugging something that's been bugging you for ages or just in the flow of crafting your code in your project. Now come's along that notification in Slack, Discord, email, what ever else is there to grab you out of your flow telling your that "PRODUCTION IS DOWN" (or that pesky project manager/product owner asking to "INVESTIGATE THIS COOL IDEA!").

You open up the message and see there is a distraction of some kind. You look at the logs and can't see what's happening. Thinking on your feet you realise running locally might be easier to understand. You go back to your favourite editor and you realise you have files you have modified, created and have got a load of stuff there in your staging area within git. The usual flow would be to take a deep breath, sigh with frustration and then run `git stash save`. Then you forget you have unstaged files, so you need to `git stash apply` and then `git add .` followed by `git stash save`. Once done you `git checkout main`, `git pull` and then clean down your workspace and then rebuild and run locally with your build tools. 

Good work, you completed the task that distracted you. People are clapping you as you walk down the corridor to get that well deserved hot drink you've been putting off all morning because you've been in the zone.

You then you then get back to your desk. And suddenly remember - you made a change in a package that is a dependency, and you don't remember which file it was which took you ages to track it down! You realise you are going to have to do that again! /facepalm

Okay, this is a silly example, but I'm sure you get the picture.

### Introducing "worktree"'s in git

#### Summary

Git "worktrees" allow you to switch context without you having to "close down" the context on what you are currently working on.

For a little more context, when you run `git clone git@my-org:my-repo.git` you are pulling everything down into a "worktree". This will include all your files of your project and put your git setup in a directory of `.git` within that project.

Introduced in `Git@2.5.6`, a "worktree" is a self contained directory within your git repository that points to a given branch. This allows you to have a directory per branch. The only limitation for you - as the engineer, is that a branch can only be referenced once - meaning that you can't have more than one "worktree" pointing at the same branch. In it's simplest form, you are copying the contents of a branch and shoving it in a directory.

Let's get stuck in. For best effect, it's better to use a cloned repository with the `--bare` flag. This will bring down the repository, but there will be no `.git` directory. This is because with the `--bare` flag, your clone of the repository _is_ the git directory. This should make sense shortly .. 

Below is what you would see in a bare repo. Imaging you have the branch on remote; `main`.

```
drwxrwxr-x  4 nigel nigel  140 Oct 26 23:42 .
drwxrwxrwt 32 root  root   700 Oct 26 23:43 ..
-rw-rw-r--  1 nigel nigel 1844 Oct 26 23:42 commit
-rw-rw-r--  1 nigel nigel   66 Oct 26 23:42 config
-rw-rw-r--  1 nigel nigel   21 Oct 26 23:42 HEAD
drwxrwxr-x  4 nigel nigel   80 Oct 26 23:42 objects
drwxrwxr-x  4 nigel nigel   80 Oct 26 23:42 refs
```

So, let's get going with the first "worktree"! Let's imagine you want to have the main branch as a "worktree".

`git worktree add main` would add a directory of `main` in to the root directory structure and checkout the `main` branch. Running `ls -l` will now show the following:

```
total 12
drwxrwxr-x  6 nigel nigel  180 Oct 26 23:44 .
drwxrwxrwt 31 root  root   680 Oct 26 23:44 ..
-rw-rw-r--  1 nigel nigel 1844 Oct 26 23:42 commit
-rw-rw-r--  1 nigel nigel   66 Oct 26 23:42 config
-rw-rw-r--  1 nigel nigel   21 Oct 26 23:42 HEAD
drwxr-xr-x  2 nigel nigel   60 Oct 26 23:44 main <-- New directory of `main` here
drwxrwxr-x  4 nigel nigel   80 Oct 26 23:42 objects
drwxrwxr-x  4 nigel nigel   80 Oct 26 23:42 refs
drwxr-xr-x  3 nigel nigel   60 Oct 26 23:44 worktrees <-- New directory with all of your "worktrees"
```

If you `cd` into `main`, you will now see your code which you can add, delete or modify to your hearts content.

Now, lets go with one of the above scenarios: you have a production issue and you want to replicate it and possibly need to create a hotfix. 

You are currently in a "worktree" of "Add-cat-gifs" with several changes spread across additions and deletions in files, adding of files and deletion of files. Running `cd ../main && git pull && git worktree ../hotfix -b hotfix-branch` will pull down the latest commits from `main` and generate a new working tree in your git repo. You can then `cd ../hotfix` into that "worktree" and you will see that there are no files with any changes - you have a clean staging area!

_Notice the `../` preceding before "hotfix" with each "worktree" being it's own directory, you will need to make sure you create a "worktree" in the correct path. You will always need to run the `add` command either in the root of you project directory, or prepend `../` to it if you are create _from_ a worktree that you are in._

_Another note here is that when you create a new work tree, it will branch off from where you are currently (eg: `main`). This means that if you had committed three changes to `branch-a` and ran `git worktree add ../hotfix -b hotfix-branch`, then you would be bringing them over with the new branch and risk creating a merge request with not only the hotfix changes, but the changes from `feature/123--Adds-cat-gifs`._

If you want to, you can pass in another argument of a commit hash which will create the new branch for that "worktree" with that commit hash as the tip like so `git worktree add my-worktree -b my-new-branch 42728112`.

In here, you can again make as many changes as you need to get that bug squashed or investigation completed. Then once you are done and have committed & pushed your changes to remote, then you can simply `cd ../Add-cat-gifs` and carry on with that feature. If you have comments on your merge request, simple change to the hotfix "worktree" and make the changes, then change back to your "Add cat gifs" "worktree".

#### Your development environment

One thing you will need to remember is that when you create a new "worktree", you will need to run your local build tasks and set up your `.env` files. So something like:

```shell
cp ../main/.env ./.env
npm i
```

### Roundup

This is a quick example of a workflow for using git "worktree"'s, but gives you an idea of a simple flow when using a newly cloned repository but with a bare clone.

Whilst you can start with an already cloned git repository, I would personally advise against this and re-cloning your project as a bare clone. Otherwise, your staging area will be dirty and you will be at risk at committing your project within your project.

For now, here's the above commands I've discussed:

```shell
git clone --bare <your-repository-url>
git worktree add main
git worktree add ../your-worktree -b your-branch

cd ./your-worktree

## you do some stuff and need to switch context

cd ../main
git worktree add ../your-new-context -b hotfix/missing-content-bug
cd ../your-new-context
```

This is a pretty quick tour of the feature, but hopefully gives you enough information to play with this really useful feature!
