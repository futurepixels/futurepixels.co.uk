
+++
description = "Adding a mount point on boot under Linux"
title = "Adding a mount point on boot under Linux"
date = "2021-07-14T00:00:00Z"
+++

Working with linux over the past few years has been fun but it certainly comes with it's frustrations. One of them for me is having to mount the drive when I need it, but this is because its not been that important to me to learn. So, tonight I decided to do a bit of reading up about it and learn then put that learning in to place.

For myself, I have two drives I would like to mount on boot as it would in Windows and macOS; "Linux Games" and "Media".

To start, I will need directories to mount the drives too. To do this I went and created the following.

```
mkdir /games /photos
```

The next part is to add the drives to the boot process. This can be done in multiple places, but I am adding them to the `/etc/fstab` configuration. My reasons being that using `/etc/fstab.d` doesn't exist on my distribution and using systemd is going to use the `/etc/fstab` config anyway.

You will want to first get the details for the drive(s) you are mounting, this is done via `blkid` which should give an output like so:

```
/dev/loop0: TYPE="squashfs"
/dev/loop1: TYPE="squashfs"
/dev/loop2: TYPE="squashfs"
/dev/loop3: TYPE="squashfs"
/dev/loop4: TYPE="squashfs"
/dev/loop5: TYPE="squashfs"
/dev/loop6: TYPE="squashfs"
/dev/nvme0n1p1: UUID="6EFE-AF5A" TYPE="vfat" PARTLABEL="BOOT" PARTUUID="1e14628f-5553-41bc-b6a5-87bb9bdc5854"
/dev/nvme0n1p2: UUID="747adbc0-cf6b-45dc-8be6-4860321a199a" TYPE="ext4" PARTUUID="7739a89a-7d02-4aae-8b27-36d30111306f"
/dev/nvme0n1p3: LABEL="Windows" UUID="102ADBF10527806C" TYPE="ntfs" PTTYPE="dos" PARTUUID="90483ddd-d0c2-4885-b557-1d5d5255ece5"
/dev/sdc2: LABEL="Games" UUID="50FE5C80FE5C5FF0" TYPE="ntfs" PARTLABEL="Windows Games" PARTUUID="e933c8d2-a825-4186-b077-460e22e861dd"
/dev/sdc3: LABEL="Linux Games" UUID="c4460e59-3741-474d-8cd5-77505cfc4d80" TYPE="ext4" PARTUUID="09a79ba0-08d4-430d-827a-eb5a382fe7b5"
/dev/sda1: LABEL="spare" UUID="BCB4F111B4F0CEC0" TYPE="ntfs" PARTLABEL="home" PARTUUID="f181f4e0-02b1-48af-8aee-17c3bed3b803"
/dev/sdb1: LABEL="media" UUID="1fe37fc3-d7f0-43c1-8b6c-60dab8792c11" TYPE="ext4" PARTLABEL="media" PARTUUID="279c5731-e0ea-431d-9c43-af3c4a1a142c"
/dev/sdd: UUID="6f546c4e-80a9-444d-a83d-668b4183bf2f" TYPE="ext4"
```

It is from this list that you need the `UUID` and the `TYPE` for your file system table [fstab] config. To make sure you get the correct data you can do the following:

```
blkid | grep "Linux Games" | xclip -selection clipboard
```

This will add the following line in this example to your clipboard directly:

```
/dev/sdc3: LABEL="Linux Games" UUID="c4460e59-3741-474d-8cd5-77505cfc4d80" TYPE="ext4" PARTUUID="09a79ba0-08d4-430d-827a-eb5a382fe7b5"
```

With your favourite editor open `/etc/fstab`, paste the line in your clipboard to the end of the file and create the following lines:

```
# /dev/sdc3 at time of setup
UUID="c4460e59-3741-474d-8cd5-77505cfc4d80" /games ext4 rw,relatime,errors=remount-ro 0 2
```

Lets break that down to understand it further.

*UUID* - Most Linux systems don't use the device as much these days which is why we are using `UUID` instead of `/dev/sdc3` (the device) as that is what is preferred  
*mount point* - This is where the filesystem will attach to; in this case `/games`  
*Filesystem type* - This is the `TYPE` value so is `ext4` in my example  
*options* - The options are comma separated and a full list can be found at [Wikipedia](https://en.wikipedia.org/wiki/Fstab#Options_common_to_all_filesystems)  
*Backup information* - We use `0` here as we want to indicate that the filesystem will never be backed up in this example
*Integerity test order* - This is to indicate which order the [fsck](https://en.wikipedia.org/wiki/Fsck) program will check the device for errors. We use `2` here to check _after_ boot as it's not a root filesystem  

Once we have added all the relevant disks that are permanant, save the file and test it works with `sudo mount -a`. Once that's run you should be able to access the drive and the content via `ls -l /games` within the context of this example.

If you made any errors you will see the following type of error which should give more insight on what to look at fixing:

```
mount: /nopes can't find UUID="1234"
```
