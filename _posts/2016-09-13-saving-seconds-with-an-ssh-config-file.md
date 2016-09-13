---
layout: post
title: Saving seconds with an ssh config file
description: A very short tip on setting up your ssh config file to ease logging into a server
keywords: ssh, config, ssh config, .ssh, .ssh config, ssh-key, ssh key, 
categories: tips
twitter:
  author: Nigel Greenway
---

### The problem

There is nothing more time consuming than typing:

	→ ssh <user>@<ip-address/hostname>
	<user>@<ip-address/hostname>'s password:

\- or -

	→ ssh -i /some/path/to/my/ssh/key <user>@<ip-address/hostname>

Seriously, do this multiple times a day, with the added annoyance of entering long server hostname's like `btables@lower.low.some-env.dept-name.my-company.co.uk` along with passwords incorrectly entered (and done so in multiple time's). That, as well as logging into the wrong server can cause lost time and on them rare occasions, headaches caused by working on the wrong server. It happens. It's not something just done by junior sys admins. When you are under stress or just simply not concentrating on what you are doing, you will make mistakes.

### A solution

The solution for this, creating an SSH configuration file. This allows a one place storage for your connections.

A simple configuration that will ask for a password will look like this:

	Host staging
	    Hostname lower.low.some-env.dept-name.my-company.co.uk
	    User     btables

Now it will be as simple as 

	→ ssh~ staging
	btables@lower.low.some-env.dept-name.my-company.co.uk's password: 


The even simpler way to do so is to actually use an SSH key. The best information on setting up an SSH key is over at [Github.com][github-ssh-key]. There are major benefits to this, the two main ones are that it is more secure than just using a password and if an employee is dismissed/leaves or a laptop/desktop/mobile device is stolen, then you can simply remove the SSH key from the `authorized_keys` file with ease. Generate a bash or provisioning script and you can update multiple servers within seconds.

For this, your configuration file will look like:

	Host staging
	    Hostname     lower.low.some-env.dept-name.my-company.co.uk
	    User         btables
	    IdentityFile ~/.ssh/company_key

Now, run the same command and you will just get the server console, no password:

	→ ssh staging
	btables@server-name:~$ 


As with anything in devops, it's the little things that allow you to be more efficient and enjoy work that little bit more...

[github-ssh-key]: https://help.github.com/articles/generating-an-ssh-key/