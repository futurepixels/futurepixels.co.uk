
# Setup PHPStorm with Vagrant and XDebug

## Vagrant

### vagrantfile

```
    host_os = `uname`

    if host_os =~ /Linux/
        host_ip_address = `ifconfig eth0 | awk '/inet / {split($2,a,\":\"); print a[2]}'`
    end

    if host_os =~ /Darwin/
        host_ip_address = `"ifconfig en0 | awk '/inet / {split($2,a,\":\"); print a[1]}'`
    end
```

### ansible provision

```
    config.vm.provision "ansible" do |a|
        a.extra_vars = {
            "host_ip" => host_ip_address,
        }
    end
```

## Install xdebug [link-to-download]

## Setup xdebug config

## Setup PHPStorm