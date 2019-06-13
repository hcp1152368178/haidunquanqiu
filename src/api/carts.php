<?php
	include './conn.php';
	
	$uid = isset($_POST['uid'])?$_POST['uid']:'	27';
    
    $sql = "SELECT * from indent LEFT JOIN cargo ON indent.proid = cargo.proid WHERE indent.uid='{$uid}'";

   $res = $conn->query($sql);
    
   $result = $res->fetch_all(MYSQLI_ASSOC);

   $lis = array();
   for($i = 0;$i<$res->num_rows;$i++){
   	    if($result[$i]>=1){
            $uid2 = $result[$i]['uid'];
            $shopname2 = $result[$i]['shopname'];
            $sql2 = "SELECT * FROM indent WHERE uid = '$uid2' AND shopname = '$shopname2'";
            $res2 = $conn->query($sql2);
            $result2 =  $res2->fetch_all(MYSQLI_ASSOC);
            $lis[] = $result2;
   	    }
   }

    echo json_encode([
   "result"=>$result,
   'lis'=>$lis
   ],JSON_UNESCAPED_UNICODE);
?>