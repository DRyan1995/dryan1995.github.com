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

$sql = "INSERT INTO visit_statistics (page_name) VALUES ('$pageName')";
mysql_query($sql);
$selectResult = mysql_query("SELECT * FROM visit_statistics where page_name='$pageName'");
$datas = array();
$resultRow = mysql_fetch_array($selectResult);
$ret = array(
  'count' => $resultRow['count'],
  'time' => $resultRow['last_visit_time']
);
echo json_encode($ret);

$sql = "UPDATE visit_statistics SET count=count+1 WHERE page_name='$pageName'";
mysql_query($sql);
?>
