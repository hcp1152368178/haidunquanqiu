<?php
	
	include "conn.php";
	

	$username =isset($_POST["username"]) ? $_POST['username']:'';
    $psw = isset($_POST["psw"])?$_POST['psw']:'';
    
    $sqlUser = "SELECT * FROM jduser WHERE username='$username'";
	
	
	
	//查询数据库  获取查询结果集
	$returnUser = $conn->query($sqlUser);
	
	//使用查询结果集
    //得到数组
    $resUser = $returnUser->fetch_all(MYSQLI_ASSOC);
    
    
//  echo $returnUser->num_row;
   	if($returnUser->num_rows <= 0){
   		 $code = 0;
   		 echo json_encode([
   				'code' => $code,
   				'uid' => '',
   				'nick' => '',
   			],JSON_UNESCAPED_UNICODE);
   	}else{
   		if($psw != $resUser[0]['psw']){
   		$code = 1;
   		}else{
   			$code = 2;
   		}
   		
   		 echo json_encode([
   				'code' => $code,
   				'uid' => $resUser[0]['uid'],
   				'nick' => $resUser[0]['nickname'],
   			],JSON_UNESCAPED_UNICODE);
   	}
   	
   

//  echo json_encode($a,JSON_UNESCAPED_UNICODE);
//   echo json_encode($resPsw,JSON_UNESCAPED_UNICODE);
?>