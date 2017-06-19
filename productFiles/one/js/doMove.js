/**
 * Created by Candy on 2015/8/7.
 */
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
function doMove(obj,attr,dir,target,endFn){
    clearInterval(obj.timer);
    dir=parseInt(getStyle(obj,attr)) < target ? dir : -dir;
    obj.timer=setInterval(function(){
        var speed=parseInt(getStyle(obj,attr)) +dir;
        if(speed>target&&dir>0||speed<target&&dir<0){
            speed=target;
        }
        obj.style[attr]=speed+'px';
        if(speed==target){
            clearInterval(obj.timer);
            endFn&&endFn();
        }
    },30);
}
function opacity(obj,dir,target,frequency,endFn){
    var currentOpacity=getStyle(obj,'opacity')*100;
    dir=currentOpacity<target ? dir : -dir;
    clearInterval(obj.alpha);
    obj.alpha=setInterval(function(){
        currentOpacity=getStyle(obj,'opacity')*100;
        var nextOpacity=currentOpacity+dir;
        if(nextOpacity>target&&dir>0||nextOpacity<target&&dir<0)
            nextOpacity=target;
        obj.style.opacity=nextOpacity/100;
        obj.style.filter='alpha(opacity:'+nextOpacity+')';
        if(nextOpacity==target){
            clearInterval(obj.alpha);
            endFn&&endFn();
        }
    },frequency);
}
function shake(obj,attr,endFn){
    if(obj.shaked){return;}
    obj.shaked=true;
    var arr=[];
    var num=0;
    var pos=parseInt(getStyle(obj,attr));
    for(var i=20;i>0;i-=2){
        arr.push(i,-i);
    }
    arr.push(0);
    clearInterval(obj.shakeTimer);
    obj.shakeTimer=setInterval(function(){
        obj.style[attr]=pos+arr[num]+'px';
        num++;
        if(num==arr.length){
            clearInterval(obj.shakeTimer);
            obj.shaked=false;
            endFn&&endFn();
        }
    },50);
}