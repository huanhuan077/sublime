var Site=require('../../config/Site');
var http=function(path,options){
    var uri=http.path(path);
    console.log(uri);
    return fetch(uri,options).then((response)=>{
        console.log(response);
        if(response.ok){
            return response.json();
        }
        throw  response
    }).catch((error)=>{
        return error;
        console.log('error',error);
    });
};
http.path = function (path) {
    return Site.protocol + "://" + Site.host + ":" + Site.port +path;
};
http.queryString=function(body){
    var keyValue=[];
    for(let key in body ){
        keyValue.push(key+"="+body[key]);
    }
    return keyValue.join("&");
};

http.get=function(path,body){
    var queryString=http.queryString(body);
    if(queryString){
        path+="?"+queryString;
    }
    return http(path,{method:'GET'});
};
http.post=function (path , body){
    console.log(body);
    return http(path,{
        method:'POST',headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },body:JSON.stringify(body)
    });
};
http.delete=function(path,body){
    var queryString=http.queryString(body);
    return http(path,{method:'POST',body:queryString.join('&')+"&_method:DELETE"});
};
export default http;
module.exports=http;
