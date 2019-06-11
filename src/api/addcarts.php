<?php
	include 'conn.php';
	
	$uid = isset($_POST['uid'])?$_POST['uid']:'';
	$shopname = isset($_POST['shopname'])?$_POST['shopname']:'';
	$proid = isset($_POST['proid'])?$_POST['proid']:'';
	$num = isset($_POST['num'])?$_POST['num']:'';
	$imgurl = isset($_POST['imgurl'])?$_POST['imgurl']:'';
	$title = isset($_POST['title'])?$_POST['title']:'';
	$price = isset($_POST['price'])?$_POST['price']:'';
	$sql2 = "SELECT * FROM indent WHERE uid like '$uid' AND proid like '$proid'";
//	var_dump($uid,$shopname,$proid,$num);
	$result2 = $conn->query($sql2);
	var_dump($result2->num_rows);
	if($result2->num_rows >0){
		$res = $result2->fetch_all(MYSQLI_ASSOC);
		$num = $num + $res[0]['num'];
		$code = $res[0]['code'];
		
		$sql3 = "UPDATE indent SET num=$num WHERE `code` = $code";
		$result3 = $conn->query($sql3);
		echo 0;
	}else{
		$sql = "INSERT INTO indent (uid,shopname,proid,num,imgurl,title,price) VALUES ('$uid','$shopname','$proid','$num','$imgurl','$title','$price')";
		
		$result = $conn->query($sql);
		echo 1;
	}
	
	// $result->close();
    $conn->close();
	
?>