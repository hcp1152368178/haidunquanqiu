$(function () {
    var istrue = false;
    var isVerify = false;
    var phonenum = '';//账号
<<<<<<< HEAD
    var nickname = '';//用户名
    var pswnum = '';//密码
=======
    var nickname = '';
    var pswnum = '';
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
    var code = null; //验证码
    //验证手机号
    (function () {
        let phone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;

<<<<<<< HEAD
=======



>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        $('#phone').focus(function () {
            $('.phoneTips').removeClass('err');
            if ($('#phone').val().length < 11) {
                $('.phoneTips').css('visibility', 'visible');
                $('#txttips').text('验证完成后可以使用该手机进行登录');
            }
<<<<<<< HEAD
        });

=======

        });
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        $('#phone').blur(function () {
            if ($('#phone').val() == '') {
                $('.phoneTips').css('visibility', 'hidden');
            } else {
                if (!phone.test($('#phone').val())) {
                    $('.phoneTips').css('visibility', 'visible');
                    $('.phoneTips').addClass('err');
                    $('#txttips').text('格式错误');
                }
            }
<<<<<<< HEAD
        });

=======


        });
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        $('#phone').bind('input propertychange', function () {

            if ($('#phone').val().length > 0 && $('#phone').val().length < 11) {
                $('.phone .close').show();
                $('.phone .close').removeClass('true');
            } else if ($('#phone').val().length < 1) {
                $('.phone .close').hide();
            } else {
                if (phone.test($('#phone').val())) {
                    $('.phoneTips').removeClass('err');
                    $('.phoneTips').css('visibility', 'hidden');
                    $('.phone .close').addClass('true');
                }
<<<<<<< HEAD
            }
=======

            }

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        });

        //验证码
        $('#onverify').click(function () {
            if (phone.test($('#phone').val())) {
                $('#verify').show();
                moveVerify();
            } else {
                $('.phoneTips').css('visibility', 'visible');
                $('.phoneTips').addClass('err');
                $('#txttips').text('格式错误');
            }
        });

<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        $('#write1_next').click(function () {
            if (!phone.test($('#phone').val())) {
                $('.phoneTips').css('visibility', 'visible');
                $('.phoneTips').addClass('err');
                $('#txttips').text('格式错误');
            } else {
                if (isVerify == false) {
                    $('.verifyTips').addClass('err');
                    $('#codeTips').html('未完成验证');
                } else {
                    if ($('#code').val() != code) {
                        console.log($('#code').val(), code);
                        $('.verifyTips').addClass('err');
                        $('#codeTips').html('验证码错误');
                    } else {
                        console.log($('#code').val(), code);
                        phonenum = $('#phone').val();
                        $('.write1').hide();
                        $('.write2').show();
                        $('.first span').addClass('finish').removeClass('index');
                        $('.second span').addClass('index');
                        $('.second p').addClass('step-desc');
                        $('.firline').addClass('lineidx');
                    }

                }
            }
        });
    }
    )();

    //滑动图验证
    $('#refresh').click(function () {
        moveVerify();
    });
    $('#verify .close').click(function () {
        $('#verify').hide();
    });

    //发送验证码
    function send() {
        $.ajax({
            type: "post",
            url: "../lib/api/duanxin.php",
            data: {
                "userphone": $('#phone').val()
            },
            dataType: 'json',
            success: function (data) {
                code = data.phonecode;
                console.log(data, code);
            }
        });
    }

    function moveVerify() {
<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        let rand = parseInt(Math.random() * 3 + 1);
        let imgurl = '../img/register/verify' + rand + '.jpg';
        let toLeft = parseInt(Math.random() * 270 + 50);
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
<<<<<<< HEAD
        $('#lump').mousedown(function (e) {
            let x = e.pageX;
            //let x = e.offsetX;
            $('.strip_bg').css('background', '#42C2FC');
            $('#lump').mousemove(function (e) {
=======

        $('#lump').mousedown(function (e) {
            let x = e.pageX;
            //				let x = e.offsetX;

            $('.strip_bg').css('background', '#42C2FC');
            $('#lump').mousemove(function (e) {

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
                e.preventDefault(); //禁止图片拖动
                $(document).bind("selectstart", function () {
                    return false;
                });
                let moveX = e.pageX - x;

                if (moveX <= 0) {
                    moveX = 0;
                } else if (moveX >= 336) {
                    moveX = 336;
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
                    $('#onverify').hide();
                    $('#verifyCode').show();
                    isVerify = true;
                    bulletincd();
                    $('.verifyTips').removeClass('err');
                    //发送号码
                    send();

<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
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
    moveVerify();
    $('#btn').click(function () {
        if (istrue) {
            send();
            istrue = false;
            bulletincd();
        } else {

        }
    });
    //倒计时120秒
    function bulletincd() {
        let num = 120;
        let time
        console.log(code)
        time = setInterval(function () {
            if (num < 0) {
                $('#btn').html('重新获取');
                istrue = true;
                code = null;
                clearInterval(time);
<<<<<<< HEAD
=======


>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
            } else {
                $('#btn').html(num + '秒后重新获取');
            }
            num--;
        }, 1000);
    }

<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
    let nickInp = /[\u4e00-\u9fa5_a-zA-Z0-9_]{4,12}/;
    let maths = /[0-9]/;
    let eng = /[a-zA-Z]/;
    let chars = /\W/;

<<<<<<< HEAD
    //昵称验证
    $('#nickname').focus(function () {
=======

    //昵称验证


    $('#nickname').focus(function () {

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        $('.nickTips').html('输入4-12个字符或中文').css({
            'visibility': 'visible',
            'color': '#c5c5c5'
        });
    });

<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
    function verName() {
        if ($('#nickname').val().length > 0) {
            if (nickInp.test($('#nickname').val())) {
                $('.nickTips').html('昵称可以使用').css({
                    'visibility': 'visible',
                    'color': '#33BB44'
                });
                $('#nickname').attr('data-true', 'true');
            } else {
                $('.nickTips').html('格式错误').css({
                    'visibility': 'visible',
                    'color': '#f91'
                });
                $('#nickname').attr('data-true', 'false');
            }

<<<<<<< HEAD
        } else {
=======

        } else {

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
            $('.nickTips').html('输入4-12个字符或中文').css({
                'visibility': 'hidden',
                'color': '#c5c5c5'
            });
        }
    }

    $('#nickname').blur(function () {
        verName();
<<<<<<< HEAD
    });

    //密码验证
=======

    });

    //密码验证

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
    //等级强度
    $('#psw').focus(function () {
        $('.hint').html('输入6-15个数字字母或字符').css({
            'color': '#c5c5c5'
        });;
        $('#grade').html('');
        $('.pswTips').css({
            'visibility': 'visible',
            'color': '#c5c5c5'
        });

    });

    function verPsw() {
<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        let grade = 0;
        if ($('#psw').val().length > 5) {
            if (maths.test($('#psw').val())) {
                grade++;
            }
            if (eng.test($('#psw').val())) {
                grade++;
            }
            if (chars.test($('#psw').val())) {
                grade++;
            }
            if (grade == 1) {
<<<<<<< HEAD
                $('#grade').html('弱').css('color', 'red');
            } else if (grade == 2) {
                $('#grade').html('中').css('color', 'yellow');
            } else if (grade == 3) {
                $('#grade').html('高').css('color', '#58bc58');
=======
                $('#grade').html('弱').css('color', '#58bc58');
            } else if (grade == 2) {
                $('#grade').html('中').css('color', 'yellow');
            } else if (grade == 3) {
                $('#grade').html('高').css('color', 'red');
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
            }
            $('.hint').html('密码可以使用').css({
                'color': "rgb(51, 187, 68)"
            });
            $('#psw').attr('data-true', 'true');

        }
        if ($('#psw').val().length < 6 && $('#psw').val().length > 0) {
<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
            $('.pswTips').css({
                'visibility': 'visible',
                'color': '#c5c5c5'
            });
            $('.hint').html('格式错误').css({
                'color': '#f91'
            });
            $('#grade').html('');
            $('#psw').attr('data-true', 'false');
        }

        if ($('#psw').val().length == 0) {
            $('.pswTips').css({
                'visibility': 'hidden',
                'color': '#c5c5c5'
            });
            $('.hint').html('输入6-15个数字字母或字符').css({
                'color': '#c5c5c5'
            });;
            $('#psw').attr('data-true', 'false');
        }
    }

    $('#psw').blur(function () {
        //console.log($('#psw').val().length)
<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        verPsw();
    });


    //判断密码是否一致
    $("#confirm").focus(function () {

        $('.confirmTips').css('visibility', 'visible');
        $('.comfig').show();
        $('.mistake').hide();
    });

    function comfirmPsw() {
<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        if ($("#confirm").val().length > 5) {
            if ($("#confirm").val() != $("#psw").val()) {
                $('.confirmTips').css('visibility', 'visible');
                $('.comfig').hide();
                $('.mistake').html('两次密码不一致').css('color', '#f91').show();
                $('#confirm').attr('data-true', 'false');
            } else {
                $('.confirmTips').css('visibility', 'visible');
                $('.comfig').hide();
                $('.mistake').html('两次密码一致').css('color', "rgb(51, 187, 68)").show();
                $('#confirm').attr('data-true', 'true');
            }
<<<<<<< HEAD
            //console.log(123)
        } else {
            //console.log(456)
=======
            //			console.log(123)
        } else {
            //					console.log(456)
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
            $('.mistake').html('密码太短').css('color', "rgb(51, 187, 68)").show();
            $('#confirm').attr('data-true', 'false');
        }


    }

    $("#confirm").blur(function () {
        comfirmPsw();

    });

    $('#write2_next').click(function () {
        verName();
        verPsw();
        comfirmPsw();
        nickname = $('#nickname').val();
        pswnum = $('#psw').val();
        //			console.log(phonenum,nickname,pswnum);

        $('.second span').addClass('finish').removeClass('index');
        $('.third span').addClass('index');
        $('.third p').addClass('step-desc');
        $('.secline').addClass('lineidx');


        setTimeout(function () {
            if ($('.judge[data-true=true]').length = 3) {
                $.ajax({
                    type: "post",
                    url: "../api/register.php",
                    data: {
                        'phone': phonenum,
                        'psw': pswnum,
                        'nickname': nickname,
                    },
                    dataType: 'text',
                    success: function (data) {
<<<<<<< HEAD
                        console.log(data, 1);
=======
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
                        if (data == 1) {
                            $('.write3 .state').html('注册成功')
                            $('.write2').hide();
                            $('.write3').show();

                            setTimeout(function () {
<<<<<<< HEAD
                                window.location.replace('./login.html')
=======
                                window.location.replace('login.html')
>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
                            }, 2000);

                        } else {
                            $('.write3 .state').html('注册失败')
                            $('.write2').hide();
                            $('.write3').show();
                            setTimeout(function () {
                                window.location.reload();
                            }, 2000);
                        }
                    }
                });
            }
        }, 500);
    });

});
