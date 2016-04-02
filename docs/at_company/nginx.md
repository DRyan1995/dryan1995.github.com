#Nginx
## 1. INSTALL

`sudo apt-get install nginx`

`sudo vim /etc/nginx/site-enabled/myconfig`

        server {
            listen       1125;
            server_name  ryan95.site localhost;
        index index.html index.htm index.php;
            root /home/ubuntu/ym/site;
        }

`sudo nginx -s reload`


## 2. INSTALL ON MACOSX

[CLICK HERE](http://avnpc.com/pages/install-lnmp-on-osx)
