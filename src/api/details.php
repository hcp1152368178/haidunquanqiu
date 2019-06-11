<?php
	include 'conn.php';
	
	$shopid = isset($_GET['shopid'])?$_GET['shopid']:'';
	
	$sql = "SELECT * FROM cargo WHERE proid like $shopid";
	
	$return = $conn->query($sql);
	
	$res = $return->fetch_all(MYSQLI_ASSOC);
	
	
	if($return->num_rows>0){
		$shopname = $res[0]['shopname'];
		
		$sql2 = "SELECT * FROM cargo WHERE shopname like '$shopname' LIMIT 0,6;"  ;
		$sql3 = "SELECT * FROM cargo  ORDER BY `default` DESC LIMIT 0,30";
		
		$result = $conn->query($sql2);
		$res2 = $result->fetch_all(MYSQLI_ASSOC);
		
		$result2 = $conn->query($sql3);
		$res3 = $result2->fetch_all(MYSQLI_ASSOC);
		echo json_encode([
			'lis' => $return->num_rows,
			'details'=> $res,
			'recommend' => $res2,
			'more' => $res3			
		],JSON_UNESCAPED_UNICODE);
	}else{
		echo json_encode([
			'lis' => 0,
			'details'=> '',
			'recommend' => '',
			'more' => ''			
		],JSON_UNESCAPED_UNICODE);
	}
	
?>