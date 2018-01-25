<?php

ini_set('display_errors',0);
ini_set('display_startup_errors',0);

$pageName = @$_GET["pageName"]?$_GET["pageName"]:"";

if ($pageName == "") {
  echo "缺少pageName参数";
  exit();
}

$dbConnect = mysql_connect("localhost","root");
if(!$dbConnect){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("blog_commit", $dbConnect);

$selectResult = mysql_query("SELECT * FROM comments WHERE page_name='$pageName'");
$datas = array();
while ($resultRow = mysql_fetch_array($selectResult)) {
  array_push($datas, array(
    'pageName' => $resultRow["page_name"],
    'commentTime' => $resultRow["comment_time"],
    'content' => $resultRow["content"],
    'author' => $resultRow["author"],
    'email' => $resultRow["email"],
    'id' => $resultRow["id"],
    'deleted' => $resultRow["deleted"]
  ));
}
echo json_encode($datas);

?>
