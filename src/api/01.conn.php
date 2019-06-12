<?php
    
    //1.连接数据库
    $severname = "localhost";
    $username = "root";
    $pwd = "";
<<<<<<< HEAD
    $dbname = "jdhk";
=======
    $dbname = "jianyi";
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807

    //2.创建链接
    $conn = new mysqli($severname,$username,$pwd,$dbname);

    if($conn->connect_error){
        die("连接失败："+$conn->connect_error);
    }

    mysqli_set_charset($conn,"utf8");

?>