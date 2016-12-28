# Add a system call dynamically using a loadable kernel module (LKM)

1. **get the sys_call_table address**
    * `cat /boot/System.map.xxx | grep sys_call_table`

2. **set a global variable to store this address**
    * `unsigned long *sys_call_table = (unsigned long *)0xffffffff81a001c0;`

3. **pick a unused system call number**
    * see the last number of the system call in `/arch/x86/entry/syscalls/syscall_64.tbl`

4. **that's it, enjoy!**

~~~
#include <linux/version.h>
#include <linux/module.h>
#include <linux/miscdevice.h>
#include <linux/fs.h>
#include <linux/highmem.h>
#include <asm/unistd.h>

#define IOCTL_PATCH_TABLE 0x01 // command for hijack
#define IOCTL_FIX_TABLE 0x04 // command for fix table

int in_use = 0;
int is_set = 0;
unsigned long *sys_call_table = (unsigned long *)0xffffffff81a001c0;
const int my_sys_call_num = 360;

asmlinkage long my_sys_call(void){
  printk("hello from my_sys_call\n");
  return 0;
}

// Make the Page writable
int make_rw(unsigned long address){
  unsigned int level;
  pte_t *pte = lookup_address(address, &level);
  if(pte->pte &~ _PAGE_RW)
    pte->pte |= _PAGE_RW;
  return 0;
}

// Make the page write protected
int make_ro(unsigned long address){
  unsigned int level;
  pte_t *pte = lookup_address(address, &level);
  pte->pte = pte->pte & ~_PAGE_RW;
  return 0;
}

static int our_open(struct inode *inode, struct file *file){
  if(in_use)
    return -EBUSY;
  in_use++;
  printk("ourdevice has been opened\n");
  return 0;
}

static int our_release(struct inode *inode, struct file *file){
  in_use --;
  printk("ourdevice has been closed\n");
  return 0;
}

static int our_ioctl(struct file *file, unsigned int cmd, unsigned long arg){
  int retval = 0;
  switch (cmd) {
    case IOCTL_PATCH_TABLE:
      make_rw((unsigned long)sys_call_table);
      // real_open = (void*)*(sys_call_table + __NR_open);
      *(sys_call_table + my_sys_call_num) = (unsigned long) my_sys_call;
      make_ro((unsigned long)sys_call_table);
      is_set = 1;
    break;
    case IOCTL_FIX_TABLE:
      make_rw((unsigned long)sys_call_table);
      *(sys_call_table + my_sys_call_num) = NULL;
      make_ro((unsigned long)sys_call_table);
      is_set = 0;
    break;
    default:
      printk("Ooooops... \n");
    break;
  }
  return retval;
}

static const struct file_operations our_fops = { \
  .owner = THIS_MODULE,
  .open = &our_open,
  .release = &our_release,
  .unlocked_ioctl = (void*)&our_ioctl,
  .compat_ioctl = (void*)&our_ioctl
};

static struct miscdevice our_device = { \
  MISC_DYNAMIC_MINOR,
  "interceptor",
  &our_fops
};

static int __init hello_init(void){
  int retval = misc_register(&our_device);
  printk(KERN_INFO "hello from kernel222\n");
  return retval;
}

static void __exit hello_exit(void){
  misc_deregister(&our_device);
  if (is_set) {
    make_rw((unsigned long)sys_call_table);
    *(sys_call_table + my_sys_call_num) = NULL;
    make_ro((unsigned long)sys_call_table);
  }
  printk(KERN_INFO "exit kernel222\n");
  return;
}

module_init(hello_init);
module_exit(hello_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Ryan");
MODULE_VERSION("1.0");

~~~
