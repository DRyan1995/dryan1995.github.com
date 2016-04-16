# Ryan's IM

*Modified on Apr 5 2016 8:00PM*

## OVERVIEW

**only chat function is available at present and not connected to backend server yet**

[CLICK HERE TO VISIT THE WEBSITE & HAVE A TRY WITH ITS FUNCTION](http://ryan95.site:8080/php_here/ryan-im/index.php?userId=id000)

![main](http://120.27.114.115:8088/proj/main.png)

## LOG ON 2016.4.5

*optimized js code and structure*

## LOG ON 2016.4.7

*finished the backend server and connected to mysql by using PHP*

## LOG ON 2016.4.11

*rebuild the project with visual programming method*

*remaining to handle the modify function*

*There is something wrong with mysql APIs in PHP*

## LOG ON 2016.4.12

*finished modify function*

*pay attention not to rebind one event on a jquery object*

*need to improve the method of sync data...* **WebSocket or SSE (need to solve the nginx config)**

*finish multi-user function*

## LOG ON 2016.4.13

###ADD SOME FEATURES:

1. A RED ROUND TO REMIND NEW RECEIVED MESSAGE
2. SCROLL TO BOTTOM WHEN RECEIVING NEW MESSAGE
3. CHANGE THE WAY OF DISPLAYING DIALOG TO A LINE BOX
4. BIND KEYBOARD ACTIONS (ENTER TO SEND MESSAGE)
5. USE SSE OR WEBSOCKET RATHER THAN LONG POLLING

## LOG ON 2016.4.16

*Finished almost all the base functions*

*The performance of it seems terrible!*

## REMAINING

1. USE LESS && COFFEE TO OPTIMIZE CODE
2. OPTIMIZE THE WORKFLOW OF PHP AND JQUERY
4. USE `mysqli` APIs INSTEAD OF `mysql` IN PHP (FOR SECURITY)

## TIPS

## 1. HOW TO DIVIDE A HTML INTO 3 PIECES

![layout](http://120.27.114.115:8088/proj/layout.png)

**DO NOT FORGET TO MAKE MIDDLE DIV THE LAST ONE!!**

## 2. GET FAMILIAR WITH JQUERY APIs

**ESPECIALLY THE SELECTOR**

[W3C JQUERY SCHOOL](http://www.w3schools.com/jquery/)

## 3. DISTINGUISH ARRAY FROM OBJECT IN JS (Its NOT A GOOD WAY)

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
*(DONE ON APRIL 7)*

## 4. IMPROVE THE WAY OF DATA STORAGE

        ChatDatas.id111 = {};
        ChatDatas.id111.username = "GiyyaPan";
        ChatDatas.id111.nickname = "潘潘";
        ChatDatas.id111.avatar = "http://120.27.114.115:8088/ourteam/emma.jpeg";
        ChatDatas.id111.content = [];
        ChatDatas.id111.content.push({text: "hello", time: get_time(), me: false});
        ChatDatas.id111.content.push({text: "hello again", time: get_time(), me: false});
        ChatDatas.id111.content.push({text: "hello", time: get_time(), me: true});

*its more convenient and easy to understand*

**The NEXT STEP is CONNECT THE BACKEND SERVER**
*(DONE ON APRIL 7)*

## 5. USE MULTI CLASSES WHEN NEEDED

**IN CSS:**

        .contact_list_cell{
          display: block;
          padding: 10px;
        }

        .contact_list_cell:hover{
          background-color: #dfdfdf;
          border-radius: 3%;
        }

        .cell_active{
          padding: 10px;
          background-color: lightgreen;
        }

**IN JS:**

        $(this).siblings().removeClass("cell_active")
        $(this).addClass("cell_active");

## 6. IMPROVE THE WAY OF ADDING STASTIC ELEMENTS IN HTML

        function renderPage(){
            $(".content_body_section").children().remove();
            if(!ChatDatas[currentSessoinId].hasOwnProperty('content')){
              console.log("no content");
              return;
            }
            var prevIsMe;
            var presIsMe;
            for(var i = 0; i < ChatDatas[currentSessoinId]["content"].length;i++){
              text =  ChatDatas[currentSessoinId]["content"][i]["text"];
              time =  ChatDatas[currentSessoinId]["content"][i]["time"];
              presIsMe = ChatDatas[currentSessoinId]["content"][i]["me"];

              if(i==0){
                if(presIsMe){
                  insertDiff(myId, text, time);
                  prevIsMe = true;
                }
                else {
                  insertDiff(currentSessoinId, text, time);
                  prevIsMe = false;
                }
              }
              else {
                if (presIsMe == prevIsMe) {
                  insertSame(text);
                }
                else if (presIsMe) {
                  insertDiff(myId, text, time);
                  prevIsMe = presIsMe;
                }
                else {
                  insertDiff(currentSessoinId, text, time);
                  prevIsMe = presIsMe;
                }
              }
            }
          }

          function insertSame(contentText){
            $(".content_cell:last").children().last().append($("#chat_content_same_tpl").html());
            $("p:last").text(contentText);
            $("p:last").append($("#chat_content_cell_icon").html());
            bindIcon();
            return;
          }

          function insertDiff(userId, contentText, time){
            $(".content_body_section").append($("#chat_content_cell_tpl").html());
            $(".chat_avatar:last").attr("src",ChatDatas[userId]["avatar"]);
            $(".chat_name:last").text(ChatDatas[userId]["username"]);
            $(".chat_nickname:last").text(ChatDatas[userId]["nickname"]);
            $(".chat_time:last").text(time);
            $("p:last").text(contentText);
            $("p:last").append($("#chat_content_cell_icon").html());
            bindIcon();
            return;
          }

## 7. USE JQUERY OBJECTS TO INSERT ELEMENTS

        $newDom = $($("#contact_list_tpl").html())
        $newDom.find(".contact_avatar").attr("src",ChatDatas[idCode]["avatar"])
        $newDom.find(".contact_name").text(ChatDatas[idCode]["username"])
        $(".contact_list_box").append($newDom)

## 8. PAY SPECIAL ATTENTION TO AJAX

**U NEED TO NOTICE THE ARRANGEMENT OF FUNCTIONS WHEN USING AJAX OTHERWISE SOME FxxKING PROBLEMS WILL APPEAR**

## 9. TURN TO OBJECTIVE

          function ChatMsg(msg) {
            this.content = msg.content;
            this.targetid = msg.targetid;
            this.timestamp = msg.timestamp;
            this.$ = $($("#chat-msg-tpl").html())
            this.dom = this.$[0]
            self = this
            this.dom.onclick = function () {
              console.log("chat mesg was clicked, id is ", self.id);
            }
            this.$.find(".delete-btn") = function () {
              self.delete()
            }
          }
          ChatMsg.prototype.getTimeFromNow = function () {
            return (Date.now() - this.timestamp)
          }
          ChatMsg.prototype.appendTo = function (target) {
            this.$.appendTo(target)
          }
          ChatMsg.prototype.delete = function () {
            console.log("delete chat msg, id is ", self.id);
            $.post("/delete_item.php",{id:self.id})
            .success(function () {
              self.$.remove()
              for (var i = 0; i < chatMsgList.length; i++) {
                if(chatMsgList[i] === self){
                  //删掉这个元素
                }
              }
            })
          }

          msg = {id:1, content:1,targetid:'panapn1',timestamp:Date.now()}
          chatMsg1 = new ChatMsg(msg)
          chatMsg1.appendTo($("#msg-container"))
          chatMsg1.delete()

          chatMsgList = []
          chatMsgList.push(chatMsg1)

## 10. SET MYSQL PRIMARY KEY AUTO INCREMENT

    alter table user modify id integer auto_increment ;

## 11. AJAX LONG POLLING

    It's an EASY METHOD to sync with server data, But It has high cost.

---

    function startListen(){
      serverQueryEvent = setInterval(getChatMsg,"3000");
    }

## 12. ABOUT OBJECTIVE PROGRAMMING

*Provided By GiyyaPan*

        function ChatMsg(msg){
          this.messageId = msg.id;
          this.chatContent = msg.content;
          this.me = msg.me;
          this.commentTime = msg.time;
          this.$diff = $($("#chat_content_cell_tpl").html());
          this.$p = $($("#chat_content_p_tpl").html());
          this.$icon = $($("#chat_content_cell_icon").html());
          this.firstParagraph = false;  // Judge If the content is the first one so as to delete the $diff if needed
          this.totalParagraph = -1; // Only make sense when thisdom is a diff one
        }

        ChatMsg.prototype.autoAppend = function() {
          presIsMe = (this.me == "1") ? 1 : -1;
          same = (prevIsMe == presIsMe) ? true : false;
          var self = this;
          var data = {};
          data.id = self.messageId;
          if (same) {
            this.$father = $father;
            this.$father.totalParagraph++;
            this.$p.text(this.chatContent);
            var self = this;
            this.$icon.find("#del_btn").click(function(){
              $.post("delete.php",JSON.stringify(data), function(data, status){
                if (status == "success") {
                  if(self.$father.totalParagraph == 1){
                    self.$father.$diff.remove();
                  }
                  else {
                    self.$p.remove();
                  }
                  self.$father.totalParagraph--;
                }
                else {
                  alert("server error! code: 404 status: ", status);
                }
              });
            });
            this.$p.append(this.$icon);
            this.$father.$diff.find(".chat_content_cell").append(this.$p);
          }
          else {
            prevIsMe = presIsMe;
            $father = this;
            this.totalParagraph = 1;
            var index = (presIsMe == 1)? myIndex : this.targetUserIndex;
            this.$diff.find(".chat_avatar").attr("src", UserList[index].avatar);
            this.$diff.find(".chat_name").text(UserList[index].username);
            this.$diff.find(".chat_nickname").text(UserList[index].nickname);
            this.$diff.find(".chat_time").text(this.commentTime);
            this.$p.text(this.chatContent);
            this.$icon.find("#del_btn").click(function(){
              $.post("delete.php",JSON.stringify(data), function(data, status){
                if (status == "success") {
                  if (self.totalParagraph > 1) {
                    self.$p.remove();
                  }
                  else {
                    self.$diff.remove();
                  }
                  self.totalParagraph--;
                }
                else {
                  alert("server error! code: 404 status: ", status);
                }
              });
            });
            this.$p.append(this.$icon);
            this.$diff.find(".chat_content_cell").append(this.$p);
            this.$diff.appendTo(".content_body_section");
          }
          bindIcon();
        }

        function User(user){
          this.avatar = user.avatar;
          this.nickname = user.nickname;
          this.userid = user.userid;
          this.username = user.username;
          this.$ = $($("#contact_list_tpl").html());
        }

        User.prototype.autoAppend = function () {
          this.$.find(".contact_avatar").attr("src",this.avatar);
          this.$.find(".contact_name").text(this.username);
          var self = this
          this.$.click(function(){
            $(".contact_list_cell").removeClass("active");
            self.$.addClass("active");
            $(".session_name").text(self.username);
            $(".contact_nickname").text(self.nickname);
            targetId = self.userid;
            getChatMsg();
          });
          $(".contact_list_box").append(this.$);
        }

## 13. USE A MAGIC WAY TO LOOP IN AJAX

        function queryAsk(refreshingIndex){
          if (refreshingIndex == UserList.length - 1) {
            return;
          }
          var requestUrl = "apis/server.php?command=content&ownerId=" + myId
                            + "&targetId=" + UserList[refreshingIndex].userid;
          $.get(requestUrl, function(data,status){
            if (status == "success") {
              UserList[refreshingIndex].newChatMsgs = [];
              var chatMsg = JSON.parse(data);
              for (var j = 0; j < chatMsg.length; j++) {
                var ChatMsg1 = new ChatMsg(chatMsg[j]);
                ChatMsg1.targetUserIndex = refreshingIndex;
                UserList[refreshingIndex].newChatMsgs.push(ChatMsg1);
              }
              UserList[refreshingIndex].newChatMsgs.sort(mysort);
          }
            else {
              alert("server error!");
            }
            queryAsk(++refreshingIndex);
          });
        }
