$(function () {



    //	$.getUrlParam = function (name) {
    //                  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //                  var r = window.location.search.substr(1).match(reg);
    //                  if (r != null) return unescape(r[2]); return null;
    //  }
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
    var urls = location.search.slice(1);

    var keyword = decodeURI(strToObj(urls).search); //索引值
    var sort = 'desc'; //排序  默认降序
    var tab = 'default'; //字段名
    var title = ''; //在结果中搜索
    var minlis = ''; //价格区间 最小
    var maxlis = ''; //价格区间 最大
    var index = 0; //索引
    // var num = 20;//每页的条数
    var page = ''; //页数
    var lis = ''; //总条数

    $('#keyword').html('"' + keyword + '"');
    //	console.log(keyword)
    //	console.log(location.search);
    if (keyword == '' || location.search == '') {
        $('#keyword').html('"' + '"');
        $('.list_btm').hide();
        $('.page_div').hide();
        $('.hasnone').show();
        //		console.log(123)

    } else {
        $('.hasnone').hide();
        $('.list_btm').show();
        $('.page_div').show();

        // $.ajax({
        //     type: "get",
        //     url: "../api/search.php",
        //     data: {
        //         'index': index * 10,
        //         "order": sort,
        //         'tab': tab,
        //         'title': title,
        //         //'min' : minlis,
        //         //'max' : maxlis,
        //         'keyword': keyword
        //     },
        //     dataType: 'json',
        //     success: function (data) {
        //         lis = data.lis;
        //         let res = data.res;
        //         //console
        //         let html = res.map(function (item) {
        //             let imgnum = item.img.split(';');
        //             let imghtml = imgnum.map(function (item, idx) {
        //                 if (idx == 0) {
        //                     return `<li class="sm_img curr">
        // 										<img src="../img/index/${item}" />
        // 									</li>`;
        //                 } else {
        //                     return `<li class="sm_img">
        // 										<img src="../img/index/${item}" />
        // 									</li>`;
        //                 }
        //             }).join('')
        //             return `
        // 					<li class="con_list" data-id ="${item.proid}">
        // 							<div class="img_box">
        // 								<a href="###"><img src="../img/index/${imgnum[0]}" /></a>
        // 							</div>
        // 							<div class="img_lis clearfix">
        // 								<ul>
        // ${imghtml}
        // 								</ul>
        // 							</div>
        // 							<div class="cost">
        // 								<i>￥</i>
        // 								<span class="yen">
        // 									${item.price}
        // 								</span>
        // 							</div>
        // 							<div class="title_p">
        // 								<a href="###" class="title_name">${item.title} </a>
        // 							</div>
        // 							<div class="buy">
        // 								<span>已售</span>
        // 								<b class="buy_num">${item.sales}</b>
        // 								<span>件</span>
        // 							</div>
        // 							<div class="shopname">
        // 								<a href="###">${item.shopname}</a>
        // 								<a href="###" class="i_logo"></a>
        // 							</div>
        // 							<div class="like">
        // 								<b>${item.like}</b><span>收藏</span>
        // 							</div>
        // 							<div class="attention">
        // 								关注
        // 							</div>
        // 						</li>

        // 					`;

        //         }).join('');
        //         //console.log(res);
        //         //console.log(html)
        //         $('.list_btm ul').html(html);
        //         page = Math.ceil(lis / 10);
        //         $('#sun').html(page);
        //         $(".page_div").paging({
        //             totalPage: page,
        //             totalSize: lis,
        //             callback: function (num) { }
        //         })
        //     }
        // });
        getData();
    }

    function getData() {
        $.ajax({
            type: "get",
            url: "../api/search.php",
            success: function (res) {
                // console.log(res);
                var arr = JSON.parse(res);
                lis = arr.lis;
                // console.log(lis);
                var content = arr.content;
                console.log(content);
                if (content == '') {
                    $('.list_btm').hide();
                    $('.page_div').hide();
                    $('.hasnone').show();
                    $('#molecule').html(0);
                }
                let html = content.map(function (item) {
                    let imgnum = item.img.split(';');
                    let imghtml = imgnum.map(function (item, idx) {
                        if (idx == 0) {
                            return `<li class="sm_img curr">
                                        <img src="../img/index/${item}" />
                                    </li>`;
                        } else {
                            return `<li class="sm_img">
                                        <img src="../img/index/${item}" />
                                    </li>`;
                        }

                    }).join('')

                    return `<li class="con_list" data-id ="${item.proid}">
                                <div class="img_box">
                                    <a href="###"><img src="../img/index/${imgnum[0]}" /></a>
                                </div>
                                <div class="img_lis clearfix">
                                    <ul>
                                        ${imghtml}
                                    </ul>
                                </div>
                                <div class="cost">
                                    <i>￥</i>
                                    <span class="yen">
                                        ${item.price}
                                    </span>
                                </div>
                                <div class="title_p">
                                    <a href="###" class="title_name">${item.title} </a>
                                </div>
                                <div class="buy">
                                    <span>已售</span>
                                    <b class="buy_num">${item.sales}</b>
                                    <span>件</span>
                                </div>
                                <div class="shopname">
                                    <a href="###">${item.shopname}</a>
                                    <a href="###" class="i_logo"></a>
                                </div>
                                <div class="like">
                                    <b>${item.like}</b><span>收藏</span>
                                </div>
                                <div class="attention">
                                    关注
                                </div>
                            </li>`;
                }).join('');
                console.log(content);
                console.log(html)
                $('.list_btm ul').html(html);





                page = Math.ceil(lis / 20);//每页20条，有多少页
                $('#number').html(lis);
                $('#sun').html(page);
                $('#molecule').html(1);
                $(".page_div").paging({
                    totalPage: page,//总页数
                    totalSize: lis,//总条数
                    callback: function (num) {
                        if (num <= page && num > 0) {
                            index = (num - 1) * 20;
                            console.log(index, 1);
                            $('#molecule').html(num);
                            paging();
                        }
                        console.log(index, 2)
                    }
                })
            }

        });
        //		console.log(hasinput());
    }



    // function getData() {
    //     $.ajax({
    //         type: "get",
    //         url: "../api/search.php",
    //         data: hasinput(),
    //         dataType: 'json',
    //         success: function (data) {
    //             // console.log(data, 2);
    //             lis = data.lis;
    //             // console.log(lis);
    //             let res = data.res;
    //             // console.log(res);
    //             if (res == '') {
    //                 $('.list_btm').hide();
    //                 $('.page_div').hide();
    //                 $('.hasnone').show();
    //                 $('#molecule').html(0);
    //             }

    //             let html = res.map(function (item) {

    //                 let imgnum = item.img.split(';');
    //                 let imghtml = imgnum.map(function (item, idx) {
    //                     if (idx == 0) {
    //                         return `<li class="sm_img curr">
    // 									<img src="../img/index/${item}" />
    // 								</li>`;
    //                     } else {
    //                         return `<li class="sm_img">
    // 									<img src="../img/index/${item}" />
    // 								</li>`;
    //                     }

    //                 }).join('')

    //                 return `<li class="con_list" data-id ="${item.proid}">
    //                             <div class="img_box">
    //                                 <a href="###"><img src="../img/index/${imgnum[0]}" /></a>
    //                             </div>
    //                             <div class="img_lis clearfix">
    //                                 <ul>
    //                                     ${imghtml}
    //                                 </ul>
    //                             </div>
    //                             <div class="cost">
    //                                 <i>￥</i>
    //                                 <span class="yen">
    //                                     ${item.price}
    //                                 </span>
    //                             </div>
    //                             <div class="title_p">
    //                                 <a href="###" class="title_name">${item.title} </a>
    //                             </div>
    //                             <div class="buy">
    //                                 <span>已售</span>
    //                                 <b class="buy_num">${item.sales}</b>
    //                                 <span>件</span>
    //                             </div>
    //                             <div class="shopname">
    //                                 <a href="###">${item.shopname}</a>
    //                                 <a href="###" class="i_logo"></a>
    //                             </div>
    //                             <div class="like">
    //                                 <b>${item.like}</b><span>收藏</span>
    //                             </div>
    //                             <div class="attention">
    //                                 关注
    //                             </div>
    //                         </li>`;
    //             }).join('');
    //             // console.log(res);
    //             // console.log(html)
    //             $('.list_btm ul').html(html);
    //             page = Math.ceil(lis / 10);
    //             $('#number').html(lis);
    //             $('#sun').html(page);
    //             $('#molecule').html(1);
    //             $(".page_div").paging({
    //                 totalPage: page,
    //                 totalSize: lis,
    //                 callback: function (num) {
    //                     if (num <= page && num > 0) {
    //                         index = (num - 1) * 10;
    //                         //console.log(index);
    //                         $('#molecule').html(num);
    //                         paging();
    //                     }
    //                     //console.log(index)
    //                 }
    //             })
    //         }

    //     });
    //     //		console.log(hasinput());
    // }


    $('.sort').on('click', 'a', function () {
        index = 0;
        $(this).addClass('chose').siblings().removeClass('chose');
    });
    $('#auto').click(function () {
        index = 0;
        tab = 'default';
        sort = 'desc';
        getData();
    });

    $('#salVol').click(function () {
        index = 0;
        tab = 'sales';
        sort = 'desc';
        getData();
    });

    $('#priceAsc').click(function () {
        index = 0;
        tab = 'price';
        sort = 'asc';
        getData();
    });

    $('#priceDes').click(function () {
        index = 0;
        tab = 'price';
        sort = 'desc';
        getData();
    });
    $('#enshrine').click(function () {
        index = 0;
        tab = 'like';
        sort = 'desc';
        getData();
    });

    $('#clear').click(function () {
        index = 0;
        $(this).siblings('input').val('');
    });
    $('#confirm').click(function () {
        index = 0;

        if ($('#min').val() > $('#max').val() && $('#min').val() != '' && $('#max').val() != '') {
            let min = $('#min').val();
            let max = $('#max').val();
            [min, max] = [max, min];
            $('#min').val(min);
            $('#max').val(max);
        }
        //		hasinput();
        getData();
    });

    $('#seek').click(function () {
        index = 0;
        title = $('#content').val();
        //console.log(title)
        getData();
    });
    $('#allresult').click(function () {
        index = 0;
        getData();
    })

    //console.log(keyword);

    function hasinput() {
        let min = $('#min').val();
        let max = $('#max').val();

        // console.log(min, max);
        if (min == '' && max == '') {
            return {
                'index': index,
                "order": sort,
                'tab': tab,
                'title': title,
                //'min' : minlis,
                //'max' : maxlis,
                'keyword': keyword
            };
        } else if (min != '' && max == '') {
            return {
                'index': index,
                "order": sort,
                'tab': tab,
                'title': title,
                'min': min,
                //'max' : maxlis,
                'keyword': keyword
            };
        } else if (min == '' && max != '') {
            return {
                'index': index,
                "order": sort,
                'tab': tab,
                'title': title,
                //'min' : min,
                'max': max,
                'keyword': keyword
            };
        } else {
            return {
                'index': index,
                "order": sort,
                'tab': tab,
                'title': title,
                'min': min,
                'max': max,
                'keyword': keyword
            }
        }
    }

    $('.list_btm').on('mouseenter', '.img_lis .sm_img', function () {
        $(this).addClass('curr').siblings().removeClass('curr');
        $(this).parent().parent().prev().children().children().attr('src', $(this).children('img').attr('src'));
        //		console.log(13)
    });



    function paging() {
        window.scrollTo(0, $('#result').offset().top);
        // $.ajax({
        //     type: "get",
        //     url: "../api/search.php",
        //     data: hasinput(),
        //     dataType: 'json',
        //     success: function (data) {
        //         console.log(data);
        //         let res = data.res;
        //         // console.log(res);

        //         let html = res.map(function (item) {

        //             let imgnum = item.img.split(';');
        //             let imghtml = imgnum.map(function (item, idx) {
        //                 if (idx == 0) {
        //                     return `<li class="sm_img curr">
        // 								<img src="../img/index/${item}" />
        // 							</li>`;
        //                 } else {
        //                     return `<li class="sm_img">
        // 								<img src="../img/index/${item}" />
        // 							</li>`;
        //                 }

        //             }).join('')

        //             return `
        //                     <li class="con_list" data-id ="${item.proid}">
        //                             <div class="img_box">
        //                                 <a href="###"><img src="../img/index/${imgnum[0]}" /></a>
        //                             </div>
        //                             <div class="img_lis clearfix">
        //                                 <ul>
        //                                     ${imghtml}
        //                                 </ul>
        //                             </div>
        //                             <div class="cost">
        //                                 <i>￥</i>
        //                                 <span class="yen">
        //                                     ${item.price}
        //                                 </span>
        //                             </div>
        //                             <div class="title_p">
        //                                 <a href="###" class="title_name">${item.title} </a>
        //                             </div>
        //                             <div class="buy">
        //                                 <span>已售</span>
        //                                 <b class="buy_num">${item.sales}</b>
        //                                 <span>件</span>
        //                             </div>
        //                             <div class="shopname">
        //                                 <a href="###">${item.shopname}</a>
        //                                 <a href="###" class="i_logo"></a>
        //                             </div>
        //                             <div class="like">
        //                                 <b>${item.like}</b><span>收藏</span>
        //                             </div>
        //                             <div class="attention">
        //                                 关注
        //                             </div>
        //                     </li> `;
        //         }).join('');
        //         //console.log(res);
        //         //console.log(html)
        //         $('.list_btm ul').html(html);
        //     }
        // });

        $.ajax({
            type: "get",
            url: "../api/search.php",
            data: hasinput(),
            success: function (res) {
                // console.log(res);
                var arr = JSON.parse(res);
                lis = arr.lis;
                // console.log(lis);
                var content = arr.content;
                // console.log(content);
                if (content == '') {
                    $('.list_btm').hide();
                    $('.page_div').hide();
                    $('.hasnone').show();
                    $('#molecule').html(0);
                }
                let html = content.map(function (item) {
                    let imgnum = item.img.split(';');
                    let imghtml = imgnum.map(function (item, idx) {
                        if (idx == 0) {
                            return `<li class="sm_img curr">
                                        <img src="../img/index/${item}" />
                                    </li>`;
                        } else {
                            return `<li class="sm_img">
                                        <img src="../img/index/${item}" />
                                    </li>`;
                        }

                    }).join('')

                    return `<li class="con_list" data-id ="${item.proid}">
                                <div class="img_box">
                                    <a href="###"><img src="../img/index/${imgnum[0]}" /></a>
                                </div>
                                <div class="img_lis clearfix">
                                    <ul>
                                        ${imghtml}
                                    </ul>
                                </div>
                                <div class="cost">
                                    <i>￥</i>
                                    <span class="yen">
                                        ${item.price}
                                    </span>
                                </div>
                                <div class="title_p">
                                    <a href="###" class="title_name">${item.title} </a>
                                </div>
                                <div class="buy">
                                    <span>已售</span>
                                    <b class="buy_num">${item.sales}</b>
                                    <span>件</span>
                                </div>
                                <div class="shopname">
                                    <a href="###">${item.shopname}</a>
                                    <a href="###" class="i_logo"></a>
                                </div>
                                <div class="like">
                                    <b>${item.like}</b><span>收藏</span>
                                </div>
                                <div class="attention">
                                    关注
                                </div>
                            </li>`;
                }).join('');
                // console.log(res);
                // console.log(html)
                $('.list_btm ul').html(html);
            }

        });
    }

    // $('#btn').click(function() {
    // 	let urls = '/jdhk/src/html/listpage.html?search=' + $('#search').val();
    // 	window.location.href = urls;
    // });

    $('#nav .all').mouseover(function () {
        $('#nav .all_item').show();
        //		$('#nav .all_item').mous
    }).mouseout(function () {
        $('#nav .all_item').hide();
    });

    $('.list_btm').on('click', '.img_box a , .title_p a', function () {
        let dataid = $(this).parent().parent('.con_list').attr('data-id');
        console.log(dataid);
        let urls = '../html/goodsdetail.html?dataid=' + dataid;
        window.location.href = urls;
    });
});