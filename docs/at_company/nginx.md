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

## 3. HOW TO START ON MY MAC

`export PATH="/usr/local/bin:/usr/local/sbin:$PATH"`

`sudo nginx -s reopen`

`sudo php-fpm -D`
**DO NOT FORGET THIS STEP OTHERWISE IT WILL TURN OUT 502 ERROR**

**NEED TO PAY SPECIAL ATTENTION TO THE ORDER OF THESE INSTRUCTIONS**


## 4. SET PASSWORD

        location /todolist {
              auth_basic "Authorized users only";
              auth_basic_user_file pass.txt;
        }

AND HOW TO SET PASSWORD?

`htpasswd -b -c pass.txt username passwd`
