<?php
		include 'conn.php';

		$uid = isset($_POST['uid']) ? $_POST['uid'] : '';
//		$uid =isset($_POST["uid"]) ? $_POST['uid']:'';
		 $sqlUid = "SELECT * FROM jduser WHERE uid='$uid'";
		 
		 $return = $conn->query($sqlUid);
		 
		 
		 $res = $return->fetch_all(MYSQLI_ASSOC);
		 
		 if($return->num_rows <=0){
		 	echo json_encode([
   				'code' => 0,
   				'nick' => '',
   			],JSON_UNESCAPED_UNICODE);
		 }else{
		 	echo json_encode([
   				'code' => 1,
   				'nick' => $res[0]['nickname'],
   			],JSON_UNESCAPED_UNICODE);
		 }
//		echo json_encode($res,JSON_UNESCAPED_UNICODE);
//		echo $res[0]['nick'];
		$return->close();
    	$conn->close();
?>