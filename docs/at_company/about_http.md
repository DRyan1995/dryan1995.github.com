#HTTP

##1. Definition

> HTTP是一个客户端终端（用户）和服务器端（网站）请求和应答的标准（TCP）。通过使用Web浏览器、网络爬虫或者其它的工具，客户端发起一个HTTP请求到服务器上指定端口（默认端口为80）。我们称这个客户端为用户代理程序（user agent）。应答的服务器上存储着一些资源，比如HTML文件和图像。我们称这个应答服务器为源服务器（origin server）。

##2. Components && Request Methods

> 1、请求格式：
> + 一个起始行--------内容包括：请求方式，URI,HTTP协议的版本
> + 一个或者多个头域
> + 一个指示头域结束的空行
> + 和可选的消息体组成。
> + 四部分当中头域是最重要的

> 2、响应格式：
> + HTTP协议的版本、状态代码、描述
> + 响应头
> +响应正文

> `HTTP/1.1 200 OK
Server:nio/1.1
Content-type:text/html;charset=GBK
Content-length:102
`

> *发出的请求信息包括以下几个:*

> + 请求行
> 例如GET /images/logo.gif HTTP/1.1，表示从/images目录下请求logo.gif这个文件。
>+（请求）头，
>例如Accept-Language: en
>+ 空行
>+ 其他消息体

> *Request Methods*:

> + **HEAD**：与GET方法一样，都是向服务器发出指定资源的请求。只不过服务器将不传回资源的本文部分。它的好处在于，使用这个方法可以在不必传输全部内容的情况下，就可以获取其中“关于该资源的信息”（元信息或称元数据）。

> + **GET**：向指定的资源发出“显示”请求。使用GET方法应该只用在读取数据，而不应当被用于产生“副作用”的操作中，例如在Web Application中。其中一个原因是GET可能会被网络蜘蛛等随意访问。参见安全方法

> + **POST**：向指定资源提交数据，请求服务器进行处理（例如提交表单或者上传文件）。数据被包含在请求本文中。这个请求可能会创建新的资源或修改现有资源，或二者皆有。

##3. Status Code Definitions

> + 1xx消息——请求已被服务器接收，继续处理

> + 2xx成功——请求已成功被服务器接收、理解、并接受

> + 3xx重定向——需要后续操作才能完成这一请求

> + 4xx请求错误——请求含有词法错误或者无法被执行

> + 5xx服务器错误——服务器在处理某个正确请求时发生错误

##4. Json

*(JavaScript Object Notation)*

> Official Documents:

> <http://www.json.org/json-zh.html>

> USE `JSON.parse()` TO DECODE JSON IN JS

> USE `JSON.stingify()` TO ENCODE JSON IN JS

##5. Flask

> Official Documents:

> <http://docs.jinkan.org/docs/flask/>

##6. Jinja2

> Official Documents:

> <http://jinja.pocoo.org/docs/dev/>

##7. Cookies

> Reference:

> <http://www.cnblogs.com/Darren_code/archive/2011/11/24/Cookie.html>
