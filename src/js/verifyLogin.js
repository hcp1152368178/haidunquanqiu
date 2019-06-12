$(function () {
    //判断登录
    function verifyLogin() {
        let $uid = $.cookie('uid');

        if ($uid != undefined) {
<<<<<<< HEAD
            //console.log($uid)
            $.ajax({
                type: "post",
                url: "../api/verifyLogin.php",
=======
            //				console.log($uid)
            $.ajax({
                type: "post",
                url: "/jdhk/src/api/verifyLogin.php",
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
                data: {
                    'uid': $uid
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 1) {
<<<<<<< HEAD
                        let $html = '<a href="./cart.html" class="name">' + data.nick + '</a><a href="###" id="exit">退出</a>';
=======
                        let $html = '<a href="/jdhk/src/html/carts.html" class="name">' + data.nick + '</a><a href="###" id="exit">退出</a>';
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
                        $('#login').html($html);

                    }
                }
            });
        } else {
            return 0;
        }
        $('#login').on('click', '.login', function () {
            console.log(location.href);
            $.cookie('location', location.href, {
<<<<<<< HEAD
                path: '/'
=======
                path: '/jdhk/src'
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
            });
        });
        $('#login').on('click', '#exit', function () {
            $.cookie('uid', null, {
<<<<<<< HEAD
                path: '/'
            });
            $('#login').html('<a href="../html/login.html">你好，请登录</a>');
=======
                path: '/jdhk/src'
            });
            $('#login').html('<a href="/jdhk/src/html/login.html">你好，请登录</a>');
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
            window.location.reload();
        });
    }
    verifyLogin();
});
