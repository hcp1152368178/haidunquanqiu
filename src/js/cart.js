$(function () {
    let $uid = $.cookie('uid');
    var num = 0;

    function show() {
        $.ajax({
            type: "post",
            url: "../api/carts.php",
            async: true,
            data: {
                'uid': $uid
            },
            dataType: 'json',
            success: function (data) {
                console.log("成功");
                var lis = data.lis;
                let res = data.result;
                console.log(lis); console.log(res);
                let html = '';
                for (let i = 0; i < res.length; i++) {
                    console.log(i)

                    let html2 = '';
                    lis[i].forEach(function (itme) {
                        num += Number(itme.num);
                        let price = itme.price * itme.num;
                        html2 += `<div class="list_item" data-index='${itme.code}'>
                                        <div class="lis">
                                            <div class="lis_content  clearfix">
                                                <div class="check">
                                                    <input type="checkbox" name="" class="select" value="" />
                                                </div>
                                                <div class="indent clearfix">
                                                    <div class="img_box">
                                                        <a href="###"><img src="/jdhk/src/img/${itme.imgurl}"/></a>
                                                    </div>
                                                    <div class="con_title">
                                                        ${itme.title}
                                                    </div>
                                                    <div class="price">
                                                        ${itme.price}
                                                    </div>
                                                    <div class="quantity">
                                                        <input type="button" name="" value="-" class="des" />
                                                        <input type="text" name="" id="" value="${itme.num}" class="input_num" onkeyup="this.value=this.value.replace(/[^0-9]/g,'');"/>
                                                        <input type="button" name=""  value="+" class="add"/>
                                                    </div>
                                                    <div class="total">
                                                        ${price}
                                                    </div>
                                                    <div class="delbox">
                                                        <a href="###" class="del">删除</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
                    });
                    html += `
                        <div class="cart_lis">
                            <div class="title">
                                <div class="lis_check_all">
                                    <input type="checkbox"  class="selectall" />
                                </div>
                                <div class="list_title">
                                        ${res[i].shopname}
                                </div>
                            </div>
                            ${html2}
                        </div> `;
                    $('#allnum').html(num);
                }
                $('#content .content').html(html);
            }
        });


    }
    show();


    //lisSelect 选中时的样式
    $('.closeall').change(function () {
        $('input[type=checkbox]').prop('checked', $(this).prop('checked'));

    });

    //		$('.select').change(function(){
    //		});

    $('.content').on('change', '.selectall', function () {

        //			console.log( $(this).parents('.title'));
        $(this).parents('.title').next().children('.select').prop('checked', $(this).prop('checked'));
        console.log($(this).parents('.title').next().find('.select').prop('checked', $(this).prop('checked')))
    });

    $('.content').on('change', '.select', function () {
        let num = 0;
        let checklen = $(this).parents('.cart_lis').find('.list_item .select').size();
        console.log(checklen);
        let selectall = $(this).parents(".cart_lis").find('.selectall');
        console.log(selectall);
        let ischeck = $(this).parents('.cart_lis').find('.list_item .select');
        ischeck.each(function () {
            if ($(this).is(':checked')) {
                num++;
            }
        });
        console.log(num, checklen)
        if (num == checklen) {
            selectall.prop('checked', 'checked');
        } else {
            selectall.removeAttr('checked');
        }
    });

    $('.content').on('click', '.del', function () {
        let lis = $(this).parents('.lis');
        let lisitem = $(this).parents('.list_item');
        let idx = $(this).parents('.list_item').attr('data-index');

        $.sendConfirm({
            hideHeader: true,
            withCenter: true,
            msg: '是否删除？',
            button: {
                confirm: '确认',
                cancel: '取消'
            },
            onConfirm: function () {
                lis.remove();
                if (lisitem.children().length == 0) {
                    lisitem.prev().remove();
                    lisitem.remove();

                    $.ajax({
                        type: "post",
                        url: "../api/del.php",
                        async: true,
                        data: {
                            'uid': $uid,
                            'code': idx
                        },
                        success: function (data) {
                            console.log(data)
                        }
                    });
                }
            },
            onCancel: function () {

            },
            onClose: function () {
            }
        });
    });

    $('.content').on('click', '.add', function () {
        var danjia = $(this).parents('.indent').find('.price').html();
        var zongjia = $(this).parents('.indent').find('.total');
        let numb = $(this).siblings('.input_num').val();
        numb++;

        $(this).siblings('.input_num').val(numb);
        let a = danjia * numb;
        zongjia.html(a);
        let idx = $(this).parents('.list_item').attr('data-index');

        $.ajax({
            type: "post",
            url: "../api/add.php",
            async: true,
            data: {
                'uid': $uid,
                'code': idx,
                'num': numb
            },
            success: function (data) {
                console.log(data)
            }
        });
    });
    $('.content').on('click', '.des', function () {
        var danjia = $(this).parents('.indent').find('.price').html();
        var zongjia = $(this).parents('.indent').find('.total');
        let numb = $(this).siblings('.input_num').val();
        numb--;
        if (numb <= 0) {
            numb = 0;
        }
        $(this).siblings('.input_num').val(numb);
        let a = danjia * numb;
        zongjia.html(a);
        let idx = $(this).parents('.list_item').attr('data-index');

        $.ajax({
            type: "post",
            url: "../api/add.php",
            async: true,
            data: {
                'uid': $uid,
                'code': idx,
                'num': numb
            },
            success: function (data) {
                console.log(data)
            }
        });
    });
});
