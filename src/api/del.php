<?php
	include 'conn.php';
	
	$uid = isset($_POST['uid'])?$_POST['uid']:'';
	$code = isset($_POST['code'])?$_POST['code']:'';
	var_dump($uid,$code);
	$sql = "DELETE FROM indent WHERE uid = $uid AND `code` = $code";
	
	$result = $conn->query($sql);
	echo $result;
	$conn->close();
?>