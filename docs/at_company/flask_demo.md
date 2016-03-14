#My First Flask project

使用FLASK和HTML完成了TODOLIST网站

##About Flask

> - Use `request.get["key"]` to get data when using GET Method

> - Use `request.form["key"]` or `request.form.get(key)` to get data when using POST Method

##About Jinja2

![MyJinja2](/image/Jinja2.png)

##How To RUN the web server?

> *1#*

>   add `if __name__=='main'`

> `app.debug = TRUE`

> `app.run()`

> `python3 run mainplatform.py`

> *2#*

> use *gunicorn*

> `gunicorn my_project:app`
