$(function () {
    function strToObj(str) {
        //name=malin&psw=456123
        var obj = {};
        var arr = str.split('&'); //['name=malin','psw=456123']
        arr.forEach(function (item) {
            var innerarr = item.split('='); //['name','malin']
            obj[innerarr[0]] = innerarr[1]; //生成的数据马上存起来，否则下一轮循环会清空该数组
            //obj['name'] = 'malin';
        });
        return obj;
    }
    var shopname = null;//商店名
    var proid = null;//商品id
    var urls = location.search.slice(1);
    var imgurl = null;
    var title = null;
    var price = null;
    var shopid = decodeURI(strToObj(urls).dataid);
    //	console.log(shopid);
    if (shopid == '' || shopid == "undefined") {
        console.log(shopid);
        window.location.href = '../mam.html';
    } else {

        let hasnum = 0;
        $.ajax({
            type: "get",
            url: "../api/details.php",
            data: {
                'shopid': shopid
            },
            dataType: 'json',
            success: function (data) {
                lis = data.lis;
                if (lis == 0) {
                    $.sendMsg('不存在该商品', 2000, function () {
                        window.location.href = '../index.html';
                    });

                } else {
                    let details = data.details[0];
                    let recommend = data.recommend;
                    let more = data.more;
                    //					console.log(details);

                    let imgnum = details.img.split(';');
                    //					console.log(imgnum[0]);
                    shopname = details.shopname;
                    proid = details.proid;
                    $('#shopname').html(details.shopname);
                    $('#title').html(details.title);
                    $('#price').html(details.price);
                    $('#num').html(details.repertory);
                    hasnum = details.repertory;
                    imgurl = imgnum[0];
                    price = details.price;
                    console.log(imgurl);
                    title = details.title
                    $('#showing').css('background-image', `url(../img/index/${imgnum[0]})`);
                    $('#bigimg').attr('src', '../img/index/' + imgnum[0]);
                    let html = '';
                    imgnum.forEach(function (item, index) {
                        if (index == 0) {
                            html += '<li class="opc"><img src="../img/index/' + item + '" />'
                        } else {
                            html += '<li><img src="../img/index/' + item + '" />';
                        }

                    });

                    $('.ulBox ul').html(html);

                    let movehtml = ``;

                    more.forEach(function (item) {
                        let imgs = item.img.split(';');

                        movehtml += `<li data-index = "${item.proid}">
									<a href="###"><img src="../img/index/${imgs[0]}" /></a>
									<p>${item.title}</p>
									<span class="priceright"> <i>&yen;</i> <span >${item.price}</span> </span>
								</li>`
                    });

                    $('.lis ul').html(movehtml);

                    let rechtml = ``;
                    recommend.forEach(function (item) {
                        let imgs = item.img.split(';');

                        rechtml += `<li data-index = "${item.proid}">
							<a href="###"><img src="../img/index/${imgs[0]}" /></a>
							<p>${item.title}</p>
							<b>
								&yen;${item.price}
							</b>
						</li>`
                    });

                    $('.ref_content ul').html(rechtml);
                }


            }
        });


        $('.ref_content ul').on('click', "li", function (e) {
            let dataid = $(this).attr('data-index');
            let urls = '../html/goodsdetail.html?dataid=' + dataid;
            window.location.href = urls;
        })

        $('.lis ul').on('click', "li", function (e) {
            let dataid = $(this).attr('data-index');
            let urls = '../html/goodsdetail.html?dataid=' + dataid;
            window.location.href = urls;
        });

        $('.ulBox ul').on('click', "li", function (e) {
            let dataid = $(this).attr('data-index');
            let urls = '../html/goodsdetail.html?dataid=' + dataid;
            window.location.href = urls;
        });


        $('.ulBox ul').on('mouseenter', "li", function (e) {
            $(this).addClass('opc').siblings().removeClass('opc');
            let imgurl = $(this).children().attr('src');
            let hei = $('#showing').height() * 1.15;
            $('#bigimg').attr('src', imgurl);
            $('#showing').css({ 'background-image': `url(${imgurl})` });
        })


        $('.imgBox').on('mouseenter', function () {
            $('#showing').show();
            $('#shade').show();
            let ratio = ($('.imgBox').height() - $('#shade').height()) / (831 - $('#showing').height())
            let mintop = $('#shade').height() / 2;
            let maxtop = $('.imgBox').height() - $('#shade').height();
            let minleft = $('#shade').height() / 2;
            let maxleft = $('.imgBox').height() - $('#shade').height();
            let top = $('.imgBox').offset().top;
            let left = $('.imgBox').offset().left;
            //			console.log(mintop,maxtop);
            $('.imgBox').mousemove(function (e) {
                let x = e.pageX;
                let y = e.pageY;
                let movetop = y - top - mintop;
                let moveleft = x - left - minleft;

                if (movetop < 0) {
                    movetop = 0;
                } else if (movetop > maxtop) {
                    movetop = maxtop;
                }

                if (moveleft < 0) {
                    moveleft = 0;
                } else if (moveleft > maxleft) {
                    moveleft = maxleft;
                }
                $('#shade').css({
                    'top': movetop,
                    'left': moveleft
                });
                $('#showing').css({
                    'background-position-x': -moveleft / ratio,
                    'background-position-y': -movetop / ratio
                });

                //			console.log(top,left,x,y)
            });
        });
        $('.imgBox').on('mouseleave', function () {
            $('#showing').hide();
            $('#shade').hide();
        })

        $('#add').click(function () {
            let num = $('#number').val();
            num++;
            if (num > hasnum) {
                num = hasnum;
            }
            $('#number').val(num);
        });

        $('#des').click(function () {
            let num = $('#number').val();
            num--;
            if (num < 1) {
                num = 1;
            }
            $('#number').val(num);
        });

        $('#number').bind('input propertychange', function () {
            let num = $('#number').val();


            if (num > Number(hasnum)) {

                num = hasnum;
                $('#number').val(hasnum);
            }
            if (num == '') {
                num = 1;
                $('#number').val(num);
            }
        });

        $('.qrcode').hover(function () {
            $('.jdcode').show();
        }, function () {
            $('.jdcode').hide();
        });

        $('#close').click(function () {
            $('.jdcode').hide();
        })

        $('#append').click(function () {

            let num = Number($('#number').val());

            let $uid = $.cookie('uid');

            if ($uid == '' || $uid == undefined || $uid == 'null') {
                $.sendWarningToTop('您还未登录。', 200, function () {
                });
            } else {
                console.log($uid)
                $.ajax({
                    type: "post",
                    url: "../api/addcarts.php",
                    async: true,
                    data: {
                        'uid': $uid,
                        'shopname': shopname,
                        'proid': proid,
                        'num': $('#number').val(),
                        'imgurl': imgurl,
                        'title': title,
                        'price': price
                    },
                    dataType: 'text',
                    success: function (data) {
                        $.sendSuccessToTop('添加购物车成功。', 200, function () { });
                    }
                });


            }

        });


        $('#up').click(function () {

            let lishei = $('.lis').innerHeight();
            let ulhei = $('.lis ul').height();

            let top = $('.lis ul').position().top;
            let move = top + lishei;
            // console.log(lishei, ulhei, top, move);
            if (top >= 0) {
                move = 0;
            }
            $('.lis ul').stop().animate({ 'top': move }, 0);
        });
        $('#below').click(function () {
            let lishei = $('.lis').innerHeight();
            let ulhei = $('.lis ul').height();
            let maxtop = lishei - ulhei;
            let top = $('.lis ul').position().top;
            let move = top - lishei;
            console.log(lishei);
            if (top <= maxtop) {
                move = maxtop;
            }
            $('.lis ul').stop().animate({ 'top': move }, 0);
        });
    }
})
