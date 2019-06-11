<?php
	include 'conn.php';
	
	$nickname = isset($_POST['nickname'])?$_POST['nickname'] :'6516';
	$psw = isset($_POST['psw'])?$_POST['psw']:'123456';
	$phone = isset($_POST['phone'])?$_POST['phone']:'13686912153';
	
    $sql ="INSERT INTO jduser (username,psw,nickname) VALUES ('$phone','$psw','$nickname')";
    
    
    // $sql2 = "SELECT * FROM jduser where username = '$phone' AND psw = '$psw' AND nickname = '$nickname' ";
    
    $return = $conn->query($sql);

    // $res = $return->fetch_all(MYSQLI_ASSOC);
	// var_dump($return);
	// echo $return;
	if($return){
		echo 1;
	}else{
		echo 0;
    }
    
?>