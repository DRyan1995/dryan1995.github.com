# ADD A SYSTEM CALL TO KERNEL(UBUNTU)

## 1. Define a new system call sys_hello()

* `mkdir hello`
* `cd hello`
* `vim hello.c`

~~~~
/* hello.c */
#include <linux/kernel.h>

asmlinkage long sys_hello(void){
  printk(“Hello world from system call\n”);
  return 0;
 }
~~~~

## 2. Create a Makefile in the hello folder

* `vim Makefile`
* add this line in Makefile
~~~
obj-y := hello.o
~~~

## 3. Add the hello directory to the kernel's Makefile

* change
`core-y += kernel/ mm/ fs/ ipc/ security/ crypto/ block/`
to
`core-y += kernel/ mm/ fs/ ipc/ security/ crypto/ block/ hello/`

## 4. Add the new system call( `sys_hello()` ) in the system call table

* `vim /arch/x86/entry/syscalls/syscall_64.tbl`
* add the following line in the end of this file
~~~
354 common hello sys_hello
// 354 is the number of the system call. It should be one plus the number of the last system call
~~~

## 5. Add the new system call ( `sys_hello()` ) in the system call header file

* `vim /linux/syscalls.h`
* add the following line to the end of the file just before the `#endif`
~~~
asmlinkage long sys_hello(void);
~~~

## 6. Compile and Reboot (Refer to the BUILD FROM SOURCE)

## 7. Test

* Create a userspace.c
~~~
/* userspace.c */
#include <stdio.h>
#include <linux/kernel.h>
#include <sys/syscall.h>
#include <unistd.h>
int main(){
  long int ret = syscall(326);
  printf(“System call sys_hello returned %ld\n”, ret);
  return 0;
}
~~~

* `gcc -o userspace userspace.c`
* `./userspace`
* `dmesg`
