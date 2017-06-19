/**
 * Created by glp- on 2015/12/29.
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

addLoadEvent(focusImg);
addLoadEvent(map);

function map() {
    var logo = document.getElementById("map_btn");
    var con = document.getElementById("allmap");
    var add=document.getElementsByClassName("address")[0].innerHTML;
    var a = true;
    logo.onclick = function ()
    {
        if (a) {
            con.style.display = "block";
            mapLocation();
            a = false;
        }
        else {
            con.style.display = "none";
            a = true;
        }
    }
    function mapLocation(){

        var city = add.substring(0, 3);
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        var point = new BMap.Point(116.331398,39.897445);
        map.centerAndZoom(point,15);
        // 创建地址解析器实例
        var myGeo = new BMap.Geocoder();
        // 将地址解析结果显示在地图上,并调整地图视野
        myGeo.getPoint(add, function(point){
            if (point) {
                map.centerAndZoom(point, 16);
                map.addOverlay(new BMap.Marker(point));
            }else{
                alert("您选择地址没有解析到结果!");
            }
        }, city);
    }

}

function focusImg()
{
    var oBox=document.getElementById("box");
    var oList=document.getElementById("list");
    var aLi=oBox.getElementsByTagName("li");
    var oListWidth=aLi[0].offsetWidth*aLi.length;
    oList.style.width=oListWidth;
    var boxWidth=oBox.style.width;
    var a=oListWidth-boxWidth;
    oList.innerHTML+=oList.innerHTML;
    var hammertime=new Hammer(oBox);
    var totalWidth=oList.offsetWidth;
    var offset=10;
    hammertime.on("panleft",function(e){
        if(parseInt(oList.style.left)<(-totalWidth)/2){
            oList.style.left='0px';
        }
        var currentValue=oList.offsetLeft;
        oList.style.left=currentValue-offset+'px';

    });
    hammertime.on("panright",function(e){
        if(!oList.style.left){
            oList.style.left="0px";
        }
        if(parseInt(oList.style.left)>=0){
            oList.style.left=-totalWidth/2+"px";
        }
        var currentValue=oList.offsetLeft;
        oList.style.left=currentValue+offset+'px';
    });

    var name=oList.getElementsByClassName("name");
    var dis_p=oList.getElementsByClassName("discount_price");
    var span=oList.getElementsByTagName("span");
    var price=oList.getElementsByClassName("price");

    function initStyle()
    {
        for(var i=0;i<aLi.length;i++)
        {
            aLi[i].style.background = "#eeeeee";
            name[i].style.color= "#000000";
            dis_p[i].style.color="#f84f00";
            span[i].style.color="#ffffff";
            span[i].style.background="#f84f00";
            price[i].style.color="#888888";
        }
    }
    function currentStyle(i)
    {
            if(i>aLi.length){i=i-(aLi.length/2)}
            aLi[i].style.background = '#f84f00';
            var _name = aLi[i].getElementsByClassName("name")[0];
            _name.style.color = "#ffffff";
            var _dis_p = aLi[i].getElementsByClassName("discount_price")[0];
            _dis_p.style.color = "#ffffff";
            var _span = aLi[i].getElementsByTagName("span")[0];
            _span.style.background = "#ffffff";
            _span.style.color = "#f84f00";
            var _price = aLi[i].getElementsByClassName("price")[0];
            _price.style.color = "#ffffff";

            pay(_dis_p);
    }

    for(var i=0;i<aLi.length;i++)
    {
        aLi[i].index=i;
        aLi[i].onclick=function()
        {
           initStyle();
           currentStyle(this.index);
            currentStyle(this.index+3);
        }
    }
}

function pay(_dis_p)
{

    var oNum=document.getElementById("number");
    var oAdd=document.getElementById("add");
    var oMin=document.getElementById("min");
    var oSum=document.getElementById("sum");
    var num=2;
    refreshPrice();
    oAdd.onclick=function(){
        num=num+1;
        oNum.innerHTML=num;
        refreshPrice();
    }
    oMin.onclick=function(){
        if(num==1){ return;}
        num=num-1;
        oNum.innerHTML=num;
        refreshPrice();
    }
    function refreshPrice(){
        var resultPrice=parseFloat(_dis_p.innerHTML)*num;
        var number=new Number(resultPrice);
        oSum.innerHTML=number.toFixed(2);
    }
}
