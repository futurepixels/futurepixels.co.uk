
+++
description = "Setting up Rancher (with Digital Ocean)"
title = "Setting up Rancher (with Digital Ocean)"
date = "2018-08-02T00:00:00Z"
+++

# <a href="#what-is-rancher" id="what-is-rancher">What is Rancher?</a>

[Rancher] comes in two parts (the first being optional). You have the [Rancher Distro] and the [Rancher Orchestration Tool] (I am currently using 1.6, which is where the docs point too).

The first part is the [Rancher Distro]. This is pretty awesome. I know, "_another distro_" I can hear you say - but this is pretty clever: it is a distro for [Docker]. It is built entirely on Docker in that you can replace the core parts of the system with a simple command which swaps the core part out by stopping the current Docker container with the new option running in Docker. Want to use the Debian, Ubuntu or Centos console for example, you can do. Configuration is easy enough too as it uses a [cloud-init] based configuration which is a standard for system templates. _Note that this won't be required in this walk through._

For example, if you want to provision a new instance you can set your SSH keys in the `cloud-init.yml` like so:

```
ssh_authorized_keys:
  - ssh-rsa AAA...ZZZ user@example
```

This way, when you provision the new server, you will have your ssh key set up straight away on that instance. This can extend to things like DNS settings, static IP addresses and so on.

> I've used this locally on my [HP Micro Server] and it worked really well but my home connection was a dynamic IP address and the server is not much of a spec for what I wanted. So, if you have a server at home you can replace the [Digital-Ocean] parts with the steps you need to run on your server.
>
> Alternatively, if you have Virtual Box or similar installed then you can grab [RancherOS](https://github.com/rancher/os/releases) and try it out.

The second part is the management portal. This is the UI that allows you to manage multiple hosts with multiple containers. I have three hosts currently, one which runs my [Rancher Orchestration Tool] and [Kanboard] and another for my [GitLab] instance. The third is for someone I manage a website for.

When running [Rancher] you are able to manage all your containers on a single host but are still able separate them out. These are called stacks.

![An example of a Rancher stack](/img/posts/setting-up-rancher-with-digital-ocean/stack-example.png)
[fig 1.1]

As you can see above (fig 1.1), I have two stacks. The first is for my certificates via [LetsEncrypt] and the second is my [GitLab] stack, this contains GitLab, a runner and the load balancer.

I am able to drill down into each service and modify as I need (fig 1.2).

![An example of a service in Rancher](/img/posts/setting-up-rancher-with-digital-ocean/service-example.png)
[fig 1.2]

You get a fair amount of control and access:

![Container context menu](/img/posts/setting-up-rancher-with-digital-ocean/container-context-menu.png)
[fig 1.3]

You can manage the container by restarting, stopping or deleting it as well as executing the shell and viewing the logs (providing the container has been set up with logs being sent to stdout and stderr) (fig 1.3). You are able to then drill down further into the container to see system statistics and other information (fig 1.4).

![An example of container information](/img/posts/setting-up-rancher-with-digital-ocean/container-example.png)
[fig 1.4]

One of the favourable parts of [Rancher] from my point of view is the upgrading process. Out of the box, it supports [Blue Green Deployments](https://www.martinfowler.com/bliki/BlueGreenDeployment.html). In a nut shell, it allows ease of rollbacks when deploying new versions of software whilst harnessing the power of [Docker]. For example; if I have a web site and I want to change the background from white to grey, I build the docker image via [my CI pipepline](/posts/my-gitlab-ci-cd-pipeline-overview/) and then deploy it via the Rancher API and tell it to *not* finish the upgrade process. As you can see in fig 1.5, I have two containers which are both the same application but different tags. If the new tag was broken for what ever reason after the deployment then I can easily rollback to the last working state by clicking on "Rollback" on the context menu for the service (fig 1.2).

![An example of a container upgrade](/img/posts/setting-up-rancher-with-digital-ocean/upgrading-container-example.png)
[fig 1.5]

> The Rancher API is _very_ powerful and allows you to do a fair amount of automation with it, which is great from a DevOps point of view. To help with this there is a great tool out there [cdrx/rancher-gitlab-deploy](https://github.com/cdrx/rancher-gitlab-deploy#help) where if you use Docker as part of you pipeline, you are able to run this to do most of the communication to your Rancher API.

_You can run [Rancher] locally (providing you have [Docker] installed) by running:_

```
sudo docker run -d -v ./:/var/lib/mysql --restart=unless-stopped -p 80:8080 rancher/server
```
and then point to `localhost` and you should see the UI ready for you to set up.

# <a href="#setting-it-up-with-digital-ocean" id="setting-it-up-with-digital-ocean">Setting it up with Digital Ocean</a>

Now, for people that have not used [Digital-Ocean] this is a great tool for cloud based infrastructure. It makes building an infrastructure quick and easy, and gives you management for the VM's as well as DNS management, load balancing, firewalls and so on...

I'm not going into it more than that as they have so much to give - including an amazing range of [community tutorials](https://www.digitalocean.com/community/tutorials) to help you along (which have helped me a numerous amount of times).

_The following section is for people with a [Digital-Ocean] account. If you don't have one, I have a [Digital-Ocean referral link] which will give you $10 credit. It really is cheap to spin up droplets, even if you wanted to try something for a few hours._

_**Please be warned, this could charge you money depending on if your account has a credit or not**_

To get the [Rancher Orchestration Tool] up and running on [Digital-Ocean], follow these steps:

 - Select a project you already have or create a new one for this particular exercise.
 - Click on "Create a Droplet" (once this starts running, you will be charged by the hour)
 - Select the tab named "Container distributions" and then choose "RancherOS" then "v1.4.0" (fig 2.1)

![Choosing RancherOS as the OS for a Digital Ocean Droplet](/img/posts/setting-up-rancher-with-digital-ocean/choosing-rancheros-in-digital-ocean.png)
[fig 2.1]

 - Next, select the Droplet you want to run with. _I am running mine on a Droplet that is 2GB of memory and 2vCPUs and is $10/mo or $0.015/hr, so even for four hours of playing around then it will still only cost $0.06_
 - Select the data center region (I've chosen "London" as I'm a UK resident)
 - The next part is important, "Add your SSH keys". On this particular Droplet you must use your (local) SSH key otherwise you will not be able to create the Droplet. If you haven't uploaded one yet, click the "New SSH Key" and you can paste the contents of you *public*  key within this process. Please remember to only paste the contents of your `.pub` key.
 - Then, under "Finalize and create" keep the Droplet count at one. Update the hostname if you wish and add some tags like "ci cicd-management rancher"

Now, hit that "Create" button and you will be taken to your project page with the Droplet having been created (fig 2.2).

![A successful Droplet created](/img/posts/setting-up-rancher-with-digital-ocean/droplet-created.png)
[fig 2.2]

![The Droplet dashboard header](/img/posts/setting-up-rancher-with-digital-ocean/droplet-dashboard-header.png)
[fig 2.3]

Once you Droplet has booted, copy the IP address and you should now be able to SSH into your local machine with `ssh rancher@<droplet-ip-address>` and you will be asked the following, type in "yes" and you should now be logged into you Rancher OS droplet.

```
The authenticity of host '<droplet-ip-address> (<droplet-ip-address>)' can't be established.
ECDSA key fingerprint is SHA256:ABC...XYZ.
Are you sure you want to continue connecting (yes/no)?
```

Once in, paste the following snippet to get your UI up and running:

```
sudo docker run -d -v /var/lib/mysql:/var/lib/mysql --restart=unless-stopped -p 80:8080 rancher/server
```

Broken down, it does the following:

 - `docker run -d`: run the container in the background and print the container ID
 - `-v /var/lib/mysql:/var/lib/mysql`: mount a volume between the host OS and the guest OS
 - `-p 80:8080`: map port `80` to `8080` as the container only makes port `8080` public
 - `--restart=unless-stopped`: this is like a fail over, so if it crashed then start the container back up, unless you as the user runs `docker stop {docker-id}`
 - `rancher/server`: the Docker image name to be downloaded and used

After about a minute or 2 copy the IP address in your Droplets dashboard and paste & go in your browser and you should see a "Welcome to Rancher" modal (fig 2.4).

![Welcome to Rancher modal](/img/posts/setting-up-rancher-with-digital-ocean/rancher-welcome-modal.png)
[fig 2.4]

# <a href="#setting-up-rancher">Setting up Rancher</a>

Now you have it up and running, you need to set up your instance.

> [Optional]  
> Point something like `infra.your-domain.com` at your Droplets IP address and then add that in the "Host Registration URL" under the "Something else" input (fig 2.5). Save that then you are ready to set up security.

![Adding your URL to Rancher](/img/posts/setting-up-rancher-with-digital-ocean/host-registration.png)
[fig 2.5]

In the top menu you will see "Admin" in there, then you should see "Access Control", click it. Here you have an array of options (fig 2.6).

![Choosing your preferred authentication](/img/posts/setting-up-rancher-with-digital-ocean/choosing-authentication.png)
[fig 2.6]

> I've gone with GitHub as I am able to manage users with ease when I need to add/remove access.

Once you have followed the instructions for your preferred method, you are now ready to add a host. The path I am taking is with a new host via [Digital-Ocean] for simplicity. Create another Droplet within your project and this time select "One-click apps" and select "Docker 17.12.0~ce on 16.04" and select the 1GB, 1vCPU for $5.00/mo. Once that has generated take note of the IP address of the new Droplet. Within Rancher, select "Infrastructure" > "Hosts" and select the "Add Host" option (fig 2.7).

![Add a host for Rancher to manage](/img/posts/setting-up-rancher-with-digital-ocean/add-host-for-rancher-to-manage.png)
[fig 2.7]

You will notice that there are 4 options to create a host - these are Machine drivers. They allow you to connect to your infrastructure with ease, so for example; we've created a Droplet via the [Digital-Ocean] dashboard where we _could_ use an API key for our account and to have [Rancher] create is for us... Awesome! However, I would like to go with creating it via [Digital-Ocean] so we understand what is happening under the hood.

You will start this process with "Custom" selected, keep that option selected and paste the IP address of the Docker Droplet we created in the [Digital-Ocean] dashboard. Once pasted, the content in step 5 will have updated and this IP address will be added to the command. Copy that, click "Close" and open up a terminal on your local machine and type `ssh root@<droplet-ip-address>` and then it will ask the following:

```
The authenticity of host '<droplet-ip-address> (<droplet-ip-address>)' can't be established.
ECDSA key fingerprint is SHA256:ABC...XYZ.
Are you sure you want to continue connecting (yes/no)?
```

Type `yes` and you should now be logged into your droplet. Now paste the command you copied from your [Rancher] UI and you should now see that host appear in your [Rancher] UI.

Now we are going to set up our first deployment of an app. We are going basic and will deploy WordPress.

Click on "Catalogue" and search for WordPress. When you've found it click on "View Details" and leave fields as they are with the default values and click "Launch".

You should now see something similar to fig 2.8. Once the status' on the left column are all showing as "Active" then head over to the IP of the new host. Go to `/admin` for the admin panel and use "admin" and "bitnami" as the username and password.


![Provisioning a host for Rancher to manage](/img/posts/setting-up-rancher-with-digital-ocean/provisioning-host.png)
[Fig 2.8]

You _should_ now see the WordPress admin panel like below (fig.2.9). 

![Successfully deployed WordPress via Rancher](/img/posts/setting-up-rancher-with-digital-ocean/wordpress-admin.png)
[Fig 2.9]

If so you have successfully deployed your first app via [Rancher], congrats.

![Congratulations and thank you for reading](https://media.giphy.com/media/wZjlCH43M3M0U/giphy.gif)

_**Please don't forget to destroy them Droplets!! You can do this by selecting the "Destroy" option in the Droplet's context menu [fig 2.10].**_

![Don't forget to destroy the droplet](/img/posts/setting-up-rancher-with-digital-ocean/destroy-droplets.png)

 [Rancher]: https://rancher.com
 [Rancher Distro]: https://rancher.com/rancher-os/
 [Rancher Orchestration Tool]: https://rancher.com/docs/rancher/v1.6/en/
 [Digital-Ocean]: https://digitalocean.com
 [Digital-Ocean referral link]: https://m.do.co/c/7ceb48d8e994
 [Docker]: https://docker.com
 [cloud-init]: https://cloud-init.io
 [HP Micro Server]: /posts/creating-a-linux-virtual-machine-server-with-the-hp-microserver-gen-8-server
 [Kanboard]: https://kanboard.org
 [GitLab]: https://gitlab.com
 [LetsEncrypt]: https://letsencrypt.org/
