# Build a LKM (Loadable Kernel Module) by Cross Compilation

It is strange that I cannot directly compile the kernel module on my PI using a common approach. However, I have successfully used the cross-compile to build it which is really useful

### 1. Makefile

~~~
obj-m += hello1.o

all:
		make -C /home/ryan/Desktop/linux/ M=$(PWD) modules
clean:
		make -C /home/ryan/Desktop/linux/ M=$(PWD) clean
~~~

### 2. Make Command

`make ARCH=arm CROSS_COMPILE=arm-linux-gnueabihf-`

### 3. Insmod & Enjoy!
