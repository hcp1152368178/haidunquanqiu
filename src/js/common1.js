$(function () {
    // $('#header .show_qr').hover(function () {
    //     $('#header .title').css({
    //         'background': 'white',
    //         'color': '#7d256e'
    //     });
    //     $('#header .at_qr').css({
    //         'background-position': '-82px -39px'
    //     });
    //     $('#header .at_jt').css({
    //         'background-position': '-82px -82px'
    //     });
    //     $('#header .hd_qr').show().css({
    //         'top': '28px',
    //     });
    // }, function () {
    //     $('#header .title').css({
    //         'background': '',
    //         'color': ''
    //     });
    //     $('#header .hd_qr').css({
    //         'top': '30px',
    //     });
    //     $('#header .at_qr').css({
    //         'background-position': '-60px -39px'
    //     });
    //     $('#header .at_jt').css({
    //         'background-position': '-59px -62px'
    //     });
    //     $('#header .hd_qr').hide();
    // }
    // );
    $('#btn').click(function () {
        let urls = '../html/goodslist.html?search=' + $('#search').val();
        window.location.href = urls;
    });
});
