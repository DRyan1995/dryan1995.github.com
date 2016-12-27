# Build Kernel From Source (Ubuntu)

1. **DOWNLOAD**
    * `apt-get source linux-image-$(uname -r)`
    * `sudo apt-get build-dep linux-image-$(uname -r)` // set up the build environment

2. **CONFIG**
    * `make defconfig` // for default configuration
    * `make menuconfig` // manually configure
    * `make oldconfig` // use old configuartion
    * OR YOU CAN DOWNLOAD THE CONFIG FILE FROM UBUNTU WEBSITE [LINK](http://kernel.ubuntu.com/~kernel-ppa/configs/)

3. **BUILD**
    * `make -j6`

4. **INSTALL**
    * `sudo make modules_install`
    * `sudo make install`
    * `sudo reboot`
