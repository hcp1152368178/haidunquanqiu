<?php
	include 'conn.php';
	
	$uid = isset($_POST['uid'])?$_POST['uid']:'';
	$code = isset($_POST['code'])?$_POST['code']:'';
	$num = isset($_POST['num'])?$_POST['num']:'';
	
	
	$sql2 = "SELECT * FROM indent WHERE uid like '$uid' AND code like '$code'";
	
	$result2 = $conn->query($sql2);
	var_dump($result2->num_rows);
	if($result2->num_rows >0){
		$sql3 = "UPDATE indent SET num=$num WHERE `code` = $code";
		$result3 = $conn->query($sql3);
		echo $result3;
	}
	
	
	$conn->close();
?>