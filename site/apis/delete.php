<?php

ini_set('display_errors',0);
ini_set('display_startup_errors',0);

$dbConnect = mysql_connect("localhost","root");
if(!$dbConnect){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("blog_commit", $dbConnect);

$postData = file_get_contents("php://input");
$deleteData = json_decode($postData, true);

$sql = "DELETE FROM comments WHERE id='$deleteData[id]' ";
mysql_query($sql);
echo "success";
?>
