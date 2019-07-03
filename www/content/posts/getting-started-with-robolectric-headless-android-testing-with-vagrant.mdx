---
title: "Getting Started with Robolectric: Headless Android Testing with Vagrant"
date: 2014-03-08
url: "/2014/3/8/getting-started-with-robolectric-headless-android-testing-with-vagrant/"
---


In this post we will go over how to set up the sample project for Robolectric,
run, test and deploy to a device in a headless vagrant environment.

## Sample App

Clone the sample app from the [github
repo](https://github.com/robolectric/RobolectricSample)

```
git clone git@github.com:robolectric/RobolectricSample.git
```


## Vagrantfile

Here is our Vagrantfile. We’ll need to add the `precise64` base box to our
system. also availible as a
[Gist](https://gist.github.com/ChristopherBiscardi/9383725)

```bash
vagrant box add precise64 http://files.vagrantup.com/precise64.box
```

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise64"
  config.vm.provision "shell", path: "vagrant-android-build.sh"
  config.vm.provider :virtualbox do |vb|
    vb.customize ['modifyvm', :id, '--usb', 'on']
    vb.customize ['usbfilter', 'add', '0', '--target', :id, '--name', '1197123b', '--vendorid', '0x04e8']
    vb.customize ['usbfilter', 'add', '0', '--target', :id, '--name', 'android', '--vendorid', '0x18d1']
  end
end
```

and the Vagrant build script. The build script downloads and installs ADT and
Maven.

```bash
apt-get update -y
apt-get install openjdk-7-jdk unzip -y
# For maven-plugin
apt-get install lib32z1-dev bison flex lib32ncurses5-dev libx11-dev gperf g++-multilib -y
# Setup Android SDK
sudo -u vagrant wget http://dl.google.com/android/adt/adt-bundle-linux-x86_64-20131030.zip
sudo -u vagrant unzip adt-bundle-linux-x86_64-20131030.zip
# Add Android SDK to PATH
sudo -u vagrant echo export PATH=/home/vagrant/adt-bundle-linux-x86_64-20131030/sdk/tools:\$PATH >> /home/vagrant/.bashrc
sudo -u vagrant echo export PATH=/home/vagrant/adt-bundle-linux-x86_64-20131030/sdk/platform-tools:\$PATH >> /home/vagrant/.bashrc

# Maven
sudo -u vagrant wget http://download.nextag.com/apache/maven/maven-3/3.2.1/binaries/apache-maven-3.2.1-bin.tar.gz
sudo -u vagrant tar -xvzf apache-maven-3.2.1-bin.tar.gz
# Add Maven to PATH
sudo -u vagrant echo export PATH=/home/vagrant/apache-maven-3.2.1/bin:\$PATH >> /home/vagrant/.bashrc

# Install API 16 (sample project needs it)
# echo "y" is a hack to accept the license
sudo -u vagrant echo "y" | /home/vagrant/adt-bundle-linux-x86_64-20131030/sdk/tools/android update sdk -t 6 --no-ui -y
# ANDROID_HOME is for Maven
sudo -u vagrant echo export ANDROID_HOME=/home/vagrant/adt-bundle-linux-x86_64-20131030/sdk/ >> /home/vagrant/.bashrc
```


## Path and ANDROID_HOME

We need a few thing on our path, all of which are included in our Vagrant build
script (Android tools, Android platform-tools, Maven and ANDROID_HOME)

```bash
export PATH=/home/vagrant/adt-bundle-linux-x86_64-20131030/sdk/tools:\$PATH
export PATH=/home/vagrant/adt-bundle-linux-x86_64-20131030/sdk/platform-tools:\$PATH
export PATH=/home/vagrant/apache-maven-3.2.1/bin:\$PATH
export ANDROID_HOME=/home/vagrant/adt-bundle-linux-x86_64-20131030/sdk/
```

## Vagrant Up

Simply copy the `Vagrantfile` and `vagrant-android-build.sh` into the sample
project’s root folder. Then `cd` into that folder and run `vagrant up` to boot
the machine. If you don’t have Vagrant and VirtualBox,
[here](http://www.vagrantup.com/) and [here](https://www.virtualbox.org/) are
the respective links.

Note that it may be necessary to run the command to update the Android SDK
manually due to the licenses.

```bash
vagrant ssh
android update sdk -t 6 --no-ui -y
```

## Running the Tests

We can run the tests inside the vm using maven:

```bash
vagrant ssh
cd /vagrant
mvn clean test
```

Which will give us output that looks like this:

```bash
Results :

Tests run: 87, Failures: 0, Errors: 0, Skipped: 0

[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 28.917 s
[INFO] Finished at: 2014-03-06T06:19:39+00:00
[INFO] Final Memory: 23M/57M
[INFO] ------------------------------------------------------------------------
```

Run `exit` to get out of the vm.


## Connecting Test Devices to the VM

With `VBoxManage` and devices connected, we can allow (all?) of them using the
following `usbfilter` in our `Vagrantfile`

```ruby
config.vm.provider :virtualbox do |vb|
    vb.customize ['modifyvm', :id, '--usb', 'on']
    vb.customize ['usbfilter', 'add', '0', '--target', :id, '--name', 'android', '--vendorid', '0x18d1']
  end
```

Alternatively, we can list all connected usbhosts and select a specific device
as such:

```bash
VBoxManage list usbhost
```

Which gives us a list of these:

```bash
UUID:               6316e123-b702-4155-9703-c2015d014237
VendorId:           0x18d1 (18D1)
ProductId:          0xd002 (D002)
Revision:           2.40 (0240)
Port:               6
USB version/speed:  0/2
Manufacturer:       asus
Product:            Nexus 7
SerialNumber:       07d99c71
Address:            p=0xd002;v=0x18d1;s=0x000000006321cfbd;l=0x20260000
Current State:      Busy
```

Find your Android device and use these parameters to change our Vagrantfile:

SerialNumber -> –name
 VendorId -> –vendorid

```ruby
config.vm.provider :virtualbox do |vb|
    vb.customize ['modifyvm', :id, '--usb', 'on']
    vb.customize ['usbfilter', 'add', '0', '--target', :id, '--name', '1197123b', '--vendorid', '0x04e8']
  end
```

Remember to `vagrant reload` after changing network settings in the
`Vagrantfile`. Some devices may also need to be unplugged and plugged back in
for the VM to see them.

## Deploying

Simply run adb inside the vm to see the connected devices:

```bash
vagrant ssh
sudo adb devices
```

If you see an unauthorized message like the one below, it is likely that you
didn’t start the adb server as root (which will prevent the RSA authorization
from popping up).

```bash
* daemon not running. starting it now on port 5037 *
* daemon started successfully *
List of devices attached
????????????	no permissions</pre><p>Otherwise we should see a list of devices as below after authorizing the devices when the RSA dialog pops up on each device.</p><pre><code class=">List of devices attached
07d99c71	device
2d605528	device
```

We can now install the app on our devices from inside the vm using maven.

```bash
cd /vagrant
mvn clean install && mvn android:deploy
```

## Fin

That’s it. The app should be installed on your connected devices. It won’t start
automatically, but you can navigate to the newly installed `Robolectric Sample`
app and start it up.
