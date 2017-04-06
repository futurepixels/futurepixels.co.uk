---
layout: post
title: Rewriting your git history
description: There are times when you are in the flow of commiting, but then realise you made a typo or structured a sentance badly...
keywords: GIT, rebase, commit, modify commit, git commit, modify git commit
categories: tips
twitter:
  author: Nigel Greenway
---

### Editing the latest commit:

> **Important**  
> The following tip is about changing previous commits. If these commits are pushed to the remote, I would strongly advise to not mess with your history as it could break stuff

Pretty easy to do so as stated on the [git scm book#Changing the last commit][git-scm-book--amend-commit]. But a quick overview shows the simplicity:

	$ git commit --amend "Your new message"

### Editing a commit earlier in your commit history

That is great for the last commit message you just created, but what about a message type of reword that is after your latest commit message.

I have an alias set up in my git config, `ci = commit -m`. This allows me to do the following:

	$ git ci "Just done something"

This comes with it's problems though, sometimes I commit stuff like this:

	$ git ci "Add `someMethod` to add some business value"

Run a [`git lg`][my-git-log-alias] and you would see the following:

	$ git lg
	* n18e676d - (HEAD, master) Add  to add some business value (5 seconds ago)

There is a part missing from the commit message that is important for the context of the commit and allows an overview without having to look further into it, the `someMethod` part. The issue (incase you didn't spot it; I didn't escape the backtick (\`)). Easy enough to change as it was the last commit, so `git commit --amend` and show the log again:

	$ git lg
	* 62h8sy22 - (HEAD, master) Add `someMethod` to add some business value (3 seconds ago)

**Notice that the commit hash has changed from the `n18e676d` to `62h8sy22`.  
Remember, this should only be done *before* pushing your changes to the remote repository**.

Now, imagine I committed this a few commits ago:

	$ git lg
	* ch379a63 - (HEAD, your-branch) Fix #3: Popup displayed off center (7 minutes ago)
	* j82s56gh - Add new popup styling (10 minutes ago)
	* 18sg7dbp - Reduce body marging (1 hour ago)
	* n18e676d - Add  to add some business value (1 hour ago)
	* 71gv177w - Fix #28: Correct log timestamp (4 hours ago)

Now, I have **not pushed my local changes** to the remote repository so I can amend that commit, but this time I will require [rebase][git-scm-book--rebase] to help me.

I need to perform an interactive rebase, but this should be done by passing the commit hash *previous* to the one I wish to edit. In this case it will be the hash `71gv177w`:

**You will only be able to do this with a branch that has a remote that it can rebase from**

	$ git rebase -i 71gv177w

This will take you to your `$EDITOR` where you can start to modify your commit message. You will be presented with a series of steps.

Step one, select the commit you want to amend and use `reword`:

	1 pick ch379a63 Fix #3: Popup displayed off center
	2 pick j82s56gh Add new popup styling
	3 pick 18sg7dbp Reduce body marging
	4 reword n18e676d Add  to add some business value
	5 pick 71gv177w Fix #28: Correct log timestamp

Step two, modify the content of your commit, save and exit your editor.

	Add `someMethod` to add some business value

Run [git lg][my-git-log-alias] and you will see the new modified git message:

	$ git lg
	* ch379a63 - (HEAD, your-branch) Fix #3: Popup displayed off center (7 minutes ago)
	* j82s56gh - Add new popup styling (10 minutes ago)
	* 18sg7dbp - Reduce body marging (1 hour ago)
	* n18e676d - Add `someMethod` to add some business value (5 seconds ago)
	* 71gv177w - Fix #28: Correct log timestamp (4 hours ago)

## Summary

This is a great way to modify commit messages where you find a typo or a badly structured comment in your history that you have not pushed to the remote repository.

[git-scm-book--amend-commit]: https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History#Changing-the-Last-Commit
[git-scm-book--rebase]: https://git-scm.com/docs/git-rebase
[my-git-log-alias]: https://github.com/NigelGreenway/dotfiles/blob/prod/.gitconfig#L45