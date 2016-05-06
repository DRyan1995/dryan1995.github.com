#How To Build Your Own VPN

## PPTP(weak sercurity)
1. 安装pptpd，这是个VPN服务器端软件
`sudo apt-get install pptpd `

2. 修改文件 /etc/pptpd.conf
`sudo vi /etc/pptpd.conf `
找到# TAG: localip一行，在后面添加以下2行：
`localip 192.168.0.1 `
`remoteip 192.168.0.234-238,192.168.0.245`

3. 修改文件 /etc/ppp/pptpd-options
`sudo vi /etc/ppp/pptpd-options`
找到 #ms-dns这行，去掉前面的#号，修改成google提供的DNS server或其他DNS：
`ms-dns 8.8.8.8`
`ms-dns 8.8.4.4`

4. 修改文件 /etc/ppp/chap-secrets，按一行四列添加账号、服务器名、密码和IP限制。服务器名（默认 写pptpd 即可，务必与pptpd-options 文件的name一行一样）。如创建一个名为user，密码为userpasswd，不限制登录IP的VPN账号：
`user pptpd userpasswd *`

5. 修改文件 /etc/sysctl.conf，去掉这一行` #net.ipv4.ip_forward=1` 的#号，开启ipv4 forward，然后运行命令：
`sudo sysctl –p`
运行后会显示 net.ipv4.ip_forward = 1，就表示修改生效了。

6. 使用iptables建立一个NAT
`sudo apt-get install iptables`
`iptables -t nat -A POSTROUTING -s 192.168.0.0/24 -o eth0 -j MASQUERADE`
上面的24表示子网掩码，代表24个1.
eth0是网卡名字，可以通过命令 ifconfig 查看 （插播悲剧：server的是eth1，我写的eth0，搞了很久client都不能通过VPN server连到外网，原因竟然是这个）
为防止重启服务器后iptables丢失，先运行
`iptables-save > /etc/iptables-rules`
然后修改文件 /etc/network/interfaces ，在eth0/eth1.. 下面加入
`pre-up iptables-restore < /etc/iptables-rules`

7. 现在应该就搞定了。
不放心的话可以重启 server，或者重启 pptpd
`sudo /etc/init.d/pptpd restart`

8. 在client端设置连接VPN进行测试，client是Ubuntu的话请看这里

  - 测试是否可以连接到VPN server：
`ping server_IP`
不能的话，问题应该出在前4步。

  - 测试是否可以连接到外网：
`ping 8.8.8.8 `（任何其他外网IP都行）
不能的话，问题应该出在第5-6步，看看是否正确设置了 ipv4 forward

  - 测试是否可以解析DNS：
`nslookup google.com`
不能的话，应该是服务器端的DNS设置有问题。

## ShadowSocks
**Already In Use**

####On Ubuntu Server:

1. `pip install shadowsocks`
2. `ssserver -p 8000 -k password -m rc4-md5 -d start`

####On MACOSX:

- Simply use ShadowsocksX

####On Ubuntu:
1. `sudo apt-get install shadowsocks-qt5`
2. <a href="http://blog.csdn.net/weiqiangsu/article/details/46956977">browse the website for a solution</a>
3. genpac -p "SOCKS5 127.0.0.1:1080" --gfwlist-proxy="SOCKS5 127.0.0.1:1080" --gfwlist-url="https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt" --output="~/shadowsocks/autoproxy.pac"
4. Use auto proxy mode to surf the Internet


## SOCKS5

1. `sudo apt-get install dante-server`

2. modify the conf file

        /etc/danted.conf

        #logoutput: stderr
        #logoutput: syslog
        logoutput: /var/log/sockd/sockd.log

        internal: 0.0.0.0 port = 10080

        external: eth0

        #method: username none
        #method: pam
        method: none
        ## no password

        user.privileged: root

        #user.notprivileged: root

        user.libwrap: nobody

        compatibility: sameport
        compatibility: reuseaddr
        extension: bind

        client pass {

                from: 0.0.0.0/0 to: 0.0.0.0/0

                log: connect disconnect error

        }

        pass {

                from: 0.0.0.0/0 to: 0.0.0.0/0

                command: bind

                log: connect disconnect error

        }

        pass {

                        from: 0.0.0.0/0 to: 0.0.0.0/0

                        command: bindreply udpreply

                        log: connect error

        }

        pass {

                        from: 0.0.0.0/0 to: 0.0.0.0/0 port 1-65535

                        protocol: tcp udp

        }

        pass {

                        from: 0.0.0.0/0 to: 0.0.0.0/0 port 1-65535

                        command: udpassociate

        }

        #block {
        #                from: 0.0.0.0/0 to: 0.0.0.0/0 port 1-65535
        #                protocol: tcp udp
        #                log: connect erro

3. `sudo service danted restart`

## My Notes

#### STOP CONNECTION
`sudo  /usr/sbin/vpnc-disconnect`

#### START CONNECTION
`sudo /etc/vpnc/default.conf`


## SSH TUNNEL

`ssh -fN -R 10022:localhost:22 relayserver_user@1.1.1.1`

[VIEW THIS WEBSITE FOR MORE DETAIL](https://linux.cn/article-5975-1.html)
