+++
title = "Installing an ISO to a USB stick"
description = "When you want to test a Linux OS, it's both costly and time consuming to use portible media"
date = "2016-09-12T10:00:00Z"
aliases = [
    "/how-to/installing-an-iso-to-a-usb-stick"
]
+++

> I am working from Linux, please submit a pull request to add instructions for Windows/Mac

First thing is first, download the iso you want to use as a live disk.

To install to a usb stick, you run `sudo dd if=/location/of/the.iso of=/dev/X`, where `x` is the USB stick. To find the device you want to install, before inserting the stick run `[sudo] fdisk -l`. You should be given the following:

```bash
→ sudo fdisk -l

Disk /dev/sda: 119.2 GiB, 128035676160 bytes, 250069680 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: xxxxx-xxxxx-xxxxx-xxxxx-xxxxx

Device        Start       End   Sectors  Size Type
/dev/sda1      2048  58593279  58591232   28G Linux filesystem
/dev/sda2  58593280  58597375      4096    2M BIOS boot
/dev/sda3  74217472 250068991 175851520 83.9G Linux filesystem
/dev/sda4  58597376  74217471  15620096  7.5G Linux swap

Partition table entries are not in disk order.
```

You are looking for the line `Disk /dev/xxx: x.xGiB ...`. Take note of what is already there...

Now, insert your USB stick and run `[sudo] fdisk -l` again and you should get an extra addition. In my example above, I originally had `/dev/sda` which is my laptop HDD. After inserting the disk (below), I now have `/dev/sda` and `/dev/sdb`. I now have`sdb` which is my USB stick.

```bash
→ sudo fdisk -l

Disk /dev/sda: 119.2 GiB, 128035676160 bytes, 250069680 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: gpt
Disk identifier: xxxxx-xxxxx-xxxxx-xxxxx-xxxxx

Device        Start       End   Sectors  Size Type
/dev/sda1      2048  58593279  58591232   28G Linux filesystem
/dev/sda2  58593280  58597375      4096    2M BIOS boot
/dev/sda3  74217472 250068991 175851520 83.9G Linux filesystem
/dev/sda4  58597376  74217471  15620096  7.5G Linux swap

Partition table entries are not in disk order.
Disk /dev/sdb: 29.8 GiB, 32010928128 bytes, 62521344 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: xxxxx-xxxxx-xxxxx-xxxxx-xxxxx

Device     Start      End  Sectors  Size Type
/dev/sdb1   2048 62519295 62517248 29.8G Linux filesystem
```

I can now install my ISO to my usb stick via `[sudo] dd if=/home/<username>/Downloads/some-live-disk.iso of=/dev/sdb`.

```bash
→ sudo dd if=/home/nigel/Downloads/rancheros.iso of=/dev/sdb
83968+0 records in
83968+0 records out
42991616 bytes (43 MB) copied, 9.68235 s, 4.4 MB/s
```

You can now see above that the ISO has been copied above. You should now be able to insert onto you server/laptop/desktop and boot directly for that USB stick. Great for testing a new Linux distrubution outside of a virtual machine.

```bash
$ sudo fdisk -l
Disk /dev/sda: 298.1 GiB, 320072933376 bytes, 625142448 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x5bbb7b73

Device Boot Start End Sectors Size Id Type
/dev/sda1 * 2048 625142447 625140400 298.1G 83 Linux
```

Above, it shows I have a disk that is /dev/sda. I now want to delete this partition. There are two ways of doing this; via command line or a graphical display.

To do via a graphical display, simply create a live CD/DVD/USB linux disc (think Ubuntu/ElementaryOS live disc) and fire up <a href="http://gparted.org/" target="_blank">GParted</a> and format the disk.

To do via the command line, I use fdisk.

```bash
$ sudo fdisk /dev/sda
```