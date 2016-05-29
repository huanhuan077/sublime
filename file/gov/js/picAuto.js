
window.onload=function(){
    var oWrap = document.getElementById('wrap'),
        aImg = oWrap.getElementsByTagName('img'),
        oInfo = document.getElementById('info'),
        oDiv = oInfo.getElementsByTagName('div'),
        num = 0,
        timer = null,
        nav1 = document.getElementById('info_nav1'),
        nav2 = document.getElementById('info_nav2'),
        nav3 = document.getElementById('info_nav3'),
        navLi1 = nav1.getElementsByTagName('li'),
        navLi2 = nav2.getElementsByTagName('li'),
        navLi3 = nav3.getElementsByTagName('li'),
        infoLContent = document.getElementById('info_left_content'),
        infoMContent = document.getElementById('info_middle_content'),
        infoRContent = document.getElementById('info_right_content'),
        infoLContentUl = infoLContent.getElementsByTagName('ul'),
        infoMContentUl = infoMContent.getElementsByTagName('ul'),
        infoRContentUl = infoRContent.getElementsByTagName('ul'),
        newsTopLi=document.getElementById('news_top').getElementsByTagName('li'),
        newsBodyUl=document.getElementById('news_body').getElementsByTagName('ul');

    cardTab(newsTopLi, newsBodyUl);
    cardTab(navLi1, infoLContentUl);
    cardTab(navLi2, infoMContentUl);
    cardTab(navLi3, infoRContentUl);
    fnTab();

    function fnTab(){
        timer=setTimeout(function(){
            doMove(oDiv[num], 'top', 20, 0, function(){
                num++;
                if(num == oDiv.length) {
                    num = 1;
                    oWrap.style.left = 0;
                }
                doMove(oWrap, 'left', 20, -390*num, function(){
                    doMove(oDiv[num], 'top', 20, -30);
                    fnTab();
                })
            })
        }, 2000)
    }
    oWrap.onmouseover=function(){
        clearTimeout(timer);
    }
    oWrap.onmouseout=function(){
       fnTab();
    }

}

function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr]: getComputedStyle(obj)[attr];
}
function doMove(obj,attr,dir,target,endFn){
    dir=parseInt(getStyle(obj,attr))<target ? dir : -dir;
    clearInterval(obj.timer);
    obj.timer=setInterval(function(){
        var step=parseInt(getStyle(obj,attr))+dir;
        if(step>target&&dir>0||step<target&&dir<0){
            step=target;
        }
        obj.style[attr]=step+'px';
        if(step==target){
            clearInterval(obj.timer);
            endFn&&endFn();
        }
    },20);
}

function cardTab(li,obj){
    var liColor = null,
        color = null,
        oldColor=getStyle(li[0].getElementsByTagName('a')[0], 'color'),
        oldLiColor = getStyle(li[0], 'backgroundColor');
    for(var i=0;i<li.length;i++){
        li[i].index=i;
        li[i].onmouseover=function(){
            liColor=getStyle(this.getElementsByTagName('a')[0],'backgroundColor');
            //alert(liColor);
            //color=getStyle(this.getElementsByTagName('a')[0],'color');
            for(var j=0;j<li.length;j++){
                li[j].style.backgroundColor=oldLiColor;
                li[j].getElementsByTagName('a')[0].style.color=oldColor;
                obj[j].style.display='none';
            }
            this.getElementsByTagName('a')[0].style.color='#fff';
            obj[this.index].style.display='block';
        }
        li[i].onmouseout=function(){
            this.getElementsByTagName('a')[0].style.color='#fff';
            this.style.backgroundColor=liColor;
            //this.style.display='block';
        }
    }
}