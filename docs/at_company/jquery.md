#JQUERY


##REFERENCE

[REFERENCE ON W3C](http://www.w3school.com.cn/jquery/jquery_reference.asp)

##My Work

[CLICK HERE TO VIEW IT](http://ryan95.site:8080/php_here/ryan-im/index.php)


##Tips:

### 1. USE trim to remove all the spaces when comparing strings

        if(circlename_up.trim() != top_string.trim())
        {
          $(this).parent().parent().prev().children().first().text(circlename_down);
          $(this).parent().prev().text(circlename_up);
        }

### 2. DO NOT FORGET TO REDECLARE METHODS WHEN YOU CREATE IT USING DOM

        function insert_circle_li(){
            circle_info_li = circle_info_li1 + circle_name + circle_info_li2;
            $("#circle_info_wrapper").append(circle_info_li);

            $(".mybtn_del").click(function(){
                $(this).parent().parent().hide();
            });

            $(".mybtn_up_c").click(function(){
                var circlename_down = $(this).parent().prev().text();
                var circlename_up = $(this).parent().parent().prev().children().first().text();
                var top_string = "分类设置";
                if(circlename_up.trim() != top_string.trim())
                {
                  $(this).parent().parent().prev().children().first().text(circlename_down);
                  $(this).parent().prev().text(circlename_up);
                }
            });

        }

### 3. A USEFUL TOOL:

*convert html to js string*

[CLICK HERE](http://www.css88.com/tool/html2js/)

### 4. HOW TO REDIRECT:

    window.location.href = "http://ryan95.com:8080"

### 5. ABOUT DATE

        var myDate = new Date();
        myDate.getYear();        //获取当前年份(2位)
        myDate.getFullYear();    //获取完整的年份(4位,1970-????)
        myDate.getMonth();       //获取当前月份(0-11,0代表1月)
        myDate.getDate();        //获取当前日(1-31)
        myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
        myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
        myDate.getHours();       //获取当前小时数(0-23)
        myDate.getMinutes();     //获取当前分钟数(0-59)
        myDate.getSeconds();     //获取当前秒数(0-59)
        myDate.getMilliseconds();    //获取当前毫秒数(0-999)
        myDate.toLocaleDateString();     //获取当前日期
        var mytime=myDate.toLocaleTimeString();     //获取当前时间
        myDate.toLocaleString( );        //获取日期与时间
        Date.prototype.isLeapYear 判断闰年
        Date.prototype.Format 日期格式化
        Date.prototype.DateAdd 日期计算
        Date.prototype.DateDiff 比较日期差
        Date.prototype.toString 日期转字符串
        Date.prototype.toArray 日期分割为数组
        Date.prototype.DatePart 取日期的部分信息
        Date.prototype.MaxDayOfDate 取日期所在月的最大天数
        Date.prototype.WeekNumOfYear 判断日期所在年的第几周
        StringToDate 字符串转日期型
        IsValidDate 验证日期有效性
        CheckDateTime 完整日期时间检查
        daysBetween 日期天数差

### 6. COUNT OBJECTS

USE `$(".class").size();`

### 7. HOW TO CHANGE SRC OF A IMAGE

        $(".contact_list_cell:last").children().eq(0).attr("src", ChatDatas[idCode]["avatar"]);

### 8. AJAX GET & POST METHOD

        function contactsInit(){
          $.get("server.php?command=contacts&ownerId="+myId,function(data,status){
            if (status=="success") {
              contactList = JSON.parse(data);
              for(var i = 0;i < contactList.length;i++){
                if (myId == contactList[i]["userid"]) {
                  continue;
                }
                $newDom = $($("#contact_list_tpl").html());
                $newDom.find(".contact_avatar").attr("src",contactList[i]["avatar"]);
                $newDom.find(".contact_name").text(contactList[i]["username"])
                $(".contact_list_box").append($newDom);
              }
              pageInit();
            }
            else {
              alert("server error! 401");
            }
          });
        }

        function PostData(ownerId, targetId, content, me){
            postData = {};
            postData.ownerId = ownerId;
            postData.targetId = targetId;
            postData.content = content;
            postData.me = me;
            $.post("post.php",JSON.stringify(postData),function(data,status){
              if(status != "success"){
                alert("server error! 403");
              }
            });
