# Ryan's IM

*Modified on Apr 3 2016 1:06AM*

## OVERVIEW

[CLICK HERE TO VISIT THE WEBSITE & HAVE A TRY WITH ITS FUNCTION](http://ryan95.site:8080/php_here/ryan-im/index.php)

![main](http://120.27.114.115:8088/proj/main.png)



## REMAINING

1. FINISH THE BACKEND BY FLASK
2. USE MYSQL AS ITS DATABASE
3. OPTIMIZE JS
4. USE LESS && COFFEE

## TIPS

### 1. HOW TO DIVIDE A HTML INTO 3 PIECES

![layout](http://120.27.114.115:8088//proj/layout.png)

**DO NOT FORGET TO MAKE MIDDLE DIV THE LAST ONE!!**

### 2. GET FAMILIAR WITH JQUERY APIs

**ESPECIALLY THE SELECTOR**

[W3C JQUERY SCHOOL](http://www.w3schools.com/jquery/)

### 3. DISTINGUISH ARRAY FROM OBJECT

        function db_init(){
          session_count = $(".contact_list_cell").size();
          for(var i = 0;i < session_count; i++){
            session_name = $(".contact_list_cell").eq(i).text().trim();

            data[session_name] = new Array();
            data[session_name]["name"] = new Array();
            data[session_name]["nickname"] = new Array();
            data[session_name]["content"] = new Array();
            data[session_name]["time"] = new Array();
            data[session_name]["avatar_url"] = new Array();
          }
        }

*Its a little complex*

*I need to connect it to my backend server*
