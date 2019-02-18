
function ajax(method,url,callbacks,data,flag){
    var timer;
    var xml = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");
    method = method.toUpperCase();
    if(method == 'GET'){
        var date = new Date();
        timer = date.getTime();
        xml.open('GET',url+'?'+data+"&timer="+timer,flag);
        xml.send();
    }else{
        xml.open('POST',url,flag);
        xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xml.send(data);
    }

    xml.onreadystatechange=function(){
        if(xml.readyState == 4){
            if(xml.status == 200){
               callbacks(xml.responseText);
            }
        }
    }
}
