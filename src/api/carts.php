<?php
	include './conn.php';
	
	$uid = isset($_POST['uid'])?$_POST['uid']:'24';
	$sql= "SELECT * ,COUNT(*) AS `hasnum` FROM  indent WHERE uid = $uid GROUP BY shopname";

   $res = $conn->query($sql);
    
   $result = $res->fetch_all(MYSQLI_ASSOC);

   $lis = array();
   for($i = 0;$i<$res->num_rows;$i++){
   	    if($result[$i]['hasnum']>=1){
            $uid2 = $result[$i]['uid'];
            $shopname2 = $result[$i]['shopname'];
            $sql2 = "SELECT * FROM indent WHERE uid = '$uid2' AND shopname = '$shopname2'";
            $res2 = $conn->query($sql2);
            $result2 =  $res2->fetch_all(MYSQLI_ASSOC);
            $lis[] = $result2;
   	    }
   }
   

// foreach($result as $item){
//// 	echo $item;
//// 	$sql2 = "SELECT * FROM indent WHERE uid like $item['uid'] AND proid like $item['proid']";
//// 	$res2 = $conn->query($sql2);
//// 	$result2 =  $res2->fetch_all(MYSQLI_ASSOC);
//// 	$arr[] = $result2;
// }
//	echo $result[0]['hasnum'];


    echo json_encode([
   "result"=>$result,
   'lis'=>$lis
   ],JSON_UNESCAPED_UNICODE);
?>