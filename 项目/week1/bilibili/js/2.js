var oPrve=document.getElementById('prve');
var oNext=document.getElementById('next');
var oMain=document.getElementsByClassName('main')[0];
var oList=document.getElementsByClassName("list2")[0];
var oLi=oList.getElementsByTagName('li');
var oContainer=document.getElementsByClassName('container2')[0];
var timer,timer2,
    liLength=oLi.length,
    index=0,
    flag=true;
function moveImag(dis){
    flag=false;
    var time=400;
    var eachTime=20;
    var eachDis=dis/(time/eachTime);
    var newLeft=oMain.offsetLeft+dis;
    function eachMove(){
       
        if(oMain.offsetLeft!=newLeft){
            oMain.style.left=eachDis+oMain.offsetLeft+'px';
        }else{
            clearInterval(timer);
            
            // oMain.style.left=newLeft+'px';
            if(newLeft==0){
                oMain.style.left=-2200+"px";
            }
            if(newLeft==-2640){
                oMain.style.left=-440+"px";
            }
            flag=true;
        }
      
    }
    
    timer=setInterval(eachMove,eachTime);
}

oPrve.onclick=function(){
    if(flag==false){return;}
    moveImag(440);
    if(index==0){
        index=4;
    }else{
        index--;
    }liStyle();
}
oNext.onclick=function(){
    if(flag==false){return;}
    moveImag(-440);
    if(index==4){
        index=0;
    }else{
        index++;
    }
    liStyle();
}
function liStyle(){
    oList.getElementsByClassName("active")[0].className=" ";
    oLi[index].className="active";
}
for(var i=0;i<liLength;i++){
    (function(j){
        oLi[j].onclick=function(){
            var num=(j-index)*-440;
            moveImag(num);
            index=j;
            liStyle();
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