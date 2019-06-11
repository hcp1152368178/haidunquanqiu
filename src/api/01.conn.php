<?php
    
    //1.连接数据库
    $severname = "localhost";
    $username = "root";
    $pwd = "";
    $dbname = "jdhk";

    //2.创建链接
    $conn = new mysqli($severname,$username,$pwd,$dbname);

    if($conn->connect_error){
        die("连接失败："+$conn->connect_error);
    }

    mysqli_set_charset($conn,"utf8");

?>