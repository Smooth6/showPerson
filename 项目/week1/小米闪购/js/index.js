var tabs=document.getElementById("tabs").getElementsByTagName("li");
console.log(tabs);
var lists=document.getElementById("lists").getElementsByTagName("ul");
console.log(lists);
var tHours,tSeconds,tMinte,time;
var time2=document.getElementById('time2');


for(i=0;i<tabs.length;i++){
    tabs[i].onclick=showlist;
    lists[i].onclick=showlist;
}

function showlist(){
    for(i=0;i<tabs.length;i++){
        if(tabs[i]==this){
            tabs[i].className="active";
            lists[i].className="clearfix active";
        }
        else{
            tabs[i].className="";
            lists[i].className="clearfix";
        }
       
    }
}

var seckillNav=document.getElementById("seckillNav");
window.onscroll =function(){
    var scrollTop=document.body.scrollTop;
    
if(scrollTop>=260){
    seckillNav.className="seckill-nav seckill-navfix";
}
else{
    seckillNav.className="seckill-nav";
 }

    console.log(scrollTop);
}
start=function(){
    data=new Date();
    tHours=data.getHours();
    tMinutes=data.getMinutes();
    tSeconds=data.getSeconds();
    time2.innerHTML=tHours+":"+tMinutes+":"+tSeconds;
}   
setInterval(start,500);







 