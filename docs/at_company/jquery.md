#JQUERY

##Tips:

1. USE trim to remove all the spaces when comparing strings

        if(circlename_up.trim() != top_string.trim())
        {
          $(this).parent().parent().prev().children().first().text(circlename_down);
          $(this).parent().prev().text(circlename_up);
        }

2. DO NOT FORGET TO REDECLARE METHODS WHEN YOU CREATE IT USING DOM

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

3. A very USEFUL TOOL (CONVERT html to js):
<a href="http://www.css88.com/tool/html2js/" target="_blank">Click Here!</a>