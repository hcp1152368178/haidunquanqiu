$(function () {
    let $uid = $.cookie('uid');//获取cookie中的uid
    var num = 0;//商品数量

    function show() {
        //先清空当前页面，再重新渲染
        $('#content .content').html('');
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
                // console.log(lis, 'lis'); console.log(res, 'res');
                let html = '';
                for (let i = 0; i < res.length; i++) {
                    // console.log(i)
                    let html2 = '';
                    lis[i].forEach(function (itme) {
                        num += Number(itme.num);
                        // console.log(num, 44444);
                        let price = itme.price * itme.num;
                        html2 += `<div class="list_item" data-index='${itme.code}'>
                                        <div class="lis">
                                            <div class="lis_content  clearfix">
                                                <div class="check">
                                                    <input type="checkbox" name="" class="select an" value="" />
                                                </div>
                                                <div class="indent clearfix">
                                                    <div class="img_box">
                                                        <a href="###"><img src="../img/index/${itme.imgurl}"/></a>
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
    show();//初始化，渲染

    //计算总数量和总价格
    var arr = [];
    function all() {
        $('.content .an').each(function (i, item) {
            if ($(item).prop('checked')) {
                //这一行被勾选，把的下标存到数组里面
                arr.push(i);
            }
        });
        console.log(arr);
        //求总数量
        var num = 0;
        var price = 0;
        arr.forEach(function (item) { //0 1 
            num += $('.input_num').eq(item).val() * 1;
            price += $('.total').eq(item).text().slice(2) * 1;
        });
        //渲染
        $('.chosenum').html('已选择<span>' + num + '</span>件商品');
        $('.sum').html('总价（不含运费）：<span>' + '￥' + price + '</span>');
        arr = []; //数组用完就清空
    }

    //lisSelect 选中时的样式
    $('.closeall').change(function () {
        if ($('input[type=checkbox]').prop('checked', $(this).prop('checked'))) {
            all();
        } else {
            $('input[type=checkbox]').prop('checked', $(this).prop('checked', flase));
            all();
        }
    });

    $('.content').on('change', '.selectall', function () {
        // $(this).parents('.title').next().children('.select').prop('checked', $(this).prop('checked'));
        $(this).parent().parent().next().find('.an').prop('checked', $(this).prop('checked'));
        all();
    });

    $('.content').on('change', '.select', function () {
        let num = 0;
        let checklen = $(this).parents('.cart_lis').find('.list_item .select').size();
        // console.log(checklen);
        let selectall = $(this).parents(".cart_lis").find('.selectall');
        // console.log(selectall);
        let ischeck = $(this).parents('.cart_lis').find('.list_item .select');
        ischeck.each(function () {
            if ($(this).is(':checked')) {
                num++;
                // console.log(num)
            }
        });
        // console.log(num, checklen)
        if (num == checklen) {
            selectall.prop('checked', 'checked');//设置选中的属性值
            all();
        } else {
            selectall.removeAttr('checked');//删除选中的属性
            all();
        }
    });

    // 点击删除事件
    $('.content').on('click', '.del', function () {
        let lis = $(this).parents('.lis');
        let lisitem = $(this).parents('.list_item');
        let idx = $(this).parents('.list_item').attr('data-index');

        // 删除时弹窗挽留一下
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
                all();
            },
            onCancel: function () {
                all();
            },
            onClose: function () {
                all();
            }
        });

    });

    $('#account').on('click', '.del_bot', function () {
        // let lis = $(this).parents('.lis');
        // let lisitem = $(this).parents('.list_item');
        // let idx = $(this).parents('.list_item').attr('data-index');

        // 删除时弹窗挽留一下
        $.sendConfirm({
            hideHeader: true,
            withCenter: true,
            msg: '是否删除选中商品？',
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
                all();
            },
            onCancel: function () {
                all();
            },
            onClose: function () {
                all();
            }
        });
    })

    // 商品数量
    $('.content').on('click', '.add', function () {
        var danjia = $(this).parents('.indent').find('.price').html();
        var zongjia = $(this).parents('.indent').find('.total');
        let numb = $(this).prev().val();
        numb++;
        numb = numb >= 999 ? 999 : numb;
        $(this).prev().val(numb);
        let a = danjia * numb;
        zongjia.html(a);
        let idx = $(this).parents('.list_item').attr('data-index');
        // all();
        updata($uid, idx, numb);
    }).on('click', '.des', function () {
        var danjia = $(this).parents('.indent').find('.price').html();
        var zongjia = $(this).parents('.indent').find('.total');
        let numb = $(this).next().val();
        numb--;
        numb = numb <= 1 ? 1 : numb;
        $(this).next().val(numb);
        let a = danjia * numb;
        zongjia.html(a);
        let idx = $(this).parents('.list_item').attr('data-index');
        // all();
        updata($uid, idx, numb);
    }).on('blur', '.input_num', function () {
        //手动输入，失去焦点触发事件
        var danjia = $(this).parents('.indent').find('.price').html();
        var zongjia = $(this).parents('.indent').find('.total');
        let numb = $(this).val();
        numb = numb <= 1 ? 1 : numb;
        $(this).val(numb);
        let a = danjia * numb;
        zongjia.html(a);
        let idx = $(this).parents('.list_item').attr('data-index');
        // all();
        updata($uid, idx, numb);
    });

    // 更新数据库数据
    function updata($uid, idx, numb) {
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
    }
});
