#The debug flow

*modified on Mar 13 2016 12:49AM*

---

##How to run the dev server:

> + Using ssh to connect to the server  `ssh sp`
> + enter the circle-server-dev folder `csd`
> + run Runimg.sh `cd docker/app` + `./runimage.sh --dev -d`
> + check the logs `docker logs --follow circle-server`

##How to check the logs of time server:

> - using `pm2 l` to see all the running exs
> - using `pm2 logs 2 ` to check the logs of the time server
