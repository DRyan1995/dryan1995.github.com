$(document).ready(function () {
  $commentBoxs = [];
  var env;
  var pageName;
  var Guest;
  var serverApiUrl;
  var ListAll = false;

  pageInit();

  function getPageName() {
    pageName = $("title").text();
    pageName = pageName.replace(/'/g,'');
    pageName = pageName.replace(/ /g,'');
    pageName = pageName.replace(/-/g,'');
    pageName = pageName.replace(/"/g,'');
    console.log(pageName);
  }

  function getEnv() {
    env = getUrlPara("env");
    if (env == "local" || env == "l") {
      serverApiUrl = "http://localhost:8008/blog/apis/"
    }
    else {
      serverApiUrl = "http://ryan95.com/apis/";
    }
    ListAll = (getUrlPara("list_all")=='1'?true:false);
  }

    function pageInit() {
    getEnv();
    createDB();
    getPageName();
    getCommentData();
    getVisitCount();
    Guest = getUrlPara("guest");
    userDataInit();
  }

  function getVisitCount() {
    var url = serverApiUrl + "visit.php?pageName=" + pageName;
    $.get(url, function (data, status) {
      if (status == "success") {
        var datas = JSON.parse(data);
        $("#visit-count").text(datas.count);
        $("#last-visited").text(timeHandler(datas.time));
      }else {
        $("#visit-count").text("cannnot connect server!");
      }
    });
  }

  function createDB(){
    $.get(serverApiUrl + "server.php");
  }

  function timeHandler(time1) {
    var date = new Date(Date.parse(time1.replace(/-/g,   "/")));
    var nowDate = new Date();
    var passedSecond =  (nowDate.getTime()-date.getTime())/1000;
    var result;
    if (passedSecond >= 24 * 60 * 60 * 3) { // greater than three days
      result = time1;
    } else if (passedSecond >= 24 * 60 * 60 ) { //greater than one day
      result = parseInt(passedSecond / (24 * 60 *60)) + "day(s) ago ...";
    } else if (passedSecond > 1 * 60 * 60) {// greater than an hour
      result = parseInt(passedSecond / (60 * 60)) + "hour(s) ago ...";
    } else if (passedSecond > 1* 60){ //greater than one minute
      result = parseInt(passedSecond / 60) + "minute(s) ago ...";
    } else { // less than one minute
      result = parseInt(passedSecond) + "second(s) ago ...";
    }
    return result;
  }

  function addCommentData(datas){
    var $commentBox = $($("#comment-box-tpl").html());
    $commentBox.find("#author").text(datas.author);
    $commentBox.find("#email").text(datas.email);
    $commentBox.find("#content").text(datas.content);
    $commentBox.find("#comment-time").text(timeHandler(datas.commentTime));
    if (datas.deleted == '1') {
      console.log(1111);
      $commentBox.addClass("deleted");
    }
    console.log(timeHandler(datas.commentTime));
    $commentBox.insertBefore(".comment:first");
    if (Guest == "ryan") {
      $commentBox.dblclick(function () {
        if (datas.deleted == '0') {
          if (window.confirm("Are U Sure To Remove This Comment?")) {
            deleteCommentData($commentBox, datas.id);
          }
        }else {
          if (window.confirm("Are U Sure To Recover This Comment?")) {
            var data = {};
            data.id = datas.id;
            $.post(serverApiUrl + "recover.php", JSON.stringify(data), function(data,status){
              if (data == "success") {
                $commentBox.removeClass("deleted");
              }else {
                alert("server error" + data);
              }
            })
          }
        }
      })
    }
    $commentBoxs.push($commentBox);
  }

  function deleteCommentData(self, id){
    var data = {};
    if (!id) {
      alert("Data Error Please Retry After Refresh!");
      window.location.reload(true);
      return;
    }
    data.id = id;
    $.post(serverApiUrl + "delete.php", JSON.stringify(data), function (data, status) {
      if (data == "success") {
        self.remove();
      }
      else {
        alert("Server Error!" + data);
      }
    })
  }

  function getCommentData() {
    var getUrl = serverApiUrl + "get.php?pageName=" + pageName;
    $.get(getUrl, function(data, status){
      if (status == "success") {
        var CommentList = JSON.parse(data);
        console.log(CommentList);
        for (var i = 0; i < CommentList.length; i++) {
          if (CommentList[i].deleted == "0" || ListAll) {
            addCommentData(CommentList[i]);
          }
        }
      }
      else {
        alert("Server Error! 4042");
      }
    });
  }

  function checkEmail(email){
      var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if(pattern.test(email)){
          return true;
      }else{
          return false;
      }
  }

  function userDataInit(){
    if (Guest=="ryan") {
      $("#author-input").val("Ryan");
      $("#email-input").val("ryan951125@icloud.com");
    }else if (pageName == "LOVEDIARYRyansBlog") {
      $("#author-input").val("WXY");
      $("#email-input").val("mollymollyhoon@outlook.com");
    }
    return;
  }

  function postCommentData(){
    var datas = {};
    var content = $("#comment-content-input").val();
    var author = $("#author-input").val();
    var email = $("#email-input").val();
    datas.pageName = pageName;
    datas.content = content;
    datas.author = author;
    datas.email = email;
    datas.commentTime = getCurrentTime();
    if (datas.content == "") {
      alert("Please Say Something!");
      return;
    }
    if (datas.author == "") {
      alert("Please Enter Your Name!");
      return;
    }
    if (datas.email == "") {
      alert("Please Enter Your Email!");
      return;
    }
    if (!checkEmail(datas.email)) {
      alert("Please Enter Your Correct Email Address!");
      return;
    }
    if (!window.confirm("Comfirm Submit?")) {
      return;
    }
    $("#comment-content-input").val("");
    $.post(serverApiUrl+"post.php", JSON.stringify(datas), function(data, status){
      if (status == "success") {
        addCommentData(datas);
        $(window).scrollTop(0);
        if (pageName == "LOVEDIARYRyansBlog" && env!="local" && env!= "l") {
          mail("2489606852@qq.com", datas.author, datas.content);
          mail("1204633887@qq.com", datas.author, datas.content);
        }
      }
      else {
        alert("Server Error! 4041");
      }
    });
  }

  function getUrlPara(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
      paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
      return "";
    }else{
      return returnValue;
    }
  }

  function getCurrentTime(){
      var myDate = new Date();
      var nowTime = myDate.toLocaleString();
      return nowTime;
  }

  function mail(mailAddress, author, mailContent) {
    var data = {};
    data.address = mailAddress;
    data.author = author;
    data.content = mailContent;
    $.post(serverApiUrl+"mail/mail.php",JSON.stringify(data),function(data,status) {
      console.log(status);
      console.log(data);
    });
  }

  $(".submit").click(function(){
    postCommentData();
  });

  $("#move-top-btn").click(function(){
     $( "html,body").animate({ "scrollTop" : 0 }, 300);
  })

  $("#move-bottom-btn").click(function(){
    var windowHeight = parseInt($("body").css("height" ));//整个页面的高度
    $( "html,body").animate({ "scrollTop" : windowHeight }, 300);
  })

  // $(document).keypress(function(e){
  //   if (e.keyCode == 13) {
  //     if (pageName!="LOVEDIARYRyansBlog") {
  //       e.preventDefault();
  //       postCommentData();
  //     }
  //   }
  // })
})
