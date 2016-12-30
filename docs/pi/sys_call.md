# Add a System Call in Raspberry PI

### * Files need to be modified

~~~
/arch/arm/kernel/calls.S
/arch/arm/include/arm/unistd.h
/arch/arm/kernel/sys_arm.c
/include/linux/syscalls.h
~~~

### 1. /arch/arm/kernel/calls.S

* change the **59th** `CALL` to `CALL(sys_helloworld)`

### 2. /arch/arm/include/arm/unistd.h

* add the line: `#define __NR_helloworld (__NR_SYSCALL_BASE+ 59)`

### 3. /arch/arm/kernel/sys_arm.c

* add my source code

~~~
asmlinkage long sys_helloworld(void)
{
    printk("My Hello World system call.\n");
    return 0;
}
~~~

### 4. /include/linux/syscalls.h

* add declaration for my system call function

~~~
asmlinkage long sys_helloworld(void);
~~~

### * TEST CODE

~~~
#include <stdio.h>
#include <linux/kernel.h>
#include <sys/syscall.h>
#include <unistd.h>
#include <sys/ioctl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

#define my_sys_call_num 59

int main(void){
  int ret = syscall(my_sys_call_num);
  printf("my sys returned: %d\n", ret);
  return 0;
}
~~~

&
`dmesg | tail`
