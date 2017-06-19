/**
 * Created by Administrator on 2015/12/29.
 */
window.onload = function () {
    //时间显示
    var oTime = document.getElementsByClassName('time')[0];
    fnTime();
    setInterval(fnTime, 1000);
    function fnTime() {
        var date = new Date();
        var iYear = date.getFullYear();
        var iMonth = date.getMonth() + 1;
        var iDate = date.getDate();
        var iHour = date.getHours();
        var iMin = date.getMinutes();
        var str = '';
        str = iYear + "/" + iMonth + "/" + iDate + " " + iHour + ":" + iMin;
        oTime.innerHTML = str;
    }

//背景音乐
    var music = document.getElementsByClassName('rotate')[0];
    var bgmusic = document.getElementById('bgmusic');
    music.onclick = function () {
        if (bgmusic.paused) {
            bgmusic.play();
            music.className = music.className.replace(' pause', '');
        } else {
            bgmusic.pause();
            music.className = music.className + ' pause';

        }
    }

    //地图
    var oSee = document.getElementsByClassName('see')[0];
    var oContainer = document.getElementById('container');
    var flag = true;
    oSee.onclick = function () {
        geolocation();
        if (flag) {
            oContainer.style.display = 'block';
            oSee.innerHTML = '收起地图';
            flag = false;
        } else {
            oContainer.style.display = 'none';
            oSee.innerHTML = '查看地图';
            flag = true;
        }
    }
    var address = document.getElementsByClassName('address')[0].firstChild.nodeValue;
    var city = address.substring(0, 3);
    var map = new BMap.Map("container");
    var point = new BMap.Point(116.331398, 39.897445);
    map.centerAndZoom(point, 15);
    var myGeo = new BMap.Geocoder();

    function geolocation() {
        myGeo.getPoint(address, function (point) {
            if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
            } else {
                alert("您选择地址没有解析到结果!");
            }
        }, city);
    }

//微信分享
    function randomString(len) {
        var len = len || 32;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPose = chars.length;
        var string = '';
        for (var i = 0; i < len; i++) {
            string += chars.charAt(Math.floor(Math.random() * maxPose));
        }
        return string;
    }

    function myAjax(_data, _url, callBack) {
        $.ajax({
            type: "get",
            url: _url,
            data: _data,
            dataType: "jsonp",
            jsonp: 'jsoncallback',
            //header("Access-Control-Allow-Origin: https://api.weixin.qq.com/cgi-bin/token?");
            success: function (data) {
                if (callBack != undefined) {
                    callBack(data);
                }
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status);
                alert(XMLHttpRequest.readyState);
                alert(textStatus);
            }
        });
    }

    //var url='https://api.weixin.qq.com/cgi-bin/token';
    //myAjax("grant_type=client_credential&appid=wx3fdf61fad04a6bad&secret=17ad029769a3399edfab0a298db35096",url,function(data){
    //    console.log(data);
    //    //console.log(data);
    //});
    var share=document.getElementsByClassName('share')[0];
    var shareDiv=document.getElementsByClassName('share_div')[0];
    var shareBg=document.getElementsByClassName('shareBg')[0];
    share.onclick=function(){
    shareDiv.style.display='block';
    html.style.overflowY='hidden';
    var string1 = "jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VKxVfd6vtEOCba3H05AfHkfvaRxxzmUpTFa6AtX_puyuFRO9SEufPxY_XWPqLFT2ew&nonceStr=randomString(16)&timestamp=new Date().getTime()&url=window.location.href";
    var sigNature = SHA1(string1);
    wx.config({
        debug: true,
        appId: 'wx3fdf61fad04a6bad',
        timestamp: new Date().getTime(),
        nonceStr: randomString(16),
        signature: sigNature,
        jsApiList: [
            'onMenuShareTimeline'
        ]
    });
    wx.ready(function () {
        alert('已通过');
        wx.checkJsApi({
            jsApiList: ['onMenuShareTimeline'],
            success: function (res) {
                alert(JSON.stringify(res));
            }
        });
        wx.onMenuShareTimeline({
            title: '速递花',
            link: window.location.href,
            imgUrl: 'http://www.sudihua.com/celebrate/images/index_top.jpg',
            success: function () {
                alert('已分享');
            },
            cancel: function () {
                alert('已取消');
            }
        });
    });

    wx.error(function () {
        alert('没通过');
        });
    }

    shareBg.onclick=function(){
        shareDiv.style.display='none';
        html.style.overflowY='auto';
}
    //首页图片列表滑动
    var picList = document.getElementsByClassName('pic_list')[0];
    var listWrap = document.getElementsByClassName('list_wrap')[0];
    var total = listWrap.offsetWidth;
    var images = picList.getElementsByTagName('img');
    var len = images.length;
    var imgwidth = images[0].width;
    var imgtotalwidth = (imgwidth + 10) * len;
    var offsetwidth = imgtotalwidth - total;
    var left = 0;
    var right = 0;
    var hammertime = new Hammer(picList);
    picList.style.left = 0;

    hammertime.on('panleft', function (ev) {
        if(picList.offsetWidth<listWrap.offsetWidth){
            picList.style.left = 0;
        }
        else if (parseInt(picList.style.left) < -offsetwidth || parseInt(picList.style.left) == -offsetwidth) {
            picList.style.left = -offsetwidth + 'px';
        } else {
            left = -12 + parseInt(picList.style.left);
            picList.style.left = left + 'px';
        }
    });

    hammertime.on('panright', function (ev) {
        if (parseInt(picList.style.left) == 0 || parseInt(picList.style.left) > 0) {
            right = 0;
        } else {
            right = 12 + parseInt(picList.style.left);
        }
        picList.style.left = right + 'px';
    });


//图集切换
    var d = true;
    var html = document.getElementsByTagName('html')[0];
    var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
    var clientheight = document.documentElement.clientHeight || document.body.clientHeight;


    document.onscroll = function () {
        scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        clientheight = document.documentElement.clientHeight || document.body.clientHeight;
    }
    window.onresize=function(){
        clientheight = document.documentElement.clientHeight || document.body.clientHeight;
    }
    function creat_divShade() {
        var div_shade = document.createElement('div');
        var close = document.createElement('span');
        var div_imgs = document.createElement('div');
        var div_panel = document.createElement('div');
        var ul_pag = document.createElement('ul');
        close.className = 'close';
        close.innerHTML = '×';
        div_shade.className = 'div_shade';
        div_shade.style.top = scrolltop + 'px';
        div_shade.style.height = clientheight +2+ 'px';
        div_imgs.id = 'imgs';
        for (var i = 1; i < 4; i++) {
            var sdiv = document.createElement('div');
            sdiv.id = 'bg' + i;
            sdiv.className = 'bg';
            div_imgs.appendChild(sdiv);
        }
        div_panel.className = 'pagination-panel';
        ul_pag.className = 'pagination';
        div_panel.appendChild(ul_pag);
        for (i = 0; i < 3; i++) {
            var sli = document.createElement('li');
            sli.id = 'dot_' + i;
            sli.className = 'page-dot';
            ul_pag.appendChild(sli);
        }
        div_shade.appendChild(close);
        div_shade.appendChild(div_imgs);
        div_shade.appendChild(div_panel);
        body.appendChild(div_shade);
        close.onclick = function () {
            html.style.overflowY = 'auto';
            var div_shade = document.getElementsByClassName('div_shade')[0];
            body.removeChild(div_shade);
            d = true;
        }

        var ImageSwiper = function (imgs, minRange) {
            this.imgBox = imgs;
            this.imgs = imgs.children;
            this.cur_img = 1; //起始图片设为1 ,而非0,将在图片显示方法中作-1处理
            this.ready_moved = true; //判断每次滑动开始的标记变量
            this.imgs_count = this.imgs.length;
            this.touchX; //触控开始的手指最初落点
            this.minRange = Number(minRange);
            this.fadeIn; //图片切换的方式,这里使用淡入淡出
            this.fadeOut;
            this.bindTouchEvn() //初始化绑定滑动事件
            this.showPic(this.cur_img) //显示图片方法,注意其中图片编号的-1处理
        }
        ImageSwiper.prototype.bindTouchEvn = function () {
            this.imgBox.addEventListener('touchstart', this.touchstart.bind(this), false)
            this.imgBox.addEventListener('touchmove', this.touchmove.bind(this), false)
            this.imgBox.addEventListener('touchend', this.touchend.bind(this), false)

        }
        ImageSwiper.prototype.touchstart = function (e) {
            if (this.ready_moved) {
                var touch = e.touches[0];
                this.touchX = touch.pageX;
                this.ready_moved = false;
            }
        }

        ImageSwiper.prototype.touchmove = function (e) {
            e.preventDefault();
            var minRange = this.minRange
            var touchX = this.touchX
            var imgs_count = this.imgs_count
            if (!this.ready_moved) {
                var release = e.changedTouches[0];
                var releasedAt = release.pageX;
                if (releasedAt + minRange < touchX) {
                    this.ready_moved = true;
                    if (this.cur_img > (imgs_count - 1)) {
                        this.cur_img = 0;
                    }
                    this.cur_img++;
                    this.showPic(this.cur_img);

                } else if (releasedAt - minRange > touchX) {
                    if (this.cur_img <= 1) {
                        this.cur_img = imgs_count + 1
                    }
                    this.cur_img--;
                    this.showPic(this.cur_img);
                    this.ready_moved = true;
                }
            }
        }

        ImageSwiper.prototype.touchend = function (e) {
            e.preventDefault();
            var minRange = this.minRange
            var touchX = this.touchX
            var imgs_count = this.imgs_count
            if (!this.ready_moved) {
                var release = e.changedTouches[0];
                var releasedAt = release.pageX;
                if (releasedAt + minRange < touchX) {
                    this.ready_moved = true;
                    if (this.cur_img > (imgs_count - 1)) {
                        this.cur_img = 0;
                    }
                    this.cur_img++;
                    showPic(this.cur_img);

                } else if (releasedAt - minRange > touchX) {
                    if (this.cur_img <= 1) {
                        this.cur_img = imgs_count + 1
                    }
                    this.cur_img--;
                    showPic(this.cur_img);
                    this.ready_moved = true;
                }
            }

        }
//在样式表中设置好 .fadeIn 的透明度为0
        ImageSwiper.prototype.fadeIn = function (e) {
            e.classList.add("fadeIn")
        }

        ImageSwiper.prototype.fadeOut = function (e) {
            Array.prototype.forEach.call(e, function (e) {
                e.className = "bg"
            })
        }

        ImageSwiper.prototype.showPic = function (cur_img) {
            this.hidePics(this.imgs)
//得到图片元素的真实索引
            var index = cur_img - 1
            if (document.getElementsByClassName("active")[0]) {
                var active = document.getElementsByClassName("active")[0];
                active.classList.remove("active")
            }
            document.getElementById("dot_" + index).classList.add("active");
            this.fadeIn(this.imgs[index]);
        }
        ImageSwiper.prototype.hidePics = function (e) {
            this.fadeOut(e)
        }
//传参
        var imgs = new ImageSwiper(div_imgs, 30)
        html.style.overflowY = 'hidden';
    }
    picList.onclick = function () {
        if (d) {
            creat_divShade();
            d = false;
        }
    }
    // 跳转列表
    var f = true;
    var body = document.getElementsByTagName('body')[0];
    var bless = document.getElementById('bless');
    var also_bless = document.getElementsByClassName('also_bless')[0];
    var wrap = document.getElementsByClassName('wrap')[0];
    var oDiv = document.createElement('div');
    oDiv.className = 'shade';
    var p_back = document.createElement('p');
    p_back.className = 'back';
    p_back.innerHTML = '回邀请函';
    bless.onclick = function () {
        wrap.style.display = 'none';
        oDiv.style.display = 'block';
        if (f) {
            oDiv.appendChild(p_back);
            var oUl = document.createElement('ul');
            var oA = document.createElement('a');
            oA.innerHTML = '也送祝贺 花篮';
            oA.className = 'also_bless';
            oA.href='../../../ganlanping/wei_buy/pages/wei_buy.html';
            oA.target='_self';
            oDiv.appendChild(oUl);
            for (var i = 0; i < 16; i++) {
                var sLi = document.createElement('li');
                sLi.className = 'list';
                var sImg_man = document.createElement('img');
                sImg_man.className = 'man';
                sImg_man.src = '../images/index_wxheadimg1.png';
                var sH4 = document.createElement('h4');
                sH4.innerHTML = '祝贺茅台古镇开业大吉，生意兴隆，祝大老板财源滚滚';
                var sImg_flower = document.createElement('img');
                sImg_flower.className = 'flower';
                sImg_flower.src = '../images/blessing_bigimg.jpg';
                sLi.appendChild(sImg_man);
                sLi.appendChild(sH4);
                sLi.appendChild(sImg_flower);
                oUl.appendChild(sLi);
            }
            oDiv.appendChild(oA);
            f = false;
        }
    }
    body.appendChild(oDiv);
    p_back.onclick = function () {
        oDiv.style.display = 'none';
        wrap.style.display = 'block';
    }

}