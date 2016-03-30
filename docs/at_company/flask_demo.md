#My First Flask project

使用FLASK和HTML完成了TODOLIST网站

##About Flask

> - Use `request.get["key"]` to get data when using GET Method

> - Use `request.form["key"]` or `request.form.get(key)` to get data when using POST Method

##About Jinja2

![MyJinja2](http://120.27.114.115:8088/myblog/Jinja2.png)

##How To RUN the web server?

> *1#*

>   add `if __name__=='main'`

> `app.debug = TRUE`

> `app.run()`

> `python3 run mainplatform.py`

> *2#*

> use *gunicorn*

> `gunicorn my_project:app`

<a href="http://xiaorui.cc/2014/11/22/%E7%94%A8gunicorn%E5%92%8Cgevent%E6%8F%90%E9%AB%98python-web%E6%A1%86%E6%9E%B6%E7%9A%84%E6%80%A7%E8%83%BD/">Details about gunicorn</a>
