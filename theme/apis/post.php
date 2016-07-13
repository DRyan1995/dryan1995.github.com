<?php

ini_set('display_errors',0);
ini_set('display_startup_errors',0);

$dbConnect = mysql_connect("localhost","root");
if(!$dbConnect){
  die('Could not connect: ' . mysql_error());
}
mysql_select_db("blog_commit", $dbConnect);

$postData = file_get_contents("php://input");
$commentData = json_decode($postData, true);

$sql = "INSERT INTO comments (page_name, author, content, email) VALUES ('${commentData[pageName]}', '${commentData[author]}', '${commentData[content]}', '${commentData[email]}')";
mysql_query($sql);
?>
