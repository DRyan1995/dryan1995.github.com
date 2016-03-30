# About Docker

## Difference From common VM

![difference](http://120.27.114.115:8088/myblog/docker_comparison.png)

> + VM是完整运行在宿主机上的完整操作系统，会消耗较多的CPU内存。

> + Docker不同，只包含应用程序层以及依赖库，相对来说隔离效果不如VM以及log方面也不灵活

## Arch of Docker

+ Obviously its a C/S mode

+ To some extent it's like git

![arch](http://120.27.114.115:8088/myblog/docker_arch.png)

## Featuers:

- 文件系统隔离：每个进程容器运行在完全独立的根文件系统里。

- 资源隔离：可以使用cgroup为每个进程容器分配不同的系统资源，例如CPU和内存。
- 网络隔离：每个进程容器运行在自己的网络命名空间里，拥有自己的虚拟接口和IP地址。

- 写时复制：采用写时复制方式创建根文件系统，这让部署变得极其快捷，并且节省内存和硬盘空间。

- 日志记录：Docker将会收集和记录每个进程容器的标准流（stdout/stderr/stdin），用于实时检索或批量检索。

- 变更管理：容器文件系统的变更可以提交到新的映像中，并可重复使用以创建更多的容器。无需使用模板或手动配置。

- 交互式Shell：Docker可以分配一个虚拟终端并关联到任何容器的标准输入上，例如运行一个一次性交互shell。
