+++
title = "Creating a home virtual machine server"
description = "My walk through on creating a server to host virtual machines"
date = "2017-07-01T01:11:57Z"
draft = true
+++

I am using:

 - [HP MicroServer Gen 8][HP MicroServer]
 - [Ubuntu Server][Ubuntu server]
 - A laptop with Linux installed as my local machine (This means that I can only provide Linux commands and software that I will be using)

## My HP MicroServer

 - 8GB Ram
 - Intel Celeron Processor (2 core)
 - 1x 320 HDD
 - 2x 1TB HDD

> Precursor:
>
> I have set up my server a while ago and am not sure what I did during the config.

## Step one - Install the server

Download the Ubuntu Server ISO [here][Ubuntu server] and follow [this](futurepixels.co.uk/posts/installing-an-iso-to-a-usb-stick/) guide.

Using a USB input on the server (I used the internal one), insert the USB with the Ubuntu Server installer.

 - <input type="checkbox" /> **Ensure you have enabled the `Open SSH Server` and the `Virtual Machine Host` option's on installation**

 - <input type="checkbox" /> **Take note of your server's hostname** <input type="text" name="server-name" id="server-name" placeholder="Add your server name here"/>

Turn on your server and wait for it to boot - you may need to press `F11` to boot the USB drive. Follow the on screen instructions to install your Ubuntu Server instance.

### Bonus step

[Generate your SSH key][Github SSH keygen] if you haven't got one and then edit add an entry to your [SSH config file][SSH config post] with `Host <server-name>`.

Login to your server via `ssh <server-name>` and then enter your password when asked - this is due to the key not being on that server yet - via your main machine to ensure SSH is working correctly. It will ask you to answer `(yes/no)`, just confirm and you should be in your servers shell. You should now see something similar to the following:

```bash
Welcome to Ubuntu 16.04.2 LTS (GNU/Linux 4.4.0-62-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

131 packages can be updated.
61 updates are security updates.


Last login: Fri Jun 30 18:22:57 2017 from <your-client-ip-address>
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

<user>@<server-name>:~$

```

Log out by pressing `ctrl-d` (saves you having to write `exit` in the servers shell environment) and run the following on you local machines shell:

```bash
ssh-copy-id <server-name>
```

You should then be able now run `ssh <server-name>` and gain access straight away - without having to enter your password ever again - unless you have created an SSH key with a password.

## Step two - Setup the networking

I simply follow [this](http://www.havetheknowhow.com/Configure-the-server/Network-Bridge.html) article as it gives you all you need. I've settled for relying on DHCP at the moment but I will set it to static IP addresses eventually.

## Step three - Setup my first Virtual Machine

First, lets check that [KVM][KVM] has been installed correctly by running `virsh --connect qemu:///system list --all`

Now, get your OS ISO and run `scp /path/to/os.iso <server-name>:/home/<user>/` to get the ISO on the server.

You could use the command line, but I have not gone down that road and will be using [virt-manager.org] which I've installed locally. I was installed [RancherOS][Rancheros] as I want to learn Docker and devops orientated skills, but through [virt-manager.org] it is


### Caveats

 - When using [virt-manager.org], ensure you have the `Network source` set as the bridge, in my case it was `Bridge br0: Host device eno1`.

<!-- Reuseable Link shortcuts -->
[HP MicroServer]: https://www.hpe.com/uk/en/product-catalog/servers/proliant-servers/pip.hpe-proliant-microserver-gen8.5379860.html
[Ubuntu server]: https://www.ubuntu.com/download/server
[Github SSH keygen]: https://help.github.com/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent
[SSH config post]: http://futurepixels.co.uk/posts/saving-seconds-with-an-ssh-config-file/
[virt-manager.org]: http://virt-manager.org/
[Rancheros]: http://rancher.com


<script>

    var serverName  = document.getElementById('server-name'),
        searchValue = '&lt;server-name&gt;';

    serverName.addEventListener('blur', function(event) {
        var pTags = document.querySelectorAll('p,pre');

        for (var i=0; i < pTags.length; i++) {
            var tag = pTags[i];

            if (tag.innerHTML.search(searchValue) !== -1) {

                var replacement = tag.innerHTML.replace(searchValue, this.value);
                tag.innerHTML = replacement;
            }
        }

        searchValue = this.value;
    });


</script>