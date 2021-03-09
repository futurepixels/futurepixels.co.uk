
+++
description = "Fixing issues with Linux kernel not updating and killing boot sequence"
title = "Fixing issues with Linux kernel not updating and killing boot sequence"
date = "2021-03-09T00:00:00Z"
+++

Over the weekend I updated my favourite rolling release of my Linux distro, [Solus-Project](https://getsol.us/blog/). I looked through the updates, like I always do and seen there were some updates - one including the Linux kernel! Later that day I shut the PC down and went about the rest of my day.

Yesterday I needed to get back on my PC to do something and it wasn't booting - God damn it! Not all is lost though, this is Linux and with the power of Linux there is _something_ out there on the big web that can help - before I use my small circle of friends if they've had this.

After some searching on [DDG](https://duckduckgo.com/) I found the command I was trying to get to for when booting failed once it passed the boot screen and boot loader - `ctrl+alt+F2`. Once I logged in with my normal user credentials I found [this](https://getsol.us/articles/troubleshooting/general-troubleshooting/en/) article on the Solus Project help forum and run the suggested command; `CBM_DEBUG=1 clr-boot-manager update`. This allowed me to run the `update` command and get the debug output I needed - thank you to people who add good logging!

The results shown that there was no space on my device... odd. Then the dredd hit me - I didn't set the boot partion to a large size, because.. well I thought it would be fine. The size you ask, it was 512Mb... I know.

So as I dual boot, I booted into my Windows partion downloaded [Rufus](https://rufus.ie) and the [Solus-Project ISO](https://getsol.us/download/) and set them to work together to create me a bootable USB. Once booted I tried to re-size my partition labeled `BOOT` and quickly found ... I can't.

Next step, purge the old versions. I thought that `clr-boot-manager` would have a command to purge something by date or "keep recent versions" but it doesn't have that:

```
$ clr-boot-manager -h
Usage: clr-boot-manager

        version - Print the version and quit
  report-booted - Report the current kernel as successfully booted
           help - Show help message
         update - Perform post-update configuration of the system
    set-timeout - Set the timeout to be used by the bootloader
    get-timeout - Get the timeout to be used by the bootloader
     set-kernel - Configure kernel to be used at next boot
   list-kernels - Display currently selectable kernels to boot

Options:
  -p, --path           Set the base path for boot management operations.
  -i, --image          Force clr-boot-manager to run in image mode.
  -n, --no-efi-update  Don't update efi vars when using shim-systemd backend.
```

So, I had to do it myself. Boot into my USB drive and the Solus Live image worked a treat -

```
sudo su
mount /dev/MY_BOOT_PARTITION /boot
xdg-open /boot
```

In here had all my boot partitions under `/EFI`. Once I am in there `com.solus-project` and then change to a list view and order by most recent. Here I could remove the oldest ones from the past few years. Once that was done I needed to set the kernel to the latest version with `clr-boot-manager set-kernel com.solus-project.current.5.10.15.172` (find your available kernels with `clr-boot-manager list-kernels` - the one with the `*` on the left is the one that is set).

Once done, `reboot now` and all works again!

The lesson I was taught here; set something more sensible for the boot partition - 512Mb is just stupid when using a rolling release. The bonus is if I do need to re-install Linux (and Windows in tthis case) then I have a partition `/home` so that wouldn't be affected - my Windows partition would though from what I can tell...
