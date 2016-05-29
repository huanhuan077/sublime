/**
 * Created by Administrator on 2016/1/11.
 */
window.onload=function(){
    var imgs = document.getElementsByTagName('img');
    var picList = document.getElementsByClassName('piclist')[0];
    var oBtn = document.getElementsByClassName('btn')[0];
    var btns = oBtn.getElementsByTagName('li');
    var iScroll = 0;
    var iNow = 0;
    var iStartScroll = 0;
    var iStartX = 0;

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.width = window.screen.width + "px";
    }
    picList.style.width = imgs[0].offsetWidth * 3 + 'px';
    picList.touchstart = function (ev) {
        alert(1)
        iStartX = ev.changedTouches[0].pageX;
        iStartScroll = iScroll;
}
    picList.touchmove = function (ev) {
        ev.preventDefault();
        var dis = ev.changedTouches[0].pageX - iStartX;
        iScroll = dis + iStartScroll;
        toStyle();
    }

    picList.touchend = function (ev) {
        ev.preventDefault();
        var dis = ev.changedTouches[0].pageX - iStartX;
        iScroll = dis + iStartScroll;
        iNow = -iScroll / window.screen.width;
        iNow = iNow % 1 < 0.2 ? Math.floor(iNow) : Math.ceil(iNow);
        if (iNow < 0) {
            iNow = 0;
        }
        if (iNow > btns.length - 1) {
            iNow = btns.length - 1;
        }
        iScroll = -iNow * window.screen.width;
        console.log(iScroll)
        for (var j = 0; j < btns.length; j++) {
            btns[j].className = '';
        }
        btns[iNow].className = 'active';
        picList.style.webkitTransition = picList.style.transition = "0.25s"
        toStyle();
    }
    function toStyle() {
        picList.style.webkitTransform = picList.style.transform = "translateX(" + iScroll + "px)";
    }
}