/**
 * Created by Administrator on 2016/4/13.
 */
function sendToTest(){
    $.get("/test");
    $.post("/test");
}
function testWithData(){
    $.get("/test?x=1");
    $.get("/test",{y:2});
    $.post("/test",{z:3});
}
function testWithCallback(){
    $.get('/test/user',function(data,callbacktype,jqXHR){
        console.log(data);
        console.log(callbacktype);
        console.log(jqXHR);
    })
}
function withDataCallback(){
    $.get("/test",{type:1},function(data){
        console.log(data);
    })
}
function testLoader(){
    $("#container").load("/test/alluser",{type:1},function(){
        console.log(arguments);

    })
}
function testGetJson(){
    $.getJSON("/test",{type:1},function(data){
        console.log(data);
    })
}
function testGetJavascript(){
    $.getScript("/test/testLib.js",function(){
    alert(testFun(1,2));
    })
}
function basicUsage(){
    $.ajax("/test",{success:function(){
        alert("ok");
    }});
    $.ajax({
        url:"/test",
        success:function(){
            slert("ok");
        }
    });
}
function callbackUsage(){
    $.ajax({
        url:"/test",
        success:function(data){
            console.log(arguments);
        },
        error:function(jqXHR,testStates,err){
            console.log(arguments);
        },
        complete:function(jqXHR,teststates){

        }
    }

    )
}