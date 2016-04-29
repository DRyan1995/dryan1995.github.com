<?php

ini_set('display_errors',0);
ini_set('display_startup_errors',0);

$dbConnect = mysql_connect("localhost","root");
if(!$dbConnect){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("blog_commit", $dbConnect);

dbCreateTable($dbConnect);

function dbCreateTable($dbConnect){

  $sqlCreateTableComments = "CREATE TABLE comments
  (
      id int(10),
      page_name varchar(50),
      content text,
      author varchar(30),
      email varchar(50),
      comment_time timestamp,
      PRIMARY KEY (id)
  )";

  $sqlCreateTableVisitStatistic = "CREATE TABLE visit_statistics
  (
      page_name varchar(50),
      last_visit_time timestamp,
      count int(10) DEFAULT 0,
      PRIMARY KEY (page_name)
  )";


  mysql_query($sqlCreateTableComments, $dbConnect);
  mysql_query($sqlCreateTableVisitStatistic, $dbConnect);
  mysql_query("alter table comments modify id integer auto_increment");
  mysql_query(" alter table comments change comment_time comment_time timestamp default current_timestamp");
  mysql_query("alter table visit_statistics modify id integer auto_increment");
}

// mysql_query("INSERT INTO user_data (id, username, nickname, avatar)
// VALUES ('id333', 'BOSS', 'laoda', 'http://120.27.114.115:8088/ourteam/emma.jpeg')");
// mysql_query("INSERT INTO chat_content (owner_id, target_id, content, me)
// VALUES ('id000', 'id333', 'hello bitch', false)");

$command = @$_GET["command"]?$_GET["command"]:"";
$pageName = @$_GET["pageName"]?$_GET["pageName"]:"";
if($command == "contacts"){
  $users = array();
  $selectResult = mysql_query("SELECT * FROM chat_content WHERE owner_id='$ownerId'");
  while ($resultRow = mysql_fetch_array($selectResult)) {
    if(!in_array($resultRow["target_id"], $users)){
      array_push($users,$resultRow["target_id"]);
    }
  }
  $selectResult = mysql_query("SELECT * FROM chat_content WHERE target_id='$ownerId'");
  while ($resultRow = mysql_fetch_array($selectResult)) {
    if(!in_array($resultRow["owner_id"], $users)){
      array_push($users,$resultRow["owner_id"]);
    }
  }
  $datas = array();
  for($i = 0; $i < count($users); $i++){
    $selectResult = mysql_query("SELECT * FROM user_data WHERE id = '$users[$i]'");
      while($resultRow = mysql_fetch_array($selectResult)) {
        array_push($datas, array(
          'userid' => $resultRow["id"],
          'username' => $resultRow["username"],
          'avatar' => $resultRow["avatar"],
          'nickname' => $resultRow["nickname"]
        ));
      }
  }
  $selectResult = mysql_query("SELECT * FROM user_data WHERE id='$ownerId'");
  while ($resultRow = mysql_fetch_array($selectResult)) {
    array_push($datas, array(
      'userid' => $ownerId,
      'username' => $resultRow["username"],
      'avatar' => $resultRow["avatar"],
      'nickname' => $resultRow["nickname"]
    ));
    break;
  }
  echo json_encode($datas);
}

elseif ($command == "user") {
  $selectResult = mysql_query("SELECT * FROM user_data WHERE id='$ownerId'");
  $datas = array();
  while ($resultRow = mysql_fetch_array($selectResult)) {
    array_push($datas, array(
      'username' => $resultRow["username"],
      'nickname' => $resultRow["nickname"],
      'avatar' => $resultRow["avatar"]
    ));
    break;
  }
  echo json_encode($datas);
}

elseif ($command == "content") {
  $targetId = @$_GET["targetId"] ? $_GET["targetId"]:"";
  $datas = array();
  $selectResult = mysql_query("SELECT * FROM chat_content
                    WHERE owner_id='$ownerId' AND target_id='$targetId'");
  while($resultRow = mysql_fetch_array($selectResult)){
    array_push($datas, array(
      'id' => $resultRow["id"],
      'content' => $resultRow["content"],
      'time' => $resultRow["comment_time"],
      'me' => "1"
    ));
  }
  $selectResult = mysql_query("SELECT * FROM chat_content
                    WHERE owner_id='$targetId' AND target_id='$ownerId'");
  while($resultRow = mysql_fetch_array($selectResult)){
    array_push($datas, array(
      'id' => $resultRow["id"],
      'content' => $resultRow["content"],
      'time' => $resultRow["comment_time"],
      'me' => "0"
    ));
  }
  echo json_encode($datas);
}
?>
