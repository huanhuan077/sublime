<?php

$username = $_GET['username'];

$content1 = $_GET['content'];

// echo $username;
$arr = ['username' => "$username",
		'content1' => "$content1"];

echo json_encode($arr);
?>