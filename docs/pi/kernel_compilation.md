# Build Kernel For Raspberry Pi

## 1. File Preparations

* `git clone https://github.com/raspberrypi/linux`
* `git clone https://github.com/raspberrypi/tools`
*  A ubuntu os

## 2. Environment Preparations

* add `export PATH=$PATH:/home/ryan/Desktop/tools/arm-bcm2708/gcc-linaro-arm-linux-gnueabihf-raspbian-x64/bin` in `~/.bashrc`

## 3. Cross Compilation

* `KERNEL=kernel7`

* `make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- bcm2709_defconfig`

* `make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- zImage modules dtbs`

## 4. Installation

* Insert the SD Card into Ubuntu OS

* `sudo make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf- INSTALL_MOD_PATH=/media/ryan/root modules_install`

* `sudo cp mnt/boot/$KERNEL.img mnt/boot/$KERNEL-backup.img`

* `sudo scripts/mkknlimg arch/arm/boot/zImage /media/ryan/boot/$KERNEL.img`

* `sudo cp arch/arm/boot/dts/*.dtb /media/ryan/boot/`

* `sudo cp arch/arm/boot/dts/overlays/*.dtb* /media/ryan/boot/overlays/`

* `sudo cp arch/arm/boot/dts/overlays/README /media/ryan/boot/overlays/`

## 5. Unmount and Insert the SD Card to PI
## 6. Enjoy!
