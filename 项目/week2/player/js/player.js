var oPro=document.getElementsByClassName("pro")[0],
    oCurrent=document.getElementsByClassName('current-time')[0],
    oAllTime=document.getElementsByClassName('all-time')[0],
    oProOn=document.getElementsByClassName('pro-on')[0],
    oBtn=document.getElementsByClassName('btn')[1],
    oBtnNext=document.getElementsByClassName('btn')[2],
    obtnPrve=document.getElementsByClassName('btn')[0],
    oIsPlay=oBtn.getElementsByClassName("iconfont")[0];
var oPro2=document.getElementsByClassName('pro2')[0],
    oProOn2=document.getElementsByClassName('pro-on2')[0];  
var time,timer1,timer2,timer3,duration,i=0,
    oAudio=document.getElementsByClassName('audio')[0];
var myCanvas=document.getElementById('myCanvas');
var ctx=myCanvas.getContext('2d');
var img=document.getElementById('img');
var j=6,ss=100;
var bg=document.getElementsByClassName('box')[0];
var volume=document.getElementsByClassName('volume')[0];
var bg2=document.getElementsByClassName('box2')[0];
var a=[];
var timer6,p=0,n=111,m=998;
img.src="./imags/66.jpg";
a[0]="./source/倒数+-+邓紫棋.mp3";
a[1]="./source/曾惜 - 讲真的.mp3";
a[2]="./source/海龟先生 - 男孩别哭.mp3";

obtnPrve.onclick=function(){
    if(i==0){
        i=2;
        j=6+i;
        img.src="./imags/"+j+j+'.jpg';
        console.log(img.src);
    }
    else{
        i--;
        j=6+i;
        img.src="./imags/"+j+j+'.jpg';
    }
    musicPause();
    // oAudio=document.getElementsByClassName('audio')[i];
    oAudio.src=a[i];
    oAudio.load();
    clearInterval(timer1);
    
    musicPlay();
    cancelAnimationFrame(timer3);
    oAudio.onload=function(){
        duration=oAudio.duration;
        oAllTime.innerHTML=conversion(duration);
        
    }
    ctx.restore();
    ctx.save();
    oBtn.onclick();
}

oBtnNext.onclick=function(){
    if(i==2){
        i=0;
        j=6+i;
        img.src="./imags/"+j+j+'.jpg';
    }
    else{
        i++;
        j=6+i;
        img.src="./imags/"+j+j+'.jpg';
    }
    oAudio.src=a[i];
    oAudio.load();
    // oAudio=document.getElementsByClassName('audio')[i];
    clearInterval(timer1);
    musicPlay();
    cancelAnimationFrame(timer3);
    oAudio.onloadedmetadata=function(){
        duration=oAudio.duration;
        oAllTime.innerHTML=conversion(duration);
    }
    ctx.restore();
    ctx.save();
    oBtn.onclick();
}

oAudio.oncanplay=function(){
    duration=oAudio.duration;  
    oCurrent.innerHTML=conversion(oAudio.currentTime);
    oAllTime.innerHTML=conversion(duration);
}

conversion=function(time){
    var sec=parseInt(time%60),
        min=parseInt(time/60);
    if(min<10&&sec>9){
        return("0"+min+':'+sec);
    }
    else if(min<10&&sec<10){
        return("0"+min+':0'+sec);
    }
    else{
        return(min+':'+sec);
    }
}

oBtn.onmouseup=function(){
    if(oAudio.paused){
        musicPlay();
    }else{
        musicPause();
    }
}
function musicPlay(){
    oIsPlay.className="iconfont icon-timeout";
    timer1=setInterval(movePro,300);
    oAudio.play();
}
function musicPause(){
    oAudio.pause();
    oIsPlay.className="iconfont icon-play-circle";
    clearInterval(timer1);
}

movePro=function(){
    var currentTime=oAudio.currentTime;
    var currentWidth=(currentTime/duration)*222;
    oCurrent.innerHTML=conversion(currentTime);
    oProOn.style.width=currentWidth+"px";
}
function nweStart(){
    musicPause();
    currentTime=0;
    oCurrent.innerHTML=conversion(currentTime);
    oProOn.style.width=0+"px";
    musicPlay();
}

oAudio.onended=function(){
    musicPause();
    currentTime=0;
    oCurrent.innerHTML=conversion(currentTime);
    oProOn.style.width=0+"px";
    musicPlay();
}
oPro.onmousedown=function(){
    clearInterval(timer1);
    var c=oAudio.currentTime;
    document.body.onmousemove=function(e){
    var newWidth=e.clientX-oPro.getBoundingClientRect().left;
        if(newWidth<0){
            newWidth=0;
        }
        else if(newWidth>222){
            newWidth=222;
        }   
        oProOn.style.width=newWidth+"px";
        c=duration*newWidth/222;
        oCurrent.innerHTML=conversion(c);
        
    }
    document.body.onmouseup=function(){
        document.body.onmousemove=null;
        document.body.onmouseup=null;
        musicPlay();
        oAudio.currentTime=c;
        cancelAnimationFrame(timer3);
        oBtn.onclick();
    }
}


oPro2.onmousedown=function(){
    document.body.onmousemove=function(e){
        var newWidth=e.clientX-oPro2.getBoundingClientRect().left;
        if(newWidth<0){
            newWidth=0;
        }else if(newWidth>100){
            newWidth=100;
        }
        ss=newWidth;
        oAudio.volume=newWidth/100;
        oProOn2.style.width=newWidth+'px';
    }
    document.body.onmouseup=function(){
        document.body.onmousemove=null;
        document.body.onmouseup=null;
    }
}

volume.onclick=function(){
    if(oProOn2.offsetWidth!=0){
        
        oProOn2.style.width=0+'px';
        oAudio.volume=0;
    }else{
        oAudio.volume=ss/100;
        oProOn2.style.width=ss+'px';
    }
    

}
// img.onload=function(){
//     ctx.translate(200,200);
//     ctx.drawImage(img,-200,-200,400,400);
// }
    img.onload=function(){
        ctx.drawImage(img,-150,-150,300,300);
        // ctx.drawImage(img,-200,-200,400,400);
        ctx.beginPath();
        bg5=ctx.createRadialGradient(0,0,150,0,0,200);
        bg5.addColorStop(0,"transparent");
        bg5.addColorStop(0.01,"black");
        bg5.addColorStop(1,"black");
        ctx.fillStyle=bg5;
        ctx.fillRect(-200,-200,400,400);
    
    }

    ctx.translate(200,200);
    ctx.drawImage(img,-200,-200,400,400);
    var bg5=ctx.createRadialGradient(0,0,150,0,0,200);
    ctx.save();

    oBtn.onclick=function(){ 
        if(oAudio.paused){
            // clearInterval(timer2);
        }
        else{
            timer3=requestAnimationFrame(oBtn.onclick);
            // // timer2=setInterval(function(){
            //     var j=0.002;
            //     ctx.rotate(Math.PI*j);
            //     ctx.drawImage(img,-200,-200,400,400);
            // // },50);
            myCanvas.style.backgroundImage='url('+img.src+')';
            ctx.beginPath();
            if(p<0.9){
                p+=0.01;
            }
            else{
                p=0;
            }
            if(n<998){
                n++;
            }else{
                n=111;
            }
            if(m>111){
                m--;
            }else{
                m=998;
            }
            ctx.drawImage(img,-150,-150,300,300);
            bg5.addColorStop(1,"transparent");
            bg5.addColorStop(1-p,"#"+n);
            bg5.addColorStop(p,"#"+m);
            bg5.addColorStop(0,"transparent");
            ctx.fillStyle=bg5;
            ctx.fillRect(-200,-200,400,400);
            ctx.rotate(0.003*Math.PI); 
    }
}

    bg.onclick=function(e){
        var c=oAudio.currentTime;
        duration=oAudio.duration;
        var num=e.clientX-bg.getBoundingClientRect().left;
        console.log(num);
        oProOn.style.width=num+"px";
        c=duration*num/222;
        oCurrent.innerHTML=conversion(c);
        oAudio.currentTime=c;
    }

    bg2.onclick=function(e){
        var volumeWidth=e.clientX-bg2.getBoundingClientRect().left;
        ss=volumeWidth;
        oAudio.volume=ss/100;
        oProOn2.style.width=ss+'px';
        console.log(ss);
    }

// var bg=ctx.createRadialGradient(0,0,130,0,0,200);
// myCanvas.style.backgroundImage='url('+img.src+')';
// function change(){
    
//     if(p<0.9){
//         p+=0.01;
//     }
//     else{
//         p=0;
//     }
//     if(n<999){
//         n++;
//     }else{
//         n=111;
//     }
//     if(m>111){
//         m--;
//     }else{
//         m=999;
//     }
    
//     console.log(p);
//     bg.addColorStop(1,"transparent");
//     bg.addColorStop(1-p,"#"+n);
//     bg.addColorStop(p,"#"+m);
//     bg.addColorStop(0,"transparent");
//     ctx.fillStyle=bg;
//     ctx.fillRect(0,0,400,400);
// }
// timer6=setInterval(change,100);



