/**
 * Created by Candy on 2015/7/25.
 */
window.onload=function(){
    var oUl=document.getElementById("list");
    var oH2=oUl.getElementsByTagName("h2");
    var aUl=oUl.getElementsByTagName("ul");
    var arrLi=[];
    var oldIndex=0;
    var oldLiIndex=0;
    for(var i=0;i<oH2.length;i++) {
        oH2[i].index = i;
        oH2[i].onclick = function () {
            for(i=0;i<oH2.length;i++){
                oH2[i].className="";
                aUl[i].style.display="none";
            }
            this.className="hover";
            aUl[this.index].style.display="block";
        }
    }
//以下为li获取判断
    for( i=0;i<aUl.length;i++){
        var aLi=aUl[i].getElementsByTagName("li");
        for(var j=0;j<aLi.length;j++){
            arrLi.push(aLi[j]);  //用一数组将li存起来
        }
    }
   // 同理判断li
    for(i=0;i<arrLi.length;i++){
        arrLi[i].nowIndex=i;
        arrLi[i].onclick=function(){
            if(arrLi[oldLiIndex]!=this){
                arrLi[oldLiIndex].className="";
            }
            if(this.className=="select"){
                this.className="";
            }else{
                this.className="select";
            }
            oldLiIndex=this.nowIndex;
        }
    }
}