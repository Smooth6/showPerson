var oPrve=document.getElementById('prve');
var oNext=document.getElementById('next');
var oMain=document.getElementsByClassName('main')[0];
var oList=document.getElementsByClassName("list")[0];
var oLi=oList.getElementsByTagName("li");
var oContainer=document.getElementsByClassName('container')[0];
var timer,timer2,
    liLength=oLi.length,
    index=0,
    flag=true;

function imagsMove(dis){
    flag=false;
    var time=400;
    var eachTime=20;
    var eachDis=dis/(time/eachTime);
    var newLeft=dis+oMain.offsetLeft;
    function eachMove(){
        if(newLeft!=oMain.offsetLeft){
            oMain.style.left=eachDis+oMain.offsetLeft+'px';
        }else{
            clearInterval(timer);
            if(newLeft==0){
                oMain.style.left=-2600+'px';
            }
            if(newLeft==-3120){
                oMain.style.left=-520+'px';
            }flag=true;
        }
    }
    timer=setInterval(eachMove,eachTime);
}
oPrve.onclick=function(){
    if(flag==false){return;}
    imagsMove(520);
    if(index==0){
        index=4;
    }else{
        index--;
    }    
    listStyle();
}
oNext.onclick=function(){
    if(flag==false){return;}
    imagsMove(-520);
    if(index==4){
        index=0;
    }else{
        index++;
    }
    listStyle();
}

function listStyle(){
    oList.getElementsByClassName('active')[0].className=" ";
    oLi[index].className="active";
}
for(var i=0;i<liLength;i++){
    (function(j){
        oLi[j].onclick=function(){
            var num=(j-index)*-520;
            imagsMove(num);
            index=j;
            listStyle();
        }
    })(i);
}
timer2=setInterval(oNext.onclick,2000);
oContainer.onmouseover=function(){
    clearInterval(timer2);
}
oContainer.onmouseout=function(){
    timer2=setInterval(oNext.onclick,2000);
}