<?php
//	header("content-Type: text/html; charset=gbk");
    header("Content-Type:text/html;charset=UTF8");  
	include 'conn.php';
	$conn->query("set names 'UTF8' ");
    $index = isset($_GET['index'])? $_GET['index']:0;
    $page = isset($_GET['page'])? $_GET['page']:1;
    $num = isset($_GET['num'])? $_GET['num']:20;
    $order = isset($_GET['order'])?$_GET['order']:'desc';
    $tab = isset($_GET['tab'])?$_GET['tab']:'default';
    $title = isset($_GET['title'])?$_GET['title']:'';
    $min = isset($_GET['min'])?$_GET['min']:'0';
    $max = isset($_GET['max'])?$_GET['max']:'99999999999999';
    $keyword = isset($_GET['keyword'])?$_GET['keyword']:'';
    
    $index = ($page - 1) * $num;
//  var_dump($index,$order,$tab,$title,$min,$max,$keyword);
    if($keyword == ''){

        $sql = "SELECT * FROM cargo";
        $res = $conn->query($sql);
    
        //  var_dump($res);//结果集，想要内容
            
        //3.获取结果集里面的内容
        $content = $res->fetch_all(MYSQLI_ASSOC);
            
        //关联数组：存多一点数据再给前端
        $data = array(
            'lis' => $res->num_rows,//总条数
            'content' => $content,//所有内容
            'page' => $page,//页数
            'num' => $num//每页的总条数
        );
        
        echo json_encode($data,JSON_UNESCAPED_UNICODE);




    	// echo json_encode(
    	// 	['lis' => 0,
    	// 	'res' => '']
    	// ,JSON_UNESCAPED_UNICODE);
    	
    }else{
    	$sql ="SELECT * FROM cargo WHERE price BETWEEN $min AND $max and title like '%$keyword%' and title like '%$title%'	ORDER BY `$tab`  $order  LIMIT $index,10";
    	$sql2 = "SELECT * FROM cargo WHERE price BETWEEN $min AND $max and title like '%$keyword%' and title like '%$title%'";
    	
// var_dump ($sql);	
   	$result = $conn->query($sql);
    $lis = $conn->query($sql2);
    
	$res = $result->fetch_all(MYSQLI_ASSOC);
//  $a = $lis->fetch_all(MYSQLI_ASSOC);
//   echo json_encode($a,JSON_UNESCAPED_UNICODE);
//   echo json_encode($res,JSON_UNESCAPED_UNICODE);
     echo json_encode(
        [
            'lis' => $lis->num_rows,
            'res' => $res
        ]
    ,JSON_UNESCAPED_UNICODE);
    	
    	
   	$result->close();
    $conn->close();
    }
 
?>