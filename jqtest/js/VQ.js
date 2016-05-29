/**
 * Created by Candy on 2015/10/31.
 */
function bindEvent(obj, events, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(events, function(ev){
            if(fn()==false){
                ev.preventDefault();
                ev.cancelbubble=true;
            }else{
            }
        }, false);
    }
    else {
        obj.attachEvent('on' + events, function(){
            if(fn()==false){
                return false;
                window.event.cancelBubble=true;
            }

        })
    }
}
function getByClass(oParent, sClass) {
    var arr = [];
    var elems = oParent.getElementsByTagName('*');
    for (var i = 0; i < elems.length; i++) {
        if (elems[i].className == sClass) {
            arr.push(elems[i]);
        }
    }
    return arr;
}
function toArray(elems) {
    var arr = [];
    for (var i = 0; i < elems.length; i++) {
        arr.push(elems[i]);
    }
    return arr;
}
function getStyle(obj,attr){
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}
function Vquery(vArg) {
    this.elements = []; //选择元素的这样的一个集合
    switch (typeof vArg) {
        case 'function':
            //window.onload=vArg;
            bindEvent(window, 'load', vArg);
            break;
        case 'string':
            switch (vArg.charAt(0)) {
                case '#':
                    this.elements.push(document.getElementById(vArg.substring(1)));
                    break;
                case '.':
                    this.elements = getByClass(document, vArg.substring(1));
                    break;
                default:
                    this.elements = toArray(document.getElementsByTagName(vArg));
                    break;
            }
            break;
        case 'object':
            if(vArg.constructor==Array){
                this.elements=vArg;
            }else{
                this.elements.push(vArg);
            }
            break;
    }
}

Vquery.prototype.html = function (str) {
    if (str) { //设置
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].innerHTML = str;
        }
    } else {
        return this.elements[0].innerHTML;
    }
    return this;
};
Vquery.prototype.click = function (fn) {
    //for (var i = 0; i < this.elements.length; i++) {
    //    bindEvent(this.elements[i], 'click', fn);
    //}
    this.on('click',fn);
    return this;
};
Vquery.prototype.mouseover = function (fn) {
    //for (var i = 0; i < this.elements.length; i++) {
    //    bindEvent(this.elements[i], 'mouseover', fn);
    //}
    this.on('mouseover',fn);
    return this;
};
Vquery.prototype.on = function (events, fn) {
    for (var i = 0; i < this.elements.length; i++) {
        bindEvent(this.elements[i], events, fn);
    }
    return this;
};
Vquery.prototype.hide = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display='none';
    }
    return this;
};
Vquery.prototype.show = function () {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style.display='block';
    }
    return this;
};
Vquery.prototype.hover=function(fnOver,fnOut){
    this.on('mouseover',fnOver);
    this.on('mouseout',fnOut);
    return this;
};
Vquery.prototype.css=function(attr,value){
    if(arguments.length==2){ //设置
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].style[attr]=value;
        }
    }
    else if(arguments.length==1){ //获取
        return getStyle(this.elements[0],attr);
    }
    return this;
};
Vquery.prototype.attr=function (attr,value){
    if(arguments.length==2){
        for(var i=0;i<this.elements.length;i++){
            this.elements[i].setAttribute(attr,value);
        }
    }
    else if(arguments.length==1){
        return this.elements[i].getAttribute(attr);
    }
    return this;
}
Vquery.prototype.eq=function(num){
    return $(this.elements[num]);
}
Vquery.prototype.index=function(){
    var elms=this.elements[0].parentNode.children;
    for(var i=0;i<elms.length;i++){
        if(elms[i]==this.elements[0]){
            return i;
        }
    }
}
Vquery.prototype.find=function(sel){
    var arr=[];
    if(sel.charAt(0)=='.'){
        for(var i=0;i<this.elements.length;i++){
           arr=arr.concat(getByClass(this.elements[i],sel.substring(1)));
        }
    }else{
        for(var j=0;j<this.elements.length;j++){
            arr=arr.concat(toArray(this.elements[j].getElementsByTagName(sel)));
        }
    }
    return $(arr);
}
function $(vArg) {
    return new Vquery(vArg);
}