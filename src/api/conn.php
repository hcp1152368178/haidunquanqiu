<?php
    	$severname = 'localhost';//主机名
        $username = 'root';//数据库登陆名
        $dbpsw = '';//数据库登陆密码，默认为空
        $dbname = 'jdhk';//数据库名字
        
        //2。创建链接
        $conn = new mysqli($severname,$username,$dbpsw,$dbname);
        
        // 检测连接
        /*
             js里面获取属性：obj.name
             php获取属性：obj->name
             js调用方法：obj.show()
             php调用方法：obj->show()
        */
        if ($conn->connect_error) {
            die("连接失败: " . $conn->connect_error);
        }

        // $conn->set_charset('UTF8')
        mysqli_set_charset($conn,"utf8");
?>