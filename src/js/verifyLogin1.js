$(function () {
    //判断登录
    function verifyLogin() {
        let $uid = $.cookie('uid');

        if ($uid != undefined) {
            //console.log($uid)
            $.ajax({
                type: "post",
                url: "./api/verifyLogin.php",
                data: {
                    'uid': $uid
                },
                dataType: 'json',
                success: function (data) {
                    if (data.code == 1) {
                        let $html = '<a href="./html/cart.html" class="name">' + data.nick + '</a><a href="###" id="exit">退出</a>';
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
                path: '/'
            });
        });
        $('#login').on('click', '#exit', function () {
            $.cookie('uid', null, {
                path: '/'
            });
            $('#login').html('<a href="./html/login.html">你好，请登录</a>');
            window.location.reload();
        });
    }
    verifyLogin();
});
