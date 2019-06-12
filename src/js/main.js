$(function () {
    //初始化
    function init() {
<<<<<<< HEAD
=======



>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        //动态生成轮播图高亮点
        function appendLi() {
            let html = '';
            $('.carousel_img li').each(function () {
                html += '<li></li>';
            });
            $('.carousel_list ul').html(html);
<<<<<<< HEAD
=======

>>>>>>> 83232dd159fc36e2b47f2378d626fef501fdf807
        }
        appendLi();

        let idx = 0; //轮播图下标
        $('.carousel_img li').eq(idx).show().siblings().hide(); //初始轮播图
        $('.carousel_list ul li').eq(idx).css('background-position-x', '0'); //初始化高亮
        var carsousel_time = null;
        carsousel_time = setInterval(carsousel, 2000);
        //轮播图
        function carsousel() {
            idx++;
            if (idx > $('.carousel_img li').size() - 1) {
                idx = 0;
            } else if (idx < -1) {
                idx = $('.carousel_img li').size() - 1;
            }
            $('.carousel_img li').eq(idx).stop().fadeIn(500).siblings().stop().fadeOut(500);
            $('.carousel_list ul li').eq(idx).css('background-position-x', '0')
                .siblings().css('background-position-x', '-19px');
        }

        //上一个图
        $('.carousel_r').click(function () {
            carsousel();
        });
        //下一个图
        $('.carousel_l').click(function () {
            idx = idx - 2;
            console.log(idx);
            carsousel();
        });
        //鼠标移入轮播图  清除定时器
        $('.carousel_box').mousemove(function () {
            clearInterval(carsousel_time);
            $('.carousel_r').show();
            $('.carousel_l').show();
        });
        //鼠标移出添加定时器
        $('.carousel_box').mouseout(function () {
            carsousel_time = setInterval(carsousel, 2000);
            $('.carousel_r').hide();
            $('.carousel_l').hide();
        });

        $('.carousel_list ul').on('mouseenter', 'li', function () {
            idx = $(this).index() - 1;
            carsousel();
        });

        //服务区
        function server_carousel() {
            let idx = 0;
            //创建高亮点
            let html = '';
            $('.server_img ul li').each(function () {
                html += '<li></li>';
            });

            //初始化高亮点
            $(html).appendTo('.server_list ul').eq(0).css('background-position-x', '0px');

            //鼠标经过圆点显示高亮
            $('.server_list ul ').on('mouseenter', 'li', function () {
                $idx = $(this).index();
                $moveLeft = $idx * $('.server_img ul li').eq(0).width() * -1;
                $(this).css('background-position-x', '0px').siblings().css('background-position-x', '-19px');

                $('.server_img ul ').stop().animate({
                    'left': $moveLeft + 'px'
                }, 500);
            });
        }
        server_carousel();



        //		限时购
        (function () {
            let nowday = null;
            let getTime = null;
            let time18 = null;//当天18时
            let time22 = null;//当天22时
            let $time = $('.tab .time');
            $('.tab .timeEnd').hide();
            $time.hide();
            setInterval(function () {

                $time.show();
                nowday = new Date();
                getTime = nowday.getTime();

                //设置10时的事件戳
                time10 = nowday.setHours(10);
                time10 = nowday.setMinutes(0);
                time10 = nowday.setSeconds(0);
                time10 = nowday.setMilliseconds(0);



                //设置22时的时间戳
                time22 = nowday.setHours(22);
                time22 = nowday.setMinutes(0);
                time22 = nowday.setSeconds(0);
                time22 = nowday.setMilliseconds(0);


                let gap10 = time10 - getTime;

                let hour10 = parseInt(gap10 / (1000 * 60 * 60)); //距离18时的小时差
                let sec10 = parseInt(gap10 % (1000 * 60 * 60) / (1000 * 60));
                //距离18时的分钟差
                let min10 = parseInt((gap10 % (1000 * 60)) / 1000);
                //距离18时的秒数差


                let gap22 = time22 - getTime;//距离22点的毫秒值

                let hour22 = parseInt(gap22 / (1000 * 60 * 60)); //距离18时的小时差
                let sec22 = parseInt(gap22 % (1000 * 60 * 60) / (1000 * 60));
                //距离18时的分钟差
                let min22 = parseInt((gap22 % (1000 * 60)) / 1000);
                //距离18时的秒数差

                //			%gap18/1000*60*60 



                //判断时间
                if (gap10 > 0) {
                    $time.show();
                    $('.tab .timeEnd').hide();
                    $('.tab .hour').html(hour10);
                    $('.tab .sec').html(sec10);
                    $('.tab .min').html(min10);
                } else if (gap22 > 0) {
                    $time.show();
                    $('.tab .timeEnd').hide();
                    $('.tab .hour').html(hour22);
                    $('.tab .sec').html(sec22);
                    $('.tab .min').html(min22);
                } else {
                    $time.hide();
                    $('.tab .timeEnd').show();
                }
            }, 1000);
        })();
    }
    init();

    //全球直采的选项卡
    $('#self_buy .tab_lis li').click(function () {
        let idx = $(this).index();
        $(this).addClass('pitch').siblings().removeClass('pitch');
        $('#self_buy .tab_con').eq(idx).show().siblings().hide();
        console.log(idx)
    });
    //名店的选项卡
    (function () {
        var time = null;
        $('#famous .fl_top a').hide().eq(0).show();
        $('#famous .fl_top span').hover(function () {
            let idx = $(this).index();
            time = setInterval(function () {
                $('#famous .fl_top span').eq(idx).addClass('curr').siblings().removeClass('curr');
                $('#famous .fl_top a').hide().eq(idx).show();
            }, 200);

        }, function () {
            clearInterval(time);
        });
    })();

    //动画
    (function () {
        $('#eat .con_box').hover(function () {
            $(this).find('.img_box').addClass('moveRT').removeClass('moveTR');
        }, function () {
            $(this).find('.img_box').addClass('moveTR').removeClass('moveRT')
        });
    })();

    //吃遍全球选项卡
    (function () {
        $('.r_conten .item').eq(0).show().siblings().hide();
        $('.option span').click(function () {
            let $idx = $(this).index();
            $(this).addClass('chose').siblings().removeClass('chose');
            $('.r_conten .item').eq($idx).show().siblings().hide();
        });
    })();

    // 滑动块
    (function () {
        let items = $('#like .like_items').get(0);//绑定装ul的盒子
        let bar = $('#like .bar').get(0);//绑定进度条
        let ltBar = $('#like .lt_bar').get(0);//绑定移动的进度条
        let lis = $('#like .like_lis').get(0);//绑定ul
        let liWidth = $('#like .like_lis li').outerWidth();//li的宽度
        let lisWidth = lis.offsetWidth;//ul的宽度
        let itemsWidth = items.offsetWidth;//装ul的盒子的宽度
        let barLeft = bar.offsetLeft;//进度条距离左边的距离
        let itemsLeft = items.offsetLeft;//装ul的盒子距离左边的距离
        let barWidth = bar.offsetWidth;
        let ltBarWidth = ltBar.offsetWidth;
        let ulMax = lisWidth - itemsWidth; //ul最大移动距离
        let braMax = barWidth - ltBarWidth;//进度条最大移动距离
        let scale = braMax / ulMax;  //比例


        //ul拖动事件
        $(lis).mousedown(function (e) {
            let lisLeft = $(lis).position().left;
            let downX = e.pageX;
            e.preventDefault();//禁止图片拖动
            $(document).bind("selectstart", function () { return false; });
            $(window).mousemove(function (e) {
                let gap = e.pageX - downX;
                let movex = gap + lisLeft;
                //				console.log(x);
                if (movex > 0) {
                    movex = 0;
                } else if (movex < -ulMax) {
                    movex = -ulMax;
                }
                console.log(braMax)
                console.log(movex)
                $(lis).css('left', movex);
                $(ltBar).css('left', -movex * scale);
            });
            $(window).mouseup(function () {
                $(window).off('mousemove');
                $(window).off('mouseup');
            });
        });



        //进度条拖动事件
        $(ltBar).mousedown(function (e) {

            let barLeft = $(ltBar).position().left;
            console.log(barLeft);
            let downX = e.pageX;
            //			console.log(downX);
            e.preventDefault();//禁止图片拖动
            $(document).bind("selectstart", function () { return false; });
            $(window).mousemove(function (e) {
                let gap = e.pageX - downX;
                let movex = gap + barLeft;
                console.log(gap)
                if (movex < 0) {
                    movex = 0;
                } else if (movex > braMax) {
                    movex = braMax;
                }
                //				console.log('移动'+ movex)
                $(ltBar).css('left', movex);
                $(lis).css('left', -movex / scale);
            });
            $(window).mouseup(function () {
                $(window).off('mousemove');
                $(window).off('mouseup');
            });
        });



        //左按钮事件
        let $Lbtn = $('#like .act_l');
        $Lbtn.click(function () {
            let lisLeft = $(lis).position().left;
            let movex = lisLeft + liWidth;
            if (movex > 0) {
                movex = 0;
            } else if (movex < -ulMax) {
                movex = -ulMax;
            }
            $(lis).animate({
                'left'
                    : movex
            }, 300);
            $(ltBar).animate({ 'left': -movex * scale }, 300);
        });

        let $Rbtn = $('#like .act_r');
        $Rbtn.click(function () {
            let rigLeft = $(lis).position().left;
            console.log(rigLeft)
            let movex = rigLeft - liWidth;
            if (movex > 0) {
                movex = 0;
            } else if (movex < -ulMax) {
                movex = -ulMax;
            }
            $(lis).animate({
                'left'
                    : movex
            }, 300);
            $(ltBar).animate({ 'left': -movex * scale }, 300);
        });



        //左边按钮长按事件
        $Lbtn.mousedown(function () {
            let time = null;
            time = setInterval(function () {
                let speed = 10;
                let lisLeft = $(lis).position().left;
                let movex = lisLeft + speed;
                if (movex > 0) {
                    movex = 0;
                } else if (movex < -ulMax) {
                    movex = -ulMax;
                }
                $(lis).css('left', movex);
                $(ltBar).css('left', -movex * scale);
            }, 10);

            $Lbtn.mouseup(function () {
                clearInterval(time);
            });
            $Lbtn.mouseout(function () {
                clearInterval(time);
            });
        });

        //右边按钮长按事件
        $Rbtn.mousedown(function () {
            let time = null;
            time = setInterval(function () {
                let speed = 10;
                let lisLeft = $(lis).position().left;
                let movex = lisLeft - speed;
                if (movex > 0) {
                    movex = 0;
                } else if (movex < -ulMax) {
                    movex = -ulMax;
                }
                $(lis).css('left', movex);
                $(ltBar).css('left', -movex * scale);
            }, 10);

            $Rbtn.mouseup(function () {
                clearInterval(time);
            });
            $Rbtn.mouseout(function () {
                clearInterval(time);
            });
        });
    })();

    (function () {
        $go = $('#floor .go');
        $floor = $('.floor');
        $(window).scroll(function () {
            let $top = $(window).scrollTop();
            if ($top > $('#banner').offset().top) {
                $("#floor").show();
            } else {
                $("#floor").hide();
            }

            $floor.each(function (i) {
                if ($top > $floor.eq(i).offset().top - 200) {
                    $go.eq(i).addClass('touch').siblings().removeClass('touch');
                }
            });


        });
        $go.click(function () {
            let idx = $go.index(this);
            console.log(idx)
            let $top = $floor.eq(idx).offset().top - 30;
            $(this).addClass('touch').siblings().removeClass('touch');
            //				$(window).scrollTop(300);
            $('html,body').animate({ 'scrollTop': $top }, 300);
        });


        $('#floor .back_top').click(function () {
            $('html,body').animate({ 'scrollTop': 0 }, 300);
        });
    })();


    $('#btn').click(function () {
        let urls = '/jdhk/src/html/listpage.html?search=' + $('#search').val();
        window.location.href = urls;
    });
});