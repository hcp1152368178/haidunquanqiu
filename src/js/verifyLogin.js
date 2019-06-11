$(function () {
    //判断登录
    function verifyLogin() {
        let $uid = $.cookie('uid');

        if ($uid != undefined) {
            //				console.log($uid)
            $.ajax({
                type: "post",
                url: "/jdhk/src/api/verifyLogin.php",
                data: {
                    'uid': $uid
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 1) {
                        let $html = '<a href="/jdhk/src/html/carts.html" class="name">' + data.nick + '</a><a href="###" id="exit">退出</a>';
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
                path: '/jdhk/src'
            });
        });
        $('#login').on('click', '#exit', function () {
            $.cookie('uid', null, {
                path: '/jdhk/src'
            });
            $('#login').html('<a href="/jdhk/src/html/login.html">你好，请登录</a>');
            window.location.reload();
        });
    }
    verifyLogin();
});
