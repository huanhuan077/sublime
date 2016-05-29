var oDate=new Date();
oDate.setDate(oDate.getDate()+30);
document.cookie='name=www.open.com.cn;expires'+oDate;

var res=document.cookie.substring(5);
alert(res);
if(res != 'www.open.com.cn'){
	//执行新手引导功能,
	//并添加cookies信息
}

//jquery改写
