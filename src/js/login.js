$(function () {

    //输入框获取焦点事件
    (function () {
        $('.from .inp_box input').focus(function () {
            $('.from .inp_box input').siblings('label').removeClass('focus');
            $(this).siblings('label').addClass('focus');
        });
    })();

    //点击登录验证事件
    (function () {
        let $error = $('.error'); //绑定错误提示框
        let $errorval = $('#error');
        let $user = $('#user'); //绑定用户名输入框
        let $psw = $('#password'); //绑定密码输入框
        let $pswBox = $('.psw_box');
        let $userBox = $('.user_box');

        $('.inp_box input').bind('input propertychange', function () {
            let idx = $('.inp_box input').index(this);
            if ($(this).val() == '') {
                $('.clear').eq(idx).hide();
            } else {
                $('.clear').eq(idx).show();
            }
        });

        $('.clear').click(function () {
            $(this).prev().val('');
            $(this).hide();
        });

        let phone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

        let $userVal = '';
        let $pswVal = '';
        $('#btn').click(function () {

            $userVal = $user.val().trim(); //用户名输入框的值
            $pswVal = $psw.val().trim(); //密码输入框的值
            if ($userVal == '' && $pswVal == '') {
                $pswBox.addClass('error_p');
                $userBox.addClass('error_p');
                $error.css('visibility', 'visible');
                $errorval.html('用户名和密码不能为空。');
            } else if ($userVal != '' && $pswVal == '') {
                $userBox.removeClass('error_p');
                $pswBox.addClass('error_p');
                $error.css('visibility', 'visible');
                $errorval.html('密码不能为空。');
            } else if ($userVal == '' && $pswVal != '') {
                $pswBox.removeClass('error_p');
                $userBox.addClass('error_p');
                $error.css('visibility', 'visible');
                $errorval.html('用户名不能为空。');
            } else if (!phone.test($userVal)) {
                $userBox.addClass('error_p');
                $error.css('visibility', 'visible');
                $errorval.html('用户名格式错误。');
            } else {
                $('#verify').show();
                moveVerify();
            }
        });

        $('#refresh').click(function () {
            moveVerify();
        });
        $('.close').click(function () {
            $('#verify').hide();
        });

        function moveVerify() {
            let rand = parseInt(Math.random() * 3 + 1);
            console.log(rand);
            let imgurl = '../img/login/verify' + rand + '.jpg';
            let toLeft = parseInt(Math.random() * 150 + 50);
            let toTop = parseInt(Math.random() * 50 + 10);
            $('.fixation').css({
                'top': toTop,
                'left': toLeft
            });
            $('.move').css({
                'top': toTop,
                'background-image': 'url(' + imgurl + ')',
                'background-position-x': -toLeft,
                'background-position-y': -toTop,
            });
            $('#img img').attr('src', imgurl);

            $('#lump').mousedown(function (e) {
                let x = e.pageX;
                //				let x = e.offsetX;

                $('.strip_bg').css('background', '#42C2FC');
                $('#lump').mousemove(function (e) {

                    e.preventDefault(); //禁止图片拖动
                    $(document).bind("selectstart", function () {
                        return false;
                    });
                    let moveX = e.pageX - x;

                    if (moveX <= 0) {
                        moveX = 0;
                    } else if (moveX >= 235) {
                        moveX = 235;
                    }
                    $('#lump').css('left', moveX);
                    $('.move').css('left', moveX);
                    $('.strip_bg').css('width', moveX + 22);
                });

                $(window).mouseup(function () {
                    $('#lump').off('mousemove');
                    if ($('.move').position().left >= toLeft - 5 && $('.move').position().left <= toLeft + 5) {
                        $('.strip_bg').css('background', '#9ff048');
                        $('#verify').hide();
                        $.ajax({
                            type: "post",
                            url: "../api/login.php",
                            async: true,
                            data: {
                                'username': $userVal,
                                'psw': $pswVal
                            },
                            dataType: 'json',
                            success: function (data) {
                                let uid = data.uid;
                                let code = data.code;
                                let nick = data.nick;
                                //console.log(uid, code, nick)
                                if (code == 0) {
                                    $userBox.addClass('error_p');
                                    $error.css('visibility', 'visible');
                                    $errorval.html('用户名不存在。');
                                } else if (code == 1) {
                                    $userBox.addClass('error_p');
                                    $pswBox.addClass('error_p');
                                    $error.css('visibility', 'visible');
                                    $errorval.html('密码与用户名不匹配。');
                                } else if (code == 2) {
                                    $.cookie('uid', uid, {
                                        expires: 7,
                                        path: '/'
                                    });

                                    $.cookie('nick', nick, {
                                        expires: 7,
                                        path: '/'
                                    });
                                    let $href = $.cookie('location');
                                    if ($href) {
                                        window.location.replace($href);
                                    } else {

                                        window.location.replace('../mam.html');
                                    }
                                }
                            }
                        });

                    } else {
                        $('.strip_bg').css('background', '#ff534d');
                        $('#lump').stop().animate({
                            'left': 0
                        }, 300);

                        $('.move').stop().animate({
                            'left': 0
                        }, 300);
                        $('.strip_bg').stop().animate({
                            'width': 0
                        }, 300);
                    }
                });
            });
        }





    })();
});